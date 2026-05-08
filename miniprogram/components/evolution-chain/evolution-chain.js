const spriteUtil = require('../../utils/sprite.js');

Component({
  properties: {
    spriteId: {
      type: Number,
      value: 0
    },
    chain: {
      type: Object,
      value: null
    }
  },

  data: {
    nodes: [],
    hasChain: false
  },

  observers: {
    'chain, spriteId': function(chain, spriteId) {
      if (!chain) {
        this.setData({ hasChain: false, nodes: [] });
        return;
      }
      this.buildNodes(chain, spriteId);
    }
  },

  methods: {
    buildNodes(chain, currentId) {
      var edges = chain.edges || [];
      var members = chain.members || [];
      var stages = chain.stages || [];
      var nodes = [];
      var visited = {};

      // 构建邻接表
      var adj = {};
      edges.forEach(function(e) {
        if (!adj[e.from]) adj[e.from] = [];
        adj[e.from].push(e);
      });

      // 找到初始节点（没有指向它的边）
      var hasIncoming = {};
      edges.forEach(function(e) {
        hasIncoming[e.to] = true;
      });
      var roots = members.filter(function(id) {
        return !hasIncoming[id];
      });

      // BFS构建节点列表
      var queue = roots.slice();
      var depthMap = {};
      roots.forEach(function(r) { depthMap[r] = 0; });

      while (queue.length > 0) {
        var id = queue.shift();
        if (visited[id]) continue;
        visited[id] = true;

        var sprite = spriteUtil.getSprite(id);
        var spriteData = {
          id: id,
          name: sprite ? sprite.name : '?',
          elementClass: sprite ? sprite.elementClass : 'normal',
          elementName: sprite ? sprite.elementName : '?',
          isCurrent: id === currentId,
          depth: depthMap[id] || 0
        };
        nodes.push(spriteData);

        var nextEdges = adj[id] || [];
        nextEdges.forEach(function(edge) {
          if (!visited[edge.to] && queue.indexOf(edge.to) === -1) {
            queue.push(edge.to);
            depthMap[edge.to] = (depthMap[id] || 0) + 1;
          }
        });
      }

      // 为每对父子生成连接器
      var result = [];
      nodes.forEach(function(node, i) {
        if (i > 0) {
          // 找连接边
          var prevNode = nodes[i - 1];
          var connectorEdges = edges.filter(function(e) {
            return e.from === prevNode.id && e.to === node.id;
          });
          result.push({
            type: 'connector',
            condition: connectorEdges.length > 0 ? connectorEdges[0].cond : null,
            isBranch: edges.filter(function(e) { return e.from === prevNode.id; }).length > 1
          });
        }
        result.push({ type: 'node', data: node });
      });

      this.setData({
        nodes: result,
        hasChain: result.length > 0
      });
    },

    onNodeTap: function(e) {
      var id = e.currentTarget.dataset.id;
      if (id) {
        wx.navigateTo({ url: '/pages/sprite-detail/sprite-detail?id=' + id });
      }
    }
  }
});
