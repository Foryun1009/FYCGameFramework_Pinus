/**
 * 默认设备辅助器
 */

import { FYDeviceHelperBase } from "./FYDeviceHelperBase";

export class DefaultDeviceHelper extends FYDeviceHelperBase {
    /** 震动是否打开 */
    private _isVibrateOpen: boolean = true;
    /**
     * 设置震动是否打开
     */
    public set isVibrateOpen(isOpen: boolean) {
        this._isVibrateOpen = isOpen;
    }
    /**
     * 获取震动是否打开
     */
    public get isVibrateOpen(): boolean {
        return this._isVibrateOpen;
    }
    /**
     * 短震动
     */
    public vibrateShort(): void {

    }
    /**
     * 长震动
     */
    public vibrateLong(): void {

    }
}