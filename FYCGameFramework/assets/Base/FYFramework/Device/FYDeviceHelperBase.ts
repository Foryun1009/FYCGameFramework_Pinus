/**
 * 设备辅助器基类
 */

export abstract class FYDeviceHelperBase {
    /**
     * 设置震动是否打开
     */
    public abstract set isVibrateOpen(isOpen: boolean);
    /**
     * 获取震动是否打开
     */
    public abstract get isVibrateOpen(): boolean;
    /**
     * 短震动
     */
    public abstract vibrateShort(): void;
    /**
     * 长震动
     */
    public abstract vibrateLong(): void;
}