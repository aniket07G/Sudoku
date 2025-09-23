import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { useOfflineBoard } from "../Components/OfflineFeature";

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let grid = Array.from({ length: 9 }, () => Array(9).fill(0));

const Difficultysreen = (props) => {

    const [loading, setLoading] = useState({ isLoading: false, difficulty: "" });
    const reduxData = useSelector((state) => state.reducer);

    const initiateOfflineBoard = (key) => {
        console.log("Offline");
        props.navigation.navigate('Game', { GameState: useOfflineBoard(key) });
        setLoading({ isLoading: false, difficulty: "" });
    }

    const initializeBoard = async (key) => {
        setLoading({ isLoading: true, difficulty: key });
        const controller = new AbortController();
        const { signal } = controller;
        const id = setTimeout(() => {
            controller.abort();
            initiateOfflineBoard(key)
        }, 10000);
        try {
            const response = await fetch("https://youdosudoku.com/api/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    difficulty: key !== "expert" ? key : "hard", // "easy", "medium", or "hard" (defaults to "easy")
                    solution: true, // true or false (defaults to true)
                    array: false // true or false (defaults to false)
                }),
                signal
            });
            clearTimeout(id);
            const data = await response.json();
            const QuetionGrid = data.puzzle;
            const SolutionGrid = data.solution;
            const Difficulty = data.difficulty;
            let cnt = 0;
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    grid[i][j] = Number(QuetionGrid[cnt++]);
                }
            }
            if (Difficulty === "easy") {
                const DataToBesent = {
                    Quetion: grid,
                    mode: 'Easy'
                }
                props.navigation.navigate('Game', { GameState: DataToBesent });
            } else if (Difficulty === "medium") {
                const DataToBesent = {
                    Quetion: grid,
                    mode: 'Medium'
                }
                props.navigation.navigate('Game', { GameState: DataToBesent });
            } else if (Difficulty === "hard" && key !== "expert") {
                const DataToBesent = {
                    Quetion: grid,
                    mode: 'Hard'
                }
                props.navigation.navigate('Game', { GameState: DataToBesent });
            } else {
                const DataToBesent = {
                    Quetion: grid,
                    mode: 'Expert'
                }
                props.navigation.navigate('Game', { GameState: DataToBesent });
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                console.log("Getting Error", error);
            }
        } finally {
            setLoading({ isLoading: false, difficulty: "" });
        }
    }

    return (
        <View style={[styles.container, reduxData.dataToggleIcon && styles.backgroundColorDark]}>
            <View style={styles.navigateBack}>
                <TouchableOpacity style={[styles.innerNavigateBack, reduxData.dataToggleIcon && styles.darkElement]} onPress={() => props.navigation.navigate('Home')}>
                    <Icons name='arrow-back-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.outerDifficulty}>
                <View style={[styles.Difficulty, reduxData.dataToggleIcon && styles.darkElement]}>
                    <Text style={{ fontSize: windowWidth * 0.11, lineHeight: windowWidth * 0.16, fontFamily: 'Poppins-Bold', color: (!reduxData.dataToggleIcon ? '#6F6F6F' : '#7E7F91') }}>Mode</Text>
                </View>
            </View>
            <View style={styles.outerMainView}>
                <View style={[styles.mainview, reduxData.dataToggleIcon && styles.darkElement]}>
                    <TouchableOpacity style={styles.button} onPress={() => initializeBoard("easy")}>
                        {loading.isLoading && loading.difficulty === "easy" ? (
                            <ActivityIndicator size={"large"} color={"#FFFFFF"} />
                        ) : (
                            <Text style={styles.text}>Easy</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => initializeBoard("medium")}>
                        {loading.isLoading && loading.difficulty === "medium" ? (
                            <ActivityIndicator size={"large"} color={"#FFFFFF"} />
                        ) : (
                            <Text style={styles.text}>Medium</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => initializeBoard("hard")}>
                        {loading.isLoading && loading.difficulty === "hard" ? (
                            <ActivityIndicator size={"large"} color={"#FFFFFF"} />
                        ) : (
                            <Text style={styles.text}>Hard</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => initializeBoard("expert")}>
                        {loading.isLoading && loading.difficulty === "expert" ? (
                            <ActivityIndicator size={"large"} color={"#FFFFFF"} />
                        ) : (
                            <Text style={styles.text}>Expert</Text>
                        )}
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
        flex: 0.75,
        justifyContent: "center",
        alignItems: 'center',
        width: windowWidth,
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
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#FFFFFF',
        fontFamily: 'Poppins-Regular',
        includeFontPadding: false,
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
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11) / 2,
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