import React, { Component } from 'react';
import {
  AppState,
  Dimensions,
  Modal,
  Picker,
  Slider,
  StyleSheet,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps'
import axios from 'axios'
import moment from 'moment'
import nice from './niceMap.js'
import niceBlack from './niceMapBlack.js'
type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selDay: moment().format("dddd").toUpperCase().substring(0, 3),
      uLatitude: null,
      uLongitude: null,
      dayDisplay: moment().format('HH:MM'),
      slideTime: moment(),
      appState: AppState.currentState,
       }
      this.getSigns = this.getSigns.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this.getNewDay = this.getNewDay.bind(this);
      this.makeMarker = this.makeMarker.bind(this);
      this.getMeters = this.getMeters.bind(this);

  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {

    }
    this.setState({
      appState: nextAppState,
    });
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
              day: this.state.selDay              
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
      var dayow = doc.data[i].properties.T.match(reDay)
      var now = moment()
      var monArray = []
      var tueArray = []
      var wedArray = []
      var thuArray = []
      var friArray = []
      var satArray = []
          if(Array.isArray(endTime)){
                marker.dayow = dayow
                marker.rawEnd = endTime[1]
                marker.endTime = moment(endTime[1], 'hh:mm')
                marker.dif = ((moment(marker.endTime) - this.state.slideTime))/1000000
                }
             
        if(marker.dif > 0 && marker.dif < 2) {
          marker.color = 'rgba(3,189,244,' + 1 + ')'
        } else if(marker.dif > 2 && marker.dif < 4) {
          marker.color = 'rgba(3,189,244,' + .8 + ')'
        } else if(marker.dif > 4 && marker.dif < 6) {
          marker.color = 'rgba(3,189,244,' + .7 + ')'
        }  else if(marker.dif > 6 && marker.dif  < 8) {
          marker.color = 'rgba(3,189,244,' + .6 + ')'
        }  else if(marker.dif > 8 && marker.dif < 10) {
          marker.color = 'rgba(3,189,244,' + .5 + ')'
        }  else if(marker.dif > 10) {
          marker.color = 'rgba(3,189,244,' + .4 + ')'
        }  
          else if(marker.dif  > -2 && marker.dif < 0){
          marker.color = 'rgba(252, 204, 10,'+ 1 + ')'
        } else if(marker.dif  > -4 && marker.dif < -2){
          marker.color = 'rgba(252, 204, 10,'+ .8 + ')'
        } else if(marker.dif  > -6 && marker.dif < -4){
          marker.color = 'rgba(252, 204, 10,'+ .7 + ')'
        } else if(marker.dif  > -8 && marker.dif  < -6){
          marker.color = 'rgba(252, 204, 10,'+ .6 + ')'
        } else if(marker.dif  > -10 && marker.dif  < -8){
          marker.color = 'rgba(252, 204, 10,'+ .5 + ')'
        } else if(marker.dif  < -10){
          marker.color = 'rgba(252, 204, 10,'+ .4 + ')'
        }
          markersArray.push(marker)          
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
        }
}
// ------------- set state of all markers regardless of day
        this.setState({
          signs: doc,
          markersArray: markersArray,
          todayMarkersArray: markersArray,
          monArray: monArray,
          tueArray: tueArray,
          wedArray: wedArray,
          thuArray: thuArray,
          friArray: friArray,
          satArray: satArray,
        }, () => {
          this.makeMarker(this.state.todayMarkersArray)
         /* this.betterMarker(this.state.markersArray)*/
        })
      })}
    componentWillMount() {
     
        this.setState({
          dayDisplay: moment().format('HH'),
        })
    
       AppState.addEventListener('change', this._handleAppStateChange);
      navigator.geolocation.getCurrentPosition(function(pos) {
            var { longitude, latitude, accuracy, heading } = pos.coords
            this.setState({
                uLongitude: pos.coords.longitude,
                uLatitude: pos.coords.latitude,
                uLnglat: [pos.coords.longitude, pos.coords.latitude],
                uPosition: pos.coords
            })
      this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          uLatitude: position.coords.latitude,
          uLongitude: position.coords.longitude,
          uPosition: position.coords,
         error: null,
        }, () => {
          this.getSigns(this.state.uLatitude, this.state.uLongitude,this.state.selDay)
          this.getMeters(this.state.uLatitude, this.state.uLongitude)

        });
       
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true,  distanceFilter: 200 },
            )      
        }.bind(this)) 
    
       this.setState({
        markertest: {
          latitude: 40.6617,
          longitude: -73.9855
        },
        curTime: moment().format('hh:mm'),
       }) 
    }
    makeMarker(d) {
      var todayMarkersArray = []
        for(let i = 0; i < this.state.markersArray.length; i++) {
          if(this.state.markersArray[i].text.includes(d)) {
            todayMarkersArray.push(this.state.markersArray[i])
          }
      }
      this.setState({
        todayMarkersArray: todayMarkersArray
      })
    }

    componentDidMount() {
      this.getMeters()
      if(this.state.AppState === 'background') {

      }

    }
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  getNewDay(day) {
    if(this.state.selDay === "MON") {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.monArray
      })
    } if(this.state.selDay === "TUE") {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.tueArray
      })
    } if(this.state.selDay === "WED") {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.wedArray
      })
    }  if(this.state.selDay === "THU") {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.thuArray
      })
    }  if(this.state.selDay === "FRI") {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.friArray
      })
    }  if(this.state.selDay === "SAT") {
    this.setState({
      selDay: day,
      todayMarkersArray: this.state.satArray
      })
    }  
  }
  updateSlider(value) {
    this.setState({
      slideTime: value
    })
  }
  render() {
    if( this.state.uLongitude && this.state.signs && this.state.todayMarkersArray && this.state.selDay && this.state.meters) {

    return (

<View style={styles.container}> 
     <MapView
      scrollEnabled={true}  
        zoomEnabled={true}   
        rotateEnabled={true}   
        scrollEnabled={false}   
        pitchEnabled={true}   
        style={styles.map}
        customMapStyle={niceBlack}
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
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
    }}>

         {this.state.todayMarkersArray.map((marker, idx) => (
    <Circle
      center={marker.latlng}
      radius={8}
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
  </MapView>

    <View style={styles.daySwipe}>
        <Picker

          selectedValue={this.state.selDay}
          onValueChange={(itemValue, itemIndex) => this.getNewDay(itemValue)}
          itemStyle={styles.daySwipeText}>
          <Picker.Item label={"Monday"} value={"MON"} />
          <Picker.Item label={"Tuesday"} value={"TUE"} />
          <Picker.Item label={"Wednesday"} value={"WED"} />
          <Picker.Item label={"Thursday"} value={"THU"} />
          <Picker.Item label={"Friday"} value={"FRI"} />
          <Picker.Item label={"Saturday"} value={"SAT"} />
          </Picker>        
  </View>
  <View style={styles.slider}>
      <Slider
        step={1}
        maximumValue={24}
        value={parseInt(this.state.dayDisplay)}
        
        onSlidingComplete={this.updateSlider.bind(this)}
       />
      </View>
  </View>
    );
    } else {
      return <View><Text>... Waiting</Text></View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#F5FCFF',
    justifyContent: 'space-between'
  },
  daySwipe: {
    flex: .2,
    height: 50,
    marginRight: 20
  },
  daySwipeText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  slider: {
    height: 20,
    marginBottom:40
  }
});
