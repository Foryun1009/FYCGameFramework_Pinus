
import { _decorator } from 'cc';
import { FYEntry } from '../Base/FYEntry';
import { FYPrefabBase } from '../Base/FYPrefabBase';
import { FYUIModelBase } from './FYUIModelBase';
import { FYUIModule } from './FYUIModule';
import { FYUIViewBase } from './FYUIViewBase';
const { ccclass, menu } = _decorator;

/**
 * UI的Controller基类
 */

@ccclass('FYUIControllerBase')
@menu('FY/FYUIControllerBase')
export class FYUIControllerBase extends FYPrefabBase {
    /** 数据模型 */
    public model: FYUIModelBase;
    /** 视图 */
    public view: FYUIViewBase;

    private _ui: FYUIModule;
    /** UI模块 */
    private get ui(): FYUIModule {
        if (!this._ui) {
            this._ui = FYEntry.getModule(FYUIModule);
        }

        return this._ui
    }

    public close() {
        this.ui.closeByInstance(this);
    }

    onDisable() {
        // 移除预制内所有事件
        this.offAll();
    }
}