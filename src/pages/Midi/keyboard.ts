// import { keyboardInterface } from "./TypesKeyboard";

class Keyboard {
    octav: number = 3;
  
    keysMouse: string[] = [
      `C${this.octav}`,
      `C#${this.octav}`,
      `D${this.octav}`,
      `D#${this.octav}`,
      `E${this.octav}`,
      `F${this.octav}`,
      `F#${this.octav}`,
      `G${this.octav}`,
      `G#${this.octav}`,
      `A${this.octav}`,
      `A#${this.octav}`,
      `B${this.octav}`,
      `C${this.octav + 1}`,
      `C#${this.octav + 1}`,
      `D${this.octav + 1}`,
      `D#${this.octav + 1}`,
      `E${this.octav + 1}`,
      `F${this.octav + 1}`,
      `F#${this.octav + 1}`,
      `G${this.octav + 1}`,
      `G#${this.octav + 1}`,
      `A${this.octav + 1}`,
      `A#${this.octav + 1}`,
      `B${this.octav + 1}`,
      `C${this.octav + 1}`,
    ];
    keysButtons = {
      'q': `C${this.octav}`,
      '2': `C#${this.octav}`,
      'w': `D${this.octav}`,
      '3': `D#${this.octav}`,
      'e': `E${this.octav}`,
      'r': `F${this.octav}`,
      '5': `F#${this.octav}`,
      't': `G${this.octav}`,
      '6': `G#${this.octav}`,
      'y': `A${this.octav}`,
      '7': `A#${this.octav}`,
      'u': `B${this.octav}`,
      'c': `C${this.octav + 1}`,
      'f': `C#${this.octav + 1}`,
      'v': `D${this.octav + 1}`,
      'g': `D#${this.octav + 1}`,
      'b': `E${this.octav + 1}`,
      'n': `F${this.octav + 1}`,
      'j': `F#${this.octav + 1}`,
      'm': `G${this.octav + 1}`,
      'k': `G#${this.octav + 1}`,
      ',': `A${this.octav + 1}`,
      'l': `A#${this.octav + 1}`,
      '.': `B${this.octav + 1}`,
      '/': `C${this.octav + 2}`
    }
  }
  
  export default new Keyboard()