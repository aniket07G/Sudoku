import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Vibration } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BoxAnimationAction, ColAnimationAction, HintAction, HintMeterAction, RowAnimationAction } from './redux/action';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, withSpring } from 'react-native-reanimated';
import { opacity } from 'react-native-reanimated/lib/typescript/Colors';

const Quetion = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let newQuetion;
let tracker;
let upDatedtracker;
let upDated;
let UndoTrackerData = 0;
let UndoHighlightedCells = {
  cells: [{}],
  cellsGrid: [{}],
};
let UndoRowIndexLogic = 0;
let UndoColumnIndexLogic = 0;
let UndoHold = 0;
let UndoArray = [{
  highlightedCells: UndoHighlightedCells,
  rowIndexlogic: UndoRowIndexLogic,
  columnIndexlogic: UndoColumnIndexLogic,
  data: UndoHold,
  trackerData: UndoTrackerData
}];
let hintArray = [];
let hintRowCol = null;
let HintRowG;
let HintColG;
let eraseIssue = false;
let autoCorrectOne = null;
let autoCorrectTwo = null;
let doesCheck = false;
let animationArrayRow = [];
let animationArrayCol = [];
let animationArrayBox = [];
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const SudokuBoard = (props) => {

  const [highlightedCells, sethighlightedCells] = useState([]);
  const [board, setBoard] = useState(Quetion);
  const [rowIndexlogic, setrowIndexlogic] = useState(null);
  const [columnIndexlogic, setcolumnIndexlogic] = useState(null);
  const [introagate, setintrogate] = useState(false);
  const [correctNumber, setcorrectNumber] = useState(Quetion);
  const [wrongHighlighted, setWrongHighlighted] = useState([]);
  const [mistakes, setMistakes] = useState(1);
  const [highlightedNumbers, setHighlightedNumbers] = useState(null);

  const reduxData = useSelector((state) => state.reducer);
  dispatch = useDispatch();
  console.log(reduxData.dataVibrationSetting, "check");

  const animation = useSharedValue(0);
  console.log("animation value", animation.value);
  console.log(reduxData.dataRowAnimation);

  const animationStyle = useAnimatedStyle(() => {
    // const opacity = interpolate(
    //   animation.value,
    //   [0, 1, 2],
    //   [1, 0, 1],
    // );
    const opacity = animation.value
    return {
      opacity
    }
  })

  useEffect(() => {
    setBoard(props.gameData.Quetion);
    setcorrectNumber(props.gameData.Quetion);
    newQuetion = props.gameData.Quetion.map(row => [...row]);
    tracker = props.gameData.Quetion.map(row => [...row]);
    if (reduxData.dataHintSetting) {
      dispatch(HintMeterAction(10));
    }
    setUpHintArray();
    return () => {
      UndoArray = [{
        highlightedCells: UndoHighlightedCells,
        rowIndexlogic: UndoRowIndexLogic,
        columnIndexlogic: UndoColumnIndexLogic,
        data: UndoHold,
        trackerData: UndoTrackerData
      }];
      hintArray = [];
      dispatch(HintAction(undefined));
      animationArrayRow = [];
      dispatch(RowAnimationAction(undefined));
    }
  }, []);

  useEffect(() => {
    if (reduxData.dataUndo !== undefined && UndoArray.length !== 1) {
      const UndoArrayElement = UndoArray[UndoArray.length - 1];
      sethighlightedCells(UndoArrayElement.highlightedCells);
      newQuetion[UndoArrayElement.rowIndexlogic][UndoArrayElement.columnIndexlogic] = UndoArrayElement.data;
      tracker[UndoArrayElement.rowIndexlogic][UndoArrayElement.columnIndexlogic] = UndoArrayElement.trackerData;
      upDatedtracker = tracker.map(row => [...row]);
      upDated = newQuetion.map(row => [...row]);
      setcorrectNumber(upDatedtracker);
      setBoard(upDated);
      setWrongHighlighted([]);
      if (reduxData.dataHighlightSameNumber) {
        if (UndoArrayElement.data !== 0) {
          setHighlightedNumbers(UndoArrayElement.data);
        } else {
          setHighlightedNumbers(null);
        }
      }
      if (UndoArray.length >= 2) {
        setrowIndexlogic(UndoArrayElement.rowIndexlogic);
        setcolumnIndexlogic(UndoArrayElement.columnIndexlogic);
      }
      UndoArray.pop();
      hintRowCol = `${UndoArrayElement.rowIndexlogic}${UndoArrayElement.columnIndexlogic}`
      hintArray.push(hintRowCol);
    }
  }, [reduxData.dataUndo])

  useEffect(() => {
    if (reduxData.dataErase !== undefined && rowIndexlogic !== null && columnIndexlogic !== null) {
      autoCorrectOne = newQuetion[rowIndexlogic][columnIndexlogic];
      autoCorrectTwo = tracker[rowIndexlogic][columnIndexlogic];
      newQuetion[rowIndexlogic][columnIndexlogic] = 0;
      tracker[rowIndexlogic][columnIndexlogic] = 0;
      upDatedtracker = tracker.map(row => [...row]);
      upDated = newQuetion.map(row => [...row]);
      setcorrectNumber(upDatedtracker);
      setBoard(upDated);
      if (!eraseIssue) {
        setHighlightedNumbers(null);
      }
      hintRowCol = `${rowIndexlogic}${columnIndexlogic}`;
      hintArray.push(hintRowCol);
      for (i = 1; i < UndoArray.length; i++) {
        const UndoArrayElement = UndoArray[i];
        if (UndoArrayElement.rowIndexlogic === rowIndexlogic && UndoArrayElement.columnIndexlogic === columnIndexlogic) {
          UndoArray.splice(i, 1);
        }
      }
      autoCorrection();
    }
  }, [reduxData.dataErase])

  useEffect(() => {

    if (reduxData.dataHint !== undefined && hintArray.length !== 0 && reduxData.dataHintMeter !== 0) {
      let isAllRight = false;
      const randomHintCordinate = getRandomNumber(0, hintArray.length - 1)
      if (randomHintCordinate !== undefined) {
        const takeHintCordinates = hintArray[randomHintCordinate];
        const [rowHintIndex, columnHintIndex] = takeHintCordinates !== undefined ? takeHintCordinates.toString().split("").map(Number) : [null, null];
        if (rowHintIndex !== null && columnHintIndex !== null) {
          handleCellPress(rowHintIndex, columnHintIndex, 0, true);
        }
        for (j = 1; j < 10; j++) {
          const investigate = () => {
            for (i = 0; i < 9; i++) {
              if (newQuetion[rowHintIndex][i] === j) {
                return false;
              }
            }
            for (i = 0; i < 9; i++) {
              if (newQuetion[i][columnHintIndex] === j) {
                return false;
              }
            }
            for (i = 0; i < 3; i++) {
              if (newQuetion[HintRowG][HintColG + i] === j) {
                return false;
              }
            }
            for (i = 0; i < 3; i++) {
              if (newQuetion[HintRowG + 1][HintColG + i] === j) {
                return false;
              }
            }
            for (i = 0; i < 3; i++) {
              if (newQuetion[HintRowG + 2][HintColG + i] === j) {
                return false;
              }
            }
            return true;
          }
          if (highlightedCells && highlightedCells.cellsGrid !== undefined && rowHintIndex !== null && columnHintIndex !== null) {
            isAllRight = investigate();
          }
          if (isAllRight) {
            newQuetion[rowHintIndex][columnHintIndex] = j;
            tracker[rowHintIndex][columnHintIndex] = j + 10;
            upDatedtracker = tracker.map(row => [...row]);
            upDated = newQuetion.map(row => [...row]);
            setcorrectNumber(upDatedtracker);
            setBoard(upDated);
            if (reduxData.dataHintSetting) {
              dispatch(HintMeterAction(reduxData.dataHintMeter - 1));
            }
            hintRowCol = `${rowHintIndex}${columnHintIndex}`;
            alterHintArray(true);
            j = 10;
          }
        }
      }
    }

  }, [reduxData.dataHint])

  useEffect(() => {
    if (props.isRestart.yesRestart) {
      setBoard(props.gameData.Quetion);
      setcorrectNumber(props.gameData.Quetion);
      dispatch(HintMeterAction(10));
      newQuetion = props.gameData.Quetion.map(row => [...row]);
      tracker = props.gameData.Quetion.map(row => [...row]);
      UndoArray = [];
      UndoArray = [{
        highlightedCells: UndoHighlightedCells,
        rowIndexlogic: UndoRowIndexLogic,
        columnIndexlogic: UndoColumnIndexLogic,
        data: UndoHold,
        trackerData: UndoTrackerData
      }];
      hintArray = [];
      sethighlightedCells([]);
      setWrongHighlighted([]);
      setrowIndexlogic(null);
      setcolumnIndexlogic(null);
      setintrogate(false);
      setWrongHighlighted([]);
      setMistakes(1);
      setHighlightedNumbers(null);
      setUpHintArray();
    }

  }, [props.isRestart.initiate])

  useEffect(() => {
    logicImplementation();
    if (doesCheck) {
      const rowAnimation = () => {
        for (i = 0; i < 9; i++) {
          if (tracker[rowIndexlogic][i].toString().length !== 3 && tracker[rowIndexlogic][i] !== 0) {
            animationArrayRow[i] = `${rowIndexlogic}${i}`
            if (i === 8)
              return true;
          } else {
            return false;
          }
        }
      }
      const colAnimation = () => {
        for (i = 0; i < 9; i++) {
          if (tracker[i][columnIndexlogic].toString().length !== 3 && tracker[i][columnIndexlogic] !== 0) {
            animationArrayCol[i] = `${i}${columnIndexlogic}`
            if (i === 8)
              return true;
          } else {
            return false;
          }
        }
      }
      const boxAnimation = () => {
        for (i = 0; i < 3; i++) {
          if (tracker[highlightedCells.cellsGrid[0].rowG][highlightedCells.cellsGrid[0].colG + i].toString().length !== 0 && tracker[highlightedCells.cellsGrid[0].rowG][highlightedCells.cellsGrid[0].colG + i] !== 0) {
            animationArrayBox[i] = `${highlightedCells.cellsGrid[0].rowG}${highlightedCells.cellsGrid[0].colG + i}`
          } else {
            return false
          }
        }
        for (i = 0; i < 3; i++) {
          if (tracker[highlightedCells.cellsGrid[0].rowG + 1][highlightedCells.cellsGrid[0].colG + i].toString().length !== 0 && tracker[highlightedCells.cellsGrid[0].rowG + 1][highlightedCells.cellsGrid[0].colG + i] !== 0) {
            animationArrayBox[i + 3] = `${highlightedCells.cellsGrid[0].rowG + 1}${highlightedCells.cellsGrid[0].colG + i}`
          } else {
            return false
          }
        }
        for (i = 0; i < 3; i++) {
          if (tracker[highlightedCells.cellsGrid[0].rowG + 2][highlightedCells.cellsGrid[0].colG + i].toString().length !== 0 && tracker[highlightedCells.cellsGrid[0].rowG + 2][highlightedCells.cellsGrid[0].colG + i] !== 0) {
            animationArrayBox[i + 6] = `${highlightedCells.cellsGrid[0].rowG + 2}${highlightedCells.cellsGrid[0].colG + i}`
          } else {
            return false
          }
        }
        if (animationArrayBox.every(element => element !== undefined)) {
          return true;
        } else {
          return false;
        }
      }
      animationArrayRow = [];
      animationArrayCol = [];
      animationArrayBox = [];
      if (rowIndexlogic !== null & columnIndexlogic !== null) {
        if (rowAnimation()) {
          let rowA = [];
          let colA = [];
          for (i = 0; i < 9; i++) {
            const element = animationArrayRow[i]
            rowA[i] = parseInt(element[0], 10);
            colA[i] = parseInt(element[1], 10);
          }
          dispatch(RowAnimationAction({
            rowA: rowA,
            colA: colA
          }));
          animation.value = withSpring(1, {
            damping: 20,
            stiffness: 90,
            mass: 1,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          });
          setTimeout(() => {
            animation.value = 0;
            dispatch(RowAnimationAction(undefined));
          }, 2000);
        }

        if (colAnimation()) {
          let rowA = [];
          let colA = [];
          for (i = 0; i < 9; i++) {
            const element = animationArrayCol[i]
            rowA[i] = parseInt(element[0], 10);
            colA[i] = parseInt(element[1], 10);
          }
          dispatch(ColAnimationAction({
            rowA: rowA,
            colA: colA
          }));
          animation.value = withSpring(1, {
            damping: 20,
            stiffness: 90,
            mass: 1,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          });
          setTimeout(() => {
            animation.value = 0;
            dispatch(ColAnimationAction(undefined));
          }, 2000);
        }

        if (boxAnimation()) {
          let rowA = [];
          let colA = [];
          for (i = 0; i < 9; i++) {
            const element = animationArrayBox[i]
            rowA[i] = parseInt(element[0], 10);
            colA[i] = parseInt(element[1], 10);
          }
          dispatch(BoxAnimationAction({
            rowA: rowA,
            colA: colA
          }));
          animation.value = withSpring(1, {
            damping: 20,
            stiffness: 90,
            mass: 1,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
          });
          setTimeout(() => {
            animation.value = 0;
            dispatch(BoxAnimationAction(undefined));
          }, 2000);
        }
        doesCheck = false;
      }
    }
  }, [props.data.invoker])

  const logicImplementation = () => {

    if (props.data && rowIndexlogic !== null && columnIndexlogic !== null && introagate == false) {
      const investigate = () => {
        for (i = 0; i < 9; i++) {
          if (`${rowIndexlogic}${columnIndexlogic}` !== `${rowIndexlogic}${i}`) {
            if (newQuetion[rowIndexlogic][i] === props.data.data) {
              return false;
            }
          }
        }
        for (i = 0; i < 9; i++) {
          if (`${rowIndexlogic}${columnIndexlogic}` !== `${i}${columnIndexlogic}`) {
            if (newQuetion[i][columnIndexlogic] === props.data.data) {
              return false;
            }
          }
        }
        for (i = 0; i < 3; i++) {
          if (`${rowIndexlogic}${columnIndexlogic}` !== `${highlightedCells.cellsGrid[0].rowG}${highlightedCells.cellsGrid[0].colG + i}`) {
            if (newQuetion[highlightedCells.cellsGrid[0].rowG][highlightedCells.cellsGrid[0].colG + i] === props.data.data) {
              return false;
            }
          }
        }
        for (i = 0; i < 3; i++) {
          if (`${rowIndexlogic}${columnIndexlogic}` !== `${highlightedCells.cellsGrid[0].rowG + 1}${highlightedCells.cellsGrid[0].colG + i}`) {
            if (newQuetion[highlightedCells.cellsGrid[0].rowG + 1][highlightedCells.cellsGrid[0].colG + i] === props.data.data) {
              return false;
            }
          }
        }
        for (i = 0; i < 3; i++) {
          if (`${rowIndexlogic}${columnIndexlogic}` !== `${highlightedCells.cellsGrid[0].rowG + 2}${highlightedCells.cellsGrid[0].colG + i}`) {
            if (newQuetion[highlightedCells.cellsGrid[0].rowG + 2][highlightedCells.cellsGrid[0].colG + i] === props.data.data) {
              return false;
            }
          }
        }
        return true;
      }
      const isCorrect = investigate();
      if (isCorrect) {
        UndoHighlightedCells = highlightedCells;
        autoCorrectOne = newQuetion[rowIndexlogic][columnIndexlogic];
        autoCorrectTwo = tracker[rowIndexlogic][columnIndexlogic];
        const hold = newQuetion[rowIndexlogic][columnIndexlogic];
        const holdTacker = tracker[rowIndexlogic][columnIndexlogic];
        newQuetion[rowIndexlogic][columnIndexlogic] = props.data.data;
        tracker[rowIndexlogic][columnIndexlogic] = props.data.data + 10;
        upDatedtracker = tracker.map(row => [...row]);
        upDated = newQuetion.map(row => [...row]);
        setcorrectNumber(upDatedtracker);
        setBoard(upDated);
        if (reduxData.dataHighlightSameNumber) {
          setHighlightedNumbers(props.data.data);
        }
        UndoArray.push({
          highlightedCells: UndoHighlightedCells,
          rowIndexlogic: rowIndexlogic,
          columnIndexlogic: columnIndexlogic,
          data: hold,
          trackerData: holdTacker
        });
        eraseIssue = false;
        setTimeout(() => {
          autoCorrection();
          console.log("autocorrection 1000")
        }, 0);
        hintRowCol = `${rowIndexlogic}${columnIndexlogic}`;
        setTimeout(() => {
          alterHintArray(true);
          console.log("alterHint 2000")
        }, 4000);
        if (reduxData.dataCompletionAnimationSetting) {
          doesCheck = true;
        }
      } else {
        UndoHighlightedCells = highlightedCells;
        autoCorrectOne = newQuetion[rowIndexlogic][columnIndexlogic];
        autoCorrectTwo = tracker[rowIndexlogic][columnIndexlogic];
        const hold = newQuetion[rowIndexlogic][columnIndexlogic];
        const holdTacker = tracker[rowIndexlogic][columnIndexlogic];
        newQuetion[rowIndexlogic][columnIndexlogic] = props.data.data;
        tracker[rowIndexlogic][columnIndexlogic] = props.data.data + 100;
        upDatedtracker = tracker.map(row => [...row]);
        upDated = newQuetion.map(row => [...row]);
        setcorrectNumber(upDatedtracker);
        setBoard(upDated);
        if (reduxData.dataHighlightSameNumber) {
          setHighlightedNumbers(props.data.data);
        }
        UndoArray.push({
          highlightedCells: UndoHighlightedCells,
          rowIndexlogic: rowIndexlogic,
          columnIndexlogic: columnIndexlogic,
          data: hold,
          trackerData: holdTacker
        });
        const wrongHighlightedCell = {
          cells: [{ row: rowIndexlogic, col: columnIndexlogic }]
        }
        setWrongHighlighted(wrongHighlightedCell);
        setMistakes((previousMistake) => previousMistake + 1);
        props.isMistake(false, mistakes);
        if (reduxData.dataMistakeSetting) {
          if (mistakes === 6) {
            props.isMistake(true, 6);
          }
        }
        eraseIssue = false;
        setTimeout(() => {
          autoCorrection();
          console.log("autocorrection 1000")
        }, 0);
        if (reduxData.dataVibrationSetting) {
          console.log("isOK", reduxData.dataVibrationSetting);
          Vibration.vibrate(175);
        }
        hintRowCol = `${rowIndexlogic}${columnIndexlogic}`;
        setTimeout(() => {
          alterHintArray(true);
          console.log("alterHint 2000")
        }, 4000);
      }

    }
  }

  useEffect(() => {
    const gameCompleted = isGameCompleted();
    props.visibilityData(gameCompleted);
  }, [board])

  const setUpHintArray = () => {
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        if (newQuetion[i][j] === 0) {
          hintArray.push(`${i}${j}`);
        }
      }
    }
  }

  const alterHintArray = (data) => {
    for (i = 0; i < hintArray.length; i++) {
      if (data) {
        if (hintArray[i] === hintRowCol) {
          hintArray.splice(i, 1);
        }
      }
    }
  }

  const autoCorrection = () => {
    console.log(autoCorrectOne, autoCorrectTwo);
    if (autoCorrectTwo.toString().length === 3 || autoCorrectTwo.toString().length === 2) {
      console.log('all right');
      const findingOut = () => {
        for (i = 0; i < 9; i++) {
          if (newQuetion[rowIndexlogic][i] === autoCorrectOne) {
            const row = rowIndexlogic
            const col = i;
            if (tracker[row][col].toString().length !== 1) {
              return { row, col };
            }
          }
        }
        for (i = 0; i < 9; i++) {
          if (newQuetion[i][columnIndexlogic] === autoCorrectOne) {
            const row = i
            const col = columnIndexlogic;
            if (tracker[row][col].toString().length !== 1) {
              return { row, col };
            }
          }
        }
        for (i = 0; i < 3; i++) {
          if (newQuetion[highlightedCells.cellsGrid[0].rowG][highlightedCells.cellsGrid[0].colG + i] === autoCorrectOne) {
            const row = highlightedCells.cellsGrid[0].rowG;
            const col = highlightedCells.cellsGrid[0].colG + i;
            if (tracker[row][col].toString().length !== 1) {
              return { row, col };
            }
          }
        }
        for (i = 0; i < 3; i++) {
          if (newQuetion[highlightedCells.cellsGrid[0].rowG + 1][highlightedCells.cellsGrid[0].colG + i] === autoCorrectOne) {
            const row = highlightedCells.cellsGrid[0].rowG + 1;
            const col = highlightedCells.cellsGrid[0].colG + i;
            if (tracker[row][col].toString().length !== 1) {
              return { row, col };
            }
          }
        }
        for (i = 0; i < 3; i++) {
          if (newQuetion[highlightedCells.cellsGrid[0].rowG + 2][highlightedCells.cellsGrid[0].colG + i] === autoCorrectOne) {
            const row = highlightedCells.cellsGrid[0].rowG + 2;
            const col = highlightedCells.cellsGrid[0].colG + i;
            if (tracker[row][col].toString().length !== 1) {
              return { row, col };
            }
          }
        }
        return false;
      }
      const isThere = findingOut()
      if (isThere !== false) {
        console.log(isThere.row, 'and', isThere.col);
        if (tracker[isThere.row][isThere.col].toString().length === 3) {
          console.log('we are going well');
          function innerGridCalculation(rowOcol) {
            const stepback = [0, 3, 6];
            const stepback1 = [1, 4, 7];
            const stepback2 = [2, 5, 8];

            let result;

            stepback.forEach((num) => {
              if (num === rowOcol) {
                result = rowOcol;
              }
            });
            if (result !== undefined) {
              return result;
            }

            stepback1.forEach((num) => {
              if (num === rowOcol) {
                result = rowOcol - 1;
              }
            });
            if (result !== undefined) {
              return result;
            }

            stepback2.forEach((num) => {
              if (num === rowOcol) {
                result = rowOcol - 2;
              }
            });
            if (result !== undefined) {
              return result;
            }

          }
          const rowG = innerGridCalculation(isThere.row);
          const colG = innerGridCalculation(isThere.col);
          console.log("rowG", rowG, "and", "colC", colG);
          const investigate = () => {
            for (i = 0; i < 9; i++) {
              if (`${isThere.row}${isThere.col}` !== `${isThere.row}${i}`) {
                if (newQuetion[isThere.row][i] === autoCorrectOne) {
                  return false;
                }
              }
            }
            for (i = 0; i < 9; i++) {
              if (`${isThere.row}${isThere.col}` !== `${i}${isThere.col}`) {
                if (newQuetion[i][isThere.col] === autoCorrectOne) {
                  return false;
                }
              }
            }
            for (i = 0; i < 3; i++) {
              if (`${isThere.row}${isThere.col}` !== `${rowG}${colG + i}`) {
                if (newQuetion[rowG][colG + i] === autoCorrectOne) {
                  return false;
                }
              }
            }
            for (i = 0; i < 3; i++) {
              if (`${isThere.row}${isThere.col}` !== `${rowG + 1}${colG + i}`) {
                if (newQuetion[rowG + 1][colG + i] === autoCorrectOne) {
                  return false;
                }
              }
            }
            for (i = 0; i < 3; i++) {
              if (`${isThere.row}${isThere.col}` !== `${rowG + 2}${colG + i}`) {
                if (newQuetion[rowG + 2][colG + i] === autoCorrectOne) {
                  return false;
                }
              }
            }
            return true;
          }
          console.log(investigate());
          if (investigate()) {
            console.log('we are close');
            newQuetion[isThere.row][isThere.col] = autoCorrectOne;
            tracker[isThere.row][isThere.col] = autoCorrectOne + 10;
            upDatedtracker = tracker.map(row => [...row]);
            upDated = newQuetion.map(row => [...row]);
            setcorrectNumber(upDatedtracker);
            setBoard(upDated);
          }
        }
      }
    }

  }

  const isGameCompleted = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (tracker[i][j].toString().length === 3 || tracker[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  const handleCellPress = (rowIndex, columnIndex, numbers, hintColor) => {

    function innerGridCalculation(rowOcol) {
      const stepback = [0, 3, 6];
      const stepback1 = [1, 4, 7];
      const stepback2 = [2, 5, 8];

      let result;

      stepback.forEach((num) => {
        if (num === rowOcol) {
          result = rowOcol;
        }
      });
      if (result !== undefined) {
        return result;
      }

      stepback1.forEach((num) => {
        if (num === rowOcol) {
          result = rowOcol - 1;
        }
      });
      if (result !== undefined) {
        return result;
      }

      stepback2.forEach((num) => {
        if (num === rowOcol) {
          result = rowOcol - 2;
        }
      });
      if (result !== undefined) {
        return result;
      }

    }

    const rowG = innerGridCalculation(rowIndex);
    const colG = innerGridCalculation(columnIndex);
    HintRowG = rowG;
    HintColG = colG;

    const highlighted = {
      cells: [{ row: rowIndex, col: columnIndex }],
      cellsGrid: [{ rowG, colG }],
      hintColor: hintColor
    };

    sethighlightedCells(highlighted);
    setintrogate(true);
    setWrongHighlighted([]);
    if (numbers !== 0) {
      if (reduxData.dataHighlightSameNumber) {
        setHighlightedNumbers(numbers);
      }
    } else {
      setHighlightedNumbers(null);
    }

    eraseIssue = tracker[rowIndex][columnIndex].toString().length === 2 || tracker[rowIndex][columnIndex].toString().length === 3 ? false : true;

  };

  const handlePressLogic = (rowIndex, columnIndex) => {
    setrowIndexlogic(rowIndex);
    setcolumnIndexlogic(columnIndex);
    setintrogate(false);
    setWrongHighlighted([]);
  }

  const renderRow = (row, rowIndex) => (
    <View key={rowIndex} style={styles.row}>
      {row.map((cell, columnIndex) => {

        let isatBoundaryColumnR = (columnIndex + 1) % 3 === 0;
        let isatBoundaryRowB = (rowIndex + 1) % 3 === 0;
        let isatBoundaryColumnL = columnIndex % 3 === 0;
        let isatBoundaryRowT = rowIndex % 3 === 0;

        const isRowsHighlighted = highlightedCells.cells && highlightedCells.cells.some(cell => cell.row === rowIndex) && columnIndex < 9 && highlightedCells.hintColor === false
        const isRowsHighlightedHint = highlightedCells.cells && highlightedCells.cells.some(cell => cell.row === rowIndex) && columnIndex < 9 && highlightedCells.hintColor === true
        const isColumnsHighlighted = highlightedCells.cells && rowIndex < 9 && highlightedCells.cells.some(cell => cell.col === columnIndex) && highlightedCells.hintColor === false
        const isColumnsHighlightedHint = highlightedCells.cells && rowIndex < 9 && highlightedCells.cells.some(cell => cell.col === columnIndex) && highlightedCells.hintColor === true
        const isGridlineone = highlightedCells.cellsGrid && highlightedCells.cellsGrid[0].rowG === rowIndex && highlightedCells.cellsGrid[0].colG <= columnIndex && columnIndex < highlightedCells.cellsGrid[0].colG + 3 && highlightedCells.hintColor === false
        const isGridlineoneHint = highlightedCells.cellsGrid && highlightedCells.cellsGrid[0].rowG === rowIndex && highlightedCells.cellsGrid[0].colG <= columnIndex && columnIndex < highlightedCells.cellsGrid[0].colG + 3 && highlightedCells.hintColor === true
        const isGridlinetwo = highlightedCells.cellsGrid && highlightedCells.cellsGrid[0].rowG + 1 === rowIndex && highlightedCells.cellsGrid[0].colG <= columnIndex && columnIndex < highlightedCells.cellsGrid[0].colG + 3 && highlightedCells.hintColor === false
        const isGridlinetwoHint = highlightedCells.cellsGrid && highlightedCells.cellsGrid[0].rowG + 1 === rowIndex && highlightedCells.cellsGrid[0].colG <= columnIndex && columnIndex < highlightedCells.cellsGrid[0].colG + 3 && highlightedCells.hintColor === true
        const isGridlinethree = highlightedCells.cellsGrid && highlightedCells.cellsGrid[0].rowG + 2 === rowIndex && highlightedCells.cellsGrid[0].colG <= columnIndex && columnIndex < highlightedCells.cellsGrid[0].colG + 3 && highlightedCells.hintColor === false
        const isGridlinethreeHint = highlightedCells.cellsGrid && highlightedCells.cellsGrid[0].rowG + 2 === rowIndex && highlightedCells.cellsGrid[0].colG <= columnIndex && columnIndex < highlightedCells.cellsGrid[0].colG + 3 && highlightedCells.hintColor === true;
        const touchedCell = highlightedCells.cellsGrid && highlightedCells.cells[0].row == rowIndex && highlightedCells.cells[0].col == columnIndex && highlightedCells.hintColor === false;
        const touchedCellHint = highlightedCells.cellsGrid && highlightedCells.cells[0].row == rowIndex && highlightedCells.cells[0].col == columnIndex && highlightedCells.hintColor === true;
        const isCorrectNumber = correctNumber[rowIndex][columnIndex].toString().length === 2;
        const isWrongNumber = correctNumber[rowIndex][columnIndex].toString().length === 3;
        const isWrongHighlightedCell = wrongHighlighted.cells && wrongHighlighted.cells[0].row === rowIndex && wrongHighlighted.cells[0].col === columnIndex;
        const isHighlightedNumbers = highlightedNumbers === cell && touchedCell !== true;

        let isRowAnimated = false;
        if (reduxData.dataRowAnimation !== undefined) {
          isRowAnimated = reduxData.dataRowAnimation.rowA.some(rowA => rowA === rowIndex) && reduxData.dataRowAnimation.colA.some(colA => colA === columnIndex);
        }
        let isColAnimated = false;
        if (reduxData.dataColAnimation !== undefined) {
          isColAnimated = reduxData.dataColAnimation.rowA.some(rowA => rowA === rowIndex) && reduxData.dataColAnimation.colA.some(colA => colA === columnIndex);
        }
        let isBoxAnimated = false;
        if (reduxData.dataBoxAnimation !== undefined) {
          isBoxAnimated = reduxData.dataBoxAnimation.rowA.some(rowA => rowA === rowIndex) && reduxData.dataBoxAnimation.colA.some(colA => colA === columnIndex);
        }

        return (
          <Animated.View key={`${rowIndex}${columnIndex}`} style={[styles.animatedCell, isRowAnimated && animationStyle, isColAnimated && animationStyle, isBoxAnimated && animationStyle]}>
            <TouchableOpacity key={columnIndex} style={[styles.cell,
            isatBoundaryColumnR && styles.boundaryCellColumn,
            isatBoundaryRowB && styles.boundaryCellRow,
            isatBoundaryRowT && styles.boundaryCellRowT,
            isatBoundaryColumnL && styles.boundaryCellColumnL,
            isRowsHighlighted && reduxData.dataRegionHighlightSetting && (!reduxData.dataToggleIcon ? styles.highlightedCells : styles.highlightedCellsDark),
            isColumnsHighlighted && reduxData.dataRegionHighlightSetting && (!reduxData.dataToggleIcon ? styles.highlightedCells : styles.highlightedCellsDark),
            isGridlineone && reduxData.dataRegionHighlightSetting && (!reduxData.dataToggleIcon ? styles.highlightedCells : styles.highlightedCellsDark),
            isGridlinetwo && reduxData.dataRegionHighlightSetting && (!reduxData.dataToggleIcon ? styles.highlightedCells : styles.highlightedCellsDark),
            isGridlinethree && reduxData.dataRegionHighlightSetting && (!reduxData.dataToggleIcon ? styles.highlightedCells : styles.highlightedCellsDark),
            isRowsHighlightedHint && (!reduxData.dataToggleIcon ? styles.highlightedCellsHint : styles.highlightedCellsHintDark),
            isColumnsHighlightedHint && (!reduxData.dataToggleIcon ? styles.highlightedCellsHint : styles.highlightedCellsHintDark),
            isGridlineoneHint && (!reduxData.dataToggleIcon ? styles.highlightedCellsHint : styles.highlightedCellsHintDark),
            isGridlinetwoHint && (!reduxData.dataToggleIcon ? styles.highlightedCellsHint : styles.highlightedCellsHintDark),
            isGridlinethreeHint && (!reduxData.dataToggleIcon ? styles.highlightedCellsHint : styles.highlightedCellsHintDark),
            touchedCell && (!reduxData.dataToggleIcon ? styles.touchCell : styles.touchCellDark),
            touchedCellHint && (!reduxData.dataToggleIcon ? styles.touchCellHint : styles.touchCellHintDark),
            isWrongHighlightedCell && (!reduxData.dataToggleIcon ? styles.yeswrong : styles.yesDarkwrong),
            isHighlightedNumbers && (!reduxData.dataToggleIcon ? styles.highlightedNumbers : styles.touchCellDark),
            !reduxData.dataMarginSetting && { margin: 0, borderWidth: 0.5 }
            ]} activeOpacity={!reduxData.dataMarginSetting ? 0.7 : 0.2} onPress={() => { handleCellPress(rowIndex, columnIndex, cell, false); if (cell === 0 || isWrongNumber || isCorrectNumber) { handlePressLogic(rowIndex, columnIndex); } }}>
              <Text style={[styles.cellText, reduxData.dataToggleIcon && styles.numberColorINdark, isCorrectNumber && (!reduxData.dataToggleIcon ? styles.correctNumber : styles.correctNumberDark), isWrongNumber && styles.wrongNumber, touchedCellHint && (!reduxData.dataToggleIcon ? styles.HintTextColor : styles.HintTextColorDark)]}>{cell || ''}</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      })}
    </View>
  );

  return (
    <View style={[styles.container, reduxData.dataToggleIcon && styles.darkElement, !reduxData.dataMarginSetting && { padding: 0 }]}>
      {board.map((row, index) => renderRow(row, index))}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 2,
    marginTop: 0,
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
  },
  animatedCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 2,
  },
  cellText: {
    // fontSize: 30,
    fontSize: windowWidth * 0.074,
    fontWeight: '100',
    fontFamily: 'Arial',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    color: 'black',
  },
  boundaryCellColumn: {
    borderRightWidth: 2,
  },
  boundaryCellRow: {
    borderBottomWidth: 2,
  },
  boundaryCellColumnL: {
    borderLeftWidth: 2,
  },
  boundaryCellRowT: {
    borderTopWidth: 2,
  },
  highlightedCells: {
    backgroundColor: '#E7E9F5',
  },
  touchCell: {
    backgroundColor: '#C1D2FE',
  },
  correctNumber: {
    color: '#485FA4',
  },
  wrongNumber: {
    color: '#EB4A3E',
  },
  yeswrong: {
    backgroundColor: '#FFD9D6',
  },
  highlightedNumbers: {
    backgroundColor: '#C6CBE1'
  },
  highlightedCellsHint: {
    backgroundColor: '#C1CEF1'
  },
  touchCellHint: {
    backgroundColor: "#50B964"
  },
  HintTextColor: {
    color: "white"
  },
  backgroundDark: {
    backgroundColor: '#0E0D13'
  },
  darkElement: {
    backgroundColor: '#2A2F42'
  },
  numberColorINdark: {
    color: 'white'
  },
  highlightedCellsDark: {
    backgroundColor: '#1F212E'
  },
  touchCellDark: {
    backgroundColor: '#242F6D'
  },
  yesDarkwrong: {
    backgroundColor: '#5A3846'
  },
  correctNumberDark: {
    color: '#7185F9'
  },
  highlightedCellsHintDark: {
    backgroundColor: '#202E48'
  },
  touchCellHintDark: {
    backgroundColor: '#6B92D7'
  },
  HintTextColorDark: {
    color: '#202333'
  }
});

export default SudokuBoard;
