
import { _decorator, Node, find, Vec3, tween, Tween } from 'cc';
import { FYEntry } from '../Base/FYEntry';
import { FYPrefabBase } from '../Base/FYPrefabBase';
import { FYEnum } from '../Define/FYEnum';
import { FYUIEnum } from './FYUIEnum';
import { FYUIModule } from './FYUIModule';
const { ccclass, menu } = _decorator;

/**
 * UI的View基类
 */

@ccclass('FYUIViewBase')
@menu('FY/FYUIViewBase')
export class FYUIViewBase extends FYPrefabBase {
    /** 设置Widget节点 */
    private _widget: Node;
    public get widget(): Node {
        if (!this._widget) {
            this._widget = find("Widget", this.node);
        }
        return this._widget;
    }
    private _ui: FYUIModule;
    /** UI模块 */
    private get ui(): FYUIModule {
        if (!this._ui) {
            this._ui = FYEntry.getModule(FYUIModule);
        }

        return this._ui
    }

    /** UI层次 */
    public hierarchyType: FYUIEnum.Hierarchy = FYUIEnum.Hierarchy.Normal;
    /** 显示动画 */
    public showTweenType: FYUIEnum.Tween = FYUIEnum.Tween.None;
    /** 隐藏动画 */
    public hideTweenType: FYUIEnum.Tween = FYUIEnum.Tween.None;

    /**
     * 设置激活状态
     * @param isActive 是否激活
     * @returns 
     */
    public setActive(isActive: boolean): void {
        if (!this.widget) {
            return;
        }

        this.widget.active = isActive;
    }

    /** 播放显示缓动动画 */
    public async PlayShowTween(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.widget.scale = Vec3.ZERO;
            Tween.stopAllByTarget(this.widget);
            tween(this.widget).to(0.3, { scale: Vec3.ONE }, { easing: "backOut" }).call(() => { resolve(); }).start();
        })

    }

    /** 播放隐藏缓动动画 */
    public async PlayHideTween(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.widget.scale = Vec3.ZERO;
            Tween.stopAllByTarget(this.widget);
            tween(this.widget).to(0.3, { scale: Vec3.ZERO }, { easing: "backIn" }).call(() => { resolve(); }).start();
        })
    }

    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.on(FYEnum.Event.ChangeViewValue, this.onChangeViewValue, this);
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.off(FYEnum.Event.ChangeViewValue, this.onChangeViewValue, this);
    }

    /**
     * 
     * @param msgType 消息类型
     * @param varName 变量名
     * @param cb 处理函数
     */
    onChangeViewValue(msgType: string, varName: string, cb: Function) {
        cb?.(this[varName]);
    }
}