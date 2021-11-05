
import { _decorator } from 'cc';
import { FYPrefabBase } from '../Base/FYPrefabBase';
const { ccclass, menu } = _decorator;

/**
 * Entity的Controller基类
 */

@ccclass('FYEntityControllerBase')
@menu('FY/FYEntityControllerBase')
export class FYEntityControllerBase extends FYPrefabBase {
    /** 数据模型 */
    public model;
    /** 视图 */
    public view;

    onDisable() {
        // 移除预制内所有消息
        this.offAll();
    }
}