"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const Const_1 = __importDefault(require("./Const"));
const Enum_1 = require("./Enum");
const Utility_1 = __importDefault(require("./Utility"));
/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    prefabBuild() {
        // 资源变化表
        let assetChangeFlagData = [];
        if (fs_1.default.existsSync(Const_1.default.TEMP_DATA_FILE)) {
            let raw = fs_1.default.readFileSync(Const_1.default.TEMP_DATA_FILE, 'utf-8');
            assetChangeFlagData = JSON.parse(raw);
        }
        else {
            Utility_1.default.checkDirectory(Const_1.default.TEMP_PATH);
            Utility_1.default.checkDirectory(Const_1.default.TEMP_DATA_PATH);
        }
        Utility_1.default.genAllPrefabClass(Const_1.default.PREFAB_PATH, Enum_1.Enum.PrefabType.UI, assetChangeFlagData);
        Utility_1.default.genAllPrefabClass(Const_1.default.PREFAB_PATH, Enum_1.Enum.PrefabType.Entity, assetChangeFlagData);
        // 清空数据
        assetChangeFlagData = [];
        fs_1.default.writeFileSync(Const_1.default.TEMP_DATA_FILE, JSON.stringify(assetChangeFlagData));
        console.log('脚本生成完成');
    },
};
const onAssetChange = function (err, results) {
    // 如果 P_ 开头的预制发生了变化，则添加到文件中
    if (results && results['file'] && results['type'] === 'cc.Prefab' && results['name'] && results['name'].indexOf('P_') >= 0) {
        Utility_1.default.addAssetChangeFlag(results['file']);
    }
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
const load = function () {
    Editor.Message.addBroadcastListener('asset-db:asset-change', onAssetChange);
};
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
const unload = function () {
    Editor.Message.removeBroadcastListener('asset-db:asset-change', onAssetChange);
};
exports.unload = unload;
