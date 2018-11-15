/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:30
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-15 23:36:30
 */
import NodeProxy from './NodeProxy'

const { ccclass, property } = cc._decorator

@ccclass
export default class TouchFollow extends cc.Component {
  start() {
    this.node.on('touchmove', touch => {
      let localPoint = this.node
        .getParent()
        .convertToNodeSpaceAR(touch.getLocation())
      NodeProxy.heroPos = localPoint
    })
  }
}
