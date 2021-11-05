/**
 * 微信设备辅助器
 */

import { FYDeviceHelperBase } from "../../../Base/FYFramework/Device/FYDeviceHelperBase";

export class WechatDeviceHelper extends FYDeviceHelperBase {
    /** 震动是否打开 */
    private _isVibrateOpen: boolean = true;
    /**
     * 设置震动是否打开
     */
    public set isVibrateOpen(isOpen: boolean) {
        if (isOpen === this._isVibrateOpen) {
            return;
        }
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
        wx.vibrateShort({ style: 'medium' });
    }
    /**
     * 长震动
     */
    public vibrateLong(): void {
        wx.vibrateLong();
    }
}