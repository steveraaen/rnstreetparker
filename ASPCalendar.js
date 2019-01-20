import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  FlatList, NetInfo, Platform, ScrollView, SectionList, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/Ionicons';
import gkey from './keys.js'
import aspDays from './asp.js'
import FadeInView from './Anim.js'

export default class ASPCalendar extends Component {
	constructor(props) {
		super(props)
		this.state={
			aspArray: aspDays
		}
		this.saveAllASP = this.saveAllASP.bind(this)
		this.separator = this.separator.bind(this)
	}

	componentWillMount() {
		var nextArr = []
		for(let i = 0; i < this.state.aspArray.length; i++) {
			if(this.state.aspArray[i].date.isAfter(this.state.today)){
				nextArr.push(this.state.aspArray[i])
			}
			if(this.state.aspArray[i].date === this.state.today) {
				this.setState({todayIsASP: true})
			}
		}
		/*console.log(nextArr)*/
		this.setState({nextArr: nextArr})
	}
saveAllASP() {
	for(let i = 0; i < this.state.nextArr.length; i++) {
		this.props.importASPList(this.state.nextArr[i].date, this.state.nextArr[i].date, this.state.nextArr[i].holiday, () => {
		})
	}
    Alert.alert(
   `${this.state.nextArr.length} ASP holidays added to your iPhone Calendar`,
   ``,
   [
     {text: 'Okay', onPress: () => console.log('added')},
   ],
   { cancelable: true }
 )
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
switch (this.props.orientation) {
  case 'portrait':
var ASPHeight = this.props.height * .63
    break;
  case 'landscape':
var ASPHeight = this.props.height * .5
    break;
  default:
    var ASPHeight = this.props.height * .64
}

	var keyExtractor = (item, index) => item.date.format('MMMM, Do');
	if(this.props.toggleASP) {
	return(
	
		<View style={{marginLeft: 10, height: ASPHeight, marginBottom:12}}>
		<FadeInView style={{ paddingRight: 8, marginRight: 10, paddingLeft: 8,backgroundColor: this.props.bgColor, borderRadius: 14}}>
		<View style={{display: 'flex', flexDirection: 'row', alignItems: 'space-between'}}>
			 <TouchableOpacity onPress={() => this.props.openCloseASP(false)}>
			 	<Text style={{paddingTop: 14, paddingRight: 20}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
			 </TouchableOpacity>
			<View >	
				<Button 
				title={"Save List to iPhone Calendar"}
				onPress={()=> this.saveAllASP()}
				/>
			</View>
		</View>
			<View style={{backgroundColor: 'rgb(51,51,51)', paddingBottom: 6, marginBottom: 10, paddingTop: 6, marginTop: 6}}>
				<Text style={{fontSize: 20, color: this.props.fgColor, textAlign: 'center'}}> 2019 ASP Holidays</Text>
			</View>
		<FlatList
			data={this.state.nextArr}
		  	renderItem={({item, index, section}) => (
		              <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 2}}>
		                <FadeInView><Text style={{color: 'white', fontSize: 18}}>{item.date.format('MMMM Do')}</Text></FadeInView>
		                <FadeInView><Text style={{color: this.props.fgColor, fontSize: 16}}>{item.holiday}</Text></FadeInView>             
		              </View>
		  	)}

		  keyExtractor={(item, index) => item + index}
		/>	

	</FadeInView>
	</View>
	)
		} else {
			return null
		}
	}
}