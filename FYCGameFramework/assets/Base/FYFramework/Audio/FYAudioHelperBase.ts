/**
 *声音辅助器基类
 */

import { FYAudioAgentHelperBase } from "./FYAudioAgentHelperBase";
import FYAudioGroup from "./FYAudioGroup";

export abstract class FYAudioHelperBase {
    /** 获取声音组数量 */
    public abstract get audioGroupCount(): number;
    /**
     * 是否有声音组
     * @param name 声音组名字
     * @returns 
     */
    public abstract hasGroup(name: string): boolean;
    /**
     * 获取声音组
     * @param name 声音组名字
     * @returns 
     */
    public abstract getGroup(name: string): FYAudioGroup;
    /** 获取所有组 */
    public abstract getAllGroups(): { [key: string]: FYAudioGroup };
    /**
     * 添加声音组
     * @param name 声音组名字
     * @param mute 声音组是否静音
     * @param volume 声音组音量
     * @param agentHelperCount 声音组代理个数
     */
    public abstract addGroup(name: string, mute: boolean, volume: number, agentHelperCount: number): void;
    /**
     * 添加声音代理
     * @param groupName 声音组名字
     * @param agentHelper 声音代理
     * @returns 
     */
    public abstract addAgentHelper(groupName: string, agentHelper: FYAudioAgentHelperBase);
    /**
     * 播放声音
     * @param audioName 声音名字
     * @param groupName 声音组名字
     * @param loop 是否循环
     * @returns 
     */
    public abstract play(audioName: string, groupName: string, loop?:boolean): Promise<string>;
    /**
     * 停止声音
     * @param id 声音编号
     */
    public abstract stop(id: string);
    /** 停止所有声音 */
    public abstract stopAll();
    /**
     * 暂停声音
     * @param id 声音编号
     */
    public abstract pause(id: string);
    /**
     * 恢复声音
     * @param id 声音编号
     */
    public abstract resume(id: string);
}