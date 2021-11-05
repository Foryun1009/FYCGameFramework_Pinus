
import { _decorator, Component, Node } from 'cc';
import { FYEnum } from '../Define/FYEnum';
import { FYEventModule } from '../Event/FYEventModule';
import FYLog from '../Log/FYLog';
import FYUtility from '../Utility/FYUtility';
import { FYEntry } from './FYEntry';
const { ccclass, executionOrder, menu, property } = _decorator;

/**
 * 组件基类
 */

@ccclass('FYComponent')
@executionOrder(-200)
@menu('FY/FYComponent')
export class FYComponent extends Component {

    onLoad() {
        FYEntry.registerComponent(this);
    }
}