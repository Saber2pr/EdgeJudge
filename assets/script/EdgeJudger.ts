/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:37
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-15 23:36:37
 */
import { reduceVec2 } from './MathVec'
import { toWPos, toSize, toBlack, toWhite } from './NodeVec'
import Changed from './Changed'

export default class EdgeJudger {
  private moveNode: cc.Node
  private staticNode: cc.Node[]
  private _setPos: cc.Vec2
  private changed: Changed
  constructor(moveNode: cc.Node, staticNode: cc.Node[]) {
    this.moveNode = moveNode
    this.staticNode = staticNode
    this.changed = new Changed()
  }
  /**
   * 更新节点位置
   * @param pos
   */
  public step(pos: cc.Vec2) {
    this.changed.onChanged(pos, () => {
      let check = this.staticNode.filter(node => {
        return this.judge(this.moveNode, node)
      })
      if (check.length > 0) {
        toBlack(this.moveNode)
        this.moveNode.setPosition(
          pos.x,
          check[0].y - check[0].height / 2 - this.moveNode.height / 2
        )
      } else {
        toWhite(this.moveNode)
        this.moveNode.setPosition(pos)
      }
    })
  }
  /**
   * 判断是否越界
   * @param moveNode
   * @param staticNode
   */
  private judge(moveNode: cc.Node, staticNode: cc.Node) {
    let _disten_width = moveNode.width / 2 + staticNode.width / 2
    let _disten_height = moveNode.height / 2 + staticNode.height / 2
    let disten = reduceVec2(
      moveNode.getParent().convertToWorldSpaceAR(moveNode.getPosition()),
      staticNode.getParent().convertToWorldSpaceAR(staticNode.getPosition())
    )
    if (
      Math.abs(disten.x) > _disten_width ||
      Math.abs(disten.y) > _disten_height
    ) {
      return false
    } else {
      return true
    }
  }
}
