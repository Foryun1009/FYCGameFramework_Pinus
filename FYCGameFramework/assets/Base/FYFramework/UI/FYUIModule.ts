/**
 * UI模块
 */

import { find, Prefab, Node, instantiate } from "cc";
import { FYModule } from "../Base/FYModule";
import FYLog from "../Log/FYLog";
import { FYLogEnum } from "../Log/FYLogEnum";
import FYUtility from "../Utility/FYUtility";
import { FYUIViewBase } from "./FYUIViewBase";
import { FYUIEnum } from "./FYUIEnum";
import { FYUIControllerBase } from "./FYUIControllerBase";
import { FYResourceModule } from "../Resource/FYResourceModule";
import { FYEntry } from "../Base/FYEntry";
import { FYUIModelBase } from "./FYUIModelBase";

export class FYUIModule extends FYModule {
    /**
     * 类名
     */
    public static clsName = "FYUIModule";

    private _resource: FYResourceModule;
    /** 资源模块 */
    public get resource(): FYResourceModule {
        if (!this._resource) {
            this._resource = FYEntry.getModule(FYResourceModule);
        }

        return this._resource
    }

    /** 已打开的UI的控制器队列   注：用array不用map的原因，主要原因是map是无序的集合 */
    private _arrayOpenedUI: Array<FYUIControllerBase> = new Array<FYUIControllerBase>();
    /** 正在打开的UI的名称队列 */
    private _arrayOpeningUITag: Array<string> = new Array<string>();

    private _container: Node;
    /** UI容器 */
    public get container(): Node {
        if (!this._container) {
            this._container = find('Canvas');
        }

        return this._container
    }

    /**
     * 打开UI
     * @param Ctor UI的类
     * @returns 
     */
    public async open<T extends FYUIControllerBase>(Ctor: new () => T): Promise<T> {
        return new Promise(async (resolve, reject) => {
            let prefabName = FYUtility.getPrefabName(Ctor);
            let clsName = prefabName.substring(5);

            FYLog.print(`Open UI ${clsName}`, FYLogEnum.Color.Green);
            // 已打开的情况下
            let target = this._arrayOpenedUI.find(item => FYUtility.getClassInstanceName(item) === clsName);
            if (target) {
                // 移除
                this._arrayOpenedUI.remove(target);
                // 放队尾
                this._arrayOpenedUI.push(target);
                // 重新排序
                this.sortOrder();
                resolve(target as T);
                return;
            }

            //正在打开的情况下
            let isOnOpen = this._arrayOpeningUITag.find(item => item == clsName)
            if (isOnOpen) {
                FYLog.warn('UI is opening, name:' + clsName);
                reject(new Error('UI is opening, name:' + clsName));
                return;
            }

            //未打开的情况
            this._arrayOpeningUITag.push(clsName);

            //从正在打开的UI List中移除
            let RemoveFromOnOpen = () => {
                let isOnOpen = this._arrayOpeningUITag.find(item => item == clsName);
                if (isOnOpen) {
                    this._arrayOpeningUITag.remove(clsName);
                } else {
                    FYLog.error('UI is not open, name: ' + clsName);
                }
            }

            let prefab = await this.resource.load<Prefab>(prefabName).catch((reason) => {
                RemoveFromOnOpen()
                FYLog.error('Open UI fail, name: ' + prefabName + ", error: " + JSON.stringify(reason));
                reject(new Error('Open UI fail, name: ' + prefabName + ", error: " + JSON.stringify(reason)));
                return;
            });

            if (prefab instanceof Prefab) {
                let node = instantiate(prefab);
                let model = node.addComponent(`${clsName}Model`);
                let view = node.addComponent(`${clsName}View`) as FYUIViewBase;
                let controller = node.addComponent(Ctor);
                controller.model = model as FYUIModelBase;
                controller.view = view;
                // 有了父对象 如果默认是激活状态 onLoad和onEnable会立刻被执行
                this.container.addChild(node);
                node.reset();
                //从onOpen UI List 中移除该已打开的UI
                RemoveFromOnOpen();
                //在已打开的UI List 中添加该UI
                this._arrayOpenedUI.push(controller);
                //调整UI层级
                this.sortOrder();

                if (view.showTweenType != FYUIEnum.Tween.None) {
                    await view.PlayShowTween();
                    resolve(controller);
                    return;
                } else {
                    resolve(controller);
                    return;
                }
            }
        });
    }

    /**
     * 关闭UI
     * @param Ctor UI的类
     * @returns 
     */
    public async close<T extends FYUIControllerBase>(Ctor: new () => T): Promise<void> {
        let prefabName = FYUtility.getPrefabName(Ctor);
        let clsName = prefabName.substring(5);
        return this.closeByName(clsName);
    }

    /**
     * 根据类对象关闭UI
     * @param clsInstance 类对象
     * @returns 
     */
    public async closeByInstance(clsInstance: FYUIControllerBase): Promise<void> {
        let prefabName = clsInstance.prefabName;
        let clsName = prefabName.substring(5);
        return this.closeByName(clsName);
    }

    /**
     * 根据类名关闭UI
     * @param clsName 类名
     * @returns 
     */
    public async closeByName(clsName: string): Promise<void> {
        FYLog.print(`Close UI ${clsName}`, FYLogEnum.Color.Green);
        return new Promise(async (resolve, reject) => {
            let controller = this._arrayOpenedUI.find(item => FYUtility.getClassInstanceName(item) === clsName);
            let view = controller.view;
            if (!view) {
                console.warn('UI is not open, name: ' + clsName);
                reject(new Error('UI is not open, name: ' + clsName));
                return;
            }

            if (view.hideTweenType != FYUIEnum.Tween.None) {
                await view.PlayHideTween();
                view.node.destroy();
                this._arrayOpenedUI.remove(controller);
                resolve();
                return
            } else {
                view.node.destroy();
                this._arrayOpenedUI.remove(controller);
                resolve();
                return;
            }
        });
    }

    /**
     * 关闭所有UI
     */
    public closeAll() {
        for (let index = 0; index < this._arrayOpenedUI.length; index++) {
            const ui = this._arrayOpenedUI[index];
            ui.node.destroy()
        }
        this._arrayOpenedUI = new Array<FYUIControllerBase>();
    }

    /**
     * 调整UI层级
     */
    private sortOrder() {
        for (let index = 0; index < this._arrayOpenedUI.length; index++) {
            let view: FYUIViewBase = this._arrayOpenedUI[index].view;
            view.node.setSiblingIndex(view.hierarchyType + index * 2);
        }
    }

}