class TreeNode {
  static counter = 0
  constructor(label, pid = -1){
      this.pid = pid
      this.id = TreeNode.counter++
      this.label = label
      this.children = []
  }
}

const handler = {
  apply: function(target, that, args) {
      if (target(...args) === -1) {
          const node = args[0]
          const props = args[1]
          node.children.push(new TreeNode(props, node.id))
      }
      return target(...args)
  }
}
  
function fn (node, props) {
  const index = node.children.findIndex(item => {
      return item.label === props
  })
  return index
}

const getIndex = new Proxy(fn, handler)

function getNode (source, condition) {
  let node
  while (condition.length) {
      const index = getIndex(source, condition[0])
      node = source.children[index]
      condition.shift()
  }
  return node
}

function array2tree (source, ...condition) {
  let target = new TreeNode('root')
  source.forEach(item => {
      getNode(source, condition).children.push(item)
  })
  return target
}