
import { _decorator } from 'cc';
import { FYPrefabBase } from '../Base/FYPrefabBase';
import { FYEnum } from '../Define/FYEnum';
const { ccclass, menu } = _decorator;

/**
 * Entity的View基类
 */

@ccclass('FYEntityViewBase')
@menu('FY/FYEntityViewBase')
export class FYEntityViewBase extends FYPrefabBase {
    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.on(FYEnum.Event.ChangeViewValue, this.onChangeViewValue, this);
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.off(FYEnum.Event.ChangeViewValue, this.onChangeViewValue, this);
    }

    /**
     * 
     * @param msgType 消息类型
     * @param varName 变量名
     * @param cb 处理函数
     */
    onChangeViewValue(msgType: string, varName: string, cb: Function) {
        cb?.(this[varName]);
    }
}