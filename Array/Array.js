/*
 * @Author: Bing Xu
 * @Date: 2019-12-12 15:38:58
 * @LastEditTime: 2020-03-19 17:06:46
 * @LastEditors: Bing Xu
 * @Description: 
 * @FilePath: /JsWheels/Array/Array.js
 */
class TreeNode {
  static counter = 0
  constructor(pid, label, id = `${TreeNode.counter++}`, children = []){
    this.pid = pid
    this.id = id
    this.label = label
    this.children = children
  }
}

function getIndex (node, label) {
  const index = node.children.findIndex(item => {
    return item.label === label
  })
  if (index < 0) {
    node.children.push(new TreeNode(node.id, label))
    return getIndex(node, label)
  }
  return index
}

function getNode (tree, condition, obj) {
  let node = tree
  condition.forEach(item => {
    node = node.children[getIndex(node, obj[item])]
  })
  return node
}

/**
 * @param {Array<Object>} source // 源数组
 * @param {string} label // 最后叶子节点 展示的label
 * @param {string} condition // 每一级分类用的 tag
 * @return {TreeNode}
 */
function arrayTotree (source, label, ...condition) {
  const root = new TreeNode(-1, 'root')
  source.forEach(item => {
    const node = getNode(root, condition, item)
    node.children.push(new TreeNode(node.id, item[label], item.id))
  })
  return root
}

export {
  arrayTotree
}
