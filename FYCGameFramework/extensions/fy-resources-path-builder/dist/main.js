"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
//@ts-ignore
const fs_1 = __importDefault(require("fs"));
const Const_1 = __importDefault(require("./Const"));
const Utility_1 = __importDefault(require("./Utility"));
/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    resBuild() {
        if (!fs_1.default.existsSync(Const_1.default.ROOT_EXPORT_PATH)) {
            console.error("没有找到resources目录");
            return;
        }
        // 文件字典 key 文件名不含扩展名 value 文件在resources下的路径
        let fileDict = {};
        let fileNames = Utility_1.default.readFileList(Const_1.default.ROOT_RES_PATH, []);
        let stringTmp = 'export let ConfigRes = {\n';
        for (let i = 0; i < fileNames.length; i++) {
            let element = fileNames[i];
            let splits = element.split('/');
            let fileName = splits[splits.length - 1];
            // 没有扩展名的文件名
            let fileNameNoExt = fileName.split('.')[0];
            let prefix = Editor.Project.path + "/assets/resources/";
            // resources加载不能带后缀名
            let fileResPath = element.replace(prefix, "").split('.')[0];
            if (fileDict[fileNameNoExt] != null) {
                console.error(`资源名重复了，重复的资源：assets/resources/${fileResPath}`);
                return;
            }
            fileDict[fileNameNoExt] = fileResPath;
            stringTmp += `\t'${fileNameNoExt}': '${fileResPath}',\n`;
        }
        stringTmp += '}';
        // let json = JSON.stringify(fileDict);
        let configDir = Const_1.default.CONFIG_PATH;
        // 校验目录，如果没有则创建
        Utility_1.default.checkDirectory(Const_1.default.ROOT_EXPORT_PATH);
        Utility_1.default.checkDirectory(Const_1.default.CONFIG_PATH);
        let configPath = configDir + "/ConfigRes.ts";
        // 写入文件
        fs_1.default.writeFileSync(configPath, stringTmp);
        // 编辑器刷新 将新创建的资源导入
        Editor.Message.request('asset-db', 'refresh-asset', 'db://assets/Script/Config');
        console.log(`资源路径生成成功，文件：${configDir + "/ConfigRes.ts"}`);
    },
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
const load = function () { };
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
const unload = function () { };
exports.unload = unload;
