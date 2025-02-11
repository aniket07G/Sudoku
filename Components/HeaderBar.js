import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ExperimentAction, PauseAction, ResumeMistakeAction, ResumeScoreAction } from "./redux/action";
import { useDispatch } from "react-redux";

let intervalID;
let score;
let takeSecond;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const HeaderBar = (props) => {
    const [second, setSecond] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [runInterval, setRunInterval] = useState(0);
    const [prevCount, setPrevCount] = useState(0);

    let holdsecounds = prevCount;
    const reduxData = useSelector((state) => state.reducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if (reduxData.dataPause !== undefined || reduxData.dataStopTimer !== undefined) {
            if (reduxData.dataPause === true || reduxData.dataStopTimer === true) {
                takeSecond = second;
                clearInterval(intervalID);
                if (reduxData.dataStopTimer !== true || reduxData.dataPause === true) {
                    dispatch(ResumeScoreAction(score));
                    if (reduxData.dataMistakeSetting) {
                        dispatch(ResumeMistakeAction(`${mistakes}/6`));
                    } else {
                        dispatch(ResumeMistakeAction(mistakes));
                    }
                }
            } else {
                setPrevCount(takeSecond);
                dispatch(ExperimentAction(getRandomNumber(1, 500)));
            }
        }
    }, [reduxData.dataPause, reduxData.dataStopTimer])

    useEffect(() => {
        if (props.isRestart.yesRestart) {
            clearInterval(intervalID);
            setSecond(0);
            setMistakes(0);
            setPrevCount(0);
            setRunInterval(getRandomNumber(1, 500));
        }
    }, [props.isRestart.initiate]);

    useEffect(() => {
        if (reduxData.dataPauseIssue) {
            setPrevCount(0);
        }
    }, [reduxData.dataPauseIssue])

    useEffect(() => {
        setMistakes(props.takeMistakes)
    }, [props.takeMistakes]);

    useEffect(() => {
        if (reduxData.dataTimerSetting) {
            intervalID = setInterval(() => {
                holdsecounds = holdsecounds + 1;
                setSecond(holdsecounds);
            }, 1000);
            return () => clearInterval(intervalID);
        }
    }, [runInterval, reduxData.dataExperiment])

    useEffect(() => {
        if (props.takeMistakes === 6) {
            clearInterval(intervalID);
            props.takeGetscore(score);
        }
    }, [props.takeMistakes])

    useEffect(() => {
        if (props.isGamecompleted === true) {
            clearInterval(intervalID);
            props.takeGetscore(score);
        }
    }, [props.isGamecompleted])

    const formatTime = (secound) => {
        const minutes = Math.floor(secound / 60).toString().padStart(2, '0');
        const seconds = (secound % 60).toString().padStart(2, '0');
        score = `${minutes}:${seconds}`;
        return `${minutes}:${seconds}`;
    }

    return (
        <View style={[styles.container, reduxData.dataToggleIcon && styles.darkElement]}>
            <View style={styles.leftView}><Text style={[styles.text, reduxData.dataToggleIcon && styles.darkText]}>{props.gameData.mode}</Text></View>
            <View style={styles.middleView}><Text style={[styles.text, reduxData.dataToggleIcon && styles.darkText]}>{reduxData.dataTimerSetting ? formatTime(second) : ''}</Text></View>
            <View style={styles.rightView}>
                {reduxData.dataMistakeSetting ? (
                    <Text style={[styles.text, reduxData.dataToggleIcon && styles.darkText]}>Mistake {mistakes}/6</Text>
                ) : (
                    <Text style={[styles.text, reduxData.dataToggleIcon && styles.darkText]}>Mistake {mistakes}</Text>
                )}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#FFFFFF',
        height: 30,
    },
    leftView: {
        marginRight: 'auto',
    },
    middleView: {
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    rightView: {
        marginLeft: 'auto'
    },
    darkElement: {
        backgroundColor: '#2A2F42'
    },
    text: {
        fontSize: 18,
        color: '#6F6F6F'
    },
    darkText: {
        color: '#7E7F91'
    }
})

export default HeaderBar