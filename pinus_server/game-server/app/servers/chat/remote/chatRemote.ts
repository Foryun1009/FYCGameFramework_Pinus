import { Application, RemoterClass, FrontendSession, ChannelService, Channel } from 'pinus';

export default function (app: Application) {
    return new ChatRemote(app);
}

// UserRpc的命名空间自动合并
declare global {
    interface UserRpc {
        chat: {
            // 一次性定义一个类自动合并到UserRpc中
            chatRemote: RemoterClass<FrontendSession, ChatRemote>;
        };
    }
}

export class ChatRemote {
    private channelService: ChannelService = undefined;

    constructor(private app: Application) {
        this.app = app;
        this.channelService = app.get('channelService');
    }

    /**
     * Add user into chat channel.
     * @param uid unique id for user
     * @param sid server id
     * @param name channel name
     * @param flag channel parameter
     * @param cb callback
     */
    public add(uid: string, sid: string, name: string, flag: boolean, cb: (users: Array<string>) => void) {
        let channel = this.channelService.getChannel(name, flag);
        let username = uid.split('*')[0];
        channel.pushMessage('onAdd', username);
        if (!!channel) {
            channel.add(uid, sid);
        }

        cb(this.get(name, flag));
    }

    /**
     * Get user from chat channel.
     * @param name channel name
     * @param flag channel parameter
     * @returns users uids in channel
     */
    public get(name: string, flag: boolean): Array<string> {
        let users: Array<string> = [];
        let channel = this.channelService.getChannel(name, flag);
        if (!!channel) {
            users = channel.getMembers();
        }
        for (let i = 0; i < users.length; i++) {
            users[i] = users[i].split('*')[0];
        }
        return users;
    }

    /**
     * Kick user out chat channel.
     * @param uid unique id for user
     * @param sid server id 
     * @param name channel name
     * @param cb callback
     */
    public kick(uid: string, sid: string, name: string, cb) {
        let channel: Channel = this.channelService.getChannel(name, false);
        // leave channel
        if (!!channel) {
            channel.leave(uid, sid);
        }
        let username = uid.split('*')[0];
        channel.pushMessage('onLeave', username);
        cb();
    }
}