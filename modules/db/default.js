const config = {
    // 启动端口
    port: 3000,

    // 数据库配置
    database: {
        DATABASE: 'test',
        USERNAME: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost',
    },

    /** 接口前缀 */
    api_prefix: '/api/v1/',

    /** 上传图片存放目录 */
    upload_path: 'public/upload/images/',

    /** 上传图片大小限制 */
    upload_img_size: 5 * 1024 * 1024,

    /**
     * 前端上传图片时约定的字段
     * @example
     * const formData : new FormData()
     * formData.append("img", file)
     * XHR.send(formData)
     */
    upload_img_name: 'img',

    /** 用户临时表 */
    user_file: 'public/user.json',

    /** token 长度 */
    token_size: 28,

    /** token 格式错误提示文字 */
    token_tip: '无效的token',
};

module.exports = config;
