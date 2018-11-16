/*
 * @Author: AK-12
 * @Date: 2018-10-30 22:46:42
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-16 19:20:43
 */
import { limitToCircle, getAngle } from './MathVec'
import NodeProxy from './NodeProxy'
/**
 *MoveCtrllor
 *
 * @export
 * @class MoveCtrllor
 */
export default class MoveCtrllor {
  private constructor() {}
  private static instance: MoveCtrllor
  static getInstance(): MoveCtrllor {
    this.instance = !!this.instance ? this.instance : new MoveCtrllor()
    return this.instance
  }
  private angle: number
  private status: boolean
  private radius: number
  private heroSpeed: number

  private refresh(touchNode: cc.Node) {
    this.angle = 0
    this.status = false
    touchNode.setPosition(0, 0)
  }
  /**
   *传入拖动盘和拖动点，实现拖动手柄
   *
   * @param {cc.Node} basicNode
   * @param {cc.Node} touchNode
   * @param {number} [radius=25]
   * @param {number} [heroSpeed=5]
   * @memberof MoveCtrllor
   */
  public init(
    basicNode: cc.Node,
    touchNode: cc.Node,
    radius: number = 25,
    heroSpeed: number = 5
  ) {
    this.refresh(touchNode)
    this.radius = radius
    this.heroSpeed = heroSpeed
    basicNode.on('touchstart', () => {
      this.status = true
    })
    basicNode.on('touchmove', event => {
      let localPoint = basicNode.convertToNodeSpaceAR(event.getLocation())
      let touch_limited = limitToCircle(localPoint, this.radius)
      touchNode.setPosition(touch_limited)
      this.angle = getAngle(touch_limited)
    })
    basicNode.on('touchend', () => {
      this.refresh(touchNode)
    })
    basicNode.on('touchcancel', () => {
      this.refresh(touchNode)
    })
  }
  /**
   *speed
   *
   * @memberof MoveCtrllor
   */
  set speed(value: number) {
    this.heroSpeed = value
  }
  get speed(): number {
    return this.heroSpeed
  }
  /**
   *step
   *
   * @param {*} node
   * @memberof MoveCtrllor
   */
  public step(node: cc.Node): void {
    if (this.status === true) {
      let angle = this.angle
      let desPos = cc.v2(
        node.x + this.heroSpeed * Math.cos(angle),
        node.y + this.heroSpeed * Math.sin(angle)
      )
      NodeProxy.heroPos = desPos
    }
  }
}
