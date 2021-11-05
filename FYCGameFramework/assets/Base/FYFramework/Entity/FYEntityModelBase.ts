
import { _decorator } from 'cc';
import { FYPrefabBase } from '../Base/FYPrefabBase';
import { FYEnum } from '../Define/FYEnum';
const { ccclass, menu } = _decorator;

/**
 * Entity的Model基类
 */

@ccclass('FYEntityModelBase')
@menu('FY/FYEntityModelBase')
export class FYEntityModelBase extends FYPrefabBase {
    onEnable() {
        if (super.onEnable) {
            super.onEnable();
        }

        this.on(FYEnum.Event.ChangeModelValue, this.onChangeModelValue, this);
    }

    onDisable() {
        if (super.onDisable) {
            super.onDisable();
        }

        this.off(FYEnum.Event.ChangeModelValue, this.onChangeModelValue, this);
    }

    /**
     * 
     * @param msgType 消息类型
     * @param varName 变量名
     * @param cb 处理函数
     */
    onChangeModelValue(msgType: string, varName: string, cb: Function) {
        cb?.(this[varName]);
    }
}