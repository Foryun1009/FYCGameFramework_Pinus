/**
 * 默认广告辅助器
 */

import { FYAdvertHelperBase } from "./FYAdvertHelperBase";

export class DefaultAdvertHelper extends FYAdvertHelperBase {
    /**
     * 创建激励视频广告
     * @param adId 广告ID
     * @param onLoad 加载完成回调
     * @param onError 错误回调
     * @param onClose 关闭回调
     * @param params 额外参数
     */
    public createRewardedVideoAd(adId: string, onLoad: () => void, onError: () => void, onClose: () => void, ...params: any[]): void {

    }

    /**
     * 显示激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showRewardedVideoAd(adId: string, ...params: any[]): void {

    }

    /**
     * 关闭激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeRewardedVideoAd(adId: string, ...params: any[]): void {

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

    }

    /**
     * 显示Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public showBannerAd(adId: string, ...params: any[]): void {

    }

    /**
     * 关闭Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public closeBannerAd(adId: string, ...params: any[]): void {

    }

}