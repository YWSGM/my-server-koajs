// 消息生产者
import * as mq from 'amqplib';

class ProducersMQ {
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

    /**
     * 发送消息
     * @param queueName
     * @param msg
     * @param callBack
     */
    public sendQueueMsg(queueName: string, msg: string, callBack: Function) {
        const that: ProducersMQ = this;
        that.open
            .then((conn) => conn.createChannel())
            // eslint-disable-next-line
            .then((channel) => {
                // eslint-disable-next-line
                return channel.assertQueue(queueName)
                    // eslint-disable-next-line
                    .then(() =>{
                        return channel.sendToQueue(queueName, Buffer.alloc(msg.length, msg), { persistent: true });
                    })
                    .then((data: boolean) => {
                        try {
                            if (data) {
                                callBack && callBack('success');
                                channel.close();
                            } else {
                                callBack('fail');
                            }
                        } catch (err) {
                            callBack(JSON.stringify(err));
                        }
                    })
                    .catch(() => {
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
                }
            });
    }
}

export default ProducersMQ;
