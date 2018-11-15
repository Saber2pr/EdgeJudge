/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:36:24
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-15 23:36:24
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
