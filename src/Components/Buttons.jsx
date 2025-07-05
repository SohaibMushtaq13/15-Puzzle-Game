import RandomArray from "./js/RandomArray";
import "./Buttons.css";
import splitArr from "./js/splitArray";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function Buttons() {
  const [buttton, setButtons] = useState(RandomArray);
  const [move, setMove] = useState(0);
  const [sec, setSec] = useState(0);
  const comparisonArray = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    null,
  ];
  const timeAllowed = 599;

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((prevSec) => {
        if (prevSec >= 599) {
          clearInterval(interval);
        }
        return prevSec + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function isWin() {
    for (let i = 0; i < comparisonArray.length; i++) {
      if (buttton[i] !== comparisonArray[i]) {
        return false;
      }
    }
    return true;
  }

  function isLose() {
    return timeAllowed === sec;
  }
  function findCoordinates(matrix, value) {
    for (let row = 0; row < matrix.length; row++) {
      const col = matrix[row].indexOf(value);
      if (col !== -1) {
        return [row, col];
      }
    }
    return null;
  }

  function findEmptyVal(coords, value) {
    const [row, col] = coords;

    setButtons((prevFlat) => {
      const matrix = splitArr(prevFlat, 4);
      const newMatrix = matrix.map((inner) => [...inner]);

      if (col > 0 && newMatrix[row][col - 1] === null) {
        newMatrix[row][col - 1] = value;
        newMatrix[row][col] = null;
      } else if (
        col < newMatrix[row].length - 1 &&
        newMatrix[row][col + 1] === null
      ) {
        newMatrix[row][col + 1] = value;
        newMatrix[row][col] = null;
      } else if (
        row < newMatrix.length - 1 &&
        newMatrix[row + 1][col] === null
      ) {
        newMatrix[row + 1][col] = value;
        newMatrix[row][col] = null;
      } else if (row > 0 && newMatrix[row - 1][col] === null) {
        newMatrix[row - 1][col] = value;
        newMatrix[row][col] = null;
      } else {
        return prevFlat;
      }

      return newMatrix.flat();
    });
  }
  function isCorrectPosition(num) {
    return buttton.indexOf(num) === comparisonArray.indexOf(num);
  }
  function handleClick(event) {
    if (isLose() || isWin()) return;
    setMove((preMove) => preMove + 1);
    const clickedValue = Number(event.target.dataset.value);

    if (isNaN(clickedValue)) return;
    const output = splitArr(buttton, 4);

    const coords = findCoordinates(output, clickedValue);
    if (coords) {
      findEmptyVal(coords, clickedValue);
    }
  }
  function checkTime() {
    if (timeAllowed === sec) {
      return true;
    }
  }

  const Buttons = buttton.map((num, idx) => (
    <div
      className={clsx({
        btn: true,
        "btn-active": isCorrectPosition(num),
        "disable-buttons": checkTime(),
      })}
      key={idx}
      data-value={num}
    >
      {num !== null ? num : ""}
    </div>
  ));

  function resetGame() {
    window.location.reload();
  }

  return (
    <>
      <div className="movesTime">
        <span>Moves: {move}</span>
        <span>Time:{sec}s</span>
      </div>
      <div className="btn-container" onClick={handleClick}>
        {Buttons}
      </div>

      <button className="newGame-btn" onClick={resetGame}>
        New Game
      </button>
    </>
  );
}
