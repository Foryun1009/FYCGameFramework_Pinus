import { AudioSource } from "cc";
import { FYAudioAgentHelperBase } from "./FYAudioAgentHelperBase";

export default class DefaultAudioAgentHelper extends FYAudioAgentHelperBase {

    private _audioSource: AudioSource = undefined;

    onLoad() {
        if (super.onLoad) {
            super.onLoad();
        }

        this._audioSource = this.node.addComponent(AudioSource);
    }

    /** 获取当前是否正在播放 */
    public get isPlaying(): boolean {
        return this._audioSource.playing;
    }
    /** 获取声音长度 */
    public get length(): number {
        return this._audioSource.duration;
    }
    /** 获取播放位置 */
    public get time(): number {
        return this._audioSource.currentTime;
    }
    /** 设置播放位置 */
    public set time(v: number) {
        this._audioSource.currentTime = v;
    }

    private _mute: boolean = false
    /** 获取是否静音 */
    public get mute(): boolean {
        return this._mute;
    }
    /** 设置是否静音 */
    public set mute(v: boolean) {
        this._mute = v;
        if (!this._mute) {
            this._audioSource.volume = this.volume;
        } else {
            this._audioSource.volume = 0;
        }
    }

    /** 获取是否循环 */
    public get loop(): boolean {
        return this._audioSource.loop;
    }
    /** 设置是否循环 */
    public set loop(v: boolean) {
        this._audioSource.loop = v;
    }

    private _volume: number = undefined;
    /** 获取音量大小 */
    public get volume(): number {
        if (!this._volume) {
            this._volume = this._audioSource.volume;
        }
        return this._volume;
    }
    /** 设置音量大小 */
    public set volume(v: number) {
        this._volume = v;
        if (!this.mute) {
            this._audioSource.volume = this._volume;
        }
    }

    /** 获取编号 */
    public get id(): string {
        return this._audioSource.uuid;
    }

    /**
     * 设置音频资源
     * @param audioAsset 音频资源对象
     * @returns 是否设置成功
     */
    public setAudioAsset(audioAsset: any): boolean {
        if (!audioAsset) {
            return false;
        }

        this._audioSource.clip = audioAsset;
        return true;
    }

    /** 播放 */
    public play(): void {
        this._audioSource.play();
    }

    /** 停止 */
    public stop(): void {
        this._audioSource.stop();
    }

    /** 暂停 */
    public pause(): void {
        this._audioSource.pause();
    }

    /** 恢复 */
    public resume(): void {
        this._audioSource.play();
    }

    /** 重置数据 */
    public reset(): void {
        this._audioSource.clip = undefined;
        this._mute = false;
        this._volume = 1;
        this.loop = false;
    }
}