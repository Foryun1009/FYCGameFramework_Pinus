## 导航

- [编码规范](./README/编码规范.md)
- [编辑器工具](./README/编辑器工具.md)
- [自定义组件](./README/自定义组件.md)
- [资源命名规范](./README/资源命名规范.md)
- [pinus插件](./README/pinus插件.md)



## 简介

该框架致力于简化游戏开发流程，尽可能把重复的代码，让框架自动生成。

框架目前已经实现了两个自动生成工具（具体操作，参考[编辑器工具](./README/编辑器工具.md)）

- 资源路径自动生成。
  - 便于资源管理工具，可以通过资源名就获取资源。
- 预制代码自动生成。
  - 按照规范编辑好预制，就可以自动生成预制的代码，代码包含了预制节点的获取，消息的响应等。
  - Model层可以跟View层绑定，实现Model数据变化，View自动刷新。



## 框架介绍

框架为了便于扩展，大部分模块都是通过实现Helper的方式，来实现对应的业务。

例如Share模块，不同平台的分享，有不同的接口，框架通过：

- FYShareHelperBase.ts
- FYShareModule.ts
- FYShareComponent.ts
- DefaultShareHelper.ts

来统一Share模块的接口，其中，FYShareHelperBase.ts定义好了接口，FYShareModule.ts确定模块功能，FYShareComponent.ts确定了基于CocosCreator的Component下的组件功能，DefaultShareHelper.ts是FYShareHelperBase.ts接口的默认实现。

实际用户使用分享时是FY.share.shareMessage这样调用的，而FY.share.shareMessage实际执行的逻辑，由Helper来决定。拿微信小游戏的分享来举例，用户想拥有微信分享功能，那么就要新建一个脚本，并继承FYShareHelperBase，实现FYShareHelperBase里面的接口，如下：

```typescript
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
```

然后在游戏的启动脚本中，替换分享模块的辅助器，例如：

```typescript
FY.share.setHelper(new WechatShareHelper());
```

这样调用FY.share.shareMessage时，执行的就是微信小游戏的分享功能了。



目前框架已有模块如下：

- Adbert
  - 广告模块，用于创建激励视频广告和banner广告。
- Audio
  - 音频模块。
- Device
  - 实现设备的一些能力控制，例如振动。
- Entity
  - 除了UI之外的预制控制。
- Log
  - 日志模块。
- Pool
  - 对象池
- Resource
  - 资源模块，资源相关控制。
- Share
  - 分享模块。
- Storage
  - 存储模块。
- UI
  - UI模块。UI相关功能。
- Utility
  - 扩展工具



## 框架启动方式

在初始场景下，创建一个节点，例如FY。并将FY.ts脚本挂在该节点上。运行游戏就会自动初始化框架了。

用户创建一个入口函数，并继承FYMain，挂在初始场景的某个节点下，并对某些模块进行扩展，例如：

```typescript

import { sys, _decorator } from 'cc';
import { FY } from '../Base/FYFramework/Base/FY';
import { FYMain } from '../Base/FYFramework/Base/FYMain'
import GConst from './Define/GConst';
import { GEnum } from './Define/GEnum';
import { IOSShareHelper } from './Helper/IOS/IOSShareHelper';
import { WechatAdvertHelper } from './Helper/Wechat/WechatAdvertHelper';
import { WechatDeviceHelper } from './Helper/Wechat/WechatDeviceHelper';
import { WechatShareHelper } from './Helper/Wechat/WechatShareHelper';

const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends FYMain {

    private initComponent() {
        if (sys.platform === sys.Platform.WECHAT_GAME) {
            FY.advert.setHelper(new WechatAdvertHelper());
            FY.share.setHelper(new WechatShareHelper());
            FY.device.setHelper(new WechatDeviceHelper());

            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: GConst.SHARE_TITLE,
                    imageUrlId: '',
                    imageUrl: ''
                }
            })
            wx.showShareMenu({});
        }else if(sys.platform === sys.Platform.IOS){
            FY.share.setHelper(new IOSShareHelper())
        }

        FY.audio.addGroup(GEnum.AudioGroupType.Music, false, 1, 1);
        FY.audio.addGroup(GEnum.AudioGroupType.Sound, false, 1, 10);
    }

    onLoad() {
        this.initComponent();
    }
}
```

