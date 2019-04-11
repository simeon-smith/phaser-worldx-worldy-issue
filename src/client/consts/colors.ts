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
  blue: new Color("#4286f4"),
  ltBlue: new Color("#68a2ff"),
  tan: new Color("#efe8ce"),
  medTan: new Color("#e2dabc"),
  white: new Color("#ffffff"),
};

export default colors;
