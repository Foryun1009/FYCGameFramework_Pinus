/**
 * 微信分享辅助器
 */

import { FYShareHelperBase } from "../../../Base/FYFramework/Share/FYShareHelperBase";

export class WechatShareHelper extends FYShareHelperBase {

    /**
     * 分享
     * @param title 分享标题
     * @param sharePicPath 分享图片地址
     * @param shareParam 分享参数
     * @param onShare 分享回调
     */
    public shareMessage(title: string, sharePicPath: string, shareParam: string, onShare: (isSuccess: boolean) => void): void {
        wx.shareAppMessage({
            title: title,
            imageUrl: sharePicPath,
            query: shareParam
        });
        if (onShare) {
            onShare(true);
        }
    }
}