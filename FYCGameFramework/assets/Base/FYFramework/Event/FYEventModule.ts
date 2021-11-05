/**
 * 事件模块
 */

import { FYModule } from "../Base/FYModule";

export class FYEventModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYEventModule";

    /**
     * 事件字典
     */
    private _dictEvent: { [key: string]: Array<Observer> } = Object.create(null);

    /**
     * 事件组字典
     */
    private _dictEventGroup: { [key: string]: { [key: string]: Array<Observer> } } = Object.create(null);

    /**
     * 添加事件
     * @param event 事件名
     * @param callback 回调函数
     * @param context 上下文
     */
    public on(event: string, callback: Function, context: any) {
        if (!this._dictEvent[event]) {
            this._dictEvent[event] = [];
        }

        this._dictEvent[event].push(new Observer(callback, context));
    }

    /**
     * 添加组内事件
     * @param group 组名
     * @param event 事件名
     * @param callback 回调消息
     * @param context 上下文
     */
    public onGroup(group: string, event: string, callback: Function, context: any) {
        if (!this._dictEventGroup[group]) {
            this._dictEventGroup[group] = {};
        }

        if (!this._dictEventGroup[group][event]) {
            this._dictEventGroup[group][event] = [];
        }

        this._dictEventGroup[group][event].push(new Observer(callback, context));
    }

    /**
     * 移除事件
     * @param event 事件名
     * @param callback 回调函数
     * @param context 上下文
     * @returns 
     */
    public off(event: string, callback: Function, context: any) {
        let obs = this._dictEvent[event];
        if (!obs) {
            return;
        }

        let length = obs.length;
        for (let i = 0; i < length; i++) {
            let ob = obs[i];
            if (ob.compare(callback, context)) {
                obs.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 移除组内事件
     * @param group 组名
     * @param event 事件名
     * @param callback 回调
     * @param context 上下文
     * @returns 
     */
    public offGroup(group: string, event: string, callback: Function, context: any) {
        let dictEvent = this._dictEventGroup[group];
        if (!dictEvent) {
            return;
        }

        let obs = dictEvent[event];
        if (!obs) {
            return;
        }

        let length = obs.length;
        for (let i = 0; i < length; i++) {
            let ob = obs[i];
            if (ob.compare(callback, context)) {
                obs.splice(i, 1);
                break;
            }
        }
    }

    /**
     * 移除组内所有事件
     * @param group 组名
     * @returns 
     */
    public offGroupAll(group: string) {
        let dictEvent = this._dictEventGroup[group];
        if (!dictEvent) {
            return;
        }

        this._dictEventGroup[group] = {};
    }

    /**
     * 发送事件
     * @param event 事件名
     * @param args 参数
     * @returns 
     */
    public emit(event: string, ...args: any[]) {
        let obs = this._dictEvent[event];
        if (!obs) {
            return;
        }

        let len = obs.length;
        for (let i = 0; i < len; i++) {
            let ob = obs[i];
            if (!ob) {
                continue;
            }
            ob.notify(event, ...args);
        }
    }

    /**
     * 发送组内事件
     * @param group 组名
     * @param event 事件名
     * @param args 参数
     * @returns 
     */
    public emitGroup(group: string, event: string, ...args: any[]) {
        let dictEvent = this._dictEventGroup[group];
        if (!dictEvent) {
            return;
        }

        let obs = dictEvent[event];
        if (!obs) {
            return;
        }

        let len = obs.length;
        for (let i = 0; i < len; i++) {
            let ob = obs[i];
            if (!ob) {
                continue;
            }
            ob.notify(event, ...args);
        }
    }
}

/**  
 * 观察者  
 */
class Observer {
    /** 回调函数 */
    private callback: Function = null;
    /** 上下文 */
    private context: any = null;

    constructor(callback: Function, context: any) {
        this.callback = callback;
        this.context = context;
    }

    /**  
     * 发送通知  
     * @param args 不定参数  
     */
    notify(...args: any[]): void {
        this.callback.call(this.context, ...args);
    }

    /**  
     * 比较
     * @param callback 回调函数 
     * @param context 上下文  
     */
    compare(callback: Function, context: any): boolean {
        return callback === this.callback && context === this.context;
    }
}