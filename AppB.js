/*rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json*/
// org.reactjs.native.example.streetparker
console.disableYellowBox = true;
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppState,
  AsyncStorage,
  Dimensions,
  FlatList,
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
import MapView, { Callout, Circle, Marker } from 'react-native-maps'
import axios from 'axios'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import aspDays from './asp.js'
import ModalContent from './ModalContent.js'
import SearchB from './SearchB.js'
import FirstUse from './FirstUse.js'
import Summary from './Summary.js'
import ASPCalendar from './ASPCalendar.js'
import ColorKey from './ColorKey.js'
import NotInNYC from './NotInNYC.js'
type Props = {};

export default class AppB extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      selectedIcon: null,
      toggleASP: false,
      toggleSum: false,
      toggleSave: false,
      toggleSearch: false,
      colorASP: 'white',
      colorSum: 'white',
      colorSave: 'white',
      modalVisible: false,      
      uLatitude: null,
      uLongitude: null,
      fullDay: moment().format('MMM Do YYYY'),
      slideTime: moment(),
      selectedDay: null,
      initDay : moment().format("dddd").toUpperCase().substring(0, 3),
      showKey: true,
      prevLaunched: false,
      bgColor: '#1F2C4B',
      fgColor: '#FFB20B'
       }
  /*     console.log(aspDays)*/
      this.getSigns = this.getSigns.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this.getNewDay = this.getNewDay.bind(this);
      this.makeMarker = this.makeMarker.bind(this);
      this.setCarLoc = this.setCarLoc.bind(this);

this.ackPrevLaunched = this.ackPrevLaunched.bind(this)
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
/*    this.onMapReady = this.onMapReady.bind(this)*/
    this.hideKey = this.hideKey.bind(this)
    this.dontSaveSpot = this.dontSaveSpot.bind(this)
    this.importASPList = this.importASPList.bind(this)
this.handleCheck = this.handleCheck.bind(this)
this.calcDistance = this.calcDistance.bind(this)
this.deg2rad = this.deg2rad.bind(this)
this.getPlaces = this.getPlaces.bind(this)
this.hideSearch = this.hideSearch.bind(this)

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
  deg2rad(deg) {
    return deg * Math.PI / 180
  }
calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2 - lat1); // this.deg2rad below
  var dLon = this.deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km

this.setState({dist: d})
return d
}
      handleCheck() {
    this.setState({checked: !this.state.checked}, () => {
      if(this.state.checked) {
        console.log('checked')
        this.setState({
          prevLaunched: true,
          checked: true
        })
        AsyncStorage.setItem('prevLaunched', JSON.stringify(true))
      } else {
        console.log('unchecked')
        AsyncStorage.setItem('prevLaunched', JSON.stringify(false))
      }
    })
  }
    importASPList(s,e,h) {
      RNCalendarEvents.saveEvent('ASP Is Suspended Today', {
      startDate: s,
      endDate: e,
      allDay: true, 
      title: h
    })
      }
    ackPrevLaunched() {
      this.setState({
        prevLaunched: true
      })
    }
    hideKey(tf) {
      this.setState({
        showKey: tf
      })
    }
    hideSearch(tf) {
      this.setState({
        toggleSearch: tf
      })
    }
    openModal() {
      this.setState({modalVisible:true});
    }
    closeModal() {
      this.setState({modalVisible:false});
    }  


    openModal() {
      this.setState({modalVisible:true});
    }

    closeModal() {
      this.setState({modalVisible:false});
    }
      _handleAppStateChange = (nextAppState) => {
        console.log(nextAppState)
        console.log(this.appState)
        console.log(AppState)
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.setState({appState: AppState.currentState});
    } 
    else if (this.state.appState.match(/active|background/) && nextAppState === 'inactive') {
      console.log('App has gone to background!')
       this.setState({appState: AppState.currentState});
    } 
    
  }
