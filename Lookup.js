//zcat < planet-latest_geonames.tsv.gz | awk -F '\t' -v OFS='\t' 'NR == 1 || $16 == "us"' > usa.tsv
//zcat < usa.tsv.gz | awk -F '\t' -v OFS='\t' 'NR == 1 || $12 == "New York City"' > nyc.tsv

import React, { Component } from 'react';
import {
  FlatList,
  Picker,
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
  }
  getHoodsFromBoro() {
    var hoodsInBoro = this.state.neighborhoods.filter((boro, idx) => boro.borough.includes(this.state.curBoro))
    this.setState({
      curHoods: hoodsInBoro
    })
  }
  _onItemPress(sh) {
    this.setState({
      selHoodObj: sh

    })
  }
  render() {
    return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'space-around', color: this.props.fgColor, backgroundColor: this.props.bgColor}}>
      <View style={{flex: .5}}>    
        <Picker
          itemStyle={{color: this.props.fgColor}}
          selectedValue={this.state.selHood}
          style={{color: this.props.fgColor }}
          onValueChange={(itemValue, itemIndex) => this.setState({curBoro: itemValue}, () => this.getHoodsFromBoro(this.state.curBoro))}>
          <Picker.Item label="Brooklyn" value="Brooklyn" />
          <Picker.Item label="Bronx" value="Bronx" />
          <Picker.Item label="Manhattan" value="Manhattan" />
          <Picker.Item label="Queens" value="Queens" />
          <Picker.Item label="Staten Island" value="Staten Island"/>
        </Picker> 
      </View>
      <View style={{flex: .5, justifyContent: 'center', alignItems: 'space-around'}}>    
<FlatList
  data={this.state.curHoods}
  renderItem={({item}) => (
    <TouchableHighlight
      onPress={() => this._onItemPress(item)}>
      <View style={{backgroundColor: this.props.bgColor}}>
        <Text style={{color: 'white', textAlign: 'center'}}>{item.name}</Text>
      </View>
    </TouchableHighlight>    
  )}
/>
     </View> 
    </View>
    )
  }
}