/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:37
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-16 21:21:26
 */
import { reduceVec2, isIn, addMax, addMin, getQuad, getAround } from './MathVec'
import { toBlack, toWhite, toRed } from './NodeVec'
import Changed from './Changed'
/**
 *边界检测
 *
 * 横向节点必须位于上层
 * @export
 * @class EdgeJudger
 */
export default class EdgeJudger {
  private moveNode: cc.Node
  private staticNode: cc.Node[]
  private changed: Changed
  constructor(moveNode: cc.Node, staticNode: cc.Node[]) {
    this.moveNode = moveNode
    this.staticNode = staticNode
    this.changed = new Changed()
  }
  /**
   * 更新节点位置,本地坐标判断
   * @param pos
   */
  public step(pos: cc.Vec2) {
    this.changed.onChanged(pos, () => {
      let check = this.staticNode.filter(node => {
        return this.judge(this.moveNode, node)
      })
      if (check.length === 1) {
        toBlack(this.moveNode)
        let pos_limited = this.getLimitedPos(pos, check[0], this.moveNode)
        this.moveNode.setPosition(
          this.getPos(this.moveNode, check[0], pos, pos_limited)
        )
      } else if (check.length === 2) {
        let dpos = pos
        let node_buttom
        let node_top
        if (check[0].zIndex > check[1].zIndex) {
          node_top = check[0]
          node_buttom = check[1]
        } else {
          node_top = check[1]
          node_buttom = check[0]
        }

        let aroundPosY = getAround(this.moveNode, node_buttom)
        let aroundPosX = getAround(this.moveNode, node_top)

        let quad = getQuad(pos, node_buttom, node_top)

        switch (quad) {
          case 1:
            dpos = cc.v2(
              addMin(pos.x, aroundPosY.x.max),
              addMin(pos.y, aroundPosX.y.max)
            )
            break
          case 2:
            dpos = cc.v2(
              addMax(pos.x, aroundPosY.x.min),
              addMin(pos.y, aroundPosX.y.max)
            )
            break
          case 3:
            dpos = cc.v2(
              addMax(pos.x, aroundPosY.x.min),
              addMax(pos.y, aroundPosX.y.min)
            )
            break
          case 4:
            dpos = cc.v2(
              addMin(pos.x, aroundPosY.x.max),
              addMax(pos.y, aroundPosX.y.min)
            )
            break
        }
        this.moveNode.setPosition(dpos)
      } else {
        toWhite(this.moveNode)
        this.moveNode.setPosition(pos)
      }
    })
  }
  /**
   * 获取结果点
   * @param moveNode
   * @param staticNode
   * @param pos
   * @param pos_limited
   */
  private getPos(moveNode, staticNode, pos, pos_limited): cc.Vec2 {
    let result
    this.inMoveSize(
      staticNode,
      moveNode,
      (range_moveSize_x, range_size_x, range_moveSize_y, range_size_y) => {
        if (isIn(pos.x, range_moveSize_x) && !isIn(pos.y, range_size_y)) {
          result = cc.v2(pos.x, pos_limited.y)
        } else if (
          isIn(pos.y, range_moveSize_y) &&
          !isIn(pos.x, range_size_x)
        ) {
          result = cc.v2(pos_limited.x, pos.y)
        } else {
          toRed(moveNode)
          result = pos
        }
      }
    )
    return result
  }
  /**
   *获取被障碍限制后的点
   * @param posA
   * @param staticNode
   * @param moveNode
   */
  private getLimitedPos(
    posA: cc.Vec2,
    staticNode: cc.Node,
    moveNode: cc.Node
  ): cc.Vec2 {
    let pos_y
    let pos_x
    if (
      posA.y < staticNode.y + staticNode.height / 2 + moveNode.height / 2 &&
      posA.y > staticNode.y - staticNode.height / 2 - moveNode.height / 2
    ) {
      if (posA.y < staticNode.y) {
        pos_y = staticNode.y - staticNode.height / 2 - moveNode.height / 2
      } else {
        pos_y = staticNode.y + staticNode.height / 2 + moveNode.height / 2
      }
    } else {
      pos_y = posA.y
    }

    if (
      posA.x < staticNode.x + staticNode.width / 2 + moveNode.width / 2 &&
      posA.x > staticNode.x - staticNode.width / 2 - moveNode.width / 2
    ) {
      if (posA.x < staticNode.x) {
        pos_x = staticNode.x - staticNode.width / 2 - moveNode.width / 2
      } else {
        pos_x = staticNode.x + staticNode.width / 2 + moveNode.width / 2
      }
    } else {
      pos_x = posA.x
    }
    return cc.v2(pos_x, pos_y)
  }
  /**
   *在edge执行回调
   *
   * @param staticNode
   * @param moveNode
   * @param callback
   */
  private inMoveSize(
    staticNode: cc.Node,
    moveNode: cc.Node,
    callback: (
      range_moveSize_x: cc.Vec2,
      range_size_x: cc.Vec2,
      range_moveSize_y: cc.Vec2,
      range_size_y: cc.Vec2
    ) => void
  ) {
    let range_moveSize_x = cc.v2(
      staticNode.x - staticNode.width / 2 - moveNode.width / 2,
      staticNode.x + staticNode.width / 2 + moveNode.width / 2
    )
    let range_size_x = cc.v2(
      staticNode.x - staticNode.width / 2,
      staticNode.x + staticNode.width / 2
    )
    let range_moveSize_y = cc.v2(
      staticNode.y - staticNode.height / 2 - moveNode.height / 2,
      staticNode.y + staticNode.height / 2 + moveNode.height / 2
    )
    let range_size_y = cc.v2(
      staticNode.y - staticNode.height / 2,
      staticNode.y + staticNode.height / 2
    )
    callback(range_moveSize_x, range_size_x, range_moveSize_y, range_size_y)
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
