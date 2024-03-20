// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './styles';
import { GAME_CONSTANTS } from './Constants';
import Footer from './footer';
import Header from './header';

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState('');
  const [hasSubmittedName, setHasSubmittedName] = useState(false);

  const gameRules = `THE GAME: Upper section of the classic Yahtzee dice game. You have ${
    GAME_CONSTANTS.NBR_OF_DICES
  } dices and for every dice you have ${GAME_CONSTANTS.NBR_OF_THROWS} throws. After each throw, you can keep dices in order to get same dice spot counts as many as possible. In the end of the turn, you must select your points from ${
    GAME_CONSTANTS.MIN_SPOT
  } to ${
    GAME_CONSTANTS.MAX_SPOT
  }. Game ends when all points have been selected. The order for selecting those is free.
  POINTS: After each turn, the game calculates the sum for the dices you selected. Only the dices having the same spot count are calculated. Inside the game, you cannot select the same points from ${
    GAME_CONSTANTS.MIN_SPOT
  } to ${
    GAME_CONSTANTS.MAX_SPOT
  } again.
  GOAL: To get points as much as possible. ${
    GAME_CONSTANTS.BONUS_POINTS_LIMIT
  } points is the limit of getting bonus which gives you ${GAME_CONSTANTS.BONUS_POINTS} points more.`;

  const handleSubmitName = () => {
    if (name.trim()) setHasSubmittedName(true);
  };

  const handlePlay = () => {
    navigation.navigate('Gameboard', { playerName: name });
  };

  return (
    <View style={styles.container}>
      <Header />
      {!hasSubmittedName ? (
        <View>
          <Text>For scoreboard, enter your name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Enter name"
          />
          <Button title="Submit" onPress={handleSubmitName} style={styles.button} />
        </View>
      ) : (
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.gameinfo}>{gameRules}</Text>
          <Button title="Play" onPress={handlePlay} />
        </View>
      )}
      <Footer />
    </View>
  );
}
