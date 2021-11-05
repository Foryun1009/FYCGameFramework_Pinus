
import { _decorator, Component, Node, debug, log } from 'cc';
import { FYMain } from '../Base/FYFramework/Base/FYMain';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends FYMain {
    start() {
        pinus.init({
            host: window.location.hostname,
            port: 3014,
            log: true
        }, function() {
            console.log("----------")
            pinus.request('gate.gateHandler.queryEntry', {
                uid: 'Danic'
            }, function(data) {
                console.log(data)
            });
        });
    }
}