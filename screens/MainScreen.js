import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {

  return (
    <View style={styles.screen}>
      <Text>The Main Schedule Calendar</Text>
      <Button title="View All Schedules" onPress={() => {
        navigation.navigate({routeName: 'ViewAll'})
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MainScreen;
