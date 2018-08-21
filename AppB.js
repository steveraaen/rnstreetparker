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
  Platform,
  Slider,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
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
    var isauth = RNCalendarEvents.authorizeEventStore()
    var test = RNCalendarEvents.authorizationStatus()
    var calList = RNCalendarEvents.findCalendars()
    console.log(isauth)
    console.log(test)
    console.log(calList)
export default class AppB extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIcon: null,
      toggleASP: false,
      toggleSum: false,
      toggleSave: false,
      colorASP: 'white',
      colorSum: 'white',
      colorSave: 'white',
      firstLaunch: null,
      modalVisible: false,      
      uLatitude: null,
      uLongitude: null,
      fullDay: moment().format('MMM Do YYYY'),
      slideTime: moment(),
      appState: AppState.currentState,
      selectedDay: null,
      initDay : moment().format("dddd").toUpperCase().substring(0, 3),
       }
  /*     console.log(aspDays)*/
      this.getSigns = this.getSigns.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this.getNewDay = this.getNewDay.bind(this);
      this.makeMarker = this.makeMarker.bind(this);
      this.setCarLoc = this.setCarLoc.bind(this);
      this.ackFirstLaunchIn = this.ackFirstLaunchIn.bind(this)
      this.ackFirstLaunchOut = this.ackFirstLaunchOut.bind(this)

      this.addToCal = this.addToCal.bind(this)
      this.getTenSigns = this.getTenSigns.bind(this)
      this.getCarLoc = this.getCarLoc.bind(this)
      this.getASPStatus = this.getASPStatus.bind(this)
      this.getSignText = this.getSignText.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openCloseSummary = this.openCloseSummary.bind(this)
    this.openCloseASP = this.openCloseASP.bind(this)
    this.openCloseSave = this.openCloseSave.bind(this)
    this.colorizeIcons = this.colorizeIcons.bind(this)
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this)
    this.onMapReady = this.onMapReady.bind(this)


/*      this.mapToCar = this.mapToCar.bind(this)
      this.mapFromCar = this.mapFromCar.bind(this)      
      this.makeCarMarker = this.makeCarMarker.bind(this) 
      this._retrieveData = this._retrieveData.bind(this)     
      this.spotListener = this.spotListener.bind(this)  */   
  }
/*      _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('moveCar');
        if (value !== null) {
          // We have data!!
          console.log(JSON.parse(value));
          this.setState({savedSpot: JSON.parse(value)})
        }
       } catch (error) {
         // Error retrieving data
       }
    }*/

    openModal() {
      this.setState({modalVisible:true});
    }
    closeModal() {
      this.setState({modalVisible:false});
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
      console.log('app state changed')
    }  

