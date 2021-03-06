import {Application, RemoterClass, FrontendSession} from 'pinus';

export default function (app: Application) {
    return new AuthRemote(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        connector: {
            // 一次性定义一个类自动合并到UserRpc中
            authRemote: RemoterClass<FrontendSession, AuthRemote>;
        };
    }
}


export class AuthRemote {
    constructor(private app: Application) {

    }

    /**
     *
     * @param username
     * @param password
     */
    public async auth(username: string , password: string) {
        return true;
    }

    // 私有方法不会加入到RPC提示里
    private async privateMethod(testarg:string,arg2:number){

    }
}