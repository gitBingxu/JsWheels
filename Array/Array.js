class TreeNode {
  static counter = 0
  constructor(label, pid, id = -1){
    this.pid = pid
    this.id = id || TreeNode.counter++
    this.label = label
    this.children = []
  }
}

function getIndex (node, label, id) {
  const index = node.children.findIndex(item => {
    return item.label === label
  })
  if (index < 0) {
    node.children.push(new TreeNode(label, node.id, id))
    return getIndex(node, label)
  }
  return index
}

function getNode (tree, condition, obj) {
  let node = tree
  condition.forEach(item => {
    node = node.children[getIndex(node, obj[item], obj['id'])]
  })
  return node
}

function arrayTotree (source, label, ...condition) {
  const root = new TreeNode('root', -1)
  source.forEach(item => {
    const node = getNode(root, condition, item)
    node.children.push(new TreeNode(item[label], node.id))
  })
  return root
}

export {
  arrayTotree
}
