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
		console.log(nextArr)
		this.setState({nextArr: nextArr})
	}
	closeASPWindow() {
		this.setState({showComp: false})
	}
	render() {
		var blurb = `Next ASP holiday: ${this.state.nextArr[0].holiday} on ${this.state.nextArr[0].date.format('ddd, MMM Do')}`
		if(this.state.showComp) {
		return(
			<View style={{backgroundColor: '#1F2C4B', marginLeft: 24, marginRight: 24}}>
			<View style={{justifyContent: 'flex-end'}}>
			 <TouchableOpacity onPress={() => this.closeASPWindow()}>
			 <Text style={{paddingTop: 14}}>  <Icon name="ios-close" size={36} color="white"/></Text> 
			 </TouchableOpacity>
				<View><Text style={{color: 'white', backgroundColor: 'black', fontSize: 18, fontWeight: 'bold'}}>{blurb}</Text>
			</View>
			<View><Text></Text></View>
			</View>
			</View>
			)
	} else{
		return null
	}
	}
}