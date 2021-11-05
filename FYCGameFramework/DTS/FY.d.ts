/**
 * FY框架的扩展
 */

//#region ------------------ Number 扩展 ------------------

/**
 * 在NumberUtil.ts里面实现
 */
interface Number {
	/**
	 * 用缩写的方式显示数字 大于1000 用K 大于1000000 用M
	 */
	toAbbreviation: () => string;
}

//#endregion

//#region ------------------ String 扩展 ------------------

/**
 * 在StringUtil.ts里面实现
 */
interface String {
	/**
	 * 校验地址是否为http或https
	 */
	isHttpURL: () => boolean;
	/**
	 * 判断字符是否为空
	 */
	isNullOrEmpty: () => boolean;
	/**
	 * 限制为n个字符，超过的显示... 中文占两个字符
	 * @param n 限制为几个字符
	 */
	limitLength: (n: number) => string;
}

//#endregion

//#region ------------------ Array 扩展 ------------------

/**
 * 在ArrayUtil.ts里面实现
 */
interface Array<T> {
	/**
	 * 拷贝数组
	 */
	copy: () => Array<T>;
	/**
	 * 是否含有指定值
	 */
	contain: (v: T) => boolean;
	/**
	 * 从数组中移除指定数据
	 * @param v 
	 */
	remove: (v: T) => void;
}

//#endregion