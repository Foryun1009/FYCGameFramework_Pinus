declare module "cc" {
    interface Node {
        /**
         * 重置 位置归零，旋转归零，缩放归一
         */
        reset: () => void;
    }
}