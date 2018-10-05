//zcat < planet-latest_geonames.tsv.gz | awk -F '\t' -v OFS='\t' 'NR == 1 || $16 == "us"' > usa.tsv
//zcat < usa.tsv.gz | awk -F '\t' -v OFS='\t' 'NR == 1 || $12 == "New York City"' > nyc.tsv

import React, { Component } from 'react';
import {
  FlatList,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import neighborhoods from './neighborhoods.js'
export default class Lookup extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      text: null,
      neighborhoods: neighborhoods
       }
    this._onItemPress = this._onItemPress.bind(this)
    this.getHoodsFromBoro = this.getHoodsFromBoro.bind(this)
  }
  getHoodsFromBoro(br) {
    var hoodsInBoro = this.state.neighborhoods.filter((boro, idx) => boro.borough.includes(br))
    this.setState({
      curHoods: hoodsInBoro
    })
  }
  _onItemPress(sh) {
    console.log(sh)
    this.setState({
      selHoodObj: sh

    }, () => {this.props.getNewMapLoc(this.state.selHoodObj.lat, this.state.selHoodObj.lng)})
  }
  render() {
    const styles = StyleSheet.create({
      boroText: {
        marginLeft:8,
        marginRight:8
      },
      hoodText: {
        fontSize: 20, 
        color: 'white', 
        textAlign: 'center'
      }
    })
    if(this.props.toggleSearch) {
    return (
    <View style={{flex: 1, flexWrap: 'wrap', justifyContent: 'flex-start',  marginLeft: 10, marginRight: 10, marginBottom: 8, borderRadius: 12, color: this.props.fgColor, backgroundColor: this.props.bgColor}}>
            <View>    
           <TouchableOpacity onPress={() => this.props.openCloseSearch(false)}>
            <Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
           </TouchableOpacity>    
        </View> 
      <View style={{flex: .11,justifyContent: 'center', marginTop: 8 }}>    
        <ScrollView
          horizontal={true}
          >
          <TouchableOpacity onPress={()=> this.getHoodsFromBoro('Brooklyn')}>
            <View style={styles.boroText}>
              <Text style={{fontSize: 20, color: this.props.fgColor }}>Brooklyn</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.getHoodsFromBoro('Bronx')}>
            <View style={styles.boroText}>
              <Text style={{fontSize: 20, color: this.props.fgColor }}>Bronx</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.getHoodsFromBoro('Manhattan')}>
            <View style={styles.boroText}>
              <Text style={{fontSize: 20, color: this.props.fgColor }}>Manhattan</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.getHoodsFromBoro('Queens')}>
            <View style={styles.boroText}>
              <Text style={{fontSize: 20, color: this.props.fgColor }}>Queens</Text>
            </View>
          </TouchableOpacity>
        </ScrollView> 
      </View>
      <View style={{flex: .9, marginTop: 6, marginBottom: 24}}>    
        <FlatList
          data={this.state.curHoods}
          contentContainerStyle={{justifyContent: 'flex-start'}}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => this._onItemPress(item)}>
              <View style={{backgroundColor: this.props.bgColor}}>
                <Text style={styles.hoodText}>{item.name}</Text>
              </View>
            </TouchableHighlight>    
          )}
        />
     </View> 
    </View>
    )
  } else return null
  }
}