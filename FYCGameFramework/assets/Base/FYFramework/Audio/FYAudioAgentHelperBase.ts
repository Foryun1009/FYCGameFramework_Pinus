import { Component } from "cc";

export abstract class FYAudioAgentHelperBase extends Component {
    /** 获取当前是否正在播放 */
    public abstract get isPlaying(): boolean;
    /** 获取声音长度 */
    public abstract get length(): number;
    /** 获取播放位置 */
    public abstract get time(): number;
    /** 设置播放位置 */
    public abstract set time(v: number);
    /** 设置是否静音 */
    public abstract get mute(): boolean;
    /** 设置是否静音 */
    public abstract set mute(v: boolean);
    /** 获取是否循环 */
    public abstract get loop(): boolean;
    /** 设置是否循环 */
    public abstract set loop(v: boolean);
    /** 获取音量大小 */
    public abstract get volume(): number;
    /** 设置音量大小 */
    public abstract set volume(v: number);
    /** 获取编号 */
    public abstract get id(): string;
    /**
     * 设置音频资源
     * @param audioAsset 音频资源对象
     * @returns 是否设置成功
     */
    public abstract setAudioAsset(audioAsset: any): boolean;
    /** 播放 */
    public abstract play(): void;
    /** 停止 */
    public abstract stop(): void;
    /** 暂停 */
    public abstract pause(): void;
    /** 恢复 */
    public abstract resume(): void;
    /** 重置数据 */
    public abstract reset(): void;
}