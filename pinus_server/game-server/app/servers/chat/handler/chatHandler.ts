import { Application, Channel, ChannelService, FrontendSession } from 'pinus';

export default function (app: Application) {
    return new ChatHandler(app);
}

export class ChatHandler {
    constructor(private app: Application) {

    }

    /**
     * Send messages to users
     * @param msg message from client
     * @param session 
     * @returns 
     */
    public send(msg: any, session: FrontendSession) {
        let rid = session.get('rid');
        let username = session.uid.split('*')[0];
        let channelService: ChannelService = this.app.get('channelService')
        let channel: Channel = channelService.getChannel(rid, false);
        let param = {
            msg: msg.content,
            from: username,
            target: msg.target
        }
        //the target is all users
        if (msg.target == '*') {
            channel.pushMessage('onChat', param);
        }
        //the target is specific user
        else {
            let tuid = msg.target + '*' + rid;
            let tsid = channel.getMember(tuid)['sid'];
            channelService.pushMessageByUids('onChat', param, [{
                uid: tuid,
                sid: tsid
            }]);
        }

        return { route: msg.route }
    }
}