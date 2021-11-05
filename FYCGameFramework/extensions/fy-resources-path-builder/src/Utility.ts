import fs from 'fs';
import path from 'path';

/**
 * 工具类
 */
export default class Utility {
    /**
     * 递归获取目录下所有文件
     * @param dir 目录
     * @param filesList 文件列表
     * @returns 文件列表
     */
    public static readFileList(dir: string, filesList: Array<string> = []): Array<string> {
        const files = fs.readdirSync(dir);
        files.forEach((item, index) => {
            var fullPath: string = path.join(dir, item);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                Utility.readFileList(path.join(dir, item), filesList);  //递归读取文件
            } else {
                let extname = path.extname(fullPath);
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
    public static checkDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    }
}