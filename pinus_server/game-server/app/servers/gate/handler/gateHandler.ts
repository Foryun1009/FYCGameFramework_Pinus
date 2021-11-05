import { Application, FrontendSession } from 'pinus';
import { Dispatcher } from '../../../util/dispatcher';

export default function (app: Application) {
    return new GateHandler(app);
}

export class GateHandler {
    constructor(private app: Application) {

    }

    /**
     * New client entry.
     *
     * @param  {Object}   msg     request message
     * @param  {Object}   session current session object
     */
    async queryEntry(msg: any, session: FrontendSession) {
        let uid = msg.uid;
        if (!uid) {
            return { code: 500 };
        }
        // get all connectors
        let connectors = this.app.getServersByType('connector');
        if (!connectors || connectors.length === 0) {
            return { code: 500 };
        }
        // select connector
        let res = Dispatcher.dispatch(uid, connectors);
        return { code: 200, host: res.host, port: res.clientPort };
    }

}