
import { _decorator } from 'cc';
import { FYModule } from '../Base/FYModule';
import { FYShareHelperBase } from './FYShareHelperBase';
const { ccclass } = _decorator;

/**
 * 分享模块
 */

@ccclass('FYShareModule')
export class FYShareModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYShareModule";

    /**
     * 辅助器
     */
    private _helper: FYShareHelperBase = undefined;

    public setHelper(helper: FYShareHelperBase) {
        this._helper = helper;
    }

    /**
     * 分享
     * @param title 分享标题
     * @param sharePicPath 分享图片地址
     * @param shareParam 分享参数
     * @param onShare 分享回调
     */
     public shareMessage(title: string, sharePicPath: string, shareParam: string, onShare: (isSuccess: boolean) => void): void {
        this._helper?.shareMessage(title, sharePicPath, shareParam, onShare);
    }
}