import { FYAudioAgentHelperBase } from "./FYAudioAgentHelperBase";

export default class FYAudioGroup {
    /** 声音组名字 */
    public name: string = undefined;
    private _mute: boolean = false;
    /** 获取声音组是否静音 */
    public get mute() {
        return this._mute;
    }
    /** 设置声音组是否静音 */
    public set mute(v: boolean) {
        this._mute = v;
        let len = this.agentHelperList.length;
        for (let i = 0; i < len; i++) {
            this.agentHelperList[i].mute = this._mute;
        }
    }
    private _volume: number = 1;
    /** 获取声音组音量 */
    public get volume(): number {
        return this._volume;
    }
    /** 设置声音组音量 */
    public set volume(v: number) {
        this._volume = v;
        let len = this.agentHelperList.length;
        for (let i = 0; i < len; i++) {
            this.agentHelperList[i].volume = this._volume;
        }
    }
    /** 声音组代理辅助器个数 */
    public agentHelperCount: number = undefined;
    /** 代理辅助器列表 */
    public agentHelperList: FYAudioAgentHelperBase[] = [];
    /** 代理辅助器列表的当前索引 */
    public curIndex: number = 0;

    constructor(name: string, mute?: boolean, volume?: number, agentHelperCount?: number) {
        this.name = name;
        this.mute = mute;
        this.volume = volume;
        this.agentHelperCount = agentHelperCount;
    }

    /**
     * 添加代理辅助器
     * @param agentHelper 代理辅助器
     */
    public addAgentHelper(agentHelper: FYAudioAgentHelperBase) {
        this.agentHelperList.push(agentHelper);
    }

    /**
     * 获取声音代理
     * @returns 
     */
    public getAudioAgent(): FYAudioAgentHelperBase {
        let audioAgent: FYAudioAgentHelperBase = undefined;
        for (let i = 0; i < this.agentHelperCount; i++) {
            audioAgent = this.agentHelperList[this.curIndex];
            if (audioAgent && !audioAgent.isPlaying) {
                return audioAgent;
            }

            if (i < this.agentHelperCount - 1) {
                this.curIndex++;
                if (this.curIndex >= this.agentHelperCount) {
                    this.curIndex = 0;
                }
            }
        }
        audioAgent.reset();
        // 如果没有空闲的声音代理，则用最旧的一个
        return audioAgent;
    }
}