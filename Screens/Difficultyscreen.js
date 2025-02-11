import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from "react-redux";

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
console.log("hight", windowHight, "width", windowWidth);
console.log("ok");

const Difficultysreen = (props) => {

    const [easyData, setEasyData] = useState({});
    const [midiumData, setMidiumData] = useState({});
    const [hardData, setHardData] = useState({});
    const [expertData, setExpertData] = useState({});

    const reduxData = useSelector((state) => state.reducer);
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    useFocusEffect(
        React.useCallback(() => {
            forEasy();
            forMidium();
            forHard();
            forExpert();
        }, [])
    );

    const forEasy = () => {

        const easyObject = {
            1: {
                Quetion: [
                    [8, 2, 0, 0, 7, 4, 0, 0, 0],
                    [7, 0, 6, 0, 0, 3, 4, 0, 0],
                    [0, 0, 1, 0, 0, 0, 7, 0, 2],
                    [0, 0, 7, 0, 9, 0, 0, 0, 0],
                    [0, 3, 0, 0, 0, 0, 0, 5, 0],
                    [0, 0, 0, 0, 8, 0, 2, 0, 0],
                    [6, 0, 0, 0, 3, 0, 1, 0, 0],
                    [0, 0, 3, 8, 0, 0, 6, 0, 4],
                    [0, 0, 0, 6, 1, 0, 0, 7, 3],
                ], mode: 'Easy'
            },

            2: {
                Quetion: [
                    [0, 9, 0, 0, 0, 0, 0, 0, 0],
                    [6, 4, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 2, 0, 4, 3, 0, 5, 0],
                    [9, 0, 0, 2, 0, 5, 0, 0, 3],
                    [0, 0, 0, 0, 0, 0, 6, 0, 9],
                    [0, 0, 0, 3, 0, 0, 8, 4, 0],
                    [0, 2, 0, 0, 8, 0, 7, 0, 0],
                    [5, 0, 0, 0, 0, 9, 0, 0, 4],
                    [4, 0, 0, 0, 0, 0, 0, 0, 0],
                ], mode: 'Easy'
            },

            3: {
                Quetion: [
                    [0, 0, 0, 0, 4, 1, 8, 0, 0],
                    [9, 0, 2, 0, 0, 0, 0, 0, 6],
                    [0, 8, 0, 0, 0, 7, 0, 0, 5],
                    [0, 0, 0, 0, 7, 0, 0, 9, 0],
                    [5, 0, 4, 0, 6, 0, 7, 0, 8],
                    [0, 2, 0, 0, 3, 0, 0, 0, 0],
                    [2, 0, 0, 7, 0, 0, 0, 5, 0],
                    [3, 0, 0, 0, 0, 0, 1, 0, 4],
                    [0, 0, 5, 4, 1, 0, 0, 0, 0],
                ], mode: 'Easy'
            },

            4: {
                Quetion: [
                    [0, 0, 0, 4, 0, 5, 0, 8, 0],
                    [0, 0, 0, 0, 6, 2, 4, 0, 0],
                    [0, 0, 0, 3, 0, 0, 0, 5, 6],
                    [0, 0, 7, 0, 0, 6, 0, 2, 3],
                    [8, 0, 0, 0, 0, 0, 0, 0, 1],
                    [2, 6, 0, 8, 0, 0, 5, 0, 0],
                    [9, 7, 0, 0, 0, 4, 0, 0, 0],
                    [0, 0, 4, 5, 2, 0, 0, 0, 0],
                    [0, 2, 0, 9, 0, 7, 0, 0, 0],
                ], mode: 'Easy'
            },

            5: {
                Quetion: [
                    [0, 1, 0, 0, 3, 0, 9, 8, 0],
                    [8, 0, 0, 0, 5, 1, 0, 0, 7],
                    [9, 0, 0, 4, 0, 0, 0, 0, 0],
                    [0, 5, 0, 0, 0, 0, 6, 0, 0],
                    [1, 7, 0, 0, 2, 0, 0, 4, 3],
                    [0, 0, 4, 0, 0, 0, 0, 5, 0],
                    [0, 0, 0, 0, 0, 5, 0, 0, 8],
                    [5, 0, 0, 8, 1, 0, 0, 0, 4],
                    [0, 8, 2, 0, 4, 0, 0, 6, 0],
                ], mode: 'Easy'
            },

            6: {
                Quetion: [
                    [0, 7, 0, 0, 0, 2, 4, 6, 0],
                    [1, 0, 5, 0, 9, 0, 3, 0, 0],
                    [3, 0, 0, 0, 0, 0, 0, 7, 0],
                    [0, 0, 1, 0, 0, 3, 2, 0, 0],
                    [6, 5, 0, 0, 1, 0, 0, 0, 0],
                    [0, 0, 0, 8, 0, 0, 0, 0, 0],
                    [0, 0, 7, 5, 0, 0, 0, 3, 0],
                    [9, 0, 0, 6, 3, 0, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0, 0, 4],
                ], mode: 'Easy'
            },

            7: {
                Quetion: [
                    [0, 4, 1, 8, 0, 0, 5, 7, 0],
                    [0, 9, 0, 0, 0, 0, 0, 2, 0],
                    [2, 7, 0, 0, 4, 0, 0, 6, 3],
                    [0, 0, 0, 0, 0, 0, 0, 0, 4],
                    [0, 0, 2, 3, 7, 6, 9, 0, 0],
                    [5, 0, 0, 0, 0, 0, 0, 0, 0],
                    [7, 2, 0, 0, 5, 0, 0, 4, 8],
                    [0, 8, 0, 0, 0, 0, 0, 5, 0],
                    [0, 5, 6, 0, 0, 2, 1, 9, 0],
                ], mode: 'Easy'
            },

            8: {
                Quetion: [
                    [0, 7, 0, 0, 0, 5, 0, 0, 4],
                    [9, 0, 6, 0, 0, 3, 0, 0, 0],
                    [0, 3, 0, 0, 6, 0, 7, 0, 0],
                    [0, 0, 0, 3, 0, 0, 0, 2, 8],
                    [0, 0, 2, 0, 0, 0, 3, 0, 0],
                    [3, 6, 0, 0, 0, 1, 0, 0, 0],
                    [0, 0, 9, 0, 3, 0, 0, 1, 0],
                    [0, 0, 0, 1, 0, 0, 4, 0, 2],
                    [8, 0, 0, 2, 0, 0, 0, 6, 0],
                ], mode: 'Easy'
            },

            9: {
                Quetion: [
                    [0, 0, 0, 0, 8, 0, 2, 5, 9],
                    [0, 0, 0, 2, 6, 3, 0, 0, 0],
                    [1, 7, 2, 0, 0, 0, 0, 0, 8],
                    [0, 0, 0, 5, 0, 0, 8, 4, 0],
                    [0, 5, 0, 3, 0, 8, 0, 7, 0],
                    [0, 4, 3, 0, 0, 2, 0, 0, 0],
                    [7, 0, 0, 0, 0, 0, 3, 8, 5],
                    [0, 0, 0, 9, 7, 1, 0, 0, 0],
                    [4, 2, 6, 0, 3, 0, 0, 0, 0],
                ], mode: 'Easy'
            },

            10: {
                Quetion: [
                    [0, 2, 0, 0, 0, 0, 0, 7, 0],
                    [1, 0, 3, 0, 0, 0, 8, 0, 9],
                    [4, 0, 9, 0, 1, 0, 2, 0, 5],
                    [0, 0, 0, 8, 0, 1, 0, 0, 0],
                    [9, 0, 0, 0, 4, 0, 0, 0, 6],
                    [0, 0, 0, 7, 0, 3, 0, 0, 0],
                    [2, 0, 8, 0, 7, 0, 6, 0, 4],
                    [7, 0, 1, 0, 0, 0, 9, 0, 3],
                    [0, 4, 0, 0, 0, 0, 0, 5, 0],
                ], mode: 'Easy'
            }
        }
        let key = getRandomNumber(1, 10);
        setEasyData(easyObject[key]);
    };

    const forMidium = () => {

        const midiumObject = {
            1: {
                Quetion: [
                    [0, 0, 5, 0, 1, 0, 0, 0, 9],
                    [0, 0, 0, 8, 7, 9, 0, 1, 0],
                    [9, 0, 0, 0, 2, 0, 0, 0, 4],
                    [0, 0, 0, 0, 5, 0, 6, 2, 3],
                    [0, 0, 0, 3, 6, 2, 0, 0, 0],
                    [2, 6, 3, 0, 4, 0, 0, 0, 0],
                    [7, 0, 0, 0, 8, 0, 0, 0, 1],
                    [0, 4, 0, 7, 9, 5, 0, 0, 0],
                    [8, 0, 0, 0, 3, 0, 7, 0, 0],
                ], mode: 'Medium'

            },

            2: {
                Quetion: [
                    [0, 9, 5, 0, 7, 0, 0, 0, 0],
                    [0, 7, 0, 0, 0, 6, 0, 9, 8],
                    [0, 0, 0, 3, 0, 0, 6, 0, 0],
                    [0, 0, 7, 0, 0, 5, 0, 0, 6],
                    [4, 0, 3, 0, 0, 2, 0, 1, 0],
                    [0, 0, 0, 7, 0, 0, 0, 0, 0],
                    [5, 3, 0, 0, 2, 0, 0, 0, 4],
                    [0, 8, 6, 0, 0, 0, 0, 0, 3],
                    [7, 0, 2, 0, 9, 3, 0, 0, 0],
                ], mode: 'Medium'
            },

            3: {
                Quetion: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 9, 4, 0, 3, 0],
                    [5, 0, 0, 1, 3, 6, 4, 0, 0],
                    [0, 0, 2, 0, 0, 0, 6, 0, 7],
                    [9, 1, 5, 0, 0, 0, 0, 0, 2],
                    [0, 0, 7, 0, 0, 0, 8, 0, 5],
                    [8, 0, 0, 2, 1, 3, 9, 0, 0],
                    [0, 0, 0, 0, 5, 7, 0, 6, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                ], mode: 'Medium'
            },

            4: {
                Quetion: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [8, 0, 0, 4, 0, 6, 0, 0, 1],
                    [0, 7, 5, 0, 1, 0, 4, 6, 0],
                    [0, 4, 0, 3, 0, 8, 0, 9, 0],
                    [0, 0, 3, 0, 0, 0, 1, 0, 0],
                    [0, 5, 0, 1, 0, 4, 0, 7, 0],
                    [0, 8, 7, 0, 4, 0, 9, 1, 0],
                    [3, 0, 0, 9, 0, 7, 0, 0, 2],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                ], mode: 'Medium'
            },

            5: {
                Quetion: [
                    [6, 0, 0, 0, 0, 0, 0, 7, 0],
                    [0, 0, 1, 8, 5, 0, 0, 4, 9],
                    [0, 8, 0, 3, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 6, 0, 0, 0, 5],
                    [0, 2, 7, 5, 0, 0, 4, 6, 0],
                    [1, 0, 0, 0, 2, 4, 0, 0, 0],
                    [0, 4, 0, 0, 0, 5, 0, 8, 0],
                    [5, 0, 8, 4, 9, 1, 0, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0, 5, 4],
                ], mode: 'Medium'
            },

            6: {
                Quetion: [
                    [0, 8, 4, 0, 0, 0, 0, 6, 3],
                    [0, 0, 0, 6, 0, 0, 0, 5, 2],
                    [3, 0, 0, 0, 5, 0, 0, 7, 0],
                    [0, 0, 0, 0, 9, 5, 0, 0, 0],
                    [9, 0, 0, 3, 0, 4, 0, 0, 1],
                    [0, 0, 0, 1, 6, 0, 0, 0, 0],
                    [0, 1, 0, 0, 3, 0, 0, 0, 4],
                    [4, 5, 0, 0, 0, 9, 0, 0, 0],
                    [8, 3, 0, 0, 0, 0, 2, 9, 0],
                ], mode: 'Medium'
            },

            7: {
                Quetion: [
                    [8, 0, 1, 0, 3, 0, 0, 5, 0],
                    [0, 0, 0, 0, 0, 7, 1, 9, 3],
                    [0, 0, 5, 1, 0, 0, 0, 4, 0],
                    [0, 0, 0, 0, 0, 1, 4, 0, 2],
                    [0, 1, 0, 0, 0, 0, 0, 3, 0],
                    [2, 0, 4, 9, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 6, 8, 0, 0],
                    [9, 5, 7, 4, 0, 0, 0, 0, 0],
                    [0, 8, 0, 0, 7, 0, 0, 0, 4],
                ], mode: 'Medium'
            },

            8: {
                Quetion: [
                    [2, 0, 0, 9, 0, 4, 6, 0, 0],
                    [0, 0, 0, 0, 6, 0, 1, 0, 3],
                    [0, 0, 9, 0, 0, 3, 0, 0, 0],
                    [0, 0, 0, 0, 0, 2, 0, 7, 5],
                    [0, 0, 5, 0, 0, 0, 2, 0, 0],
                    [1, 9, 0, 4, 0, 0, 0, 0, 0],
                    [0, 0, 0, 6, 0, 0, 5, 0, 0],
                    [8, 0, 4, 0, 2, 0, 0, 0, 0],
                    [0, 0, 3, 7, 0, 8, 0, 0, 2],
                ], mode: 'Medium'
            },

            9: {
                Quetion: [
                    [7, 2, 3, 0, 5, 1, 4, 6, 0],
                    [0, 9, 0, 6, 0, 0, 2, 0, 0],
                    [8, 0, 6, 0, 0, 0, 0, 0, 0],
                    [0, 7, 8, 4, 0, 5, 0, 1, 0],
                    [0, 5, 0, 0, 8, 0, 0, 4, 0],
                    [0, 3, 0, 0, 0, 7, 0, 8, 0],
                    [0, 0, 0, 0, 0, 0, 3, 0, 4],
                    [0, 0, 7, 0, 0, 2, 0, 9, 0],
                    [0, 0, 9, 5, 4, 0, 0, 0, 0],
                ], mode: 'Medium'
            },

            10: {
                Quetion: [
                    [0, 0, 3, 7, 0, 0, 0, 0, 0],
                    [1, 0, 0, 0, 8, 0, 0, 0, 0],
                    [6, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 7, 0, 4, 0],
                    [2, 0, 0, 0, 0, 0, 6, 0, 0],
                    [8, 0, 0, 0, 1, 0, 0, 9, 2],
                    [0, 0, 0, 8, 5, 0, 0, 0, 0],
                    [0, 2, 4, 3, 0, 0, 0, 0, 5],
                    [7, 0, 0, 0, 0, 6, 1, 0, 4],
                ], mode: 'Medium'
            }

        }
        let key = getRandomNumber(1, 10);
        setMidiumData(midiumObject[key]);

    };


    const forHard = () => {

        const hardObject = {

            1: {
                Quetion: [
                    [4, 0, 0, 0, 0, 6, 1, 0, 3],
                    [0, 0, 7, 9, 0, 0, 0, 0, 8],
                    [0, 8, 0, 0, 5, 0, 0, 9, 0],
                    [0, 0, 2, 0, 0, 9, 0, 1, 0],
                    [3, 0, 0, 0, 0, 0, 0, 0, 2],
                    [0, 4, 0, 1, 0, 0, 3, 0, 9],
                    [9, 5, 0, 0, 4, 0, 0, 7, 0],
                    [2, 0, 4, 0, 0, 0, 9, 0, 0],
                    [1, 0, 8, 6, 9, 0, 0, 0, 4],
                ], mode: 'Hard'
            },

            2: {
                Quetion: [
                    [0, 0, 8, 4, 0, 9, 7, 0, 0],
                    [0, 0, 5, 1, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 7, 0, 2, 9],
                    [0, 7, 0, 6, 0, 8, 0, 0, 0],
                    [4, 0, 0, 0, 0, 2, 6, 9, 0],
                    [0, 6, 0, 0, 4, 5, 0, 0, 0],
                    [2, 0, 0, 0, 0, 0, 0, 6, 5],
                    [0, 0, 0, 0, 0, 0, 4, 7, 0],
                    [0, 0, 0, 0, 0, 0, 8, 0, 0],
                ], mode: 'Hard'
            },

            3: {
                Quetion: [
                    [0, 0, 7, 0, 0, 6, 0, 0, 9],
                    [0, 5, 0, 0, 7, 0, 0, 1, 0],
                    [9, 0, 0, 8, 0, 0, 2, 0, 0],
                    [7, 0, 0, 2, 0, 0, 4, 0, 0],
                    [0, 4, 0, 0, 9, 0, 0, 8, 0],
                    [0, 0, 9, 0, 0, 4, 0, 0, 6],
                    [0, 0, 1, 0, 0, 9, 0, 0, 4],
                    [0, 6, 0, 0, 5, 0, 0, 3, 0],
                    [5, 0, 0, 1, 0, 0, 8, 0, 0],
                ], mode: 'Hard'
            },

            4: {
                Quetion: [
                    [1, 0, 0, 0, 7, 0, 0, 0, 8],
                    [0, 8, 0, 4, 0, 9, 0, 3, 0],
                    [0, 0, 2, 0, 0, 0, 6, 0, 0],
                    [0, 7, 0, 9, 0, 5, 0, 8, 0],
                    [3, 0, 0, 0, 0, 0, 0, 0, 2],
                    [0, 9, 0, 8, 0, 2, 0, 4, 0],
                    [0, 0, 3, 0, 0, 0, 5, 0, 0],
                    [0, 2, 0, 5, 0, 7, 0, 6, 0],
                    [7, 0, 0, 0, 2, 0, 0, 0, 4],
                ], mode: 'Hard'
            },

            5: {
                Quetion: [
                    [0, 6, 0, 5, 3, 0, 0, 1, 0],
                    [0, 3, 0, 0, 8, 7, 5, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 4],
                    [0, 5, 1, 7, 0, 0, 2, 0, 0],
                    [0, 0, 0, 0, 9, 0, 0, 0, 0],
                    [0, 0, 3, 0, 0, 2, 6, 7, 0],
                    [3, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 7, 9, 1, 0, 0, 5, 0],
                    [0, 1, 0, 0, 5, 3, 0, 6, 0],
                ], mode: 'Hard'
            },

            6: {
                Quetion: [
                    [0, 7, 4, 0, 0, 0, 0, 5, 0],
                    [3, 6, 0, 4, 0, 0, 0, 0, 0],
                    [5, 0, 0, 0, 6, 3, 0, 0, 0],
                    [8, 0, 5, 6, 0, 0, 0, 3, 0],
                    [0, 4, 0, 0, 8, 0, 0, 6, 0],
                    [0, 3, 0, 0, 0, 7, 4, 0, 8],
                    [0, 0, 0, 1, 2, 0, 0, 0, 5],
                    [0, 0, 0, 0, 0, 9, 0, 2, 7],
                    [0, 5, 0, 0, 0, 0, 9, 8, 0],
                ], mode: 'Hard'
            },

            7: {
                Quetion: [
                    [0, 0, 0, 5, 0, 3, 0, 0, 0],
                    [7, 0, 0, 8, 0, 0, 0, 0, 4],
                    [0, 6, 0, 7, 1, 0, 0, 8, 3],
                    [0, 0, 0, 0, 2, 0, 0, 1, 6],
                    [0, 0, 5, 0, 0, 0, 0, 0, 0],
                    [2, 0, 0, 3, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 1, 0, 0],
                    [9, 5, 0, 0, 0, 4, 0, 6, 0],
                    [0, 0, 0, 0, 6, 0, 0, 4, 8],
                ], mode: 'Hard'
            },

            8: {
                Quetion: [
                    [0, 0, 7, 1, 0, 8, 9, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [8, 0, 2, 5, 0, 9, 7, 0, 4],
                    [6, 0, 8, 3, 0, 2, 1, 0, 9],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [7, 0, 1, 9, 0, 4, 5, 0, 2],
                    [5, 0, 9, 8, 0, 7, 3, 0, 6],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 6, 2, 0, 5, 8, 0, 0],
                ], mode: 'Hard'
            },

            9: {
                Quetion: [
                    [4, 0, 5, 0, 9, 0, 0, 7, 0],
                    [0, 0, 0, 0, 0, 0, 0, 2, 0],
                    [0, 0, 0, 0, 4, 0, 3, 5, 0],
                    [0, 0, 3, 0, 0, 5, 0, 0, 0],
                    [0, 0, 9, 6, 0, 3, 8, 0, 0],
                    [0, 0, 0, 2, 0, 0, 7, 0, 0],
                    [0, 3, 1, 0, 5, 0, 0, 0, 0],
                    [0, 7, 0, 0, 0, 0, 0, 0, 0],
                    [0, 8, 0, 0, 3, 0, 9, 0, 1],
                ], mode: 'Hard'
            },

            10: {
                Quetion: [
                    [7, 0, 0, 8, 0, 1, 2, 0, 0],
                    [4, 0, 0, 0, 0, 0, 0, 0, 6],
                    [0, 5, 0, 3, 0, 9, 0, 0, 0],
                    [0, 7, 0, 0, 0, 0, 9, 0, 0],
                    [2, 9, 0, 0, 0, 0, 0, 8, 4],
                    [0, 0, 3, 0, 0, 0, 0, 6, 0],
                    [0, 0, 0, 4, 0, 3, 0, 9, 0],
                    [3, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 0, 4, 1, 0, 8, 0, 0, 7],
                ], mode: 'Hard'
            }

        }
        let key = getRandomNumber(1, 10);
        setHardData(hardObject[key]);
    };


    const forExpert = () => {

        const expertobject = {

            1: {
                Quetion: [
                    [8, 0, 0, 0, 6, 0, 0, 7, 0],
                    [2, 0, 6, 0, 0, 7, 0, 0, 0],
                    [7, 4, 0, 3, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 7, 4, 3, 0, 1],
                    [0, 0, 0, 1, 0, 8, 0, 0, 0],
                    [0, 0, 1, 2, 0, 0, 0, 0, 0],
                    [3, 0, 2, 0, 1, 5, 0, 0, 6],
                    [4, 0, 0, 0, 2, 6, 1, 0, 0],
                    [1, 0, 0, 0, 0, 3, 2, 0, 4],
                ], mode: 'Expert'
            },

            2: {
                Quetion: [
                    [3, 0, 9, 0, 0, 4, 0, 6, 5],
                    [0, 0, 1, 8, 0, 0, 0, 0, 9],
                    [6, 0, 0, 0, 0, 9, 0, 0, 0],
                    [0, 2, 0, 4, 9, 0, 0, 0, 0],
                    [1, 5, 0, 0, 0, 0, 0, 3, 8],
                    [0, 0, 0, 0, 8, 1, 0, 5, 0],
                    [0, 0, 0, 9, 0, 0, 0, 0, 3],
                    [4, 0, 0, 0, 0, 2, 5, 0, 0],
                    [2, 3, 0, 1, 0, 0, 6, 0, 0],
                ], mode: 'Expert'
            },

            3: {
                Quetion: [
                    [0, 0, 9, 0, 0, 2, 0, 0, 5],
                    [0, 4, 0, 0, 9, 0, 0, 3, 0],
                    [5, 0, 0, 7, 0, 0, 1, 0, 0],
                    [9, 0, 0, 1, 0, 0, 6, 0, 0],
                    [0, 6, 0, 0, 5, 0, 0, 7, 0],
                    [0, 0, 5, 0, 0, 6, 0, 0, 2],
                    [0, 0, 3, 0, 0, 5, 0, 0, 6],
                    [0, 2, 0, 0, 4, 0, 0, 8, 0],
                    [4, 0, 0, 3, 0, 0, 7, 0, 0],
                ], mode: 'Expert'
            },

            4: {
                Quetion: [
                    [0, 0, 7, 1, 0, 8, 9, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [8, 0, 2, 5, 0, 9, 7, 0, 4],
                    [6, 0, 8, 3, 0, 2, 1, 0, 9],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [7, 0, 1, 9, 0, 4, 5, 0, 2],
                    [5, 0, 9, 8, 0, 7, 3, 0, 6],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 6, 2, 0, 5, 8, 0, 0],
                ], mode: 'Expert'
            },

            5: {
                Quetion: [
                    [0, 0, 0, 3, 0, 5, 0, 0, 0],
                    [0, 0, 5, 0, 4, 0, 6, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0, 9, 0],
                    [1, 0, 0, 0, 9, 0, 0, 0, 2],
                    [0, 9, 0, 1, 0, 4, 0, 7, 0],
                    [6, 0, 0, 0, 7, 0, 0, 0, 8],
                    [0, 8, 0, 0, 0, 0, 0, 2, 0],
                    [0, 0, 6, 0, 3, 0, 7, 0, 0],
                    [0, 0, 0, 6, 0, 2, 0, 0, 0],
                ], mode: 'Expert'
            },

            6: {
                Quetion: [
                    [3, 0, 0, 4, 2, 0, 5, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 6],
                    [0, 0, 5, 3, 0, 0, 2, 1, 9],
                    [9, 0, 6, 0, 0, 0, 7, 8, 1],
                    [0, 0, 0, 0, 9, 0, 0, 0, 0],
                    [7, 2, 4, 0, 0, 0, 9, 0, 5],
                    [6, 4, 3, 0, 0, 1, 8, 0, 0],
                    [5, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 8, 3, 0, 0, 4],
                ], mode: 'Expert'
            },

            7: {
                Quetion: [
                    [3, 0, 6, 0, 7, 0, 0, 0, 9],
                    [0, 2, 0, 0, 6, 0, 0, 7, 0],
                    [4, 0, 0, 0, 0, 3, 6, 0, 0],
                    [0, 0, 0, 0, 0, 2, 8, 0, 0],
                    [5, 9, 0, 0, 4, 0, 0, 1, 7],
                    [0, 0, 3, 7, 0, 0, 0, 0, 0],
                    [0, 0, 7, 2, 0, 0, 0, 0, 8],
                    [0, 4, 0, 0, 8, 0, 0, 6, 0],
                    [9, 0, 0, 0, 1, 0, 5, 0, 4],
                ], mode: 'Expert'
            },

            8: {
                Quetion: [
                    [9, 0, 0, 0, 1, 0, 0, 0, 3],
                    [7, 0, 0, 9, 0, 0, 8, 6, 0],
                    [0, 5, 3, 0, 0, 0, 0, 0, 0],
                    [1, 0, 0, 6, 0, 0, 0, 0, 0],
                    [0, 8, 6, 0, 0, 0, 4, 3, 0],
                    [0, 0, 0, 0, 0, 8, 0, 0, 1],
                    [0, 0, 0, 0, 0, 0, 1, 8, 0],
                    [0, 4, 9, 0, 0, 3, 0, 0, 2],
                    [6, 0, 0, 0, 5, 0, 0, 0, 9],
                ], mode: 'Expert'
            },

            9: {
                Quetion: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 5],
                    [5, 0, 6, 3, 8, 0, 0, 0, 0],
                    [0, 9, 0, 0, 0, 4, 0, 6, 0],
                    [3, 0, 9, 0, 0, 0, 0, 0, 6],
                    [0, 7, 0, 5, 0, 8, 0, 3, 0],
                    [2, 0, 0, 0, 0, 0, 5, 0, 4],
                    [0, 6, 0, 2, 0, 0, 0, 8, 0],
                    [0, 0, 0, 0, 3, 7, 1, 0, 9],
                    [4, 0, 0, 0, 0, 0, 0, 0, 0],
                ], mode: 'Expert'
            },

            10: {
                Quetion: [
                    [5, 0, 4, 0, 0, 0, 0, 7, 0],
                    [0, 0, 0, 0, 7, 1, 5, 0, 0],
                    [2, 0, 0, 0, 0, 4, 0, 9, 0],
                    [6, 0, 3, 0, 8, 0, 0, 0, 2],
                    [0, 0, 9, 0, 0, 0, 0, 0, 0],
                    [7, 1, 0, 6, 0, 0, 0, 0, 0],
                    [0, 4, 0, 8, 0, 0, 0, 0, 0],
                    [8, 0, 0, 1, 0, 7, 0, 4, 0],
                    [0, 0, 0, 0, 0, 0, 0, 3, 6],
                ], mode: 'Expert'
            }

        }
        let key = getRandomNumber(1, 10);
        setExpertData(expertobject[key]);
    };

    return (
        <View style={[styles.container, reduxData.dataToggleIcon && styles.backgroundColorDark]}>
            <View style={styles.navigateBack}>
                <TouchableOpacity style={[styles.innerNavigateBack, reduxData.dataToggleIcon && styles.darkElement]} onPress={() => props.navigation.navigate('Home')}>
                    <Icons name='arrow-back-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.outerDifficulty}>
                <View style={[styles.Difficulty, reduxData.dataToggleIcon && styles.darkElement]}>
                    <Text style={{ fontSize: windowWidth * 0.12, fontStyle: 'normal', fontWeight: 600, color: (!reduxData.dataToggleIcon ? '#6F6F6F' : '#7E7F91') }}>Mode</Text>
                </View>
            </View>
            <View style={styles.outerMainView}>
                <View style={[styles.mainview, reduxData.dataToggleIcon && styles.darkElement]}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Game', { GameState: easyData })}>
                        <Text style={styles.text}>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Game', { GameState: midiumData })}>
                        <Text style={styles.text}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Game', { GameState: hardData })}>
                        <Text style={styles.text}>Hard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Game', { GameState: expertData })}>
                        <Text style={styles.text}>Expert</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerDifficulty: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: windowWidth,
        // backgroundColor: 'green'
    },
    Difficulty: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        height: windowHight * 0.12,
        width: windowWidth * 0.45,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        marginTop: windowHight * 0.1
    },
    outerMainView: {
        flex: 2,
        alignItems: 'center',
        width: windowWidth,
    },
    mainview: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: windowHight * 0.45,
        width: windowWidth * 0.75,
        borderRadius: 60,
        borderColor: 'blue',
        borderWidth: 1,
        marginTop: windowHight * 0.021
    },
    button: {
        backgroundColor: '#317AE8',
        height: windowHight * 0.09,
        width: windowWidth * 0.65,
        margin: 4,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        borderRadius: 50,
        borderColor: '#317AE8',
        borderWidth: 2,
    },
    text: {
        fontSize: windowWidth * 0.1,
        fontWeight: '700',
        fontFamily: 'Arial',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
    },
    navigateBack: {
        justifyContent: 'center',
        paddingLeft: windowWidth * 0.03,
        width: windowWidth,
        height: windowHight * 0.09,
    },
    innerNavigateBack: {
        backgroundColor: 'blue',
        width: windowWidth * 0.11,
        height:  windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11)/2,
        backgroundColor: '#FFFFFF'
    },
    backgroundColorDark: {
        backgroundColor: '#0E0D13'
   },
   darkElement: {
       backgroundColor: '#222431',
       borderColor: '#323440'
   },
})

export default Difficultysreen