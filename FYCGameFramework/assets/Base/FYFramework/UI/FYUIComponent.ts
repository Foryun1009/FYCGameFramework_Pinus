
import { _decorator } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { FYUIModule } from './FYUIModule';
import { FYUIControllerBase } from './FYUIControllerBase';
const { ccclass, menu } = _decorator;

/**
 * UI组件
 */

@ccclass('FYUIComponent')
@menu('FY/FYUIComponent')
export class FYUIComponent extends FYComponent {
    private _ui: FYUIModule;
    /** UI模块 */
    private get ui(): FYUIModule {
        if (!this._ui) {
            this._ui = FYEntry.getModule(FYUIModule);
        }

        return this._ui
    }

    onLoad() {
        super.onLoad();
    }

    /**
     * 打开UI
     * @param Ctor UI的类
     * @returns 
     */
    public async open<T extends FYUIControllerBase>(Ctor: new () => T): Promise<T> {
        return this.ui.open<T>(Ctor);
    }

    /**
     * 关闭UI
     * @param Ctor UI的类
     * @returns 
     */
    public async close<T extends FYUIControllerBase>(Ctor: new () => T): Promise<void> {
        return this.ui.close<T>(Ctor);
    }

    /**
     * 关闭所有UI
     */
    public closeAll() {
        this.ui.closeAll();
    }
}