import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Linking } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import SocialIcon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";

const name = `Developed By:
Aniket Dongarwar`;

const aboutText = `Welcome to our Sudoku game, where the timeless puzzle meets modern convenience! Sudoku is more than just a game; it’s a journey of logic, strategy, and mental agility that has captivated puzzle enthusiasts for decades.

At its core, Sudoku is a logic-based number placement puzzle. The objective is simple yet challenging: fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids contain all of the numbers from 1 to 9. The game begins with some cells already filled in, serving as clues to help you deduce the placement of the remaining numbers.

The beauty of Sudoku lies in its simplicity. There are no complicated rules or intricate strategies to learn—just pure logic and pattern recognition. Each puzzle presents a unique challenge, requiring you to think critically and methodically to solve it. As you progress through the levels of difficulty, from Easy to Expert, the puzzles become increasingly complex, demanding greater concentration and problem-solving skills.

Sudoku is a game that can be enjoyed by anyone, regardless of age or experience. For beginners, it offers a gentle introduction to logical thinking and pattern recognition. For seasoned players, it provides an endless array of puzzles that test your limits and keep your mind sharp. Each puzzle you solve not only brings a sense of accomplishment but also helps improve your cognitive abilities, enhancing memory, focus, and analytical thinking.

Playing Sudoku is not just a solitary activity; it’s a mental exercise that can be both relaxing and stimulating. It’s perfect for those moments when you want to unwind and clear your mind, yet still engage in a meaningful and rewarding task. The game’s meditative quality helps reduce stress and increase mindfulness, making it a perfect companion for your daily routine.

Our app takes the traditional Sudoku experience and elevates it with a user-friendly interface and helpful features. Whether you’re solving puzzles on a short break, during your commute, or in the comfort of your home, our app ensures that you have a seamless and enjoyable experience every time.

Embark on your Sudoku journey with us and discover the joy of solving puzzles. Whether you’re a novice or a Sudoku master, our game offers endless hours of entertainment, challenge, and mental stimulation. Dive into the world of numbers, patterns, and logic, and experience the timeless appeal of Sudoku in a whole new way. Happy puzzling!`

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const About = (props) => {

    const reduxData = useSelector((state) => state.reducer);

    return (
        <View style={styles.container}>
            <View style={[styles.header, reduxData.dataToggleIcon && styles.backgroundColorDark, reduxData.dataToggleIcon && styles.headerbottomDark]}>
                <TouchableOpacity style={[styles.navigateBack, reduxData.dataToggleIcon && styles.darkElement]} onPress={() => props.navigation.navigate('Home')}>
                    <Icons name='arrow-back-circle-outline' size={windowWidth * 0.11} color={!reduxData.dataToggleIcon ? 'black' : 'white'} />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: windowWidth * 0.075, fontWeight: '500', marginLeft: 4, color: !reduxData.dataToggleIcon ? 'black' : 'white' }}> About </Text>
                </View>
            </View>
            <View style={[styles.mainView, reduxData.dataToggleIcon && styles.backgroundColorDark]}>
                <ScrollView style={{ padding: 30 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 10, height: 105, width: 105, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 100, width: 100 }} source={require('../assets/pastime.png')} />
                        </View>
                    </View>
                    <Text style={[styles.aboutText, reduxData.dataToggleIcon && styles.textDark]}>
                        {aboutText}
                    </Text>
                    <View style={styles.socialIconsContainer}>
                        <TouchableOpacity style={styles.socialIcon} onPress={()=> Linking.openURL('https://github.com/aniket07G')}>
                            <SocialIcon name='github' size={windowWidth * 0.11} color= {!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon} onPress={()=> Linking.openURL('https://www.instagram.com/aniket.d07?igsh=YmdweXRvZnEzcDZz')}>
                            <SocialIcon name='instagram' size={windowWidth * 0.11} color= {!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialIcon} onPress={()=> Linking.openURL('https://www.linkedin.com/in/aniket-dongarwar-03bb0631a/')}>
                            <SocialIcon name='linkedin-in' size={windowWidth * 0.11} color= {!reduxData.dataToggleIcon ? 'black' : 'white'} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.contactText, reduxData.dataToggleIcon && {color: 'white'}]}>Aniket Dongarwar</Text>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        // backgroundColor: 'blue',
        paddingLeft: windowWidth * 0.03,
        width: windowWidth,
        height: windowHight * 0.09,
    },
    mainView: {
        flex: 9,
        backgroundColor: '#F5F5F5'
    },
    navigateBack: {
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (windowWidth * 0.11) / 2,
        backgroundColor: '#FFFFFF'
    },
    scrollContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    aboutText: {
        fontFamily: 'Roboto',
        fontSize: windowWidth * 0.05,
        color: '#333333',
        textAlign: 'justify',
        fontWeight: '500',
        marginTop: 10,
        marginBottom: - windowWidth * 0.07,
        // backgroundColor: 'yellow'

    },
    developerName: {
        fontSize: windowWidth * 0.07,
        color: '#003366',
        textAlign: 'left',
        fontWeight: '500',
        marginTop: windowHight * 0.02,
        marginBottom: 100
    },
    backgroundColorDark: {
        backgroundColor: '#0E0D13'
    },
    darkElement: {
        backgroundColor: '#222431',
    },
    textDark: {
        color: '#F5F5F5'
    },
    developerNameDark: {
        color: 'white'
    },
    headerbottomDark: {
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: windowWidth * 0.2
    },
    socialIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: windowWidth * 0.015
    },
    contactText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 13,
        color: 'black',
        marginBottom: windowWidth * 0.2,
        opacity: 0.5
    }
})

export default About;