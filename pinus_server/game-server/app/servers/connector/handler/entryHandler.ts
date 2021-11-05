import { Application, FrontendSession, SessionService } from 'pinus';

export default function (app: Application) {
    return new EntryHandler(app);
}

export class EntryHandler {
    constructor(private app: Application) {

    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     */
    async entry(msg: any, session: FrontendSession) {
        let rid = msg.rid;
        let uid = msg.username + '*' + rid
        let sessionService: SessionService = this.app.get('sessionService');
        if (!!sessionService.getByUid(uid)) {
            return { code: 500, error: true }
        }

        session.bind(uid, null);
        session.set('rid', rid);
        session.push('rid', (err) => {
            if (err) {
                console.error('set rid for session service failed! error is : %j', err.stack);
            }
        });
        session.on('closed', this.onUserLeave.bind(null, this.app));

        this.app.rpc.chat.chatRemote.add(session, uid, this.app.get('serverId'), rid, true, (users) => {
            return { users: users }
        })
    }

    onUserLeave(app: Application, session: FrontendSession) {
        if (!session || !session.uid) {
            return;
        }

        app.rpc.chat.chatRemote.kick(session, session.uid, app.get('serverId'), session.get('rid'), null);
    }

}