interface InitOption {
	/** 服务器的ip */
	host: string,
	/** 端口号 */
	port: number,
	user?: any,
	handshakeCallback?: any,
	log?: boolean
}

interface Pinus {
	/**
	 * 初始化 客户端的第一次调用
	 * @param param 参数
	 * @param cb 初始化完成回调
	 */
	init(param: InitOption, cb: () => void);

	/**
	 * 消息请求
	 * @param route 路由 例如：connector.entryHandler.entry
	 * @param msg 请求的内容
	 * @param cb 响应回来后的回调
	 */
	request(route: string, msg: any, cb: (data: any) => void);

	/**
	 * 推送消息 不需要服务器响应
	 * @param route 路由 例如：connector.entryHandler.entry
	 * @param msg 请求的内容
	 */
	notify(route: string, msg: any);

	/**
	 * 监听服务端的推送消息
	 * @param route 路由 
	 * @param cb 回调
	 */
	on(route: string, cb: (...params) => void);

	/**
	 * 监听服务端的推送消息 只监听一次
	 * @param route 路由
	 * @param cb 回调
	 */
	once(route: string, cb: (...params) => void);

	/**
	 * 主动触发客户端监听消息
	 * @param route 路由
	 * @param params 参数
	 */
	emit(route: string, ...params);

	/**
	 * 主动断开连接的方法
	 */
	disconnect();

	/**
	 * 是否有指定路由
	 * @param route 路由
	 * @returns 是否有指定路由
	 */
	hasListeners(route: string);

	/**
	 * 获取指定路由的所有回调函数
	 * @param route 路由
	 * @returns 指定路由的所有回调函数
	 */
	listeners(route: string): [(...params) => void];

	/**
	 * 移除指定key的指定回调消息
	 * @param event 消息key
	 * @param cb 消息回调
	 */
	off(event, cb);

	/**
	 * 移除指定key所有监听
	 * @param event 消息key
	 */
	removeListener(event);

	/**
	 * 移除所有监听
	 */
	removeAllListeners();

}

declare const pinus: Pinus;