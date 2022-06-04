import { useState } from "react";
import "./App.css";
import colorsys from "colorsys";

function App() {
  const [h, setH] = useState(0);
  const [s, setS] = useState(0);
  const [v, setV] = useState(0);
  const [n, setN] = useState(1);

  // function hsv2hsl(h, s, v) {
  //   var l = ((2 - s) * v) / 2;

  //   if (l !== 0) {
  //     if (l === 1) {
  //       s = 0;
  //     } else if (l < 0.5) {
  //       s = (s * v) / (l * 2);
  //     } else {
  //       s = (s * v) / (2 - l * 2);
  //     }
  //   }

  //   return [h, s, l];
  // }

  // function hsv2rgb(h, s, v) {
  //   let f = (n, k = (n + h / 60) % 6) =>
  //     v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  //   return [f(5), f(3), f(1)];
  // }

  const genArray = (h, s, v, n) => {
    const hue = parseInt(h);
    const saturation = parseInt(s);
    const value = parseInt(v);
    const num = parseInt(n);
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push({
        h: (Math.round(360 / num) * i + hue) % 360,
        s: saturation,
        v: value,
      });
    }
    return arr.sort((a, b) => {
      return a.h - b.h;
    });
  };

  const genJSX = (h, s, v, n) => {
    const arr = genArray(h, s, v, n);
    return arr.map((obj) => {
      const rgb = colorsys.hsv2Rgb(obj.h, obj.s, obj.v);
      return (
        <div className="card" key={obj.h}>
          <div
            className="color"
            style={{ backgroundColor: colorsys.stringify(rgb) }}
          ></div>
          <div className="text">
            {colorsys.stringify({ h: obj.h, s: obj.s, v: obj.v })}; {colorsys.rgb2Hex(rgb)}
          </div>
          {console.log(obj)}
        </div>
      );
    });
  };

  const handleClick = () => {
    setH(0);
    setV(0);
    setS(0);
    setN(1);
  }

  // console.log(colorsys.hsl2Rgb(473, 23, 119))
  // console.log(genArray(33, 27, 11, 13))

  return (
    <div className="App">
      <form className="form">
        <div className="input">
          <label htmlFor="h">H</label>
          <input
            type="number"
            id="h"
            min="0"
            max="360"
            value={h}
            onChange={(e) => setH(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="s">S</label>
          <input
            type="number"
            id="s"
            min="0"
            max="100"
            value={s}
            onChange={(e) => setS(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="v">V</label>
          <input
            type="number"
            id="v"
            min="0"
            max="100"
            value={v}
            onChange={(e) => setV(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="n">n</label>
          <input
            type="number"
            id="n"
            min="1"
            max="15"
            value={n}
            onChange={(e) => setN(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleClick}>Reset</button>
      </form>
      <br />
      <div className="output">{genJSX(h, s, v, n)}</div>
    </div>
  );
}

export default App;
