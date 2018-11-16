/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:24
 * @Last Modified by: AK-12
 * @Last Modified time: 2018-11-16 13:50:17
 */
/**
 * 两点相减
 * @param p1
 * @param p2
 */
export let reduceVec2 = (p1: cc.Vec2, p2: cc.Vec2) =>
  cc.v2(p1.x - p2.x, p1.y - p2.y)
/**
 * 检查array元素,若存在符合条件的元素则返回结果
 * @param arr
 * @param callback
 */
export function checkArray<Type>(
  arr: Type[],
  callback: (item: Type) => boolean
): boolean {
  for (let item of arr) {
    let result = callback(item)
    if (result) {
      return result
    }
  }
}
/**
 * 检测值是否在指定范围
 * @param v
 * @param range
 */
export let isIn = (v: number, range: cc.Vec2): boolean =>
  v < range.y && v > range.x
/**
 * 给次态的值添加上限
 * @param value
 * @param max
 */
export let addMax = (value: number, max: number) => (value < max ? value : max)
/**
 * 给次态的值添加下限
 *
 * @param value
 * @param min
 */
export let addMin = (value: number, min: number) => (value > min ? value : min)
/**
 * 获取象限
 *
 * @param pos
 * @param nodeX
 * @param nodeY
 */
export function getQuad(pos: cc.Vec2, nodeX: cc.Node, nodeY: cc.Node): number {
  let result_x = pos.x - nodeX.x
  let result_y = pos.y - nodeY.y
  let result
  if (result_x > 0) {
    if (result_y > 0) {
      result = 1
    } else {
      result = 4
    }
  } else {
    if (result_y > 0) {
      result = 2
    } else {
      result = 3
    }
  }
  return result
}
/**
 * 获取包络边界
 *
 * @param moveNode
 * @param staticNode
 */
export function getAround(moveNode: cc.Node, staticNode: cc.Node) {
  return {
    x: {
      min: staticNode.x - staticNode.width / 2 - moveNode.width / 2,
      max: staticNode.x + staticNode.width / 2 + moveNode.width / 2
    },
    y: {
      min: staticNode.y - staticNode.height / 2 - moveNode.height / 2,
      max: staticNode.y + staticNode.height / 2 + moveNode.height / 2
    }
  }
}
