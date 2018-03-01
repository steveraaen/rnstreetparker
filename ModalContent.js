import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppState,
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
dontSaveSpot(e) {
  this.setState({
    carLoc: null,
    nearestTen: null
  })
}
 getTenSigns(coor) {
  console.log(coor.lat)
 
 /*   axios.get('http:127.0.0.1:5000/mycar', {*/
    axios.get('https://streetparker.herokuapp.com/mycar', {
      params: {
        coordinates: [parseFloat(coor.lng).toFixed(6), parseFloat(coor.lat).toFixed(6)]            
      }
  }).then((doc) => {
    console.log(doc)
    this.setState({
      nearestTen: doc.data
    })
  }) 
 }
 showTenSigns() {
  if(this.state.nearestTen) {
      return ( <View style={{height: 240}}>
               <FlatList 
                  data={this.state.nearestTen.slice(0,3)}
                  renderItem={({item}) => 
                    <View style={{height: 26}}><Text style={{fontSize: 16}}>{item.properties.T}</Text></View>}
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
            <View>
                <Text style={{fontSize: 20}}>You are parked next to {splitCarLoc[0] + "," + splitCarLoc[1] }</Text> 
            </View>  
            <View>  
                 <Text>Would you like to save this location? </Text>
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
  render() {

    return (
     
        <View style={{marginTop: 20, marginLeft: 30}}> 
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


















