import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';

import { Dropdown } from 'react-native-material-dropdown';

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
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

  callDropDownItems() {
    let newArray = [];
    const token = '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB';
    fetch('https://sherlock.aerobotics.io/developers/clients/', {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      json.results.map(farmer => {
        newArray.push({value: farmer.name})
      });
    })
    return newArray;
  }

  onChangeTextPress(value, date, stateItems, stateClients){
      if(stateItems[date].length > 1){
        let filteredClients = stateClients.filter(client => {
          return value !== client.value
        });
        this.setState({ clients: filteredClients })
      }
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text>{item.title} to be assigned on {item.date}</Text>
        <Dropdown
          label='Assign Someone'
          data={this.callDropDownItems()}
          onChangeText={(value)=>{this.onChangeTextPress(value, item.date, this.state.items, this.callDropDownItems())}}
         />
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
