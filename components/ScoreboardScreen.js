//ScoreboardScreen.js
import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './header';
import Footer from './footer';
import { DataTable } from 'react-native-paper';
import styles from './styles';

const ScoreboardScreen = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const storedScores = await AsyncStorage.getItem('scoreboard');
      const formattedScores = storedScores ? JSON.parse(storedScores) : [];
      setScores(formattedScores.sort((a, b) => b.score - a.score));
    } catch (error) {
      console.error('Failed to fetch scores from storage', error);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem('scoreboard'); 
      setScores([]); 
      console.log('Scoreboard cleared successfully');
    } catch (error) {
      console.error('Failed to clear scoreboard', error);
    }
  };

  const refreshScoreboard = () => {
    fetchScores();
  };

  return (
    <View style={styles.container}>
      <Header />

      <Button title="Refresh" onPress={refreshScoreboard} />
      <Button title="Clear History" onPress={clearScoreboard} color="red" />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Player</DataTable.Title>
          <DataTable.Title numeric>Date</DataTable.Title>
          <DataTable.Title numeric>Score</DataTable.Title>
        </DataTable.Header>
        {scores.slice(0, 7).map((score, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{score.playerName}</DataTable.Cell>
            <DataTable.Cell numeric>{new Date(score.date).toLocaleDateString()}</DataTable.Cell>
            <DataTable.Cell numeric>{score.score}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Footer />
    </View>
  );
};

export default ScoreboardScreen;
