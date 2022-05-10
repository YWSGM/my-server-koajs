// 消息消费者
import * as mq from 'amqplib';
import { ConsumeMessage } from 'amqplib';

class ConsumersMQ {
    private hosts: any[];

    private index: number;

    private length: number;

    private open: Promise<any>

    constructor() {
        this.hosts = [];
        this.index = 0;
        this.length = this.hosts.length;
        this.open = mq.connect(this.hosts[this.index]);
    }

    public receiveQueueMsg(queueName: string, receiveCallBack: Function, errorCallBack?: Function) {
        const that = this;
        that.open
            .then((conn) => conn.createChannel())
            // eslint-disable-next-line
            .then((channel) => {
                return channel.assertQueue(queueName)
                    // eslint-disable-next-line
                    .then(() => {
                        return channel.consume(queueName, (msg:ConsumeMessage | null) => {
                            if (msg !== null) {
                                const data = msg.content.toString();
                                channel.ack(msg);
                                receiveCallBack && receiveCallBack(data);
                            }
                        });
                    })
                    .finally(() => {
                        setTimeout(() => {
                            if (channel) channel.close();
                        }, 500);
                    });
            })
            .catch(() => {
                // eslint-disable-next-line no-plusplus
                const num = that.index++;
                if (num <= that.length - 1) {
                    that.open = mq.connect(that.hosts[num]);
                } else {
                    that.index = 0;
                    that.open = mq.connect(that.hosts[0]);
                }
            });
    }
}

export default ConsumersMQ;
