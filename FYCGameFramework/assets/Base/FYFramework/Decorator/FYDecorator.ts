/** 
 * 装饰器 
 * 打印类函数执行的顺序
 * 例如：
 * @logClassFunc()
 * export class Main {
 * 
 * }
 */
export function logClassFunc() {
    return function (target: any) {
        const className = target.prototype.constructor?.name || 'No Name';
        const propNames = Object.getOwnPropertyNames(target.prototype);
        for (let i = 0; i < propNames.length; ++i) {
            const prop = propNames[i];
            if (prop !== 'constructor') {
                const desc = Object.getOwnPropertyDescriptor(target.prototype, prop);
                const func = desc && desc.value;
                if (typeof func === 'function') {
                    let oldFunc = (func as Function);
                    target.prototype[prop] = function () {
                        console.log(`[${className}] [${prop}] Begin`, ...arguments);
                        const ret = oldFunc.call(this, ...arguments);
                        console.log(`[${className}] [${prop}] End`);
                        return ret;
                    }
                }
            }
        }
    }
}