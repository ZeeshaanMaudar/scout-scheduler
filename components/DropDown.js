import React, { Component, Fragment } from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
 
const callDropDownItems = () => {
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
      newArray.push({id: farmer.id, name: farmer.name})
    });
  })
  return newArray;
}


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: []
    }
  }
  render() {
  return (
        <Fragment>
          <SearchableDropdown
            onItemSelect={(item) => {
              console.log(222, this.state.selectedItems)
              const items = this.state.selectedItems;
              items.push(item)
              this.setState({ selectedItems: items });
            }}
            containerStyle={{ padding: 5 }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedItems: items });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={callDropDownItems() || []}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: "placeholder",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                },
                onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </Fragment>
  );
  }
}

export default Test;
