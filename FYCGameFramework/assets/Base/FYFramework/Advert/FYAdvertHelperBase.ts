/**
 *广告辅助器基类
 */

export abstract class FYAdvertHelperBase {
    /**
     * 创建激励视频广告
     * @param adId 广告ID
     * @param onLoad 加载完成回调
     * @param onError 错误回调
     * @param onClose 关闭回调
     * @param params 额外参数
     */
    public abstract createRewardedVideoAd(adId: string, onLoad: () => void, onError: () => void, onClose: () => void, ...params: any[]): void;

    /**
     * 显示激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public abstract showRewardedVideoAd(adId: string, ...params: any[]): void;

    /**
     * 关闭激励视频广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public abstract closeRewardedVideoAd(adId: string, ...params: any[]): void;

    /**
     * 创建Banner广告
     * @param adId 广告ID
     * @param onLoad 加载完毕回调
     * @param onError 错误回调
     * @param onResize 尺寸变化回调
     * @param params 额外参数
     */
    public abstract createBannerAd(adId: string, onLoad: () => void, onError: () => void, onResize: () => void, ...params: any[]): void;

    /**
     * 显示Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public abstract showBannerAd(adId: string, ...params: any[]): void;

    /**
     * 关闭Banner广告
     * @param adId 广告ID
     * @param params 额外参数
     */
    public abstract closeBannerAd(adId: string, ...params: any[]): void;

}