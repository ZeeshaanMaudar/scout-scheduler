import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Picker,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      farmer: '',
    };
  }

  loadItems(day) {
    const token = '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB';
      fetch('https://sherlock.aerobotics.io/developers/scoutmissions/', {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(res => res.json())
    .then(json => {

      let object = {};
      let array = json.results;
      for(let i in array) {
        if(!object[array[i].date]) object[array[i].date] = [array[i]];
        else object[array[i].date].push(array[i])
      }

      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!object[strTime]) {
          object[strTime] = [];
          }
        }
        
      this.setState({
        items: object
      });
    });
  }

  callPickerItem() {
    const token = '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB';
      fetch('https://sherlock.aerobotics.io/developers/clients/', {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      json.results.map(farmer => (
        <Picker.Item label={farmer.name} value={farmer.name} />
      ))
    })
  }

  updateFarmer = farmer => {
    this.setState({ farmer });
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text>{item.title} to be assigned on {item.date}</Text>
        <Button title="Assign Work" onPress={() => console.log('it worked each time')}/>
        <Picker
          selectedValue={this.state.farmer}
          onValueChange={this.updateFarmer}
        >
          {/* {this.callPickerItem()} */}
          <Picker.Item label = "Steve" value = "steve" />
               <Picker.Item label = "Ellen" value = "ellen" />
               <Picker.Item label = "Maria" value = "maria" />
        </Picker>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No Scouts</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        selected={'2018-09-11'}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

export default AgendaScreen;
