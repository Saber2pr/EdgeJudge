/*
 * @Author: AK-12
 * @Date: 2018-11-16 20:04:15
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-16 20:33:05
 */
const { ccclass, property } = cc._decorator
import EdgeJudger from './EdgeJudger'
import NodeProxy from './NodeProxy'

@ccclass
export default class Layer extends cc.Component {
  @property({
    type: cc.Node,
    tooltip: '只有挂在这个节点下的障碍才会检测'
  })
  edge: cc.Node = null

  @property(cc.Node)
  hero: cc.Node = null

  @property(cc.Node)
  background: cc.Node = null

  EdgeJudge: EdgeJudger

  onLoad() {
    NodeProxy.edge = this.edge.children
    NodeProxy.hero = this.hero
  }

  start() {
    this.background.runAction(cc.follow(NodeProxy.hero, cc.rect(0, 0, 0, 0)))
    this.EdgeJudge = new EdgeJudger(NodeProxy.hero, NodeProxy.edge)
  }

  update() {
    this.EdgeJudge.step(NodeProxy.heroPos)
  }
}
