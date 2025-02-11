import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import SudokuBoard from '../Components/Grid';
import NumberLine from '../Components/NumbertLine';
import HeaderBar from '../Components/HeaderBar';
import NavigationBar from '../Components/NavigationBar';
import FeatureBar from '../Components/FeaturesBar';
import Features from '../Components/FeaturesBar';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PauseAction, ResumeIconAction } from '../Components/redux/action';

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let holdPriviousState;
const notice = {
  1: 'Better to use Hint and Erase features to avoid complexity',
  2: 'Hint is based on current game state',
  3: 'Use settings to customise game according you',
  4: 'Pay attention to highlighted numbers to avoide mistakes'
}

const Gamescreen = (props) => {

  const [datafromNumberLine, setDatafromNumberLine] = useState({});
  const [visibility, setvisibility] = useState(false);
  const [score, setScore] = useState('00:00');
  const [restart, setRestart] = useState(false);
  const [mistake, setMistake] = useState(false);
  const [numberOFMistakes, setNumberOFMistakes] = useState(0);

  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.reducer)
  const pasuseVisibility = reduxData.dataPause !== undefined ? reduxData.dataPause : null;
  const gameState = props && props.route && props.route.params ? props.route.params.GameState : null;
  if (gameState !== null) {
    holdPriviousState = gameState;
  }

  const handleDataUpdate = (data) => {
    setDatafromNumberLine(data);
  }

  const updateVisibility = (data) => {
    setvisibility(data);
  }

  const getMistake = (data, noOfMistakes) => {
    setMistake(data);
    setNumberOFMistakes(noOfMistakes);
  }

  const getscore = (data) => {
    setScore(data)
  }

  const handleRestart = () => {
    setMistake(false);
    setRestart({ initiate: getRandomNumber(1, 500), yesRestart: true });
  }

  const handleResume = () => {
    dispatch(PauseAction(false));
    dispatch(ResumeIconAction(false));
  }

  const handlePauseRestart = () => {
    dispatch(PauseAction(false));
    dispatch(ResumeIconAction(false));
    setRestart({ initiate: getRandomNumber(1, 500), yesRestart: true });
  }

  return (
    <View style={[styles.container, reduxData.dataToggleIcon && styles.backgroundDark]}>
      <View style={styles.navigationBar}>
        <NavigationBar navigation={props.navigation} />
      </View>
      <View style={[styles.header, reduxData.dataToggleIcon && styles.darkElement]}>
        <HeaderBar isGamecompleted={visibility} takeGetscore={getscore} takeMistakes={numberOFMistakes} gameData={gameState !== null ? gameState : holdPriviousState} isRestart={restart} />
      </View>
      <View style={[styles.grid, reduxData.dataToggleIcon && styles.darkElement]}>
        <SudokuBoard data={datafromNumberLine} visibilityData={updateVisibility} gameData={gameState !== null ? gameState : holdPriviousState} isMistake={getMistake} isRestart={restart} />
      </View>
      <View style={[styles.numberline, reduxData.dataToggleIcon && styles.darkElement]}>
        <NumberLine onDataUpdate={handleDataUpdate} isRestart={restart} />
      </View>
      <View style={[styles.Features, reduxData.dataToggleIcon && styles.darkElement]}>
        <FeatureBar handleRestart={handleRestart} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Modal animationType='slide' transparent={true} visible={visibility} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))' }}>
            <View style={[styles.modalLayout, reduxData.dataToggleIcon && styles.modalLayoutDark]}>
              <View style={styles.youwon}>
                <Text style={[styles.wontext, reduxData.dataToggleIcon && styles.darkText]}>YOU WON</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/trophy.png')} style={{ height: windowHight * 0.2, width: windowWidth * 0.45, marginTop: windowHight * 0.0075 }} resizeMode='contain' />
                {reduxData.dataTimerSetting && (
                  <Text style={{ fontSize: windowWidth * 0.098, color: (!reduxData.dataToggleIcon ? '#6F6F6F' : '#DEDEDE') }}>{score}</Text>
                )}
              </View>
              <View style={styles.reset}>
                <TouchableOpacity style={[styles.resetbutton, reduxData.dataToggleIcon && styles.darkResumeActionButton]} onPress={() => props.navigation.navigate('Mode')}>
                  <Text style={{ fontSize: windowWidth * 0.085, fontWeight: '600', color: '#FFFFFF' }}>Play Again</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {reduxData.dataMistakeSetting && (
          <Modal animationType='slide' transparent={true} visible={mistake} >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))' }}>
              <View style={[styles.modalLayout, reduxData.dataToggleIcon && styles.modalLayoutDark]}>
                <View style={[styles.youwon, reduxData.dataToggleIcon && styles.modalLayoutDark]}>
                  <Text style={[styles.wontext, reduxData.dataToggleIcon && styles.darkText]}>GAME OVER</Text>
                </View>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: (!reduxData.dataToggleIcon ? '#FFFFFF' : '#232532') }}>
                  <Image source={require('../assets/lose.png')} style={{ height: windowHight * 0.2, width: windowWidth * 0.4, marginTop: windowHight * 0.006 }} resizeMode='contain' />
                  <Text style={{ fontSize: windowWidth * 0.095, color: '#EB4A3E' }}>6/6</Text>
                </View>
                <View style={[styles.reset, reduxData.dataToggleIcon && styles.modalLayoutDark]}>
                  <TouchableOpacity style={[styles.resetbutton, reduxData.dataToggleIcon && styles.darkResumeActionButton]} onPress={handleRestart}>
                    <Text style={{ fontSize: windowWidth * 0.085, fontWeight: '600', color: '#FFFFFF' }}>Restart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
       )}
        <Modal animationType='slide' transparent={true} visible={pasuseVisibility} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))' }}>
            <View style={[styles.modalLayout, reduxData.dataToggleIcon && styles.modalLayoutDark]}>
              <View style={[styles.resumelayout, reduxData.dataToggleIcon && styles.modalLayoutDark]}>
                <View style={styles.resumediificultylevel}>
                  <View style={[styles.resumeboxOne, reduxData.dataToggleIcon && styles.resumeBoxDark, !reduxData.dataTimerSetting && { width: windowWidth * 0.38 }]}>
                    <Text style={[styles.resumeText, reduxData.dataToggleIcon && styles.darkText]}>{holdPriviousState.mode}</Text>
                  </View>
                </View>
                {reduxData.dataTimerSetting && (
                  <View style={styles.resumescore}>
                    <View style={[styles.resumeboxTwo, reduxData.dataToggleIcon && styles.resumeBoxDark]}>
                      <Text style={[styles.resumeText, reduxData.dataToggleIcon && styles.darkText]}>{reduxData.dataResumeScore}</Text>
                    </View>
                  </View>
                )}
                <View style={styles.resumemistatake}>
                  <View style={[styles.resumeboxThree, reduxData.dataToggleIcon && styles.resumeBoxDark, !reduxData.dataTimerSetting && { width: windowWidth * 0.38 }]}>
                    <Text style={[styles.resumeText, reduxData.dataToggleIcon && styles.darkText]}>{reduxData.dataResumeMistake}</Text>
                  </View>
                </View>
              </View>
              <View style={{ backgroundColor: (!reduxData.dataToggleIcon ? 'white' : '#232532'), flex: 2 }}>
                <View style={[styles.resumeTextLayout, reduxData.dataToggleIcon && styles.resumeTextLayoutDark]}>
                  <Image source={require('../assets/conception_2733398.png')} style={{ height: windowWidth * 0.12, width: windowWidth * 0.12 }} />
                  <Text style={{ fontSize: windowWidth * 0.05, textAlign: 'center', fontWeight: '400', margin: windowWidth * 0.04, color: (!reduxData.dataToggleIcon ? '#6F6F6F' : '#DEDEDE') }}>{notice[getRandomNumber(1,4)]}</Text>
                </View>
              </View>
              <View style={{ backgroundColor: (!reduxData.dataToggleIcon ? 'white' : '#232532'), flex: 1, borderRadius: 20 }}>
                <View style={styles.resumebutton}>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.resumeActualButtom, reduxData.dataToggleIcon && styles.darkResumeActionButton]} onPress={handleResume}>
                      <Text style={{ fontSize: windowWidth * 0.073, fontWeight: '600', color: '#FFFFFF' }}>Resume</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }} onPress={() => handlePauseRestart()}>
                      <Text style={{ fontSize: windowWidth * 0.055, fontWeight: '400', marginTop: -8, color: (!reduxData.dataToggleIcon ? '#6F6F6F' : '#979797') }}>Restart</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FB',
  },
  grid: {
    padding: 8,
    alignSelf: 'stretch',
    margin: 0,
    paddingTop: 0,
    backgroundColor: '#FFFFFF',
    marginLeft: 14,
    marginRight: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    padding: 8,
    marginTop: 22,
    paddingBottom: 0,
    paddingTop: 4,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    marginLeft: 14,
    marginRight: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: windowHight * 0.06
  },
  numberline: {
    padding: 8,
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    marginLeft: 14,
    marginRight: 14,
    marginTop: windowHight * 0.02,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  Features: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  navigationBar: {
  },
  youwon: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wontext: {
    fontSize: windowWidth * 0.097,
    color: 'black',
    fontWeight: '700',
    letterSpacing: -2,
    marginTop: windowHight * 0.042,
  },
  resetbutton: {
    backgroundColor: 'blue',
    padding: windowWidth * 0.09,
    paddingBottom: windowWidth * 0.015,
    paddingTop: windowWidth * 0.015,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: windowHight * 0.01
  },
  reset: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  resumelayout: {
    flex: 1,
    flexDirection: "row",
    marginTop: windowHight * 0.02,
  },
  resumediificultylevel: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  resumescore: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  resumemistatake: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  resumeboxOne: {
    backgroundColor: '#EEF5FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: windowWidth * 0.026,
    height: windowWidth * 0.23,
    width: windowWidth * 0.23,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  resumeboxTwo: {
    backgroundColor: '#EEF5FD',
    justifyContent: 'center',
    alignItems: 'center',
    height: windowWidth * 0.23,
    width: windowWidth * 0.23,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  resumeboxThree: {
    backgroundColor: '#EEF5FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: windowWidth * 0.026,
    height: windowWidth * 0.23,
    width: windowWidth * 0.23,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF'
  },
  resumeText: {
    color: 'black',
    fontSize: windowWidth * 0.065,
    fontWeight: '400',
  },
  resumebutton: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modalLayout: {
    height: windowHight * 0.57,
    width: windowWidth * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
  },
  resumeTextLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF5FD',
    flex: 1,
    margin: windowWidth * 0.037,
    borderRadius: 20,
    flexDirection: 'column'
  },
  resumeActualButtom: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    width: windowWidth * 0.49
  },
  backgroundDark: {
    backgroundColor: '#0E0D13'
  },
  darkElement: {
    backgroundColor: '#2A2F42'
  },
  modalLayoutDark: {
    backgroundColor: '#232532'
  },
  resumeTextLayoutDark: {
    backgroundColor: '#393F59'
  },
  resumeBoxDark: {
    backgroundColor: '#393F59',
    borderColor: '#323440'
  },
  darkText: {
    color: '#DEDEDE'
    // color: '#FFFFFF'
  },
  darkResumeActionButton: {
    borderColor: '#323440'
  }


})

export default Gamescreen;
