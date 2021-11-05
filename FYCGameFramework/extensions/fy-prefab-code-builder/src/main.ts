//@ts-ignore
import fs from 'fs';
import Const from './Const';
import { Enum } from './Enum';
import Utility from './Utility';
/**
 * @en 
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    prefabBuild() {
        // 资源变化表
        let assetChangeFlagData: Array<string> = [];
        if (fs.existsSync(Const.TEMP_DATA_FILE)) {
            let raw = fs.readFileSync(Const.TEMP_DATA_FILE, 'utf-8');
            assetChangeFlagData = JSON.parse(raw);
        } else {
            Utility.checkDirectory(Const.TEMP_PATH);
            Utility.checkDirectory(Const.TEMP_DATA_PATH);
        }

        Utility.genAllPrefabClass(Const.PREFAB_PATH, Enum.PrefabType.UI, assetChangeFlagData);
        Utility.genAllPrefabClass(Const.PREFAB_PATH, Enum.PrefabType.Entity, assetChangeFlagData);

        // 清空数据
        assetChangeFlagData = [];
        fs.writeFileSync(Const.TEMP_DATA_FILE, JSON.stringify(assetChangeFlagData));

        console.log('脚本生成完成');
    },
};

const onAssetChange = function (err: any, results: any) {
    // 如果 P_ 开头的预制发生了变化，则添加到文件中
    if (results && results['file'] && results['type'] === 'cc.Prefab' && results['name'] && results['name'].indexOf('P_') >= 0) {
        Utility.addAssetChangeFlag(results['file']);
    }
}

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export const load = function () {
    Editor.Message.addBroadcastListener('asset-db:asset-change', onAssetChange);
};

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () {
    Editor.Message.removeBroadcastListener('asset-db:asset-change', onAssetChange);
};
