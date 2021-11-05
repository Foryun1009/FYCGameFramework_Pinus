
import { _decorator, Sprite, Color } from 'cc';
const { ccclass, menu, property } = _decorator;

/**
 * 渐变色Sprite
 */

@ccclass('SpriteGradient')
@menu('2D/SpriteGradient')
export class SpriteGradient extends Sprite {
    /** 渐变色 */
    @property _gradientColors: Color[] = [Color.RED, Color.BLUE, Color.RED, Color.BLUE];
    @property({ type: [Color], tooltip: '4 种颜色（左下、右下、左上、右上）' })
    public get gradientColors() { return this._gradientColors; }
    public set gradientColors(v: Color[]) {
        // 固定四种颜色
        if (v.length !== 4) {
            return;
        }
        this._gradientColors = v;
        this._colorDirty = true;
    }

    onLoad() {
        if (super.onLoad) {
            super.onLoad();
        }

        if (this.type === 0) {
            // 如果是Simple
            this._updateColor = () => {
                const vData = this.renderData!.vData;

                let colorOffset = 5;
                const colorA = this.node._uiProps.opacity;
                for (let i = 0; i < 4; i++) {
                    let colorR = (this.gradientColors[i].r) / 255;
                    let colorG = (this.gradientColors[i].g) / 255;
                    let colorB = (this.gradientColors[i].b) / 255;

                    vData![colorOffset] = colorR;
                    vData![colorOffset + 1] = colorG;
                    vData![colorOffset + 2] = colorB;
                    vData![colorOffset + 3] = colorA;
                    colorOffset += 9;
                }
            }
        }
    }
}