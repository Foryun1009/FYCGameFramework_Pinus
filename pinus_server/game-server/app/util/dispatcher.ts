import { ServerInfo } from "pinus"

let crc = require('crc')

export class Dispatcher {
    public static dispatch(uid: string, connectors: ServerInfo[]) {
        let index = Math.abs(crc.crc32(uid)) % connectors.length;
        return connectors[index];
    }
}