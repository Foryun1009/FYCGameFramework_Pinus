/**
 * 校验地址是否为http或https
 */
String.prototype['isHttpURL'] = function () {
    let isHttp = /^http[s]*:\/\//;
    return isHttp.test(this);
}

/**
 * 判断字符是否为空
 */
String.prototype['isNullOrEmpty'] = function () {
    return this === null || this === undefined || this === '';
}

/**
 * 限制为n个字符，超过的显示... 中文占两个字符
 * @param n 
 */
String.prototype['limitLength'] = function (n: number) {
    let strLength = 0;
    let cutIndex = 0;
    for (let i = 0; i < this.length; i++) {
        if (strLength >= n && cutIndex == 0) {
            cutIndex = i;
        }
        if (escape(this[i]).indexOf("%u") < 0) //不是中文
        {
            strLength += 1;
        }
        else //中文
        {
            strLength += 2;
        }
    }

    //如果字符长度小于截取长度，直接返回
    if (strLength <= n) {
        return this
    }

    let finalStr = this.slice(0, cutIndex) + '...';
    return finalStr
}

export { }