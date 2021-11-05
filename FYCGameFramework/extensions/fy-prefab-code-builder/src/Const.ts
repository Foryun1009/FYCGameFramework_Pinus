export default class Const {
    /**
     * 资源根目录
     */
    public static readonly ROOT_RES_PATH = Editor.Project.path + '/assets/resources';
    /**
     * 预制路径
     */
    public static readonly PREFAB_PATH = Const.ROOT_RES_PATH + '/Prefab';
    /**
     * UI路径
     */
    public static readonly UI_PATH = Const.PREFAB_PATH + '/UI';
    /**
     * 输出文件根目录
     */
    public static readonly ROOT_EXPORT_PATH = Editor.Project.path + '/assets/Script';
    /**
     * UI脚本路径
     */
    public static readonly UI_SCRIPT_PATH = Const.ROOT_EXPORT_PATH + '/UI';
    /**
     * 扩展路径
     */
    public static readonly EXTENSIONS_PATH = Editor.Project.path + '/extensions';
    /**
     * 模板路径
     */
    public static readonly TEMPLATE_PATH = Const.EXTENSIONS_PATH + '/fy-prefab-code-builder/src/template';

    /**
     * 模板配置
     */
    public static readonly TEMPLATE_FILE_CONFIG = {
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
    }

    /**
     * 组件事件配置表
     */
    public static readonly COMPONENT_EVENT_CONFIG: { [key: string]: Array<{ EventName: string, FunctionName: string }> } = {
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
    }

    /**
     * 临时文件路径
     */
    public static readonly TEMP_PATH = Editor.Project.path + '/temp';
    /**
     * 该插件的临时文件路径
     */
    public static readonly TEMP_DATA_PATH = Const.TEMP_PATH + '/fy-prefab-code-builder';
    /**
     * 该插件的临时文件
     */
    public static readonly TEMP_DATA_FILE = Const.TEMP_DATA_PATH + '/asset-change-flag.json';

    /**
     * 模板 视图 导入关键字
     */
    public static readonly VIEW_KEY_IMPORT = '$IMPORT';
    /**
     * 模板 视图 类名
     */
    public static readonly VIEW_KEY_CLASS_NAME = '$CLASS_NAME';
    /**
     * 模板 视图 变量声明
     */
    public static readonly VIEW_KEY_VARIABLE_DECLARATIONS = '$VARIABLE_DECLARATIONS';
    /**
     * 模板 视图 变量赋值
     */
    public static readonly VIEW_KEY_VARIABLE_ASSIGNMENT = '$VARIABLE_ASSIGNMENT';
    /**
     * 目标 视图 预制名
     */
    public static readonly VIEW_KEY_PREFAB_NAME = '$PREFAB_NAME';
    /**
     * 模板 视图 事件添加
     */
    public static readonly VIEW_KEY_EVENT_ON = '$EVENT_ON';
    /**
     * 模板 视图 事件移除
     */
    public static readonly VIEW_KEY_EVENT_OFF = '$EVENT_OFF';
    /**
     * 模板 视图 事件回调
     */
    public static readonly VIEW_KEY_EVENT_CALLBACK = '$EVENT_CALLBACK';

}
