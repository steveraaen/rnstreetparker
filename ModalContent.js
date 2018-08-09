import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  AsyncStorage,
  Button,
  Dimensions,
  FlatList,
  Modal,
  Picker,
  Slider,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ckey from './keys.js';
export default class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      ll: this.props.uLnglat
    }
    var isauth = RNCalendarEvents.authorizeEventStore()
    var test = RNCalendarEvents.authorizationStatus()
    var calList = RNCalendarEvents.findCalendars()
    console.log(isauth)
    console.log(test)
    console.log(calList)

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getCarLoc = this.getCarLoc.bind(this)
    this.showCarLoc = this.showCarLoc.bind(this)
    this.getTenSigns = this.getTenSigns.bind(this)
    this.dontSaveSpot = this.dontSaveSpot.bind(this)
    this.parseClosest = this.parseClosest.bind(this)
    this.addToCal = this.addToCal.bind(this)
  }
      openModal() {
      this.setState({modalVisible:true});
    }
    closeModal() {
      this.setState({modalVisible:false});
    }


    getCarLoc(e) {
    /*axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.ll[1]).toFixed(6) +',' + parseFloat(this.state.ll[0]).toFixed(6) + '&key=' + gkey, {}*/
    axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + parseFloat(this.state.ll[1]).toFixed(6)+'+'+parseFloat(this.state.ll[0]).toFixed(6)+'&key='+ ckey, {}
  ).then((doc) => {
    console.log(doc)
    this.setState({
      carLoc: doc
      })
    })
}
    addToCal(s,e,l,a) {
      console.log(l)
          RNCalendarEvents.saveEvent('Move Car', {
            startDate: s,
            endDate: e,
            location: l,
            alarms: [{
              date: a
    }]
}) 
    }
dontSaveSpot(e) {
  this.setState({
    carLoc: null,
    nearestThree: null
  })
}
 getTenSigns(coor) {
  this.props.setCarLoc(this.props.uLnglat[1], this.props.uLnglat[0])
    axios.get('https://streetparker.herokuapp.com/mycar', {
      params: {
        coordinates: [parseFloat(coor.lng).toFixed(6), parseFloat(coor.lat).toFixed(6)]            
      }
  }).then((doc) => {

    this.setState({
      nearestThree: doc.data.slice(0,3)
    })
  }) 
 }
 showTenSigns() {
  if(this.state.nearestThree) {
      return ( <View style={{height: 240, alignItems: 'center'}}>
        <View><Text style={{fontSize: 14, fontWeight: 'bold', color: 'yellow'}}>Just to be sure, which of these signs are you parked next to - on your side of the street?</Text></View>
               <FlatList 
                  data={this.state.nearestThree.slice(0,3)}
                  renderItem={({item}) => 
                  <TouchableOpacity onPress={() => this.parseClosest(item.properties.T)}><View style={{backgroundColor: 'white', borderWidth: 3, borderColor: 'red', borderRadius: 12, marginTop: 14, padding: 8}}><Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold'}}>{item.properties.T}</Text></View></TouchableOpacity>}
                  keyExtractor={item =>item.properties.ID.toString()}
                    />
                </View>
        )
    }
 }
 showCarLoc() {

  if(this.state.carLoc) {
    console.log(this.state.ll)
      var savedCarLoc = {
        latitude: this.state.ll[1],
        longitude: this.state.ll[0],
      }
      AsyncStorage.setItem('carSpot', JSON.stringify(savedCarLoc));
      console.log(AsyncStorage.getItem('carSpot'));

    var splitCarLoc = this.state.carLoc.data.results[0].formatted.split(',')
     return( <View>
            <View >
                <Text style={{fontSize: 20, color: 'yellow'}}>You are parked next to:</Text>  
            </View> 
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>{splitCarLoc[0] + "," + splitCarLoc[1] }</Text>
            </View> 
            <View style={{marginTop: 20, alignItems: 'center'}}>  
                 <Text style={{fontSize: 16, color: 'yellow'}}>Would you like to save this location? </Text>
            </View>
              <TouchableOpacity>
                <Button 
                  title="Yes"
                  onPress={(e) => this.getTenSigns(this.state.carLoc.data.results[0].geometry)}
                >
                </Button>
                <Button 
                  title="No"
                  onPress={(e) => this.dontSaveSpot()}
                >
                </Button>
              </TouchableOpacity>
              <View><Text></Text></View>
            </View>)
  } else {return null}
 }
  parseClosest(a) {
    console.log(a)
  this.setState({
    thisSign: a
  }, () => {
        var reEnd = /\-([0-9]{1,2}\:[0-9]{2}[A-Z]{2})/
        var reStart = /([0-9]{1,2}\:[0-9]{2}[A-Z]{2}\-)/
        var reDay= /[A-Z]{3}/g
        var startTime = this.state.thisSign.match(reStart)
        var endTime = this.state.thisSign.match(reEnd)
        var endDay = this.state.thisSign.match(reDay)
        var daysArr = []

        for(let i = 0; i < endDay.length; i++) {

var timeLeft = {}
          currentDiff = (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).diff(moment(), 'days', 'hours')  
          console.log(currentDiff)
          if(currentDiff < 0) {
            timeLeft.day = moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').format('MMMM Do YYYY, h:mm a')
            timeLeft.startISO = moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').toISOString()
            timeLeft.endISO = moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').toISOString()
daysArr.push(timeLeft)
            console.log(daysArr)
            console.log(currentDiff)
          }
          else if(currentDiff > 0) {
          timeLeft = {
            day: moment(endDay[i] +" "+ startTime, 'dd, h:mm').format('dddd, MMM Do YYYY, h:mm a'),
            endISO: moment(endDay[i] +" "+ endTime, 'dd, h:mm').toISOString(),
            alarmISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm').subtract(2, 'hours').toISOString(),
            startISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm').toISOString(),
            nowISO: moment().toISOString(),
            diff: currentDiff,
            diffb: (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).fromNow('hours'),
            diffc: (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).fromNow('dd h:mm')
          }
console.log(timeLeft)
          daysArr.push(timeLeft)
console.log(daysArr)          
        }

 }
 
        this.setState ({end: daysArr}, () => {
          console.log(moment(this.state.end[0].day).subtract(2, 'hours'))
          Alert.alert(
            `Move your car before ${this.state.end[0].day}`,
            ``,
            [
              {text: 'Add calendar notification', onPress: () => this.addToCal(this.state.end[0].startISO, this.state.end[0].endISO, this.state.carLoc.data.results[0].formatted, moment(this.state.end[0].alarmISO))},
          
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        })
        
  })

 }
  render() {

    return (
     
        <View style={{ marginLeft: 30, marginRight: 30, justifyContent: 'flex-start'}}> 
          <TouchableOpacity
          onPress={(e) => this.getCarLoc(e)}>                    
          <Text style={{fontSize: 20, color: 'yellow'}}>Tap here before leaving your vehicle to remember where you parked.</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20}}>{this.showCarLoc()}</View>
           <View style={{height: 100}}>{this.showTenSigns()}</View>
        </View>
      
      )
  }
}


















