import { timeFormat } from "../Utility/TimeUtil";
import { FYLogEnum } from "./FYLogEnum";

/** 日志管理器 */
export default class FYLog {
    /** Log switch */
    public static enable = true;

    /**
     * 获取时间字符串
     * @returns 获取时间字符串
     */
    public static getTimeString() {
        return '【' + timeFormat(new Date(), 'yyyy/MM/dd hh:mm:ss:S') + '】'
    }

    public static format(str: string) {
        return FYLog.getTimeString() + str;
    }

    public static enableLog(enable: boolean) {
        if (!enable) {
            console.log = () => { };
        }
        enable = enable;
    }

    /**
     * 带自定义颜色的日志
     * @param message 消息
     * @param color 颜色
     */
    public static print(message: string, color?: FYLogEnum.Color): void {
        if (FYLog.enable) {
            if (color) {
                console.log('%c%s', color, FYLog.getTimeString() + message);
            } else {
                console.log(FYLog.getTimeString() + message);
            }
        }
    }

    public static info(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.info(FYLog.getTimeString() + message, ...optionalParams);
        }
    }

    public static log(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.log(FYLog.getTimeString() + message, ...optionalParams);
        }
    }

    public static debug(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.debug(FYLog.getTimeString() + message, ...optionalParams);
        }
    }

    public static warn(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.warn(FYLog.getTimeString() + message, ...optionalParams);
        }
    }

    public static error(message?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.error(FYLog.getTimeString() + message, ...optionalParams);
        }
    }

    public static assert(condition?: boolean, message?: string, ...data: any[]): void {
        if (FYLog.enable) {
            console.assert(condition, message, ...data);
        }
    }

    public static clear(): void {
        if (FYLog.enable) {
            console.clear();
        }
    }

    public static count(label?: string): void {
        if (FYLog.enable) {
            console.count(label);
        }
    }

    public static dir(value?: any, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.dir(value, ...optionalParams);
        }
    }

    public static dirxml(value: any): void {
        if (FYLog.enable) {
            console.dirxml(value);
        }
    }

    public static group(groupTitle?: string, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.group(groupTitle, ...optionalParams);
        }
    }

    public static groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void {
        if (FYLog.enable) {
            console.groupCollapsed(groupTitle, ...optionalParams);
        }
    }

    public static groupEnd(): void {
        if (FYLog.enable) {
            console.groupEnd();
        }
    }

    public static profile(reportName?: string): void {
        if (FYLog.enable) {
            console.profile(reportName);
        }
    }

    public static profileEnd(): void {
        if (FYLog.enable) {
            console.profileEnd();
        }
    }

    public static table(...tabularData: any[]): void {
        if (FYLog.enable) {
            console.table(...tabularData);
        }
    }

    public static time(label?: string): void {
        if (FYLog.enable) {
            console.time(label);
        }
    }

    public static timeEnd(label?: string): void {
        if (FYLog.enable) {
            console.timeEnd(label);
        }
    }

    public static timeStamp(label?: string): void {
        if (FYLog.enable) {
            console.timeStamp(label);
        }
    }
}