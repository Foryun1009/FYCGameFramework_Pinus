/**
 * UI模块
 */

import { find, Prefab, Node, instantiate } from "cc";
import { FYEntry } from "../Base/FYEntry";
import { FYModule } from "../Base/FYModule";
import FYLog from "../Log/FYLog";
import { FYLogEnum } from "../Log/FYLogEnum";
import { FYResourceModule } from "../Resource/FYResourceModule";
import FYUtility from "../Utility/FYUtility";
import { FYEntityControllerBase } from "./FYEntityControllerBase";
import { FYEntityViewBase } from "./FYEntityViewBase";

export class FYEntityModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYEntityModule";

    private _resource: FYResourceModule;
    /** 资源模块 */
    public get resource(): FYResourceModule {
        if (!this._resource) {
            this._resource = FYEntry.getModule(FYResourceModule);
        }

        return this._resource
    }

    /**
     * 获取Entity
     * @param Ctor Entity的类
     * @returns 
     */
    public async getEntity<T extends FYEntityControllerBase>(Ctor: new () => T, parent: Node): Promise<T> {
        return new Promise(async (resolve, reject) => {
            let prefabName = FYUtility.getPrefabName(Ctor);
            let clsName = prefabName.substring(9);
            FYLog.print(`Get entity ${clsName}`, FYLogEnum.Color.Green);

            let prefab = await this.resource.load<Prefab>(prefabName).catch((reason) => {
                FYLog.error('Get entity fail, name: ' + prefabName + ", error: " + JSON.stringify(reason));
                reject(new Error('Get entity fail, name: ' + prefabName + ", error: " + JSON.stringify(reason)));
            });

            if (prefab instanceof Prefab) {
                let node = instantiate(prefab);
                let model = node.addComponent(`${clsName}Model`);
                let view = node.addComponent(`${clsName}View`);
                let controller = node.addComponent(Ctor);
                controller.model = model;
                controller.view = view;
                // 有了父对象 如果默认是激活状态 onLoad和onEnable会立刻被执行
                parent?.addChild(node);
                node.reset();

                resolve(controller);
            }
        });
    }

    /**
     * 实例化Entity
     * @param Ctor Entity的类
     * @param sample 要实例化的对象
     * @param parent 父对象
     * @returns 
     */
    public instantiateEntity<T extends FYEntityControllerBase>(Ctor: new () => T, sample: Node, parent: Node): T {
        let prefabName = FYUtility.getPrefabName(Ctor);
        let clsName = prefabName.substring(9);
        let node = instantiate(sample);
        let model = node.getComponent(`${clsName}Model`);
        if (!model) {
            model = node.addComponent(`${clsName}Model`);
        }
        let view = node.getComponent(`${clsName}View`);
        if (!view) {
            view = node.addComponent(`${clsName}View`);
        }
        let controller = node.getComponent(Ctor);
        if (!controller) {
            controller = node.addComponent(Ctor);
        }
        controller.model = model;
        controller.view = view;
        // 有了父对象 如果默认是激活状态 onLoad和onEnable会立刻被执行
        parent?.addChild(node);
        node.reset();
        return controller;
    }
}