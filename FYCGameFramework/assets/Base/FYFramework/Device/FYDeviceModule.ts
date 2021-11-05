
import { _decorator } from 'cc';
import { FYModule } from '../Base/FYModule';
import { FYDeviceHelperBase } from './FYDeviceHelperBase';
const { ccclass } = _decorator;

/**
 * 设备模块
 */

@ccclass('FYDeviceModule')
export class FYDeviceModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYDeviceModule";

    /**
     * 辅助器
     */
    private _helper: FYDeviceHelperBase = undefined;

    public setHelper(helper: FYDeviceHelperBase) {
        this._helper = helper;
    }

    /**
     * 设置震动是否打开
     */
    public set isVibrateOpen(isOpen: boolean) {
        this._helper.isVibrateOpen = isOpen;
    }
    /**
     * 获取震动是否打开
     */
    public get isVibrateOpen(): boolean {
        return this._helper.isVibrateOpen;
    }
    /**
     * 短震动
     */
    public vibrateShort(): void {
        if (this._helper.isVibrateOpen) {
            this._helper?.vibrateShort();
        }
    }
    /**
     * 长震动
     */
    public vibrateLong(): void {
        if (this._helper.isVibrateOpen) {
            this._helper?.vibrateLong();
        }
    }
}