
import { _decorator, Node } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { FYEntityModule } from './FYEntityModule';
import { FYEntityControllerBase } from './FYEntityControllerBase';
const { ccclass, menu } = _decorator;

/**
 * UI组件
 */

@ccclass('FYEntityComponent')
@menu('FY/FYEntityComponent')
export class FYEntityComponent extends FYComponent {
    private _entity: FYEntityModule;
    /** UI模块 */
    private get entity(): FYEntityModule {
        if (!this._entity) {
            this._entity = FYEntry.getModule(FYEntityModule);
        }

        return this._entity
    }

    onLoad() {
        super.onLoad();
    }

    /**
     * 打开UI
     * @param Ctor UI的类
     * @returns 
     */
    public async getEntity<T extends FYEntityControllerBase>(Ctor: new () => T, parent: Node): Promise<T> {
        return this.entity.getEntity<T>(Ctor, parent);
    }

    /**
     * 实例化Entity
     * @param Ctor Entity的类
     * @param sample 要实例化的对象
     * @param parent 父对象
     * @returns 
     */
    public instantiateEntity<T extends FYEntityControllerBase>(Ctor: new () => T, sample: Node, parent: Node): T {
        return this.entity.instantiateEntity(Ctor, sample, parent);
    }
}