import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CalendarAgenda from '../components/Calendar';


const MainScreen = () => (
  <CalendarAgenda />
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MainScreen;