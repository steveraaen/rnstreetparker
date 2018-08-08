import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppState,
  AsyncStorage,
  Button,
  Dimensions,
  Modal,
  Picker,
  ScrollView,
  Slider,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import axios from 'axios'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchB extends Component {
  constructor(props) {
    super(props) ;
    this.state={
      currentDay: props.initDay,
      selectedDay: props.selDay,
      selectedIndex: 2,
    }
    this.handleDaySelect = this.handleDaySelect.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }
    updateIndex (selectedIndex) {
  this.setState({selectedIndex}, () => {
    
    if(this.state.selectedIndex === 0) {
      this.setState({selectedDay: 'SUN'})
    } else if(this.state.selectedIndex === 1) {
      this.setState({selectedDay: 'MON'})
    } else if(this.state.selectedIndex === 2) {
      this.setState({selectedDay: 'TUE'})
    } else if(this.state.selectedIndex === 3) {
      this.setState({selectedDay: 'WED'})
    } else if(this.state.selectedIndex === 4) {
      this.setState({selectedDay: 'THU'})
    } else if(this.state.selectedIndex === 5) {
      this.setState({selectedDay: 'FRI'})
    } else if(this.state.selectedIndex === 6) {
      this.setState({selectedDay: 'SAT'})
    }
  })
  this.props.makeMarker(this.state.selectedDay)
}
  handleDaySelect(day) {
   
    this.setState({
      selectedDay: day
    }, () => this.props.makeMarker(day))
  }

  render() {
    const buttons = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat' ]
    const { selectedIndex } = this.state
    const styles= StyleSheet.create({
      selectedDay: {
        fontSize: 24, 
        color: 'yellow'
      }
    })
    return(

    <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40}}
      disableSelected={true}
    />    

      )
  }
}