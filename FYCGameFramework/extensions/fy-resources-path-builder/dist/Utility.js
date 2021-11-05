"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
}
exports.default = Utility;
