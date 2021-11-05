
import { _decorator, Asset, Script } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { DefaultShareHelper } from './DefaultShareHelper';
import { FYShareHelperBase } from './FYShareHelperBase';
import { FYShareModule } from './FYShareModule';
const { ccclass, menu } = _decorator;

/**
 * 广告组件
 */

@ccclass('FYShareComponent')
@menu('FY/FYShareComponent')
export class FYShareComponent extends FYComponent {

    private _share: FYShareModule;
    /** 分享模块 */
    public get share(): FYShareModule {
        if (!this._share) {
            this._share = FYEntry.getModule(FYShareModule);
        }

        return this._share
    }

    onLoad() {
        super.onLoad();
        this.setHelper(new DefaultShareHelper());
    }

    public setHelper(helper: FYShareHelperBase) {
        this.share.setHelper(helper);
    }

    /**
     * 分享
     * @param title 分享标题
     * @param sharePicPath 分享图片地址
     * @param shareParam 分享参数
     * @param onShare 分享回调
     */
     public shareMessage(title: string, sharePicPath: string, shareParam: string, onShare: (isSuccess: boolean) => void): void {
        this.share?.shareMessage(title, sharePicPath, shareParam, onShare);
    }
}