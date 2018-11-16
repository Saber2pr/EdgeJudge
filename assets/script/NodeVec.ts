/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:20
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-16 13:46:33
 */
/**
 * 获取世界坐标
 * @param node
 */
export let toWPos = (node: cc.Node): cc.Vec2 =>
  node.getParent().convertToWorldSpaceAR(node.getPosition())
/**
 * 获取size
 * @param node
 */
export let toSize = (node: cc.Node): cc.Size => node.getContentSize()
/**
 * 变成黑色
 * @param node
 */
export let toBlack = (node: cc.Node): void => {
  node.color = cc.Color.BLACK
}
/**
 * 变成白色
 * @param node
 */
export let toWhite = (node: cc.Node): void => {
  node.color = cc.Color.WHITE
}
/**
 * 变成红色
 * @param node
 */
export let toRed = (node: cc.Node): void => {
  node.color = cc.Color.RED
}
