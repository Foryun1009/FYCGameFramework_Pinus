
import { _decorator } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { DefaultAdvertHelper } from './DefaultAdvertHelper';
import { FYAdvertHelperBase } from './FYAdvertHelperBase';
import { FYAdvertModule } from './FYAdvertModule';
const { ccclass, menu } = _decorator;

/**
 * 广告组件
 */

@ccclass('FYAdvertComponent')
@menu('FY/FYAdvertComponent')
export class FYAdvertComponent extends FYComponent {

    private _advert: FYAdvertModule;
    /** 广告模块 */
    public get advert(): FYAdvertModule {
        if (!this._advert) {
            this._advert = FYEntry.getModule(FYAdvertModule);
        }

        return this._advert
    }

    onLoad() {
        super.onLoad();
        this.setHelper(new DefaultAdvertHelper());
    }

    public setHelper(helper: FYAdvertHelperBase) {
        this.advert.setHelper(helper);
    }

    /**
     * 创建激励视频广告
     * @param adId 广告ID
     * @param onLoad 加载完成回调
     * @param onError 错误回调
     * @param onClose 关闭回调
     * @param params 额外参数
     */
    public createRewardedVideoAd(adId: string, onLoad: () => void, onError: () => void, onClose: () => void, ...params: any[]): void {
        this.advert?.createRewardedVideoAd(adId, onLoad, onError, onClose, ...params);
    }

    /**
     * 显示激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showRewardedVideoAd(adId: string, ...params: any[]): void {
        this.advert?.showRewardedVideoAd(adId, ...params);
    }

    /**
     * 关闭激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeRewardedVideoAd(adId: string, ...params: any[]): void {
        this.advert?.closeRewardedVideoAd(adId, ...params);
    }

    /**
     * 创建Banner广告
     * @param adId 广告ID
     * @param onLoad 加载完毕回调
     * @param onError 错误回调
     * @param onResize 尺寸变化回调
     * @param params 额外参数
     */
    public createBannerAd(adId: string, onLoad: () => void, onError: () => void, onResize: () => void, ...params: any[]): void {
        this.advert?.createBannerAd(adId, onLoad, onError, onResize, ...params);
    }

    /**
     * 显示Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showBannerAd(adId: string, ...params: any[]): void {
        this.advert?.showBannerAd(adId, ...params);
    }

    /**
     * 关闭Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeBannerAd(adId: string, ...params: any[]): void {
        this.advert?.closeBannerAd(adId, ...params);
    }
}