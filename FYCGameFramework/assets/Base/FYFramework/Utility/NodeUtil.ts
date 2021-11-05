import { Node, Vec3 } from 'cc';

/** 重置 位置归零，旋转归零，缩放归一 */
Node.prototype["reset"] = function () {
    this.setScale(Vec3.ONE);
    this.setPosition(Vec3.ZERO);
    this.setRotationFromEuler(Vec3.ZERO);
}

export { }