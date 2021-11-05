import { Pinus, pinus } from 'pinus';
import { RouteUtil } from './app/util/routeUtil';
import { preload } from './preload';

/**
 *  替换全局Promise
 *  自动解析sourcemap
 *  捕获全局错误
 */
preload();

/**
 * Init app for client.
 */
let app = pinus.createApp();
app.set('name', 'HelloWorld');

// app configuration
app.configure('production|development', 'connector', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            heartbeat: 3,
            useDict: true,
            useProtobuf: true
        });
});

// app configuration
app.configure('production|development', 'gate', function () {
    app.set('connectorConfig',
        {
            connector: pinus.connectors.hybridconnector,
            useProtobuf: true
        });
});

// app configuration
app.configure('production|development', function () {
    // route configures
    app.route('chat', RouteUtil.chat);

    // filter configures
    app.filter(new pinus.filters.timeout);
});

// start app
app.start();

