// Footer.js
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>© 2024 by V.R</Text>
    </View>
  );
}
