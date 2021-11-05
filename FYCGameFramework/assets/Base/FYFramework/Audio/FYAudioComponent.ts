
import { _decorator } from 'cc';
import { FYComponent } from '../Base/FYComponent';
import { FYEntry } from '../Base/FYEntry';
import DefaultAudioHelper from './DefalutAudioHelper';
import DefaultAudioAgentHelper from './DefaultAudioAgentHelper';
import { FYAudioAgentHelperBase } from './FYAudioAgentHelperBase';
import FYAudioGroup from './FYAudioGroup';
import { FYAudioHelperBase } from './FYAudioHelperBase';
import FYAudioModule from './FYAudioModule';
const { ccclass, menu } = _decorator;

/**
 * 声音组件
 */

@ccclass('FYAudioComponent')
@menu('FY/FYAudioComponent')
export class FYAudioComponent extends FYComponent {

    private _audio: FYAudioModule;
    /** 声音模块 */
    public get audio(): FYAudioModule {
        if (!this._audio) {
            this._audio = FYEntry.getModule(FYAudioModule);
        }

        return this._audio
    }

    /** 代理类 */
    private _agentCtor: new () => FYAudioAgentHelperBase = undefined;

    onLoad() {
        super.onLoad();
        this.setHelper(new DefaultAudioHelper());
        this.setAgentHelperCtor(DefaultAudioAgentHelper);
    }

    /**
     * 设置辅助器
     * @param helper 辅助器
     */
    public setHelper(helper: FYAudioHelperBase) {
        this.audio.setHelper(helper);
    }

    public setAgentHelperCtor<T extends FYAudioAgentHelperBase>(ctor: new () => T) {
        this._agentCtor = ctor;
    }

    /**
     * 是否有声音组
     * @param name 声音组名字
     * @returns 
     */
    public hasGroup(name: string): boolean {
        return this.audio.hasGroup(name);
    }

    /**
     * 获取声音组
     * @param name 声音组名字
     * @returns 
     */
    public getGroup(name: string): FYAudioGroup {
        return this.audio.getGroup(name);
    }

    /**
     * 获取所有声音组
     * @returns 
     */
    public getAllGroups(): { [key: string]: FYAudioGroup } {
        return this.audio.getAllGroups();
    }

    /**
     * 添加声音组
     * @param name 声音组名字
     * @param mute 声音组是否静音
     * @param volume 声音组音量
     * @param agentHelperCount 声音组代理个数
     */
    public addGroup(name: string, mute: boolean, volume: number, agentHelperCount: number): void {
        this.audio.addGroup(name, mute, volume, agentHelperCount);
        for (let i = 0; i < agentHelperCount; i++) {
            this.audio.addAgentHelper(name, this.node.addComponent(this._agentCtor));
        }
        let group = this.audio.getGroup(name);
        group.volume = volume;
        group.mute = mute;
    }

    /**
     * 播放声音
     * @param audioName 声音名字
     * @param groupName 声音组名字
     * @param loop 是否循环
     * @returns 
     */
    public play(audioName: string, groupName: string, loop?: boolean): Promise<string> {
        return this.audio.play(audioName, groupName, loop);
    }

    /**
     * 停止声音
     * @param id 声音编号
     */
    public stop(id: string) {
        this.audio.stop(id);
    }

    /** 停止所有声音 */
    public stopAll() {
        this.audio.stopAll();
    }

    /**
     * 暂停声音
     * @param id 声音编号
     */
    public pause(id: string) {
        this.audio.pause(id);
    }

    /**
     * 恢复声音
     * @param id 声音编号
     */
    public resume(id: string) {
        this.audio.resume(id);
    }
}