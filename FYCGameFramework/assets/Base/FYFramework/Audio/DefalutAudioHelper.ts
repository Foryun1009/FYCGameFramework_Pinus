import { AudioClip } from "cc";
import { FYEntry } from "../Base/FYEntry";
import FYLog from "../Log/FYLog";
import { FYResourceModule } from "../Resource/FYResourceModule";
import { FYAudioAgentHelperBase } from "./FYAudioAgentHelperBase";
import FYAudioGroup from "./FYAudioGroup";
import { FYAudioHelperBase } from "./FYAudioHelperBase";

export default class DefaultAudioHelper extends FYAudioHelperBase {
    private _resource: FYResourceModule;
    /** UI模块 */
    private get resource(): FYResourceModule {
        if (!this._resource) {
            this._resource = FYEntry.getModule(FYResourceModule);
        }

        return this._resource
    }
    /** 声音组列表 */
    private _audioGroupDict: { [key: string]: FYAudioGroup } = Object.create(null);

    /** 获取声音组数量 */
    public get audioGroupCount(): number {
        let len = 0;
        for (let key in this._audioGroupDict) {
            len++;
        }
        return len;
    }

    /**
     * 获取声音代理
     * @param groupName 声音组名字
     * @returns 
     */
    private getAudioAgent(groupName: string): FYAudioAgentHelperBase | undefined {
        if (!this.hasGroup(groupName)) {
            FYLog.error(`Can not find the audioGroup name = ${groupName}`);
            return undefined;
        }

        let group = this._audioGroupDict[groupName];
        let agent = group.getAudioAgent();
        agent.volume = group.volume;
        agent.mute = group.mute;

        return agent;
    }

    /**
     * 根据声音编号获取声音代理
     * @param id 声音编号
     * @returns 
     */
    private getAudioAgentById(id: string): FYAudioAgentHelperBase | undefined {
        for (let key in this._audioGroupDict) {
            let audioGroup = this._audioGroupDict[key];
            for (let i = 0; i < audioGroup.agentHelperList.length; i++) {
                let agentHelper = audioGroup.agentHelperList[i];
                if (agentHelper.id === id) {
                    return agentHelper;
                }
            }
        }

        return undefined;
    }

    /**
     * 是否有声音组
     * @param name 声音组名字
     * @returns 
     */
    public hasGroup(name: string): boolean {
        if (!this._audioGroupDict[name]) {
            return false;
        }

        return true;
    }

    /**
     * 获取声音组
     * @param name 声音组名字
     * @returns 
     */
    public getGroup(name: string): FYAudioGroup {
        return this._audioGroupDict[name];
    }

    /** 获取所有组 */
    public getAllGroups(): { [key: string]: FYAudioGroup } {
        return this._audioGroupDict;
    }

    /**
     * 添加声音组
     * @param name 声音组名字
     * @param mute 声音组是否静音
     * @param volume 声音组音量
     * @param agentHelperCount 声音组代理个数
     */
    public addGroup(name: string, mute: boolean, volume: number, agentHelperCount: number): void {
        this._audioGroupDict[name] = new FYAudioGroup(name, mute, volume, agentHelperCount);
    }

    /**
     * 添加声音代理
     * @param groupName 声音组名字
     * @param agentHelper 声音代理
     * @returns 
     */
    public addAgentHelper(groupName: string, agentHelper: FYAudioAgentHelperBase) {
        if (!this.hasGroup(groupName)) {
            FYLog.error(`Can not find the audioGroup name = ${groupName}`);
            return;
        }

        this._audioGroupDict[groupName].addAgentHelper(agentHelper);
    }

    /**
     * 播放声音
     * @param audioName 声音名字
     * @param groupName 声音组名字
     * @param loop 是否循环
     * @returns 
     */
    public async play(audioName: string, groupName: string, loop?: boolean): Promise<string> {
        if (!this.hasGroup(groupName)) {
            FYLog.error(`Can not find the audioGroup name = ${groupName}`);
            return;
        }

        let audioClip = await this.resource.load<AudioClip>(audioName).catch((reason) => {
            FYLog.error('Load audio clip fail, name: ' + audioName + ", error: " + JSON.stringify(reason));
            return;
        });

        if (audioClip instanceof AudioClip) {
            let audioAgent = this.getAudioAgent(groupName);
            if (audioAgent instanceof FYAudioAgentHelperBase) {
                audioAgent.setAudioAsset(audioClip);
                if (loop) {
                    audioAgent.loop = true;
                } else {
                    audioAgent.loop = false;
                }
                audioAgent.play();
                return audioAgent.id;
            }
        }
        return undefined;
    }

    /**
     * 停止声音
     * @param id 声音编号
     */
    public stop(id: string) {
        let audioAgent = this.getAudioAgentById(id);
        if (audioAgent instanceof FYAudioAgentHelperBase) {
            audioAgent.stop();
        }
    }

    /** 停止所有声音 */
    public stopAll() {
        for (let key in this._audioGroupDict) {
            let audioGroup = this._audioGroupDict[key];
            for (let i = 0; i < audioGroup.agentHelperList.length; i++) {
                let agentHelper = audioGroup.agentHelperList[i];
                agentHelper.stop();
            }
        }
    }

    /**
     * 暂停声音
     * @param id 声音编号
     */
    public pause(id: string) {
        let audioAgent = this.getAudioAgentById(id);
        if (audioAgent instanceof FYAudioAgentHelperBase) {
            audioAgent.pause();
        }
    }

    /**
     * 恢复声音
     * @param id 声音编号
     */
    public resume(id: string) {
        let audioAgent = this.getAudioAgentById(id);
        if (audioAgent instanceof FYAudioAgentHelperBase) {
            audioAgent.resume();
        }
    }
}