/*
 * @Author: AK-12
 * @Date: 2018-11-16 20:04:08
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-16 20:04:08
 */
import MoveCtrllor from './MoveCtrllor'
import NodeProxy from './NodeProxy'

const { ccclass, property } = cc._decorator

@ccclass
export default class MoveBoot extends cc.Component {
  @property({
    type: cc.Node,
    displayName: '摇杆盘'
  })
  basicSpr: cc.Node = null

  @property({
    type: cc.Node,
    displayName: '摇杆拖动点'
  })
  touchSpr: cc.Node = null

  @property({
    type: cc.Integer,
    displayName: '拖动半径',
    tooltip: '默认25'
  })
  radius: number = 25

  @property({
    type: cc.Integer,
    displayName: '角色移动速度',
    tooltip: '默认5',
    slide: true,
    min: 1,
    max: 15,
    step: 1
  })
  heroSpeed: number = 5

  onLoad() {
    MoveCtrllor.getInstance().init(
      this.basicSpr,
      this.touchSpr,
      this.radius,
      this.heroSpeed
    )
  }

  update() {
    MoveCtrllor.getInstance().step(NodeProxy.hero)
  }
}
