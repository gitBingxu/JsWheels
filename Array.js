class TreeNode {
  static counter = 0
  constructor(label, pid){
    this.pid = pid
    this.id = TreeNode.counter++
    this.label = label
    this.children = []
  }
}

function getIndex (node, label) {
  const index = node.children.findIndex(item => {
    return item.label === label
  })
  if (index < 0) {
    node.children.push(new TreeNode(label, node.id))
    return getIndex(node, label)
  }
  return index
}

function getNode (tree, condition, obj) {
  let node = tree
  const conditions = JSON.parse(JSON.stringify(condition))
  while (condition.length) {
    node = node.children[getIndex(node, obj[conditions[0]])]
    conditions.shift()
  }
  return node
}

function arrayTotree (source, ...condition) {
  const root = new TreeNode('root', -1)
  source.forEach(item => {
    getNode(root, condition, item).children.push(item)
  })
  return root
}

