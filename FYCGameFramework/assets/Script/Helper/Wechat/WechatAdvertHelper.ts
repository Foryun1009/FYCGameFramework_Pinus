/**
 * 微信广告辅助器
 */

import { FYAdvertHelperBase } from "../../../Base/FYFramework/Advert/FYAdvertHelperBase";

type WXRewardedVideoAdInfo = { rewardedVideoAd: WechatMinigame.RewardedVideoAd, onLoad: () => void, onError: () => void, onClose: () => void }
type WXBannerAdInfo = { bannerAd: WechatMinigame.BannerAd, onLoad: () => void, onError: () => void, onResize: () => void }

export class WechatAdvertHelper extends FYAdvertHelperBase {
    /** 激烈视频广告字典 */
    private _rewardedVideoAdDict: { [key: string]: WXRewardedVideoAdInfo } = Object.create(null);
    /** banner广告字典 */
    private _bannerAdDict: { [key: string]: WXBannerAdInfo } = Object.create(null);

    /**
     * 创建激励视频广告
     * @param adId 广告ID
     * @param onLoad 加载完成回调
     * @param onError 错误回调
     * @param onClose 关闭回调
     * @param params 额外参数
     */
    public createRewardedVideoAd(adId: string, onLoad: () => void, onError: () => void, onClose: () => void, ...params: any[]): void {
        let ad = wx.createRewardedVideoAd({ adUnitId: adId });
        if (ad) {
            ad.onLoad(onLoad);
            ad.onError(onError);
            ad.onClose(onClose);
            ad.load();
            this._rewardedVideoAdDict[adId] = { rewardedVideoAd: ad, onLoad: onLoad, onError: onError, onClose: onClose };
        }
    }

    /**
     * 显示激烈视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showRewardedVideoAd(adId: string, ...params: any[]): void {
        if (this._rewardedVideoAdDict[adId] && this._rewardedVideoAdDict[adId].rewardedVideoAd) {
            this._rewardedVideoAdDict[adId].rewardedVideoAd.show();
        }
    }

    /**
     * 关闭激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeRewardedVideoAd(adId: string, ...params: any[]): void {
        if (this._rewardedVideoAdDict[adId] && this._rewardedVideoAdDict[adId].rewardedVideoAd) {
            this._rewardedVideoAdDict[adId].rewardedVideoAd.destroy();
        }

        this._rewardedVideoAdDict[adId] = null;
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
        let screenHeight = wx.getSystemInfoSync().screenHeight;
        let screenWidth = wx.getSystemInfoSync().screenWidth;

        let ad = wx.createBannerAd({
            adUnitId: adId,
            style: {
                left: 0,
                top: 0,
                width: screenWidth,
                height: screenHeight
            },
            adIntervals: 30
        });

        if (ad) {
            let w = screenWidth / 2;
            let h = screenHeight;
            let resizeCb = () => {
                ad.style.left = w - ad.style.realWidth / 2 + 0.1;
                ad.style.top = h - ad.style.realHeight + 0.1;
                if (onResize) {
                    onResize();
                }
            }

            ad.onLoad(onLoad);
            ad.onError(onError);
            ad.onResize(resizeCb);
            this._bannerAdDict[adId] = { bannerAd: ad, onLoad: onLoad, onError: onError, onResize: resizeCb };
        }
    }

    /**
     * 显示Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showBannerAd(adId: string, ...params: any[]): void {
        if (this._bannerAdDict[adId] && this._bannerAdDict[adId].bannerAd) {
            this._bannerAdDict[adId].bannerAd.show();
        }
    }

    /**
     * 关闭Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeBannerAd(adId: string, ...params: any[]): void {
        if (this._bannerAdDict[adId] && this._bannerAdDict[adId].bannerAd) {
            this._bannerAdDict[adId].bannerAd.destroy();
        }

        this._bannerAdDict[adId] = null;
    }

}