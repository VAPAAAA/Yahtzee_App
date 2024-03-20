import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Grid, Col } from 'react-native-easy-grid';
import styles from './styles';
import Footer from './footer';
import Header from './header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GAME_CONSTANTS } from '../components/Constants';

const { NBR_OF_DICES, NBR_OF_THROWS } = GAME_CONSTANTS;

export default function GameboardScreen({ route }) {
  const { playerName } = route.params;
  const [throwsLeft, setThrowsLeft] = useState(NBR_OF_THROWS);
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  const [board, setBoard] = useState([]);
  const [scores, setScores] = useState(new Array(6).fill(0));
  const [scoreSelected, setScoreSelected] = useState(new Array(6).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [pointsNeededForBonus, setPointsNeededForBonus] = useState(63);

  useEffect(() => {
    if (gameOver) {
      saveGameResult(playerName, totalScoreWithBonus);
    }
  }, [gameOver]);

  const throwDices = () => {
    if (!gameOver) {
      let newBoard = [];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          newBoard.push('dice-' + (Math.floor(Math.random() * 6) + 1));
        } else {
          newBoard.push(board[i]);
        }
      }
      setBoard(newBoard);
      setThrowsLeft(throwsLeft - 1);
      setScoreSelected(new Array(6).fill(false)); // Reset score selection on new roll
  
      if (throwsLeft === 1) {
        setGameOver(true);
      }
    } else {
      restartGame();
    }
  };

  const selectDice = (i) => {
    if (!gameOver) {
      let newSelectedDices = [...selectedDices];
      newSelectedDices[i] = !newSelectedDices[i];
      setSelectedDices(newSelectedDices);
    }
  };

  const restartGame = () => {
    saveGameResult(playerName, totalScoreWithBonus); // Save the score before resetting the game
    setThrowsLeft(NBR_OF_THROWS);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setBoard([]);
    setScores(new Array(6).fill(0));
    setScoreSelected(new Array(6).fill(false)); // Reset score selection on restart
    setGameOver(false);
    setPointsNeededForBonus(63); // Reset points needed for bonus
  };

  const handleSpotCountSelect = (spotValue) => {
    if (!scoreSelected[spotValue - 1]) {
      const count = board.filter(val => val === `dice-${spotValue}`).length;
      const newScores = [...scores];
      newScores[spotValue - 1] = count * spotValue + scores[spotValue - 1]; // Add to the existing score
      setScores(newScores);
      let newScoreSelected = [...scoreSelected];
      newScoreSelected[spotValue - 1] = true;
      setScoreSelected(newScoreSelected);

      // Calculate points needed for bonus
      const totalScore = newScores.reduce((acc, curr) => acc + curr, 0);
      setPointsNeededForBonus(totalScore >= 63 ? 0 : 63 - totalScore);
    }
  };

  const saveGameResult = async (playerName, score, date, callback) => {
    const existingScores = await AsyncStorage.getItem('scoreboard');
    const scoreboard = existingScores ? JSON.parse(existingScores) : [];
    const newScore = { playerName, score, date: new Date().toISOString() };
    scoreboard.push(newScore);
    scoreboard.sort((a, b) => b.score - a.score);
    await AsyncStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    if (callback) callback();
  };

  const getDiceColor = (i) => {
    return selectedDices[i] ? "black" : "steelblue";
  };

  const SpotCountButtons = ({ onSelect }) => {
    return (
      <Grid style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        {Array.from({ length: 6 }, (_, i) => (
          <Col key={i} style={{ alignItems: 'center' }}>
            <Text style={styles.score}>{scores[i]}</Text>
            <Pressable
              onPress={() => onSelect(i + 1)}
              disabled={scoreSelected[i]} 
              style={[styles.circleButton, { backgroundColor: scoreSelected[i] ? '#b0b0b0' : '#e0e0e0' }]} 
            >
              <Text style={styles.circleButtonText}>{i + 1}</Text>
            </Pressable>
          </Col>
        ))}
      </Grid>
    );
  };

  const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
  const totalScoreWithBonus = totalScore >= 63 ? totalScore + 50 : totalScore;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.gameboard}>
          <View style={styles.flex}>
            {board.map((value, index) => (
              <Pressable key={index} onPress={() => selectDice(index)}>
                <MaterialCommunityIcons name={value} size={50} color={getDiceColor(index)} />
              </Pressable>
            ))}
          </View>
          <Text style={styles.gameinfo}>Throws left: {throwsLeft}</Text>
          {gameOver && <Text style={styles.gameinfo}>Game over</Text>}
          <Pressable style={styles.button} onPress={throwDices}>
            <Text style={styles.buttonText}>{gameOver ? 'Restart game' : 'Throw dices'}</Text>
          </Pressable>
          <SpotCountButtons onSelect={handleSpotCountSelect} />
          <Text style={styles.gameinfo}>Total Score: {totalScoreWithBonus}</Text>
          {!gameOver && totalScore >= 63 && <Text style={styles.gameinfo}>Congratulations!</Text>}
          <Text style={styles.gameinfo}>Points Needed for Bonus: {pointsNeededForBonus}</Text>
          {gameOver && totalScore >= 63 && <Text style={styles.gameinfo}>Congratulations!</Text>}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
