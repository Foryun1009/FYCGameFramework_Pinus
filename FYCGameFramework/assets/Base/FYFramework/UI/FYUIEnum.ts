export module FYUIEnum {
    /**
     * UI层次
     */
    export enum Hierarchy {
        // 系统默认最大不能超过35675

        /** 基础层 eg:建筑名称，角色头顶上的血条 */
        Base = 0,
        /** 普通窗口 */
        Normal = 10000,
        /** 固定 */
        Fix = 20000,
        /** 跑马灯 */
        Marquee = 20100,
        /** 提示 */
        Tip = 20200,
        /** 场景切换 */
        Loading = 20300,
        /** 等待界面 */
        Waiting = 20400,
        /** 网络消息弹框层*/
        NetDlg = 20500,
        /** toast */
        Toast = 20600,
    }


    /**
     * 界面动画类型
     */
    export enum Tween {
        /** 没动画 */
        None,
        /** 缩放动画 */
        Scale,
    }
}