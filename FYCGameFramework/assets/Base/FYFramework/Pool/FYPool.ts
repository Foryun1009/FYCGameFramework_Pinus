import { FYPoolBase } from "./FYPoolBase";

/** 对象池 */
export class FYPool<T extends FYPoolBase> {
    private _ctor: Function = undefined;
    /** 池子列表 */
    private _list: Array<T> = new Array<T>();
    /** 正在使用的对象列表，从池子里面取出未归还的 */
    private _listUsing: Array<T> = new Array<T>();

    constructor(ctor: () => T) {
        this._ctor = ctor;
    }

    /**
     * 获取一个对象
     * @returns 
     */
    public get(): T {
        let obj: T;

        if (this._list.length > 0) {
            obj = this._list.pop();
        } else {
            obj = this._ctor();
        }

        this._listUsing.push(obj);
        return obj;
    }

    /**
     * 回收一个对象
     * @param obj 对象
     */
    public put(obj: T) {
        if (obj != null && obj.check()) {
            obj.reset();
            this._list.push(obj);
        }

        if (this._listUsing.contain(obj)) {
            this._listUsing.remove(obj);
        }
    }

    /** 回收所有从对象池取出的对象 */
    public putAll() {
        let len = this._listUsing.length;
        for (let i = len - 1; i >= 0; i--) {
            let obj = this._listUsing.pop();
            if (obj != null && obj.check()) {
                obj.reset();
                this._list.push(obj);
            }
        }
    }

    /** 清空对象池 */
    public clear() {
        let len = this._list.length;
        for (let i = len - 1; i >= 0; i--) {
            this._list.pop()?.clear();
        }

        let lenUsing = this._listUsing.length;
        for (let i = lenUsing - 1; i >= 0; i--) {
            this._listUsing.pop()?.clear();
        }
    }
}