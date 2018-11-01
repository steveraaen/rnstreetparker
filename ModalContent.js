import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  AsyncStorage,
  Button,
  Dimensions,
  FlatList,
  Image,
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
import RNCalendarEvents from 'react-native-calendar-events';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import aspDays from './asp.js';
import aspDays19 from './asp19.js';
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

/*    this.getCarLoc = this.getCarLoc.bind(this)*/
    this.showCarLoc = this.showCarLoc.bind(this)
 /*   this.getTenSigns = this.getTenSigns.bind(this)*/
    
    this.parseClosest = this.parseClosest.bind(this)
   /* this.setAsyncSummary = this.setAsyncSummary.bind(this)*/
   /* this.addToCal = this.addToCal.bind(this)*/
  }

/*    getCarLoc() {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.ll[1]).toFixed(6) +',' + parseFloat(this.state.ll[0]).toFixed(6) + '&key=' + gkey, {}
    axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + parseFloat(this.state.ll[1]).toFixed(6)+'+'+parseFloat(this.state.ll[0]).toFixed(6)+'&key='+ ckey, {}
  ).then((doc) => {
    this.setState({
      carAddress: doc.data.results[0].components,
      carLoc: doc
      })
    })
}*/


/* getTenSigns(coor) {
  this.props.setCarLoc(this.props.uLnglat[1], this.props.uLnglat[0])
    axios.get('https://streetparker.herokuapp.com/mycar', {
      params: {
        coordinates: [parseFloat(coor.lng).toFixed(6), parseFloat(coor.lat).toFixed(6)]            
      }
  }).then((doc) => {

    this.setState({
      nearestThree: doc.data.slice(0,3)
    })
  }, () => this.getCarLoc()) 
 }*/


 showTenSigns() {
  console.log(this.props.nearestThree)
  if(this.props.nearestThree) {
      return ( 
        <View style={{alignItems: 'center'}}>
          <View style={{marginBottom: 18}}>
            <Text style={{fontSize: 22, color: 'white', textAlign: 'center'}}>Which of these signs is closest?</Text>
          </View>
            <FlatList 
              data={this.props.nearestThree.slice(0,3)}
              renderItem={({item}) => 
              <TouchableOpacity onPress={() => this.parseClosest(item.properties.T)}>
                
                <View style={{flexDirection: 'row', flexWrap: 'wrap', height: 56, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: 3, borderColor: '#941100', borderRadius: 12, marginTop: 14}}>
                  <View>  
                    <Image source={require('./assets/p20x144-1.png')} style={{height: 26, width: 26, marginRight: 6}}/>
                  </View>  
                  <View>
                    <Text numberOfLines={2} adjustsFontSizeToFit style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{item.properties.T}</Text>
                  </View>
                </View>

              </TouchableOpacity>}
                keyExtractor={item =>item.properties.ID.toString()}
            />
          </View>
        )
    }
 }
 showCarLoc() {

  if(this.state.carLoc) {
      var splitCarLoc = this.state.carLoc.data.results[0].formatted.split(',')
      var savedCarLoc = {
        latitude: this.state.ll[1],
        longitude: this.state.ll[0],
        location: splitCarLoc[0] + "," + splitCarLoc[1]
      }
      AsyncStorage.setItem('carSpot', JSON.stringify(savedCarLoc), () => {
        AsyncStorage.getItem('carSpot', (err, res) => {
          console.log(JSON.parse(res))
        })
      })

  /*  console.log(splitCarLoc)*/
     return( <View style={{backgroundColor: this.props.bgColor}}>
            <View>
                <Text style={{fontSize: 30, color: this.props.fgColor, textAlign: 'center'}}>Are you parked next to</Text>  
            </View> 
            <View style={{alignItems: 'center', marginTop: 8}}>
              <Text style={{fontSize: 30, color: 'white'}}>{this.state.carAddress.house_number + " " + this.state.carAddress.road + "?"}</Text>
            </View> 
            <View style={{marginTop: 14, marginBottom: 14, flexDirection: "row", justifyContent: 'space-around'}}>
                <TouchableOpacity 
                  style={{borderWidth: 1, borderColor: 'green', borderRadius: 6, padding:8}}
                  onPress={(e) => this.props.getTenSigns(this.state.carLoc.data.results[0].geometry)}
                >
                  <Text style={{fontSize: 26, color: 'yellow'}}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{borderWidth: 1, borderColor: 'green', borderRadius: 6, padding:8}}
                  onPress={(e) => this.props.dontSaveSpot()}
                >
                <Text style={{fontSize: 26, color: 'yellow'}}>No</Text>
                </TouchableOpacity>

            </View>
            </View>)
  } else {return null}
 }
  parseClosest(a) {
  AsyncStorage.setItem('signText', a)
  this.setState({
    thisSign: a
  }, () => {
        this.props.getSignText(this.state.thisSign)
        var reEnd = /\-([0-9]{1,2}\:[0-9]{2}[A-Z]{2})/
        var reStart = /([0-9]{1,2}\:[0-9]{2}[A-Z]{2})\-/
        var reDay= /[A-Z]{3}/g
        var startTime = this.state.thisSign.match(reStart)
        var endTime = this.state.thisSign.match(reEnd)
        var endDay = this.state.thisSign.match(reDay)
        var daysArr = []

        for(let i = 0; i < endDay.length; i++) {

        var timeLeft = {}
          currentDiff = (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).diff(moment(), 'days', 'hours') 

          if(currentDiff < 0) {

            timeLeft={
            justDay: moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').format('MMM D, YYYY'),
            day: moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').format('ddd, MMMM Do, h:mm A'),
            startISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').toISOString(),
            endISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').toISOString(),
            alarmISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm').add(7, 'days').subtract(2, 'hours').toISOString(),
            diff: currentDiff,
            diffb: (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).fromNow('hours'),
            diffc: (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).fromNow('dd h:mm'),
          /*  isASPHoliday: 'ASP is in effect'*/
            }
          daysArr.push(timeLeft)
          console.log(daysArr)
          
          }
          else if(currentDiff > 0) {
          timeLeft = {
            justDay: moment(endDay[i] +" "+ startTime, 'dd, h:mm').format('MMM D, YYYY'),
            day: moment(endDay[i] +" "+ startTime, 'dd, h:mm').format('ddd, MMM Do, h:mm A'),
            startISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm A').toISOString(),
            endISO: moment(endDay[i] +" "+ endTime, 'dd, h:mm').toISOString(),
            alarmISO: moment(endDay[i] +" "+ startTime, 'dd, h:mm A').subtract(2, 'hours').toISOString(),
            
            diff: currentDiff,
            diffb: (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).fromNow('hours'),
            diffc: (moment(endDay[i] +" "+ startTime, 'dd, h:mm')).fromNow('dd h:mm'),
        
          }
          daysArr.push(timeLeft) 
          console.log(daysArr)
          daysArr.sort((a,b) => b.startISO < a.startISO ? 1 : -1);
             
  
        }
 }

var streetAddress= this.state.carAddress.house_number + " " + this.state.carAddress.road
/* var streetAddress = this.state.carLoc.data.results[0].formatted.split(",")[0]*/
 var neighborhood = this.state.carLoc.data.results[0].components.neighbourhood
 var boro = this.state.carLoc.data.results[0].components.suburb


        this.setState ({
          end: daysArr
        }, () => {
         this.props.getMoveDay(this.state.end[0].justDay)

         
          Alert.alert(
            `Move your car before ${this.state.end[0].day}`,
            ``,
            [
              {text: 'Add calendar notification', onPress: () => this.props.addToCal(this.state.end[0].startISO, this.state.end[0].startISO, this.state.carLoc.data.results[0].formatted, this.state.end[0].alarmISO)},
          
              {text: 'Go Back', onPress: () => console.log('dismissed alert')},
            ],
            { cancelable: true }
          )
        }
        )
        
  })

 }
/* async setAsyncSummary(a) {
  await AsyncStorage.setItem('asyncCarObject', a, ()=> {
            console.log(a)
          })
 }*/
 componentWillMount() {

 }
 componentDidMount() {
      axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + parseFloat(this.state.ll[1]).toFixed(6)+'+'+parseFloat(this.state.ll[0]).toFixed(6)+'&key='+ ckey, {}
  ).then((doc) => {
    this.setState({
      carAddress: doc.data.results[0].components,
      carLoc: doc
      })
    })
 }
  render() {
if(this.props.toggleSave) {
    return (

        <View style={{marginLeft: 10, marginRight: 10, borderRadius: 12, justifyContent: 'flex-start', backgroundColor: this.props.bgColor, marginBottom: 6, paddingBottom:12}}> 
           <TouchableOpacity onPress={() => this.props.openCloseSave(false)}>
            <Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
           </TouchableOpacity>  
          <TouchableOpacity
          onPress={() => this.props.getTenSigns()}>                    
        
          </TouchableOpacity>
          <ScrollView>
          <View style={{marginTop: 12}}>{this.showCarLoc()}</View>
           <View>{this.showTenSigns()}</View>
           </ScrollView>
        </View>

      )
  } else return null
  }
}


















