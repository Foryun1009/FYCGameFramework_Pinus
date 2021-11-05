## Prefab结构解析

- 用文本打开预制文件，可以看到预制是json结构，且json结构的开头，是个数组。数组的第一个数据是数据的类型，这里是预制，所以类型是cc.Prefab:

  ```json
    {
      "__type__": "cc.Prefab",
      ...
    }
  ```

- 第二个数据，是根节点的节点信息，每个节点，都有开始标记（cc.Node），和结束标记（cc.PrefabInfo）

- 节点开始标记

  ```json
  {
      "__type__": "cc.Node",
      "_name": "P_UI_UITips",
    	...
    }
  ```

- 节点结束标记

  ```json
    {
      "__type__": "cc.PrefabInfo",
      ...
    }
  ```

- 如果节点有挂其他组件，则在节点的开始标记和结束标记之间有组件信息，组件也有开始标记（组件类型）和结束标记（cc.CompPrefabInfo）

- 组件开始标记

  ```json
    {
      "__type__": "cc.UITransform",
      ...
    }
  ```

- 组件结束标记

  ```json
    {
      "__type__": "cc.CompPrefabInfo",
      ...
    }
  ```

- 拿P_UI_UITips预制举例，该预制的层次结构是：

  ```
  P_UI_UITips(Node)
  ->Widget(Node,cc.UITransform)
  -->Bg(Node,cc.UITransform,cc.Sprite)
  -->_Tips_(Node,cc.UITransform,cc.Label)
  ```

- 其简化版的预制配置表达如下：

  ```json
  [
  {"__type__": "cc.Prefab"},
  
  {"__type__": "cc.Node","_name": "P_UI_UITips"},
  
  {"__type__": "cc.Node","_name": "Widget"},
  
  {"__type__": "cc.Node","_name": "Bg"},
  {"__type__": "cc.UITransform"},
  {"__type__": "cc.CompPrefabInfo"},
  {"__type__": "cc.Sprite"},
  {"__type__": "cc.CompPrefabInfo"},
  {"__type__": "cc.PrefabInfo"},
  
  {"__type__": "cc.Node","_name": "_Tips_"},
  {"__type__": "cc.UITransform"},
  {"__type__": "cc.CompPrefabInfo"},
  {"__type__": "cc.Label"},
  {"__type__": "cc.CompPrefabInfo"},
  {"__type__": "cc.PrefabInfo"},
  
  {"__type__": "cc.UITransform"},
  {"__type__": "cc.CompPrefabInfo"},
  
  {"__type__": "cc.PrefabInfo"},
  
  {"__type__": "cc.PrefabInfo"},
  ]
  ```

  
