import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/Ionicons';
import gkey from './keys.js'
import aspDays from './asp.js'

export default class Summary extends Component {
	constructor(props) {
		super(props)
			this.state={
				aspArray: aspDays,
				today: moment(),
				todayIsASP: false,
				showComp: true
			}
		this.closeASPWindow = this.closeASPWindow.bind(this)
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
	/*	console.log(nextArr)*/
		this.setState({nextArr: nextArr})
	}
	closeASPWindow() {
		this.setState({showComp: false})
	}
	render() {
		var blurb = `Next ASP holiday: ${this.state.nextArr[0].holiday} on ${this.state.nextArr[0].date.format('ddd, MMM Do')}`
		var blurbText = `Next ASP holiday:`
		var nextHoliday = this.state.nextArr[0].holiday
		var nextHolidayDate = this.state.nextArr[0].date.format('ddd, MMM Do')
		if(this.state.showComp) {
		return(
			<View style={{flex: .2, backgroundColor: '#1F2C4B', marginLeft: 24, marginRight: 24, justifyContent: 'flex-start'}}>
				<View>		
					 <TouchableOpacity onPress={() => this.closeASPWindow()}>
					 	<Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={28} color="white"/></Text> 
					 </TouchableOpacity>		
				</View>	 
				<View style={{marginLeft:24}}>
					<Text style={{color: 'yellow',  fontSize: 14, fontWeight: 'bold'}}>{blurbText}</Text>
				</View>
				<View style={{flexDirection: 'column'}}>
					<View>
						<Text style={{marginTop: 6, marginLeft:24, color: 'white', fontSize: 16, fontWeight: 'bold'}}>{nextHolidayDate}</Text>
					</View>
					<View >
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'coral', fontSize: 14}}>{nextHoliday}</Text>
					</View>
				</View>
		
			</View>
			)
	} else{
		return null
	}
	}
}