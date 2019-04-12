/**
 *
 *
 * @class Color
 */
class Color {
  /**
   * The CSS string value of the color.
   * @type {string}
   * @memberof Color
   */
  public string: string;

  /**
   * The JS hex number of the color.
   * @type {number}
   * @memberof Color
   */
  // public hex: number;

  /**
   *Creates an instance of Color.
   * @param {string} color
   * @memberof Color
   */
  constructor(color: string) {
    this.string = color;
  }

  /**
   *
   *
   * @readonly
   * @memberof Color
   */
  public get hex() {
    return this._createHex(this.string);
  }

  /**
   *
   * Creates the hex value from the mui string.
   * @private
   * @param {string} color
   * @returns {number}
   * @memberof Color
   */
  private _createHex(color: string): number {
    return Number(`0x${color.replace("#", "")}`);
  }
}

const colors: { [any: string]: Color } = {
  white: new Color("#ffffff"),
  black: new Color("#171c21"),
  blue: new Color("#0075bc"),
  darkblue: new Color("#005c94"),
  offwhite: new Color("#eef2f7"),
  gray: new Color("#4d5257"),
};

export default colors;
