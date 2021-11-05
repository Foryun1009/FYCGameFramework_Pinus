"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Const {
}
exports.default = Const;
/**
 * 资源根目录
 */
Const.ROOT_RES_PATH = Editor.Project.path + '/assets/resources';
/**
 * 预制路径
 */
Const.PREFAB_PATH = Const.ROOT_RES_PATH + '/Prefab';
/**
 * UI路径
 */
Const.UI_PATH = Const.PREFAB_PATH + '/UI';
/**
 * 输出文件根目录
 */
Const.ROOT_EXPORT_PATH = Editor.Project.path + '/assets/Script';
/**
 * UI脚本路径
 */
Const.UI_SCRIPT_PATH = Const.ROOT_EXPORT_PATH + '/UI';
/**
 * 扩展路径
 */
Const.EXTENSIONS_PATH = Editor.Project.path + '/extensions';
/**
 * 模板路径
 */
Const.TEMPLATE_PATH = Const.EXTENSIONS_PATH + '/fy-prefab-code-builder/src/template';
/**
 * 模板配置
 */
Const.TEMPLATE_FILE_CONFIG = {
    'UI': {
        'Model': 'ModelTemplate.txt',
        'View': 'ViewTemplate.txt',
        'Controller': 'ControllerTemplate.txt',
    },
    'Entity': {
        'Model': 'EntityModelTemplate.txt',
        'View': 'EntityViewTemplate.txt',
        'Controller': 'EntityControllerTemplate.txt',
    }
};
/**
 * 组件事件配置表
 */
Const.COMPONENT_EVENT_CONFIG = {
    'Button': [{
            'EventName': 'click',
            'FunctionName': 'Click',
        }],
    'EditBox': [{
            'EventName': 'editing-did-began',
            'FunctionName': 'EditingBegan',
        }, {
            'EventName': 'editing-did-ended',
            'FunctionName': 'EditingEnded',
        }, {
            'EventName': 'editing-return',
            'FunctionName': 'EditingReturn',
        }, {
            'EventName': 'text-changed',
            'FunctionName': 'TextChanged',
        }],
    'ScrollView': [{
            'EventName': 'scroll-to-top',
            'FunctionName': 'ScrollToTop',
        }, {
            'EventName': 'scroll-to-bottom',
            'FunctionName': 'ScrollToBottom',
        }, {
            'EventName': 'scroll-to-left',
            'FunctionName': 'ScrollToLeft',
        }, {
            'EventName': 'scroll-to-right',
            'FunctionName': 'ScrollToRight',
        }, {
            'EventName': 'scrolling',
            'FunctionName': 'Scrolling',
        }, {
            'EventName': 'bounce-bottom',
            'FunctionName': 'BounceBottom',
        }, {
            'EventName': 'bounce-top',
            'FunctionName': 'BounceTop',
        }, {
            'EventName': 'bounce-left',
            'FunctionName': 'BounceLeft',
        }, {
            'EventName': 'bounce-right',
            'FunctionName': 'BounceRight',
        }, {
            'EventName': 'scroll-ended',
            'FunctionName': 'ScrollEnded',
        }, {
            'EventName': 'touch-up',
            'FunctionName': 'TouchUp',
        }, {
            'EventName': 'scroll-began',
            'FunctionName': 'ScrollBegan',
        }],
    'Toggle': [{
            'EventName': 'toggle',
            'FunctionName': 'Toggle',
        }],
    'Slider': [{
            'EventName': 'slide',
            'FunctionName': 'Slide',
        }],
    'PageView': [{
            'EventName': 'page-turning',
            'FunctionName': 'PageTurning',
        }]
};
/**
 * 临时文件路径
 */
Const.TEMP_PATH = Editor.Project.path + '/temp';
/**
 * 该插件的临时文件路径
 */
Const.TEMP_DATA_PATH = Const.TEMP_PATH + '/fy-prefab-code-builder';
/**
 * 该插件的临时文件
 */
Const.TEMP_DATA_FILE = Const.TEMP_DATA_PATH + '/asset-change-flag.json';
/**
 * 模板 视图 导入关键字
 */
Const.VIEW_KEY_IMPORT = '$IMPORT';
/**
 * 模板 视图 类名
 */
Const.VIEW_KEY_CLASS_NAME = '$CLASS_NAME';
/**
 * 模板 视图 变量声明
 */
Const.VIEW_KEY_VARIABLE_DECLARATIONS = '$VARIABLE_DECLARATIONS';
/**
 * 模板 视图 变量赋值
 */
Const.VIEW_KEY_VARIABLE_ASSIGNMENT = '$VARIABLE_ASSIGNMENT';
/**
 * 目标 视图 预制名
 */
Const.VIEW_KEY_PREFAB_NAME = '$PREFAB_NAME';
/**
 * 模板 视图 事件添加
 */
Const.VIEW_KEY_EVENT_ON = '$EVENT_ON';
/**
 * 模板 视图 事件移除
 */
Const.VIEW_KEY_EVENT_OFF = '$EVENT_OFF';
/**
 * 模板 视图 事件回调
 */
Const.VIEW_KEY_EVENT_CALLBACK = '$EVENT_CALLBACK';
