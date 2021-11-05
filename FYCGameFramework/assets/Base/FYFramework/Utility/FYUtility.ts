//#region ------------------ Number 扩展 ------------------

export default class FYUtility {
    /**
     * 获取不重复的随机数
     * @param minValue 最小值
     * @param maxValue 最大值
     * @param valueNum 随机个数
     */
    static getRandomValueDif(minValue: number, maxValue: number, valueNum: number) {
        // 全部随机数值  
        let allNums = new Array();

        // 判断获取随机数个数  
        let size = valueNum ? (valueNum > maxValue - minValue + 1 ? maxValue - minValue + 1 : valueNum) : 1;

        // 生成随机数值区间数组  
        for (let i = minValue, k = 0; i <= maxValue; i++, k++) {
            allNums[k] = i;
        }

        let arr = []

        // 随机从数组里面取值
        allNums.sort(function () { return 0.5 - Math.random(); });
        for (let j = 0; j < size; j++) {
            let index = Math.floor(Math.random() * allNums.length);
            arr.push(allNums[index]);
            let tmp = allNums[index];
            allNums[index] = allNums[allNums.length - 1];
            allNums[allNums.length - 1] = tmp;
            allNums.pop();
        }

        return arr;
    }

    /**
     * 获取范围内的随机数
     * @param minValue 最小值
     * @param maxValue 最大值
     */
    static getRangeRandom(minValue: number, maxValue: number) {
        // 获取数组从第一个开始到指定个数的下标区间  
        return FYUtility.getRandomValueDif(minValue, maxValue, 1)[0];
    }

    /**
     * 获取最大值 0 和 最大值 都可以取到
     * @param maxValue 最大值
     */
    static getRandom(maxValue: number) {
        return Math.floor(Math.random() * maxValue);
    }

    /**
     * 获取类对象的类名 仅适用于cocos的component
     * @param instance 类对象
     * @returns 
     */
    static getClassInstanceName(instance): string {
        if (!instance) {
            return '';
        }

        return instance.__classname__;
    }

    /**
     * 获取类名 仅适用于cocos的component
     * @param cls 类
     * @returns 
     */
    static getClassName(cls: { new() }): string {
        return new cls().__classname__;
    }

    /**
     * 获取模块名
     * @param cls 模块类
     * @returns 
     */
    static getModuleName(cls): string {
        return cls.clsName;
    }

    /**
     * 获取预制名
     * @param Ctor 预制类
     * @returns 
     */
    static getPrefabName(Ctor): string {
        return Ctor.prefabName;
    }
}
