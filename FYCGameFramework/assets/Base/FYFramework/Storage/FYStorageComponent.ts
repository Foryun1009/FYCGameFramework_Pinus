
import { _decorator, Asset, Script } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import { DefaultStorageHelper } from './DefaultStorageHelper';
import { FYStorageHelperBase } from './FYStorageHelperBase';
import { FYStorageModule } from './FYStorageModule';
const { ccclass, menu } = _decorator;

/**
 * 存储组件
 */

@ccclass('FYStorageComponent')
@menu('FY/FYStorageComponent')
export class FYStorageComponent extends FYComponent {

    private _storage: FYStorageModule;
    /** 存储模块 */
    public get storage(): FYStorageModule {
        if (!this._storage) {
            this._storage = FYEntry.getModule(FYStorageModule);
        }

        return this._storage
    }

    onLoad() {
        super.onLoad();
        this.setHelper(new DefaultStorageHelper());
    }

    public setHelper(helper: FYStorageHelperBase) {
        this.storage.setHelper(helper);
    }

    /**
     * 数据数量
     */
    public get count(): number {
        return this.storage?.count;
    }

    /**
     * 加载
     */
    public load(): boolean {
        return this.storage?.load();
    }
    /**
     * 保存
     */
    public save(): boolean {
        return this.storage?.save();
    }
    /**
     * 设置数值
     * @param key 关键字
     * @param value 数据
     */
    public setNumber(key: string, value: number) {
        this.storage?.setNumber(key, value);
    }
    /**
     * 获取数值
     * @param key 关键字
     */
    public getNumber(key: string): number {
        return this.storage?.getNumber(key);
    }
    /**
     * 设置字符串
     * @param key 关键字
     * @param value 数据
     */
    public setString(key: string, value: string) {
        this.storage?.setString(key, value);
    }
    /**
     * 获取字符串
     * @param key 关键字
     */
    public getString(key: string): string {
        return this.storage?.getString(key);
    }
    /**
     * 获取对象
     * @param key 关键字
     */
    public setObject(key: string, value: Object) {
        this.storage?.setObject(key, value);
    }
    /**
     * 获取对象
     * @param key 关键字
     */
    public getObject(key: string): Object {
        return this.storage?.getObject(key);
    }
    /**
     * 移除
     * @param key 关键字
     */
    public remove(key: string) {
        this.storage?.remove(key);
    }
    /**
     * 清空
     */
    public clear() {
        this.storage?.clear();
    }
}