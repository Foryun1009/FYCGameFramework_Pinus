import { Application, FrontendSession } from "pinus";
import { Dispatcher } from "./dispatcher";

export class RouteUtil {
    public static chat(session: FrontendSession, msg, app: Application, cb) {
        let chatServers = app.getServersByType('chat');

        if (!chatServers || chatServers.length === 0) {
            cb(new Error('can not find chat servers.'));
            return;
        }

        let res = Dispatcher.dispatch(session.get('rid'), chatServers);
        cb(null, res.id);
    }
}