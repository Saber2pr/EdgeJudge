/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:20
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-15 23:36:20
 */
export let toWPos = (node: cc.Node): cc.Vec2 =>
  node.getParent().convertToWorldSpaceAR(node.getPosition())

export let toSize = (node: cc.Node): cc.Size => node.getContentSize()

export let toBlack = (node: cc.Node): void => {
  node.color = cc.Color.BLACK
}

export let toWhite = (node: cc.Node): void => {
  node.color = cc.Color.WHITE
}
