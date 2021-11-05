
import { _decorator, Component, Node } from 'cc';
import { FYAdvertComponent } from '../Advert/FYAdvertComponent';
import { FYAudioComponent } from '../Audio/FYAudioComponent';
import { FYDeviceComponent } from '../Device/FYDeviceComponent';
import { FYEntityComponent } from '../Entity/FYEntityComponent';
import { FYEventComponent } from '../Event/FYEventComponent';
import FYLog from '../Log/FYLog';
import { FYResourceComponent } from '../Resource/FYResourceComponent';
import { FYShareComponent } from '../Share/FYShareComponent';
import { FYStorageComponent } from '../Storage/FYStorageComponent';
import { FYUIComponent } from '../UI/FYUIComponent';
import FYUtility from '../Utility/FYUtility';
import { FYComponent } from './FYComponent';
import { FYEntry } from './FYEntry';
const { ccclass, executionOrder, menu, property } = _decorator;

@ccclass('FY')
@executionOrder(-100)
@menu('FY/FY')
export class FY extends Component {
    /** 资源组件 */
    public static resource: FYResourceComponent;
    /** 事件组件 */
    public static event: FYEventComponent;
    /** UI组件 */
    public static ui: FYUIComponent;
    /** Entity组件 */
    public static entity: FYEntityComponent;
    /** 存储组件 */
    public static storage: FYStorageComponent;
    /** 广告组件 */
    public static advert: FYAdvertComponent;
    /** 分享组件 */
    public static share: FYShareComponent;
    /** 声音组件 */
    public static audio: FYAudioComponent;
    /** 设备组件 */
    public static device: FYDeviceComponent;

    onLoad() {
        this.initComponent();
    }

    public initComponent() {
        FY.resource = this.getOrAddComponent(FYResourceComponent);
        FY.event = this.getOrAddComponent(FYEventComponent);
        FY.ui = this.getOrAddComponent(FYUIComponent);
        FY.entity = this.getOrAddComponent(FYEntityComponent);
        FY.storage = this.getOrAddComponent(FYStorageComponent);
        FY.advert = this.getOrAddComponent(FYAdvertComponent);
        FY.share = this.getOrAddComponent(FYShareComponent);
        FY.audio = this.getOrAddComponent(FYAudioComponent);
        FY.device = this.getOrAddComponent(FYDeviceComponent);
    }

    public getOrAddComponent<T extends FYComponent>(Ctor: new () => T): T {
        let component = FYEntry.getComponent(Ctor);
        if (!component) {
            component = this.node.addComponent(Ctor);
        }

        if (!component) {
            let clsName = FYUtility.getClassName(Ctor);
            FYLog.error(`Can not find the component ${clsName}`);
        }

        return component;
    }
}