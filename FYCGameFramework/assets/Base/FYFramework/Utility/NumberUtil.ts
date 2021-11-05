/**
 * 用缩写的方式显示数字 大于1000 用K 大于1000000 用M
 */
Number.prototype["toAbbreviation"] = function () {
    if (this >= 1000000) {
        return (Math.floor(this / 100000) / 10) + "M"
    } else if (this >= 1000) {
        return (Math.floor(this / 100) / 10) + "K";
    } else {
        return this + "";
    }
}

export { }