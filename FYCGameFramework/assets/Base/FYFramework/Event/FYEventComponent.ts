
import { _decorator, Component, Node } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { FYEventModule } from './FYEventModule';
const { ccclass, menu } = _decorator;

/**
 * 事件组件
 */

@ccclass('FYEventComponent')
@menu('FY/FYEventComponent')
export class FYEventComponent extends FYComponent {
    /**
     * 消息队列
     */
    private _eventQueue: Array<EventInfo> = [];
    /** 事件模块 */
    private _event: FYEventModule;
    /** 事件模块 */
    private get event(): FYEventModule {
        if (!this._event) {
            this._event = FYEntry.getModule(FYEventModule);
        }

        return this._event
    }

    onLoad() {
        super.onLoad();
    }

    update() {
        if (this._eventQueue.length <= 0) {
            return;
        }

        let len = this._eventQueue.length;
        for (let i = 0; i < len; i++) {
            let eventInfo = this._eventQueue[i];
            this.event.emit(eventInfo.event, ...eventInfo.args);
        }
        this._eventQueue = [];
    }

    /**
     * 添加事件
     * @param event 事件名
     * @param callback 回调函数
     * @param context 上下文
     */
    public on(event: string, callback: Function, context: any) {
        this.event.on(event, callback, context);
    }

    /**
     * 移除事件
     * @param event 事件名
     * @param callback 回调函数
     * @param context 上下文
     * @returns 
     */
    public off(event: string, callback: Function, context: any) {
        this.event.off(event, callback, context);
    }

    /**
     * 抛出事件，这个操作是线程安全的，即使不在主线程中抛出，也可保证在主线程中回调事件处理函数，但事件会在抛出后的下一帧分发。
     * @param event 事件名
     * @param args 参数
     * @returns 
     */
    public emitThreadSafety(event: string, ...args: any[]) {
        this._eventQueue.push(new EventInfo(event, ...args));
    }

    /**
     * 抛出事件立即模式，这个操作不是线程安全的，事件会立刻分发。
     * @param event 事件名
     * @param args 参数
     * @returns 
     */
    public emit(event: string, ...args: any[]) {
        this.event.emit(event, ...args);
    }
}

/**
 * 事件信息
 */
class EventInfo {
    /** 事件名 */
    public event: string;
    /** 参数 */
    public args: any[];

    constructor(event: string, ...args: any[]) {
        this.event = event;
        this.args = args;
    }
}