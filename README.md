## 添加服务器

需要修改的配置文件有：

- game-server/config/adminServer.json

  ```typescript
  [{
      "type": "connector",
      "token": ""
  }, {
      "type": "chat",
      "token": ""
  }, {
      "type": "gate",
      "token": ""
  }]
  ```

- game-server/config/servers.json

  ```typescript
  {
    "development": {
      "connector": [{
          "id": "connector-server-1",
          "host": "127.0.0.1",
          "port": 4050,
          "clientHost": "127.0.0.1",
          "clientPort": 3050,
          "frontend": true
        }
      ],
      "chat": [{
          "id": "chat-server-1",
          "host": "127.0.0.1",
          "port": 6050
        }
      ],
      "gate": [{
        "id": "gate-server-1",
        "host": "127.0.0.1",
        "port": 4014,
        "clientHost": "127.0.0.1",
        "clientPort": 3014,
        "frontend": true
      }]
    },
    "production": {
      "connector": [{
          "id": "connector-server-1",
          "host": "127.0.0.1",
          "port": 4050,
          "clientHost": "127.0.0.1",
          "clientPort": 3050,
          "frontend": true
        }
      ],
      "chat": [{
          "id": "chat-server-1",
          "host": "127.0.0.1",
          "port": 6050
        }
      ],
      "gate": [{
        "id": "gate-server-1",
        "host": "127.0.0.1",
        "port": 4014,
        "clientHost": "127.0.0.1",
        "clientPort": 3014,
        "frontend": true
      }]
    }
  }
  ```
  
- game-server/app.ts

  ```typescript
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
  ```

  

