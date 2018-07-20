import React, { Component } from 'react';
import {
  ActivityIndicator,
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
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
export default class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state={
      ll: this.props.uLnglat
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.getCarLoc = this.getCarLoc.bind(this)
    this.showCarLoc = this.showCarLoc.bind(this)
    this.getTenSigns = this.getTenSigns.bind(this)
    this.dontSaveSpot = this.dontSaveSpot.bind(this)
    this.parseClosest = this.parseClosest.bind(this)
  }
      openModal() {
      this.setState({modalVisible:true});
    }
    closeModal() {
      this.setState({modalVisible:false});
    }
    getCarLoc(e) {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.state.ll[1]).toFixed(6) +',' + parseFloat(this.state.ll[0]).toFixed(6) + '&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {}
  ).then((doc) => {
    console.log(doc)
    this.setState({
      carLoc: doc
      })
    })
}
/*logSpot(p) {
  AsyncStorage.setItem("currentSpot", p)
}*/
dontSaveSpot(e) {
  this.setState({
    carLoc: null,
    nearestThree: null
  })
}
 getTenSigns(coor) {
  console.log(coor.lat)
   /*x*/
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
               <FlatList 

                  data={this.state.nearestThree.slice(0,3)}
                  renderItem={({item}) => 
                  <TouchableOpacity onPress={() => this.parseClosest(item.properties.T)}><View style={{borderBottomWidth: 2, borderBottomColor: 'black', marginTop: 10}}><Text style={{fontSize: 16}}>{item.properties.T}</Text></View></TouchableOpacity>}
                  keyExtractor={item =>item.properties.ID.toString()}
                    />
                </View>
        )
    }
 }
 showCarLoc() {
  if(this.state.carLoc) {
    var splitCarLoc = this.state.carLoc.data.results[0].formatted_address.split(',')
     return( <View>
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>You are parked next to:</Text>  
            </View> 
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>{splitCarLoc[0] + "," + splitCarLoc[1] }</Text>
            </View> 
            <View style={{marginTop: 20, alignItems: 'center'}}>  
                 <Text style={{fontSize: 16}}>Would you like to save this location? </Text>
            </View>
              <TouchableOpacity>
                <Button 
                  title="Yes"
                  onPress={(e) => this.getTenSigns(this.state.carLoc.data.results[0].geometry.location)}
                >
                </Button>
                <Button 
                  title="No"
                  onPress={(e) => this.dontSaveSpot()}
                >
                </Button>

              </TouchableOpacity>
            </View>)
  }
 }
  parseClosest(a) {
    console.log(a)
  this.setState({
    thisSign: a
  }, () => {
        var reEnd = /\-([0-9]{1,2}\:[0-9]{2}[A-P]{2})/
        var reDay= /[A-Z]{3}/g
        var endTime = this.state.thisSign.match(reEnd)
        var endDay = this.state.thisSign.match(reDay)
        var daysArr = []
        for(let i = 0; i < endDay.length; i++) {
          var timeLeft = {
            day: moment(endDay[i] +" "+ endTime, 'dd, h:mm'),
            now: moment(),
            diff: (moment(endDay[i] +" "+ endTime, 'dd, h:mm')).diff(moment(), 'days', 'hours'),
            diffb: (moment(endDay[i] +" "+ endTime, 'dd, h:mm')).fromNow('days', 'hours'),
            diffc: (moment(endDay[i] +" "+ endTime, 'dd, h:mm')).fromNow('dd h:mm')
          }
          daysArr.push(timeLeft)
        }

        this.setState ({end: daysArr}, alert(`You have to move your car in ${daysArr[0].diffb}`))
        
  })

 }
  render() {

    return (
     
        <View style={{marginTop: 20, marginLeft: 30, marginRight: 30}}> 
          <TouchableOpacity
          onPress={(e) => this.getCarLoc(e)}>                    
          <Text style={{fontSize: 20}}>Tap here before leaving your vehicle to remember where you parked.</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20}}>{this.showCarLoc()}</View>
           <View style={{height: 100}}>{this.showTenSigns()}</View>
        </View>
      
      )
  }
}


















