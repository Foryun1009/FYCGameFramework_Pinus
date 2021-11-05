"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Const_1 = __importDefault(require("./Const"));
/**
 * 工具类
 */
class Utility {
    /**
     * 递归获取目录下所有文件
     * @param dir 目录
     * @param filesList 文件列表
     * @returns 文件列表
     */
    static readFileList(dir, filesList = []) {
        const files = fs_1.default.readdirSync(dir);
        files.forEach((item, index) => {
            var fullPath = path_1.default.join(dir, item);
            const stat = fs_1.default.statSync(fullPath);
            if (stat.isDirectory()) {
                Utility.readFileList(path_1.default.join(dir, item), filesList); //递归读取文件
            }
            else {
                let extname = path_1.default.extname(fullPath);
                if (extname !== '.meta' && extname !== '.DS_Store' && extname !== '') {
                    // 排除文件
                    filesList.push(fullPath);
                }
            }
        });
        return filesList;
    }
    /**
     * 校验目录，如果不存在，则创建
     * @param dir 目录
     * @returns 目录
     */
    static checkDirectory(dir) {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        return dir;
    }
    /**
     * 生成组件信息
     * @param nodeDict 节点信息字典
     * @returns
     */
    static genComponentInfo(nodeDict) {
        if (!nodeDict) {
            return;
        }
        let nodeList = [];
        for (let key in nodeDict) {
            // 如果是根节点，或者开始和末尾都是_，则认为是需要获取组件的节点
            if ((key.startsWith('_') && key.endsWith('_')) || key.startsWith('P_')) {
                let name = key.substring(1, key.length - 1);
                if (key.startsWith('P_')) {
                    // 根节点名字
                    name = 'Node';
                }
                let nodeInfo = nodeDict[key];
                if (!nodeInfo) {
                    continue;
                }
                nodeList.push({ name: name, path: nodeInfo['path'], components: nodeInfo['components'] });
            }
        }
        return nodeList;
    }
    /**
     * 生成节点路径
     * @param prefabJson 预制信息
     * @param curIndex 当前索引
     * @param nodeDict 节点信息字典
     * @param nodeNameList 节点名字列表
     * @returns
     */
    static genNodePath(prefabJson, curIndex, nodeDict, nodeNameList) {
        var _a, _b;
        if (!curIndex) {
            curIndex = 0;
        }
        if (prefabJson.length <= curIndex) {
            // 读取完毕
            return nodeDict;
        }
        // console.log(`curIndex:${curIndex}, nodeDict:${nodeDict}, nodeNameList:${nodeNameList}`);
        let type = (_a = prefabJson === null || prefabJson === void 0 ? void 0 : prefabJson[curIndex]) === null || _a === void 0 ? void 0 : _a['__type__'];
        let name = (_b = prefabJson === null || prefabJson === void 0 ? void 0 : prefabJson[curIndex]) === null || _b === void 0 ? void 0 : _b['_name'];
        if (type === 'cc.Node') {
            let nodePath = '';
            if (nodeNameList && nodeNameList.length > 1) {
                for (let i = 1; i < nodeNameList.length; i++) {
                    nodePath += nodeNameList[i] + '/';
                }
                nodePath = nodePath + name;
            }
            else {
                // 第一个节点是根节点，没有路径，从第二节点开始有路径
                if ((nodeNameList === null || nodeNameList === void 0 ? void 0 : nodeNameList.length) === 1) {
                    nodePath = name;
                }
            }
            // 添加节点名
            if (!nodeNameList) {
                nodeNameList = [name];
            }
            else {
                nodeNameList.push(name);
            }
            let nodeInfo = { 'path': nodePath };
            // 添加节点信息
            (nodeDict !== null && nodeDict !== void 0 ? nodeDict : (nodeDict = {}))[name] = nodeInfo;
        }
        else if (type === 'cc.PrefabInfo') {
            // 节点结束符号，移除最后节点
            if (nodeNameList && nodeNameList.length > 0) {
                nodeNameList.pop();
            }
        }
        else if (type !== 'cc.CompPrefabInfo' && type !== 'cc.Prefab') {
            // 组件
            let nodeName = nodeNameList[nodeNameList.length - 1];
            let nodeInfo = nodeDict[nodeName];
            let nodeComponents = nodeInfo['components'];
            if (Array.isArray(nodeComponents)) {
                nodeComponents.push(type);
            }
            else {
                nodeComponents = [type];
            }
            nodeInfo['components'] = nodeComponents;
        }
        return this.genNodePath(prefabJson, curIndex + 1, nodeDict, nodeNameList);
    }
    /**
     * 生成视图类
     * @param componentInfoList 组件信息列表
     * @param clsName 类名
     * @param prefabType 预制类型
     * @returns
     */
    static genViewClass(componentInfoList, clsName, prefabType) {
        if (!fs_1.default.existsSync(Const_1.default.TEMPLATE_PATH)) {
            console.error('目录不存在:' + Const_1.default.TEMPLATE_PATH);
            return;
        }
        if (!componentInfoList) {
            console.error('componentInfoList is null or undefined');
            return;
        }
        let viewTemplate = fs_1.default.readFileSync(Const_1.default.TEMPLATE_PATH + '/' + Const_1.default.TEMPLATE_FILE_CONFIG[prefabType]['View'], 'utf-8');
        let imports = '{ _decorator, find, Node';
        let className = clsName;
        let variableDeclarations = '';
        let variableAssignment = '';
        let eventOn = '';
        let eventOff = '';
        let eventCallback = '';
        let prefabName = `P_${prefabType}_${className.substring(0, className.length - 4)}`;
        let len = componentInfoList.length;
        for (let i = 0; i < len; i++) {
            let componentInfo = componentInfoList[i];
            let name = componentInfo.name;
            let components = componentInfo.components;
            let path = componentInfo.path;
            let variableName = `c${name}`;
            variableDeclarations += `public ${variableName}: Node;\n    `;
            if (path === '') {
                // 如果没有路径，则代表是根节点，则直接等于this.node
                variableAssignment += `this.${variableName} = this.node;\n        `;
            }
            else {
                variableAssignment += `this.${variableName} = find('${path}', this.node);\n        `;
            }
            // 存在只有Node没有其他组件的情况
            if (components) {
                let cLen = components.length;
                for (let j = 0; j < cLen; j++) {
                    let componentType = components[j].substring(3, components[j].length);
                    if (imports.indexOf(componentType) < 0) {
                        // 如果没有导入，则导入
                        imports += `, ${componentType}`;
                    }
                    variableDeclarations += `public ${variableName}${componentType}: ${componentType} = undefined;\n    `;
                    variableAssignment += `this.${variableName}${componentType} = this.${variableName}.getComponent(${componentType});\n        `;
                    let componentEventConfig = Const_1.default.COMPONENT_EVENT_CONFIG[componentType];
                    if (componentEventConfig) {
                        let cecLen = componentEventConfig.length;
                        for (let k = 0; k < cecLen; k++) {
                            let functionName = componentEventConfig[k]['FunctionName'];
                            let eventName = componentEventConfig[k]['EventName'];
                            let callbackName = `on${variableName}${componentType}${functionName}`;
                            eventOn += `        this.${variableName}${componentType}.node.on('${eventName}', this.${callbackName}, this);\n`;
                            eventOff += `        this.${variableName}${componentType}.node.off('${eventName}', this.${callbackName}, this);\n`;
                            eventCallback += `    private ${callbackName}(component: ${componentType}) {\n`;
                            eventCallback += `        this.emit('${eventName}', component);\n`;
                            eventCallback += `    }\n\n`;
                        }
                    }
                }
            }
        }
        imports += ' }';
        viewTemplate = viewTemplate.replace(Const_1.default.VIEW_KEY_IMPORT, imports);
        viewTemplate = viewTemplate.replace(new RegExp('\\' + Const_1.default.VIEW_KEY_CLASS_NAME, 'g'), className);
        viewTemplate = viewTemplate.replace(new RegExp('\\' + Const_1.default.VIEW_KEY_PREFAB_NAME, 'g'), prefabName);
        viewTemplate = viewTemplate.replace(Const_1.default.VIEW_KEY_VARIABLE_DECLARATIONS, variableDeclarations);
        viewTemplate = viewTemplate.replace(Const_1.default.VIEW_KEY_VARIABLE_ASSIGNMENT, variableAssignment);
        viewTemplate = viewTemplate.replace(Const_1.default.VIEW_KEY_EVENT_ON, eventOn);
        viewTemplate = viewTemplate.replace(Const_1.default.VIEW_KEY_EVENT_OFF, eventOff);
        viewTemplate = viewTemplate.replace(Const_1.default.VIEW_KEY_EVENT_CALLBACK, eventCallback);
        return viewTemplate;
    }
    /**
     * 生成数据模型类
     * @param componentInfoList 组件信息列表
     * @param clsName 类名
     * @param prefabType 预制类型
     * @returns
     */
    static genModelClass(componentInfoList, clsName, prefabType) {
        if (!fs_1.default.existsSync(Const_1.default.TEMPLATE_PATH)) {
            console.error('目录不存在:' + Const_1.default.TEMPLATE_PATH);
            return;
        }
        if (!componentInfoList) {
            console.error('componentInfoList is null or undefined');
            return;
        }
        let modelTemplate = fs_1.default.readFileSync(Const_1.default.TEMPLATE_PATH + '/' + Const_1.default.TEMPLATE_FILE_CONFIG[prefabType]['Model'], 'utf-8');
        let className = clsName;
        let prefabName = `P_${prefabType}_${className.substring(0, className.length - 5)}`;
        modelTemplate = modelTemplate.replace(new RegExp('\\' + Const_1.default.VIEW_KEY_CLASS_NAME, 'g'), className);
        modelTemplate = modelTemplate.replace(new RegExp('\\' + Const_1.default.VIEW_KEY_PREFAB_NAME, 'g'), prefabName);
        return modelTemplate;
    }
    /**
     * 生成控制器类
     * @param componentInfoList 组件信息列表
     * @param clsName 类名
     * @param prefabType 预制类型
     * @returns
     */
    static genControllerClass(componentInfoList, clsName, prefabType) {
        if (!fs_1.default.existsSync(Const_1.default.TEMPLATE_PATH)) {
            console.error('目录不存在:' + Const_1.default.TEMPLATE_PATH);
            return;
        }
        if (!componentInfoList) {
            console.error('componentInfoList is null or undefined');
            return;
        }
        let controllerTemplate = fs_1.default.readFileSync(Const_1.default.TEMPLATE_PATH + '/' + Const_1.default.TEMPLATE_FILE_CONFIG[prefabType]['Controller'], 'utf-8');
        let className = clsName;
        let prefabName = `P_${prefabType}_${className}`;
        controllerTemplate = controllerTemplate.replace(new RegExp('\\' + Const_1.default.VIEW_KEY_CLASS_NAME, 'g'), className);
        controllerTemplate = controllerTemplate.replace(new RegExp('\\' + Const_1.default.VIEW_KEY_PREFAB_NAME, 'g'), prefabName);
        return controllerTemplate;
    }
    /**
     * 添加资源变化标记
     * @param assetPath 资源路径
     */
    static addAssetChangeFlag(assetPath) {
        this.checkDirectory(Const_1.default.TEMP_PATH);
        this.checkDirectory(Const_1.default.TEMP_DATA_PATH);
        let assetChangeFlagData = [];
        if (fs_1.default.existsSync(Const_1.default.TEMP_DATA_FILE)) {
            let raw = fs_1.default.readFileSync(Const_1.default.TEMP_DATA_FILE, 'utf-8');
            assetChangeFlagData = JSON.parse(raw);
        }
        if (!assetChangeFlagData) {
            assetChangeFlagData = [];
        }
        let isChanged = false;
        if (assetChangeFlagData.indexOf(assetPath) < 0) {
            // 不存在才添加
            assetChangeFlagData.push(assetPath);
            isChanged = true;
        }
        if (isChanged) {
            // 写入文件
            fs_1.default.writeFileSync(Const_1.default.TEMP_DATA_FILE, JSON.stringify(assetChangeFlagData));
        }
    }
    /**
     * 生成预制类
     * @param prefabFileName 预制文件名
     * @param prefabType 预制类型
     * @returns
     */
    static genPrefabClass(prefabFileName, prefabType) {
        let sPath = Const_1.default.ROOT_EXPORT_PATH + '/' + prefabType;
        // 构建View
        let prefabName = prefabFileName.split(`P_${prefabType}_`)[1];
        let moduleName = prefabName.substring(0, prefabName.length - 7);
        let viewClassName = moduleName + 'View';
        let modulePath = sPath + '/' + moduleName;
        let scriptPath = modulePath + `/${viewClassName}.ts`;
        let prefabRaw = fs_1.default.readFileSync(prefabFileName, 'utf-8');
        let prefabJson = JSON.parse(prefabRaw);
        let nodePath = Utility.genNodePath(prefabJson);
        if (!nodePath) {
            return;
        }
        let components = Utility.genComponentInfo(nodePath);
        if (!components) {
            return;
        }
        let viewClass = Utility.genViewClass(components, viewClassName, prefabType);
        if (!viewClass) {
            return;
        }
        Utility.checkDirectory(modulePath);
        // 写入文件
        fs_1.default.writeFileSync(scriptPath, viewClass);
        // 构建Model
        let modelClassName = moduleName + 'Model';
        let modelScriptPath = `${sPath}/${moduleName}/${modelClassName}.ts`;
        if (!fs_1.default.existsSync(modelScriptPath)) {
            // 如果没有构建，则构建
            let modelClass = Utility.genModelClass(components, modelClassName, prefabType);
            if (!modelClass) {
                return;
            }
            // 写入文件
            fs_1.default.writeFileSync(modelScriptPath, modelClass);
        }
        // 构建Controller
        let controllerClassName = moduleName;
        let controllerScriptPath = `${sPath}/${moduleName}/${controllerClassName}.ts`;
        if (!fs_1.default.existsSync(controllerScriptPath)) {
            // 如果没有构建，则构建
            let controllerClass = Utility.genControllerClass(components, controllerClassName, prefabType);
            if (!controllerClass) {
                return;
            }
            // 写入文件
            fs_1.default.writeFileSync(controllerScriptPath, controllerClass);
        }
    }
    /**
     * 生成所有预制类
     * @param resourceRootPath 资源根目录
     * @param prefabType 预制类型
     * @param assetChangeFlagData 资源
     * @returns
     */
    static genAllPrefabClass(resourceRootPath, prefabType, assetChangeFlagData) {
        let resourcePath = resourceRootPath + '/' + prefabType;
        if (!fs_1.default.existsSync(resourcePath)) {
            console.error('目录不存在:' + resourcePath);
            return;
        }
        // 文件字典 key 文件名不含扩展名 value 文件在resources下的路径
        let fileDict = {};
        let fileNames = Utility.readFileList(resourcePath, []);
        let fileNamesLen = fileNames.length;
        if (fileNamesLen <= 0) {
            console.log('没有需要生成的脚本');
            return;
        }
        Utility.checkDirectory(Const_1.default.ROOT_EXPORT_PATH);
        let sPath = Const_1.default.ROOT_EXPORT_PATH + '/' + prefabType;
        Utility.checkDirectory(sPath);
        for (let i = 0; i < fileNamesLen; i++) {
            // 构建View
            let prefabName = fileNames[i].split(`P_${prefabType}_`)[1];
            let moduleName = prefabName.substring(0, prefabName.length - 7);
            let viewClassName = moduleName + 'View';
            let modulePath = sPath + '/' + moduleName;
            let scriptPath = modulePath + `/${viewClassName}.ts`;
            if (fs_1.default.existsSync(scriptPath) && assetChangeFlagData.indexOf(fileNames[i]) < 0) {
                // 如果View的脚本已经存在，但是又不在修改列表里面，则不需要创建
                continue;
            }
            // 生成脚本
            Utility.genPrefabClass(fileNames[i], prefabType);
        }
        // 编辑器刷新 将新创建的资源导入
        Editor.Message.request('asset-db', 'refresh-asset', `db://assets/Script/${prefabType}`);
    }
}
exports.default = Utility;