/*  _handleAppStateChange = (nextAppState) => {

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      
      AsyncStorage.getItem('prevLaunched', (err, val) => {
        console.log(JSON.parse(val))
        this.setState({prevLaunched: JSON.parse(val)})
      })
    }  
console.log(this.state.parkingObject)
    if (this.state.appState  === 'active' && nextAppState.match(/inactive|background/) ) {
      console.log(this.state.parkingObject)
      AsyncStorage.setItem('parkingObject', JSON.stringify(this.state.parkingObject), () => {
        AsyncStorage.getItem('parkingObject', (err, value) => {
          this.setState({parkingObject: JSON.parse(value)})
        })
      })
     console.log(this.state.appState)
      
    }
    this.setState({
      appState: nextAppState,
    });
  }*/
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
          meter.dotImage = require('./assets/purpleDot12pt.png');
          meter.text = "Parking Meter"
          metersArray.push(meter)
        }
        this.setState({
          meters: metersArray
        })
        })
      }
    
    getSigns(lo, la) { 
          /*  axios.get('http:127.0.0.1:5001/mon', {*/
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

      if(marker.endTime.isBefore(marker.noonTime)) {
        marker.dotImage = require('./assets/blueDot12pt.png')
        }
          else if(marker.endTime.isAfter(marker.noonTime)){     
          marker.dotImage = require('./assets/orangeDot12pt.png')
        }
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
    getPlaces(place) {
     return axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + place + '&radius=35000&minLength=3&location=40.676666,-73.983944&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
        }).then((resp) => {
          this.setState({
            autoResp: resp.data.predictions
          })
          console.log(resp)
        }).catch(function(error) {
       throw error
  }); 
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

    componentDidMount() { 
      this.setState({appState: AppState.currentState})
      this.calcDistance(40.676666, -73.983944, 40.711167, -73.866861)
        axios.get('https://ipinfo.io/geo')
        .then((doc) => {
          this.setState({loc: doc})
        })
      let {height, width} = Dimensions.get('window');
      this.setState({
          height: height, 
          width:width
        })
   AppState.addEventListener('change', this._handleAppStateChange);

   AsyncStorage.getItem('prevLaunched', (err, value) => {
    console.log(value)
    this.setState({
      prevLaunched: true
    })
   })
   AsyncStorage.getItem('parkingObject', (error, value) => {})
   .then((value) => {
      this.setState({ASPObject: JSON.parse(value)})
   })
      for(let asp in aspDays){
       /* console.log(aspDays[asp].date - this.state.fullDay)*/
        if(this.state.fullDay === aspDays[asp].date){         
          this.setState({
            isTodayASP: true,
            todaysHoliday: aspDays[asp].holiday
          })
        }
      }    

      navigator.geolocation.getCurrentPosition(function(pos) {
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          uLatitude: position.coords.latitude,
          uLongitude: position.coords.longitude,
          uLnglat: [pos.coords.longitude, pos.coords.latitude],
          uPosition: position.coords,
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: .015,
            longitudeDelta: .015
          },         
         error: null,
        }, () => {
          this.calcDistance(40.741328, -73.887375, this.state.uLatitude, this.state.uLongitude)
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
    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
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
/*    makeCarMarker() {
    if(this.state.carMarkLocation) {
      return(
       <Marker 
        coordinate={this.state.carMarkLocation}
        >
        <Icon name="ios-car" size={18} color="black"/>
        </Marker>
        )
    } else return null
  }*/

    addToCal(s,e,l,a) {
          var isauth = RNCalendarEvents.authorizeEventStore()
    var test = RNCalendarEvents.authorizationStatus()
    var calList = RNCalendarEvents.findCalendars()
    console.log(isauth)
    console.log(test)
    console.log(calList)
      var parkingObject = {
        startDate: s,
        endDate: e,
        location: l,
        alarms: [{
          date: a
        }]        
      }


     /* AsyncStorage.setItem('parkingObject', JSON.stringify(parkingObject))*/
      console.log(s)
      console.log(e)
      console.log(l)
      console.log(a)
      RNCalendarEvents.saveEvent('Move Car', {
        startDate: s,
        endDate: e,
        location: l,
        alarms: [{
          date: a
    }]
  }).then((res) => {
    console.log(res)
    if(res) {
      this.setState({
        calendarId: res
      })
      Alert.alert(
            `Parking info saved to calendar`,
            ``,
            [
              {text: 'Go', onPress: () => console.log('dismissed alert')},
            ],
            { cancelable: true }
          )
    }
  })
      
}
getASPStatus(obj) {
  this.setState({ASPObject: obj}, () => {
     AsyncStorage.setItem('parkingObject', JSON.stringify(this.state.ASPObject))
  })

}
getSignText(signtext) {
  this.setState({signText: signtext})
}
colorizeIcons() {
  var iconColor = 'white'
  if(this.state.toggleASP) {
    this.setState({
      selectedIcon: "ASP",
      colorASP: this.state.fgColor,
      colorSave: 'white',
      colorSum: 'white',      
    })
  } else if(this.state.toggleSave) {
    this.setState({
      selectedIcon: "SAV",
      colorASP: 'white',
      colorSave: this.state.fgColor,
      colorSum: 'white',      
    })
  }else if(this.state.toggleSum) {
    this.setState({
      selectedIcon: "SUM",
      colorASP: 'white',
      colorSave: 'white',
      colorSum: this.state.fgColor,      
      colorSearch: 'white',      
    })
  } 
  else if(this.state.toggleSearch) {
    this.setState({
      selectedIcon: "SRC",
      colorASP: 'white',
      colorSave: 'white',
      colorSum: 'white',      
      colorSearch: this.state.fgColor,      
    })
  }else if(!this.state.toggleASP && !this.state.toggleSave && !this.state.toggleSum && !this.state.toggleSearch) {
    this.setState({
      selectedIcon: null,
      colorASP: 'white',
      colorSave: 'white',
      colorSum: 'white',      
      colorSearch: 'white',      
    })    
  }
}
openCloseSummary(tf) {
    this.setState(prevState => ({
      toggleSum: !prevState.toggleSum,
      toggleASP: false,
      toggleSave: false,
      toggleSearch: false
    }), () => this.colorizeIcons());
}
openCloseSearch(tf) {
    this.setState(prevState => ({
      toggleSearch: !prevState.toggleSearch,
      toggleSum: false,
      toggleSave: false,
      toggleASP: false
    }), () => this.colorizeIcons());
}
openCloseASP(tf) {
    this.setState(prevState => ({
      toggleASP: !prevState.toggleASP,
      toggleSum: false,
      toggleSave: false,
      toggleSearch: false
    }), () => this.colorizeIcons());
}
openCloseSave(tf) {  
    this.setState(prevState => ({
      toggleSave: !prevState.toggleSave, 
      toggleASP: false,
      toggleSum: false, 
      toggleSearch: false,
      nearestThree: null
    }), () => this.colorizeIcons());
}
onRegionChangeComplete(region) {
  this.setState({ region }, () => {
    this.getSigns(this.state.region.longitude, this.state.region.latitude)
  })
console.log(region)
}
dontSaveSpot(e) {
  this.setState({
    carLoc: null,
    nearestThree: null,
    toggleSave: false
  }, ()=> this.colorizeIcons())
}
  render() {

    if(!this.state.prevLaunched) {
  return(
    <FirstUse { ...this.state }  handleCheck={this.handleCheck} ackPrevLaunched={this.ackPrevLaunched} uLnglat={this.state.uLnglat}/>
    )
} 
else if( this.state.uLongitude && this.state.signs && this.state.todayMarkersArray && this.state.selDay && this.state.meters) {

    return (

    <View style={styles.container}>            
    <StatusBar barStyle="light-content" hidden ={false}/>
      <View>   
        </View>
     <MapView
        ref={map => {
               this.map = map;
          }}
      mapType={'mutedStandard'}
      scrollEnabled={true}  
        zoomEnabled={true}   
        rotateEnabled={true}   
        scrollEnabled={true}   
        pitchEnabled={true}   
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        animateToBearing={true}
         animateToViewingAngle={true} 
         showsCompass = {true}
         showScale = {true}
         
        initialRegion={this.state.region}
        onRegionChangeComplete={this.onRegionChangeComplete}

        >

         {this.state.todayMarkersArray.map((marker, idx) => (
    <Marker
      coordinate={marker.latlng}
      image={marker.dotImage}
      key={idx}
     >
        <Callout style={{borderWidth: 2, borderColor: 'red', borderRadius: 12, padding: 8}}>
          <Text>{marker.text}</Text>
        </Callout>
     </Marker>
     ))}
     {this.state.meters.map((meter, idx) => (
    <Marker
      coordinate={meter.latlng}
      image={meter.dotImage}
      key={idx}
     >
        <Callout>
          <Text>{meter.text}</Text>
        </Callout>
     </Marker>
     ))}
    {/* {this.makeCarMarker()}*/}

  </MapView>
    <View style={{flex: .15, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingBottom: 4,  backgroundColor: this.state.bgColor}}>
    
      <TouchableOpacity onPress={() => this.openCloseSave()}>
          <Text style={{paddingTop: 24}}>  <Icon name="ios-alarm" size={36} color={this.state.colorSave}/></Text>  
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.openCloseASP(true)}>
 <Text style={{paddingTop: 24}}>  <Icon name="ios-calendar" size={36} color={this.state.colorASP}/></Text>            
      </TouchableOpacity> 
       <TouchableOpacity onPress={() => this.openCloseSearch(true)}>
 <Text style={{paddingTop: 24}}>  <Icon name="ios-search" size={36} color={this.state.colorSearch}/></Text>            
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => this.openCloseSummary(true)}>
          <Text style={{paddingTop: 24}}>  <Icon name="ios-bookmark" size={36} color={this.state.colorSum}/></Text>  
      </TouchableOpacity>    
    </View>
    <View>
      <SearchB initDay={this.state.initDay} selDay={this.state.selDay} fgColor={this.state.fgColor} bgColor={this.state.bgColor} makeMarker={this.makeMarker} getNewDay={this.getNewDay}/>
    </View>
 
    <Summary { ...this.state } openCloseSummary={this.openCloseSummary}/>
   
  
    <ASPCalendar fgColor={this.state.fgColor} bgColor={this.state.bgColor} openCloseASP={this.openCloseASP} toggleASP={this.state.toggleASP} importASPList={this.importASPList}/>
      
    <ModalContent  fgColor={this.state.fgColor} bgColor={this.state.bgColor} uLnglat={this.state.uLnglat} nearestThree={this.state.nearestThree} openCloseSave={this.openCloseSave} toggleSave={this.state.toggleSave} openModal={this.openModal} closeModal={this.closeModal} getSignText={this.getSignText} getASPStatus={this.getASPStatus} setCarLoc={this.setCarLoc} addToCal={this.addToCal} fullDay={this.state.fullDay} getTenSigns={this.getTenSigns} setCarLoc={this.setCarLoc} dontSaveSpot={this.dontSaveSpot}/>
 
    <ColorKey fgColor={this.state.fgColor} bgColor={this.state.bgColor} showKey={this.state.showKey } hideKey={this.hideKey} />
    <NotInNYC { ...this.state} hideSearch={this.hideSearch} getPlaces={this.getPlaces}/>
  </View>
    );
    } else {
      return (<View style={{flex: 1, justifyContent: 'center', backgroundColor: '#212121' }} >
        <Image
          style={{height: this.state.height, width: this.state.width}}
          source={require('./assets/sp.png')}
        />
      </View>)
    }
  }
}
let {height, width} = Dimensions.get('window');
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
