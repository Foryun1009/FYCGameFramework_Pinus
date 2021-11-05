
import { _decorator } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { DefaultDeviceHelper } from './DefaultDeviceHelper';
import { FYDeviceHelperBase } from './FYDeviceHelperBase';
import { FYDeviceModule } from './FYDeviceModule';
const { ccclass } = _decorator;

/**
 * 设备模块
 */

@ccclass('FYDeviceComponent')
export class FYDeviceComponent extends FYComponent {

    private _device: FYDeviceModule;
    /** 设备模块 */
    public get device(): FYDeviceModule {
        if (!this._device) {
            this._device = FYEntry.getModule(FYDeviceModule);
        }

        return this._device
    }

    /**
     * 设置震动是否打开
     */
    public set isVibrateOpen(isOpen: boolean) {
        this.device.isVibrateOpen = isOpen;
    }
    /**
     * 获取震动是否打开
     */
    public get isVibrateOpen(): boolean {
        return this.device.isVibrateOpen;
    }

    onLoad() {
        super.onLoad();
        this.setHelper(new DefaultDeviceHelper());
    }

    public setHelper(helper: FYDeviceHelperBase) {
        this.device?.setHelper(helper);
    }

    /**
     * 短震动
     */
    public vibrateShort(): void {
        this.device?.vibrateShort();
    }
    /**
     * 长震动
     */
    public vibrateLong(): void {
        this.device?.vibrateLong();
    }
}