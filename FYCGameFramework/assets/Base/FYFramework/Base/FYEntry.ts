import FYLog from "../Log/FYLog";
import FYUtility from "../Utility/FYUtility";
import { FYComponent } from "./FYComponent";
import { FYModule } from "./FYModule";

/**
 * 框架入口
 * 主要用于注册和获取框架所支持的组件
 */
export class FYEntry {
    /** 组件字典 */
    private static _dictComponent: { [key: string]: FYComponent } = Object.create(null);
    /** 组件数量 */
    private static _componentNum: number = 0;
    /** 模块字典 */
    private static _dictModule: { [key: string]: FYModule } = Object.create(null);

    /**
     * 获取组件
     * @param Ctor 组件类
     * @returns 
     */
    public static getComponent<T extends FYComponent>(Ctor: new () => T): T {
        let clsName = FYUtility.getClassName(Ctor);
        // FYLog.log(`Get component ${clsName}`);

        if (!this._dictComponent[clsName]) {
            // FYLog.error(`Can not find the component ${clsName}`);
            return undefined;
        }

        return this._dictComponent[clsName] as T;
    }

    /**
     * 注册组件
     * @param component 组件对象
     * @returns 
     */
    public static registerComponent(component: FYComponent) {
        if (!component) {
            return;
        }

        let className = FYUtility.getClassInstanceName(component);
        FYLog.log(`Register component ${className}`);

        if (this._dictComponent[className]) {
            FYLog.error(`The same component is already included, component name is ${className}`)
            return;
        }

        this._dictComponent[className] = component;
        this._componentNum++;
    }

    /**
     * 获取组件数量
     * @returns 
     */
    public static getComponentNum(): number {
        return this._componentNum;
    }

    /**
     * 获取模块
     * @param Ctor 模块类
     * @returns 
     */
    public static getModule<T extends FYModule>(Ctor: { new(): T }): T {
        let clsName = FYUtility.getModuleName(Ctor);
        // FYLog.log(`Get module ${clsName}`);

        if (!this._dictModule[clsName]) {
            this._dictModule[clsName] = new Ctor();
        }

        return this._dictModule[clsName] as T;
    }
}