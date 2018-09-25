import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppState,
  AsyncStorage,
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

var todayOW = moment().format('ddd').toUpperCase()
console.log(todayOW)
export default class SearchB extends Component {
  constructor(props) {
    super(props) ;
    this.state={
      currentDay: props.initDay,
      selectedDay: props.selDay,
      selectedIndex: null,
      daysArray: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      indexArray:[0,1,2,3,4,5,6]
    }
    this.handleDaySelect = this.handleDaySelect.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }
    updateIndex (selectedIndex) {
  this.setState({selectedIndex}, () => {
    
    if(this.state.selectedIndex === 0) {
      this.setState({selectedDay: 'SUN'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    } else if(this.state.selectedIndex === 1) {
      this.setState({selectedDay: 'MON'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    } else if(this.state.selectedIndex === 2) {
      this.setState({selectedDay: 'TUE'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    } else if(this.state.selectedIndex === 3) {
      this.setState({selectedDay: 'WED'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    } else if(this.state.selectedIndex === 4) {
      this.setState({selectedDay: 'THU'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    } else if(this.state.selectedIndex === 5) {
      this.setState({selectedDay: 'FRI'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    } else if(this.state.selectedIndex === 6) {
      this.setState({selectedDay: 'SAT'}, () => {
        this.props.makeMarker(this.state.selectedDay)
      })
    }
  })

}
  handleDaySelect(day) {
   
    this.setState({
      selectedDay: day
    }, () => this.props.getNewDay(day))
  }
componentWillMount() {
      for(let i = 0; i < this.state.daysArray.length; i++) {    
      if(this.state.daysArray[i] === todayOW) {
        this.setState({selectedIndex: i})
      }
    }
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
      disableSelected={true}
      selectedButtonStyle={{backgroundColor: this.props.bgColor}}
      selectedTextStyle={{color: this.props.fgColor, fontWeight: 'bold'}}
      textStyle={{color: 'white', fontWeight: 'bold'}}
      containerStyle={{backgroundColor: this.props.bgColor, borderRadius: 12}}
    />    

      )
  }
}