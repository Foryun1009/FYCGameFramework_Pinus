
import { _decorator, Component, game, ResolutionPolicy, view } from 'cc';
const { ccclass, menu } = _decorator;

/**
 * 自适应
 * 始终保持显示所有内容，当显示内容超过屏幕，则整体缩小
 */

@ccclass('SelfAdaption')
@menu('UI/SelfAdaption')
export class SelfAdaption extends Component {
    /** 当前自适应策略 */
    private _curResolutionPolicy;

    onLoad() {
        this.screenResize();

        view.on('canvas-resize', this.screenResize, this);
    }

    screenResize() {
        let size = view.getDesignResolutionSize();
        let canvas = game.canvas;
        let designResolutionRatio = size.width / size.height;
        let ratio = canvas.width / canvas.height;

        let resolutionPolicy;
        if (designResolutionRatio < ratio) {
            resolutionPolicy = ResolutionPolicy.FIXED_HEIGHT;
        } else {
            resolutionPolicy = ResolutionPolicy.FIXED_WIDTH;
        }

        if (this._curResolutionPolicy !== resolutionPolicy) {
            this._curResolutionPolicy = resolutionPolicy;
            view.setDesignResolutionSize(size.width, size.height, this._curResolutionPolicy);
        }

        // console.log(`designResolutionWidth = ${size.width}, designResolutionHeight = ${size.height}`);
        // console.log(`width = ${game.canvas.width}, height = ${game.canvas.height}`);
    }
}