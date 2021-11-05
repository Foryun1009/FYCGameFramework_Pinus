
import { _decorator } from 'cc';
import { FYModule } from '../Base/FYModule';
import { FYAdvertHelperBase } from './FYAdvertHelperBase';
const { ccclass } = _decorator;

/**
 * 广告模块
 */

@ccclass('FYAdvertModule')
export class FYAdvertModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYAdvertModule";

    /**
     * 辅助器
     */
    private _helper: FYAdvertHelperBase = undefined;

    public setHelper(helper: FYAdvertHelperBase) {
        this._helper = helper;
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
        this._helper?.createRewardedVideoAd(adId, onLoad, onError, onClose, ...params);
    }

    /**
     * 显示激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showRewardedVideoAd(adId: string, ...params: any[]): void {
        this._helper?.showRewardedVideoAd(adId, ...params);
    }

    /**
     * 关闭激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeRewardedVideoAd(adId: string, ...params: any[]): void {
        this._helper?.closeRewardedVideoAd(adId, ...params);
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
        this._helper?.createBannerAd(adId, onLoad, onError, onResize, ...params);
    }

    /**
     * 显示Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showBannerAd(adId: string, ...params: any[]): void {
        this._helper?.showBannerAd(adId, ...params);
    }

    /**
     * 关闭Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeBannerAd(adId: string, ...params: any[]): void {
        this._helper?.closeBannerAd(adId, ...params);
    }
}