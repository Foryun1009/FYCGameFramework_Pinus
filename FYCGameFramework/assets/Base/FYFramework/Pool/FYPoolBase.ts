/** 对象池对象接口 */
export interface FYPoolBase {
    /** 重置数据 */
    reset(): void;
    /** 清空 销毁 */
    clear(): void;
    /** 是否有效 */
    check(): boolean;
}