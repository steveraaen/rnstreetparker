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
import axios from 'axios'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
export default class Search extends Component {
  constructor(props) {
    super(props) ;
    this.state={
      currentDay: props.initDay,
      selectedDay: props.selDay
    }
    this.handleDaySelect = this.handleDaySelect.bind(this)
  }
  handleDaySelect(day) {
   
    this.setState({
      selectedDay: day
    }, () => this.props.makeMarker(day))
  }

  render() {
    const styles= StyleSheet.create({
      selectedDay: {
        fontSize: 24, 
        color: 'yellow'
      }
    })
    return(
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
        <View>
          <ScrollView horizontal={true}>
            <View style={{flex: .12, margin: 6}}><TouchableOpacity value={"SUN"} onPress={() => this.handleDaySelect("SUN")}><Text style={{fontSize: 24, color: 'yellow'}}>Sunday</Text></TouchableOpacity></View>
           <View style={{flex: .12, margin: 6}}><TouchableOpacity onPress={() => this.handleDaySelect("MON")}><Text style={{fontSize: 24, color: 'yellow'}}>Monday</Text></TouchableOpacity></View>
            <View style={{flex: .12, margin: 6}}><TouchableOpacity onPress={() => this.handleDaySelect("TUE")}><Text style={{fontSize: 24, color: 'yellow'}}>Tuesday</Text></TouchableOpacity></View>
            <View style={{flex: .12, margin: 6}}><TouchableOpacity onPress={() => this.handleDaySelect("WED")}><Text style={{fontSize: 24, color: 'yellow'}}>Wednesday</Text></TouchableOpacity></View>
            <View style={{flex: .12, margin: 6}}><TouchableOpacity onPress={() => this.handleDaySelect("THU")}><Text style={{fontSize: 24, color: 'yellow'}}>Thursday</Text></TouchableOpacity></View>
            <View style={{flex: .12, margin: 6}}><TouchableOpacity onPress={() => this.handleDaySelect("FRI")}><Text style={{fontSize: 24, color: 'yellow'}}>Friday</Text></TouchableOpacity></View>
            <View style={{flex: .12, margin: 6}}><TouchableOpacity onPress={() => this.handleDaySelect("SAT")}><Text style={{fontSize: 24, color: 'yellow'}}>Saturday</Text></TouchableOpacity></View>

          </ScrollView>     
  </View>
        <View style={{flex: .5}}>
        </View>
      </View>
      )
  }
}