/*    if (this.state.appState  === 'active' && nextAppState.match(/inactive|background/) ) {
      console.log(this.state.parkingObject)
      AsyncStorage.setItem('parkingObject', JSON.stringify(this.state.parkingObject), () => {
        AsyncStorage.getItem('parkingObject', (err, value) => {
          this.setState({parkingObject: JSON.parse(value)})
        })
      })
      
    }*/
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
     /*     console.log(this.state.markersArray)*/
  /*  console.log(day)*/
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
   /* console.log(this.state.todayMarkersArray)*/

  }
    getMeters(ln, la) {
      /*axios.get('http:127.0.0.1:5000/api/meters', {*/
      axios.get('https://streetparker.herokuapp.com/api/meters', {
              params: {
                coordinates: [parseFloat(this.state.uLongitude).toFixed(6), parseFloat(this.state.uLatitude).toFixed(6)],           
            } 
      }).then((docm) => {
       /* console.log(docm.data)*/
        var metersArray= []
        for(let i = 0; i < docm.data.length; i++) {
          var meter = {}
           meter.latlng = {
            latitude: parseFloat(docm.data[i].geometry.coordinates[1].toFixed(6)),
            longitude: parseFloat(docm.data[i].geometry.coordinates[0].toFixed(6))
          }
          meter.name='meter';
          meter.color= 'green'
          metersArray.push(meter)
        }
        this.setState({
          meters: metersArray
        })
        })
      }

    
    getSigns(lo, la) { 

         /*   axios.get('http:127.0.0.1:5001/mon', {*/
            axios.get('https://streetparker.herokuapp.com/mon', {
            params: {
              coordinates: [lo, la],
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
                    
  
/*console.log(marker.endTime)
console.log(marker.noonTime)*/
/*console.log(marker.endTime.isBefore(marker.noonTime));*/
       /* if(marker.dif > 0 && marker.dif < 2) {*/
        if(marker.endTime.isBefore(marker.noonTime)) {
          marker.color = 'yellow'
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
          marker.color = 'rgba(223, 162, 255,.9)'
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
        } if(markersArray[i].text.includes("SUN")) {          
          sunArray.push(markersArray[i])

        } if(markersArray[i].text.includes(this.state.initDay)) {
        todayArray.push()
      }

    }/*console.log(todayArray)*/
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
         /* console.log(this.state.initDay)*/
          this.makeMarker(this.state.initDay)
         /* this.betterMarker(this.state.markersArray)*/
        })
      })
}
    setCarLoc(la, ln, lo) {
      this.setState({
        carMarkLocation: {
            latitude: la,
            longitude: ln,
            location: lo,
              }      
            })
        }

    componentWillMount() { 
/*      this.spotListener()
    this._retrieveData()  */ 
      for(let asp in aspDays){
       /* console.log(aspDays[asp].date - this.state.fullDay)*/
        if(this.state.fullDay === aspDays[asp].date){         
          this.setState({
            isTodayASP: true,
            todaysHoliday: aspDays[asp].holiday
          })
        }
      } 


       AppState.addEventListener('change', this._handleAppStateChange);

      navigator.geolocation.getCurrentPosition(function(pos) {
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          uLatitude: position.coords.latitude,
          uLongitude: position.coords.longitude,
          uLnglat: [pos.coords.longitude, pos.coords.latitude],
          uPosition: position.coords,
          initRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: .03,
            longitudeDelta: .03,
          },         
         error: null,
        }, () => {
          this.getSigns(parseFloat(this.state.uLongitude).toFixed(6), parseFloat(this.state.uLatitude).toFixed(6))
          this.getMeters(this.state.uLatitude, this.state.uLongitude)   
      
        });
       
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,  distanceFilter: 50, timeout: 10 },
            )      
        }.bind(this))    
          this.setState({selDay: moment().format("dddd").toUpperCase().substring(0, 3)}, () => {
         /*   this.getNewDay(this.state.selDay)*/
          })
          this.openCloseSummary()
    }
    makeMarker(d) {
    /*  console.log(d)*/
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


      this.getNewDay(this.state.selDay)
      this.getMeters(this.state.uLatitude, this.state.uLongitude)

/*      if(this.state.AppState === 'background') {
        navigator.geolocation.clearWatch(this.watchID);
      }*/
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }

  updateSlider(value) {
    this.setState({
      slideTime: value
    })
  }

