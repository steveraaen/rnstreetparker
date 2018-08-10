/*rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json*/
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppState,
  AsyncStorage,
  Dimensions,
  Image,
  Picker,
  Slider,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View
} from 'react-native';

import Modal from "react-native-modal";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps'
import axios from 'axios'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import nice from './niceMap.js'
import aspDays from './asp.js'
import niceBlack from './niceMapBlack.js'
import ModalContent from './ModalContent.js'
import SearchB from './SearchB.js'
import FirstUse from './FirstUse.js'
import Summary from './Summary.js'
import ASPCalendar from './ASPCalendar.js'
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      
      firstLaunch: null,
      modalVisible: false,      
      uLatitude: null,
      uLongitude: null,
      fullDay: moment().format('MMM Do YYYY'),
      slideTime: moment(),
      appState: AppState.currentState,
      selectedDay: null,
      initDay : moment().format("dddd").toUpperCase().substring(0, 3),   
      showASP: false  
       }
       console.log(aspDays)
      this.getSigns = this.getSigns.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this.getNewDay = this.getNewDay.bind(this);
      this.makeMarker = this.makeMarker.bind(this);
      this.setCarLoc = this.setCarLoc.bind(this);
      this.ackFirstLaunchIn = this.ackFirstLaunchIn.bind(this)
      this.ackFirstLaunchOut = this.ackFirstLaunchOut.bind(this)
      this.showAspList = this.showAspList.bind(this)
      this.mapToCar = this.mapToCar.bind(this)
      this.mapFromCar = this.mapFromCar.bind(this)      
  }
  ackFirstLaunchIn() {
    this.setState({firstLaunch: false})
  }
  ackFirstLaunchOut() {
    this.setState({firstLaunch: false})
  }
    openModal() {
      this.setState({modalVisible:true});
    }

    closeModal() {
      this.setState({modalVisible:false});
    }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    }
    this.setState({
      appState: nextAppState,
    });
  }
  getNewDay(day) {
    if(this.state.selDay === "MON" && this.state.markersArray) {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.monArray
      })
    } if(this.state.selDay === "TUE" && this.state.markersArray) {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.tueArray
      })
    } if(this.state.selDay === "WED" && this.state.markersArray) {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.wedArray
      })
    }  if(this.state.selDay === "THU" && this.state.markersArray) {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.thuArray
      })
    }  if(this.state.selDay === "FRI" && this.state.markersArray) {
          console.log(this.state.markersArray)
    console.log(day)
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.friArray
      })
    }  if(this.state.selDay === "SAT" && this.state.markersArray) {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.satArray
      })
    }  if(this.state.selDay === "SUN" && this.state.markersArray) {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.sunArray
      })
    }
    console.log(this.state.todayMarkersArray)

  }
    getMeters(ln, la) {
      /*axios.get('http:127.0.0.1:5000/api/meters', {*/
      axios.get('https://streetparker.herokuapp.com/api/meters', {
              params: {
                coordinates: [parseFloat(this.state.uLongitude).toFixed(6), parseFloat(this.state.uLatitude).toFixed(6)],           
            } 
      }).then((docm) => {
        console.log(docm.data)
        var metersArray= []
        for(let i = 0; i < docm.data.length; i++) {
          var meter = {}
           meter.latlng = {
            latitude: parseFloat(docm.data[i].geometry.coordinates[1].toFixed(6)),
            longitude: parseFloat(docm.data[i].geometry.coordinates[0].toFixed(6))
          }
          meter.name='meter';
          meter.color= 'red'
          metersArray.push(meter)
        }
        this.setState({
          meters: metersArray
        })
        })
      }

    
    getSigns() { 
            /*axios.get('http:127.0.0.1:5000/mon', {*/
            axios.get('https://streetparker.herokuapp.com/mon', {
            params: {
              coordinates: [parseFloat(this.state.uLongitude).toFixed(6), parseFloat(this.state.uLatitude).toFixed(6)],
              /*day: this.state.selDay */             
            }
        }) 
      .then((doc) => {

        var markersArray = []
        for(let i = 0; i < doc.data.length; i++) {
          var marker = {}
          marker.latlng = {
            latitude: parseFloat(doc.data[i].geometry.coordinates[1].toFixed(6)),
            longitude: parseFloat(doc.data[i].geometry.coordinates[0].toFixed(6))
          }
        marker.text = doc.data[i].properties.T;
       
       var reEnd = /\-([0-9]{1,2}\:[0-9]{2}[A-P]{2})/
       var reStart= /\s|^([0-9]{1,2}\:[0-9]{2}[A-P]{2})/
       var reDay= /[A-Z]{3}/g
      var endTime = doc.data[i].properties.T.match(reEnd)
      var noonTime = moment(dayow + ' ' + '12:00PM','hh:mma')
      var dayow = doc.data[i].properties.T.match(reDay)
      var todayArray = []
      var now = moment()
      var monArray = []
      var tueArray = []
      var wedArray = []
      var thuArray = []
      var friArray = []
      var satArray = []
      var sunArray = []
      
          if(Array.isArray(endTime)){
                marker.dayow = dayow
                marker.rawEnd = endTime[1]
                marker.endTime = moment(endTime[1], 'hh:mma')
                marker.noonTime = moment(dayow + ' ' + '12:00PM','hh:mma')
                marker.dif = ((moment(marker.endTime) - this.state.slideTime))/1000000 
                    
  
console.log(marker.endTime)
console.log(marker.noonTime)
/*console.log(marker.endTime.isBefore(marker.noonTime));*/
       /* if(marker.dif > 0 && marker.dif < 2) {*/
        if(marker.endTime.isBefore(marker.noonTime)) {
          marker.color = 'rgba(3,189,244,' + 1 + ')'
        } /*else if(marker.dif > 2 && marker.dif < 4) {
          marker.color = 'rgba(3,189,244,' + .8 + ')'
        } else if(marker.dif > 4 && marker.dif < 6) {
          marker.color = 'rgba(3,189,244,' + .7 + ')'
        }  else if(marker.dif > 6 && marker.dif  < 8) {
          marker.color = 'rgba(3,189,244,' + .6 + ')'
        }  else if(marker.dif > 8 && marker.dif < 10) {
          marker.color = 'rgba(3,189,244,' + .5 + ')'
        }  else if(marker.dif > 10) {
          marker.color = 'rgba(3,189,244,' + .4 + ')'
        } */ 
          else if(marker.endTime.isAfter(marker.noonTime)){
        /*  else if(marker.dif  > -2 && marker.dif < 0){*/
          marker.color = 'rgba(252, 204, 10,'+ 1 + ')'
        } /*else if(marker.dif  > -4 && marker.dif < -2){
          marker.color = 'rgba(252, 204, 10,'+ .8 + ')'
        } else if(marker.dif  > -6 && marker.dif < -4){
          marker.color = 'rgba(252, 204, 10,'+ .7 + ')'
        } else if(marker.dif  > -8 && marker.dif  < -6){
          marker.color = 'rgba(252, 204, 10,'+ .6 + ')'
        } else if(marker.dif  > -10 && marker.dif  < -8){
          marker.color = 'rgba(252, 204, 10,'+ .5 + ')'
        } else if(marker.dif  < -10){
          marker.color = 'rgba(252, 204, 10,'+ .4 + ')'
        }*/
          markersArray.push(marker)          
        }
      } 
        for(let i = 0; i < markersArray.length; i++) {
          if(markersArray[i].text.includes("MON")) {
          monArray.push(markersArray[i])
        } if(markersArray[i].text.includes("TUE")) {
          tueArray.push(markersArray[i])
        } if(markersArray[i].text.includes("WED")) {
          wedArray.push(markersArray[i])
        } if(markersArray[i].text.includes("THU")) {
          thuArray.push(markersArray[i])
        } if(markersArray[i].text.includes(" FRI")) {
          friArray.push(markersArray[i])
        } if(markersArray[i].text.includes("SAT")) {
          satArray.push(markersArray[i])
        } if(markersArray[i].text.includes("SUN")) {          sunArray.push(markersArray[i])

        } if(markersArray[i].text.includes(this.state.initDay)) {
        todayArray.push()
      }

    }console.log(todayArray)
// ------------- set state of all markers regardless of day
        this.setState({
          signs: doc,
          markersArray: markersArray,
          todayMarkersArray: todayArray,
          monArray: monArray,
          tueArray: tueArray,
          wedArray: wedArray,
          thuArray: thuArray,
          friArray: friArray,
          satArray: satArray,
          sunArray: sunArray,
          todayArray: todayArray
        }, () => {
          console.log(this.state.initDay)
          this.makeMarker(this.state.initDay)
         /* this.betterMarker(this.state.markersArray)*/
        })
      })}
    setCarLoc(la, lo) {
      this.setState({
        carMarkLocation: {
            latitude: la,
            longitude: lo,
              }      
            })
        }

    componentWillMount() {    
      for(let asp in aspDays){
        console.log(aspDays[asp].date - this.state.fullDay)
        if(this.state.fullDay === aspDays[asp].date){         
          this.setState({
            isTodayASP: true,
            todaysHoliday: aspDays[asp].holiday
          })
        }
      } 


       AppState.addEventListener('change', this._handleAppStateChange);
      navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy, heading } = pos.coords
            this.setState({
                uLongitude: pos.coords.longitude,
                uLatitude: pos.coords.latitude,
                uLnglat: [pos.coords.longitude, pos.coords.latitude],
                uPosition: pos.coords,
                carSpot: {
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                }
            })
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          uLatitude: position.coords.latitude,
          uLongitude: position.coords.longitude,
          uLnglat: [pos.coords.longitude, pos.coords.latitude],
          uPosition: position.coords,
          
         error: null,
        }, () => {
          this.getSigns(this.state.uLatitude, this.state.uLongitude)
          this.getMeters(this.state.uLatitude, this.state.uLongitude)          
        });
       
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,  distanceFilter: 20 },
            )      
        }.bind(this))    
          this.setState({selDay: moment().format("dddd").toUpperCase().substring(0, 3)}, () => {
         /*   this.getNewDay(this.state.selDay)*/
          })
    }
    makeMarker(d) {
      console.log(d)
      var todayMarkersArray = []
        for(let i = 0; i < this.state.markersArray.length; i++) {
          if(this.state.markersArray[i].text.includes(d)) {
            todayMarkersArray.push(this.state.markersArray[i])
          }
      }
      this.setState({
        selectedDay: d,
        todayMarkersArray: todayMarkersArray
      })

    }
    componentDidMount() {
      AsyncStorage.getItem("alreadyLaunched").then(value => {
        if(value == null){
         AsyncStorage.setItem('alreadyLaunched', "yes");
         this.setState({firstLaunch: true}, () => {                   
         });
        }
        else{
         this.setState({firstLaunch: false});
        }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
      AsyncStorage.getItem("carSpot").then((val, err) =>{
        this.setState({carSpot: JSON.parse(val)})
      })

      this.getNewDay(this.state.selDay)
      this.getMeters()

      if(this.state.AppState === 'background') {
        navigator.geolocation.clearWatch(this.watchID);
      }
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

  updateSlider(value) {
    this.setState({
      slideTime: value
    })
  }
  showAspList() {
    if(this.state.showASP) {
      return(<ASPCalendar />)
    } else {return null}
  }
  mapToCar() {
    this.setState({
      uLatitude: this.state.carSpot.latitude,
      uLongitude: this.state.carSpot.longitude,
    }, () => this.getSigns())
  }
  mapFromCar() {
    this.setState({
      uLatitude: this.state.uPosition.latitude,
      uLongitude: this.state.uPosition.longitude,
    }, () => this.getSigns())    
  }
  render() {
    if(this.state.firstLaunch) {
  return(
    <FirstUse ackIn={this.ackFirstLaunchIn} ackOut={this.ackFirstLaunchOut} uLnglat={this.state.uLnglat}/>
    )
}else if( this.state.uLongitude && this.state.signs && this.state.todayMarkersArray && this.state.selDay && this.state.meters) {

    return (

    <View style={styles.container}>            
    <StatusBar barStyle="light-content" hidden ={false}/>
      <View>
          <Modal
              backdropColor={'#1F2C4B'}
              backdropOpacity= {.8}
              supportedOrientations={['portrait', 'landscape']}
              isVisible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
          <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => this.closeModal()}>
            <Text style={{paddingTop: 14}}>  <Icon name="ios-arrow-back" size={24} color="white"/></Text>  
        </TouchableOpacity> 
            <ModalContent setCarLoc={this.setCarLoc} uLnglat={this.state.uLnglat} fullDay={this.state.fullDay}/>
          </View>
          </Modal>
        </View>
     <MapView
      scrollEnabled={true}  
        zoomEnabled={true}   
        rotateEnabled={true}   
        scrollEnabled={true}   
        pitchEnabled={true}   
        style={styles.map}
        customMapStyle={nice}
        showsUserLocation={true}
        followsUserLocation={true}
        animateToBearing={true}
         animateToViewingAngle={true} 
         showsCompass = {true}
         showScale = {true}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: this.state.uLatitude,
          longitude: this.state.uLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
    }}>

         {this.state.todayMarkersArray.map((marker, idx) => (
    <Circle
      center={marker.latlng}
      radius={6}
      strokeColor={marker.color}
      fillColor={marker.color}
      key={idx}
     />
     ))}
     {this.state.meters.map((meter, idx) => (
    <Circle
      center={meter.latlng}
      radius={8}
      strokeColor={meter.color}
      fillColor={meter.color}
      key={idx}
     />
     ))}
     <Marker 
      coordinate={this.state.carSpot}
      >
      <Icon name="ios-car" size={18} color="white"/>
      </Marker>
  </MapView>
    <View style={{flex: .125, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', height: 44, backgroundColor: '#1F2C4B'}}>
    
      <TouchableOpacity onPress={() => this.openModal()}>
          <Text style={{paddingTop: 32, paddingLeft: 16}}>  <Icon name="ios-alarm-outline" size={28} color="white"/></Text>  
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.setState({showASP: true})}>
          <Image style={{marginTop: 32, paddingLeft: 16, height: 28, width: 28}}source={require('./assets/aspIcon.png')}/> 
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.mapFromCar()}>
          <Text style={{paddingTop: 32, paddingLeft: 16}}>  <Icon name="ios-navigate" size={28} color="white"/></Text>  
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.mapToCar()}>
          <Text style={{paddingTop: 32, paddingLeft: 16}}>  <Icon name="ios-car-outline" size={28} color="white"/></Text>  
      </TouchableOpacity> 

   
    </View>
    <View>
      <SearchB { ...this.state } makeMarker={this.makeMarker}/>
    </View>
    <Summary />

      {this.showAspList()}

  </View>
    );
    } else {
      return <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#212121' }} ><ActivityIndicator size="large" color="red"></ActivityIndicator></View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    flexDirection: 'column'

 /*   justifyContent: 'space-between'*/
  },
  daySwipe: {

 /*   justifyContent: 'flex-end'*/
  },
  daySwipeText: {

    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  slider: {
    height: 20,
    marginBottom:40
  },
      modalContainer: {
      flex: 1,
      height: 300,
      justifyContent: 'flex-start',
      backgroundColor: 'white',
  },
});
