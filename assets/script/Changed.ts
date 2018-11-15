/*
 * @Author: AK-12
 * @Date: 2018-11-15 23:29:20
 * @Last Modified by:   AK-12
 * @Last Modified time: 2018-11-15 23:29:20
 */
export default class Changed {
  private _last
  public onChanged(checkValue, callback: Function): void {
    if (this._last !== checkValue) {
      callback()
    }
    this._last = checkValue
  }
}
