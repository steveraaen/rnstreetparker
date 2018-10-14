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
import FadeInView from './Anim.js'
export default class Lookup extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      text: null,
      neighborhoods: neighborhoods
       }
    this._onItemPress = this._onItemPress.bind(this)
    this.getHoodsFromBoro = this.getHoodsFromBoro.bind(this)
    this.separator = this.separator.bind(this)
  }
  getHoodsFromBoro(br) {
    var hoodsInBoro = this.state.neighborhoods.filter((boro, idx) => boro.borough.includes(br))
    hoodsInBoro.sort((a,b) => b.name < a.name ? 1 : -1);
    this.setState({
      curHoods: hoodsInBoro
    })
  }
  _onItemPress(sh) {
   this.props.hoodStatus()
    this.setState({
      selHoodObj: sh,

    }, () => {this.props.getNewMapLoc(this.state.selHoodObj.lat, this.state.selHoodObj.lng)})
  }
  separator() {
    return(
          <View
            style={{
              borderBottomColor: this.props.fgColor,
              borderBottomWidth: 1,
              margin: 6
            }}
          />
      )
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
      console.log(this.props.dist)
    return (
    <FadeInView style={{flex: 0, justifyContent: 'flex-start',  marginLeft: 10, marginRight: 10, marginBottom: 8, borderRadius: 12, color: this.props.fgColor, backgroundColor: this.props.bgColor}}>
            <View>    
           <TouchableOpacity onPress={() => this.props.openCloseSearch()}>
            <Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
           </TouchableOpacity>    
        </View> 

      <View>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Tap on a borough, then pick a neighborhood</Text>
      </View>
      <View style={{marginTop: 4}}>
        <Text style={{color: 'yellow', fontSize: 18, fontStyle: 'italic', textAlign: 'center'}}>There is no ASP on Staten Island</Text>
      </View>
          <View
            style={{
              borderBottomColor: this.props.fgColor,
              borderBottomWidth: 1,
              margin: 14
            }}
          />
      <View style={{justifyContent: 'center', marginTop: 8 }}>    
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
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
        </View> 
      </View>
      <ScrollView horizontal={false} style={{marginTop: 6, height: this.props.height * .5, marginBottom:12}}>    
        <FlatList
          data={this.state.curHoods}
          contentContainerStyle={{justifyContent: 'flex-start'}}
          ItemSeparatorComponent={this.separator}
          renderItem={({item}) => (
            <TouchableHighlight
              onPress={() => this._onItemPress(item)}>
              <FadeInView style={{backgroundColor: this.props.bgColor}}>
                <Text style={styles.hoodText}>{item.name}</Text>
              </FadeInView>
            </TouchableHighlight>    
          )}
        />
     </ScrollView> 
    </FadeInView>
    )
  } else return null
  }
}