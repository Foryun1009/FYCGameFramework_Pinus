import { FYModule } from "../Base/FYModule";
import { FYAudioAgentHelperBase } from "./FYAudioAgentHelperBase";
import FYAudioGroup from "./FYAudioGroup";
import { FYAudioHelperBase } from "./FYAudioHelperBase";

/** 声音模块 */
export default class FYAudioModule extends FYModule {
    /**
     * 类名
     */
    public static clsName: string = "FYAudioModule";

    private _helper: FYAudioHelperBase = undefined;

    /**
     * 设置辅助器
     * @param helper 辅助器
     */
    public setHelper(helper: FYAudioHelperBase) {
        this._helper = helper;
    }

    /**
     * 是否有声音组
     * @param name 声音组名字
     * @returns 
     */
    public hasGroup(name: string): boolean {
        return this._helper.hasGroup(name);
    }

    /**
     * 获取声音组
     * @param name 声音组名字
     * @returns 
     */
    public getGroup(name: string): FYAudioGroup {
        return this._helper.getGroup(name);
    }

    /**
     * 获取所有声音组
     * @returns 
     */
    public getAllGroups(): { [key: string]: FYAudioGroup } {
        return this._helper.getAllGroups();
    }

    /**
     * 添加声音组
     * @param name 声音组名字
     * @param mute 声音组是否静音
     * @param volume 声音组音量
     * @param agentHelperCount 声音组代理个数
     */
    public addGroup(name: string, mute: boolean, volume: number, agentHelperCount: number): void {
        this._helper.addGroup(name, mute, volume, agentHelperCount);
    }

    /**
     * 添加声音代理
     * @param groupName 声音组名字
     * @param agentHelper 声音代理
     * @returns 
     */
    public addAgentHelper(groupName: string, agentHelper: FYAudioAgentHelperBase) {
        this._helper.addAgentHelper(groupName, agentHelper);
    }

    /**
     * 播放声音
     * @param audioName 声音名字
     * @param groupName 声音组名字
     * @param loop 是否循环
     * @returns 
     */
    public play(audioName: string, groupName: string, loop?: boolean): Promise<string> {
        return this._helper.play(audioName, groupName, loop);
    }

    /**
     * 停止声音
     * @param id 声音编号
     */
    public stop(id: string) {
        this._helper.stop(id);
    }

    /** 停止所有声音 */
    public stopAll() {
        this._helper.stopAll();
    }

    /**
     * 暂停声音
     * @param id 声音编号
     */
    public pause(id: string) {
        this._helper.pause(id);
    }

    /**
     * 恢复声音
     * @param id 声音编号
     */
    public resume(id: string) {
        this._helper.resume(id);
    }
}