/*  mapToCar() {
    this.setState({
      uLatitude: this.state.carSpot.latitude,
      uLongitude: this.state.carSpot.longitude,
    }, () => this.getSigns(), ()=> {
      this.getMeters(this.state.uLatitude, this.state.uLongitude)
    })
  }
  mapFromCar() {
    this.setState({
      uLatitude: this.state.uPosition.latitude,
      uLongitude: this.state.uPosition.longitude,
    }, () => this.getSigns(), ()=> {
      this.getMeters(this.state.uLatitude, this.state.uLongitude)
    })    
  }
  makeCarMarker() {
    if(this.state.carSpot) {
      return(
       <Marker 
        coordinate={this.state.carSpot}
        >
        <Icon name="ios-car" size={18} color="black"/>
        </Marker>
        )
    } else return null
  }*/
      getCarLoc() {
    /*axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.ll[1]).toFixed(6) +',' + parseFloat(this.state.ll[0]).toFixed(6) + '&key=' + gkey, {}*/
    axios.get('https://api.opencagedata.com/geocode/v1/json?q=' + parseFloat(this.state.ll[1]).toFixed(6)+'+'+parseFloat(this.state.ll[0]).toFixed(6)+'&key='+ ckey, {}
  ).then((doc) => {
    this.setState({
      carAddress: doc.data.results[0].components,
      carLoc: {
        carAddress: doc.data.results[0].formatted,
        latitude: doc.data.results[0].geometry.lat,
        longitude: doc.data.results[0].geometry.lng,
      }
      })
    })
}
   getTenSigns(coor) {
    this.setCarLoc(parseFloat(coor.lng).toFixed(6), parseFloat(coor.lat).toFixed(6))
      axios.get('https://streetparker.herokuapp.com/mycar', {
        params: {
          coordinates: [parseFloat(coor.lng).toFixed(6), parseFloat(coor.lat).toFixed(6)]            
        }
    }).then((doc) => {

      this.setState({
        nearestThree: doc.data.slice(0,3)
      })
    }, () => this.getCarLoc()) 
 }
    makeCarMarker() {
    if(this.state.carMarkLocation) {
      return(
       <Marker 
        coordinate={this.state.carMarkLocation}
        >
        <Icon name="ios-car" size={18} color="black"/>
        </Marker>
        )
    } else return null
  }

    addToCal(s,e,l,a) {
      var parkingObject = {
        startDate: s,
        endDate: e,
        location: l,
        alarms: [{
          date: a
    }]        
      }
      RNCalendarEvents.saveEvent('Move Car', {
        startDate: s,
        endDate: e,
        location: l,
        alarms: [{
          date: a
    }]
  }) 
      this.openCloseSave()
}
getASPStatus(obj) {
  this.setState({ASPObject: obj})
}
getSignText(signtext) {
  this.setState({signText: signtext})
}
colorizeIcons() {
  var iconColor = 'white'
  if(this.state.toggleASP) {
    this.setState({
      selectedIcon: "ASP",
      colorASP: 'coral',
      colorSave: 'white',
      colorSum: 'white',      
    })
  } else if(this.state.toggleSave) {
    this.setState({
      selectedIcon: "SAV",
      colorASP: 'white',
      colorSave: 'coral',
      colorSum: 'white',      
    })
  }else if(this.state.toggleSum) {
    this.setState({
      selectedIcon: "SUM",
      colorASP: 'white',
      colorSave: 'white',
      colorSum: 'coral',      
    })
  } else if(!this.state.toggleASP && !this.state.toggleSave && !this.state.toggleSum) {
    this.setState({
      selectedIcon: null,
      colorASP: 'white',
      colorSave: 'white',
      colorSum: 'white',      
    })    
  }
}
openCloseSummary(tf) {
    this.setState(prevState => ({
      toggleSum: !prevState.toggleSum,
      toggleASP: false,
      toggleSave: false
    }), () => this.colorizeIcons());
}
openCloseASP(tf) {
    this.setState(prevState => ({
      toggleASP: !prevState.toggleASP,
      toggleSum: false,
      toggleSave: false
    }), () => this.colorizeIcons());
}
openCloseSave(tf) {  
    this.setState(prevState => ({
      toggleSave: !prevState.toggleSave,
      toggleASP: false,
      toggleSum: false
    }), () => this.colorizeIcons());
}
onRegionChangeComplete(region) {
 this.getSigns(region.longitude, region.latitude)
}
    onMapReady = () => {
        Platform.OS === 'ios' && this.map.animateToRegion(this.state.initRegion, 0.1); // TODO remove once the initialRegion is fixed in the module
    };
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
        </View>
     <MapView

     onMapReady={this.onMapReady}
      scrollEnabled={true}  
        zoomEnabled={true}   
        rotateEnabled={true}   
        scrollEnabled={true}   
        pitchEnabled={true}   
        style={styles.map}
        customMapStyle={niceBlack}

        followsUserLocation={true}
        animateToBearing={true}
         animateToViewingAngle={true} 
         showsCompass = {true}
         showScale = {true}
        provider={PROVIDER_GOOGLE}
        initialRegion={this.state.initRegion}
        onRegionChangeComplete={this.onRegionChangeComplete}
        ref={map => {
               this.map = map;
          }}
        >

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
      radius={6}
      strokeColor={meter.color}
      fillColor={meter.color}
      key={idx}
     />
     ))}
     {this.makeCarMarker()}
    
  </MapView>
    <View style={{flex: .125, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', height: 38, backgroundColor: '#1F2C4B'}}>
    
      <TouchableOpacity onPress={() => this.openCloseSave()}>
          <Text style={{paddingTop: 36}}>  <Icon name="ios-alarm" size={28} color={this.state.colorSave}/></Text>  
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.openCloseASP(true)}>
 <Text style={{paddingTop: 36}}>  <Icon name="ios-calendar" size={28} color={this.state.colorASP}/></Text>            
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.openCloseSummary(true)}>
          <Text style={{paddingTop: 36}}>  <Icon name="ios-bookmark" size={28} color={this.state.colorSum}/></Text>  
      </TouchableOpacity> 


   
    </View>
    <View>
      <SearchB { ...this.state } makeMarker={this.makeMarker}/>
    </View>
  
    <Summary { ...this.state } openCloseSummary={this.openCloseSummary}/>
   
  
    <ASPCalendar { ...this.state } openCloseASP={this.openCloseASP}/>
      
    <ModalContent  {...this.state} openCloseSave={this.openCloseSave} openModal={this.openModal} closeModal={this.closeModal} getSignText={this.getSignText} getASPStatus={this.getASPStatus} setCarLoc={this.setCarLoc} addToCal={this.addToCal} fullDay={this.state.fullDay} getTenSigns={this.getTenSigns} setCarLoc={this.setCarLoc}/>
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