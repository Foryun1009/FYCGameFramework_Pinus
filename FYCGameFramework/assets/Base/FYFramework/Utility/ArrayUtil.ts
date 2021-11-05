/**
 * 拷贝数组
 */
Array.prototype['copy'] = function <T>(): Array<T> {
    let v = []
    for (let index = 0; index < this.length; index++) {
        const value = this[index];
        v.push(value)
    }
    return v;
}

/**
 * 是否含有指定值
 * @param v 
 */
Array.prototype['contain'] = function <T>(v: T): boolean {
    return this.indexOf(v) >= 0;
}

/**
 * 从数组中移除指定数据
 * @param v 
 */
Array.prototype['remove'] = function <T>(v: T) {
    let index = this.indexOf(v);
    if (index >= 0) {
        this.splice(index, 1);
    }
}

export { }