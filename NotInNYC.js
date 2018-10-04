//zcat < planet-latest_geonames.tsv.gz | awk -F '\t' -v OFS='\t' 'NR == 1 || $16 == "us"' > usa.tsv
//zcat < usa.tsv.gz | awk -F '\t' -v OFS='\t' 'NR == 1 || $12 == "New York City"' > nyc.tsv

import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import neighborhoods from './neighborhoods.js'
export default class NotInNYC extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      text: null,
      neighborhoods: neighborhoods
       }
       
    this.setText = this.setText.bind(this)
    this.getPlaces = this.getPlaces.bind(this)
    this.autoC = this.autoC.bind(this)
    this.handlePlacePress = this.handlePlacePress.bind(this)
  }
setText(keyStrokes) {
  this.setState({input: keyStrokes})
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
    handlePlacePress(id) { 
    console.log()     
      return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid='+id+'&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {
    /*  return axios.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=AIzaSyD0Zrt4a_yUyZEGZBxGULidgIWK05qYeqs', {*/
      }).then((respon) => {
        console.log(respon)
        this.setState({
          details: respon,
          uLatitude: respon.data.result.geometry.location.lat,
          uLongitude: respon.data.result.geometry.location.lng,
          address: respon.data.result.formatted_address.split(",")[0] + ", " + respon.data.result.formatted_address.split(",")[1],
          uPlaceId: respon.data.result.place_id,
          iconColor: 'white',
          modalVisible: false,

        }, () => this.props.getNewMapLoc(this.state.uLongitude, this.state.uLatitude))
      })

    }
  autoC(inp) {
    if(this.state.autoResp) {
    return (
      <View>
        <FlatList 
          scrollEventThrottle={1}       
          data={inp} 
          renderItem={({item}) =>       
            <TouchableOpacity 
              style={{height: 30}}
              onPress={() => this.handlePlacePress(item.place_id)}      
              >
                <View style={{ height: 40}} >
                   <Text numberOfLines={1}style={{fontSize: 16,fontWeight: 'bold', color: 'white'}} >{item.description.split(",")[0] + "," + item.description.split(",")[1] +  "," + item.description.split(",")[2]  }</Text>
                </View>
            </TouchableOpacity>}
          keyExtractor={item => item.id}
        />

        </View>
        

      )
    }
  }
  render() {
    styles= StyleSheet.create({
      autoPlaces: {
      flexGrow: .3,
      width: this.props.width,
      marginTop:14,
      marginLeft: 14,
    },
    })
    if(this.props.toggleSearch || this.props.dist > 20) {
    return(
      <View style={{ flex: .8, flexWrap: 'wrap',  marginLeft: 10, marginRight: 10, borderRadius: 12, justifyContent: 'flex-start', backgroundColor: this.props.bgColor, marginBottom: 6}}>
        <View>
        <TouchableOpacity onPress={() => this.props.hideSearch(false)}>
          <Text style={{paddingTop: 14}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
         </TouchableOpacity> 
      </View>  
      <View>   
        <Text style={{color: 'yellow', fontSize: 22, textAlign: 'center'}}>Enter a place in New York City</Text>
               <TextInput  
                  placeHolder="Madison Square Garden "
                  autoCorrect={false}
                  value={this.state.input}
                  style={{height: 30, paddingLeft: 20, borderColor: 'gray', borderWidth: 1, width: 220, backgroundColor: 'white'}}          
                  onChangeText={(text) => this.setState({input: text}, (text) => {this.getPlaces(this.state.input)})}                 
                /> 
      </View>
<View style={styles.autoPlaces}>{this.autoC(this.state.autoResp)}</View>

      </View>
      )
  } else return null
  }
}