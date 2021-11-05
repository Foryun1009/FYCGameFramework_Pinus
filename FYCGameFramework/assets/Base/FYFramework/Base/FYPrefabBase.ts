
import { _decorator, Component, Node } from 'cc';
import { FYEventModule } from '../Event/FYEventModule';
import { FYEntry } from './FYEntry';
const { ccclass, menu, property } = _decorator;

/**
 * 组件基类
 */

@ccclass('FYPrefabBase')
@menu('FY/FYPrefabBase')
export class FYPrefabBase extends Component {
    /** 预制名 给类调用 */
    public static prefabName = '';
    /** 预制名 给实例调用 */
    public prefabName = '';

    private _event: FYEventModule;
    /** 消息模块 */
    private get event(): FYEventModule {
        if (!this._event) {
            this._event = FYEntry.getModule(FYEventModule);
        }

        return this._event
    }

    /**
     * 发送预制内的事件 在预制的Model,View,Controller内进行通讯
     * @param event 事件名
     * @param args 
     */
    public emit(event: string, ...args) {
        this.event.emitGroup(`${this.prefabName}_${this.node.uuid}`, event, ...args);
    }

    /**
     * 监听预制内的事件
     * @param event 事件名
     * @param callback 回调
     * @param context 上下文
     */
    public on(event: string, callback: Function, context: any) {
        this.event.onGroup(`${this.prefabName}_${this.node.uuid}`, event, callback, context);
    }

    /**
     * 移除预制内的事件
     * @param event 事件名
     * @param callback 回调
     * @param context 上下文
     */
    public off(event: string, callback: Function, context: any) {
        this.event.offGroup(`${this.prefabName}_${this.node.uuid}`, event, callback, context);
    }

    /**
     * 移除预制内的所有事件
     */
    public offAll() {
        this.event.offGroupAll(`${this.prefabName}_${this.node.uuid}`);
    }
}