const { ccclass, property } = cc._decorator
import EdgeJudger from './EdgeJudger'
import NodeProxy from './NodeProxy'

@ccclass
export default class Layer extends cc.Component {
  @property([cc.Node])
  edge: cc.Node[] = []

  @property(cc.Node)
  hero: cc.Node = null

  EdgeJudge: EdgeJudger

  onLoad() {
    NodeProxy.edge = this.edge
    NodeProxy.hero = this.hero
  }

  start() {
    this.EdgeJudge = new EdgeJudger(NodeProxy.hero, NodeProxy.edge)
  }

  update() {
    this.EdgeJudge.step(NodeProxy.heroPos)
  }
}
