import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';

export default class NotInNYC extends Component {
  render() {
    return(
      <View style={{ flex: 1, flexWrap: 'wrap', marginLeft: 10, marginRight: 10, borderRadius: 12, justifyContent: 'center', backgroundColor: this.props.bgColor, marginBottom: 6}}>
      <Text style={{color: 'yellow', fontSize: 22}}>This application only works when you are in New York City</Text>
      </View>
      )
  }
}