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
		this.fetchSummary = this.fetchSummary.bind(this)
		this.showASPHol = this.showASPHol.bind(this)
		this.showSignOnSummary = this.showSignOnSummary.bind(this)
	/*	this._retrieveData = this._retrieveData.bind(this)*/
	}
	 fetchSummary() {
			AsyncStorage.getItem('asyncCarObject', (err, val) => {
			console.log(val)
				this.setState({asyncCarObject: JSON.parse(val)})
})
}
	componentWillMount() {
		this.fetchSummary()
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
	showASPHol(a) {

				if(a.isASPHoliday) {
			return  (
				<View>
					<Text> There is no street sweeping today</Text>
				</View>
				)
		} else { return null}
	}

	
	closeASPWindow() {
		this.setState({showComp: false})
	}
	showSignOnSummary() {
		if(this.props.signText) {
			var signText = this.props.signText

			return(
			<View style={{marginLeft: 42, marginRight: 42, backgroundColor: 'white', borderWidth: 3, borderColor: 'red', borderRadius: 12, marginTop: 14, padding: 8}}>
			<Text  style={{ textAlign: 'center', color: 'black', fontSize: 16, fontWeight: 'bold'}}>{signText}</Text>
			</View>
			)
		} else return null
	}

	render() {
		console.log(this.state.savedSpot)
		var blurb = `Next ASP holiday: ${this.state.nextArr[0].holiday} on ${this.state.nextArr[0].date.format('ddd, MMM Do')}`
		var blurbText = `Next ASP holiday:`
		var nextHoliday = this.state.nextArr[0].holiday
		var nextHolidayDate = this.state.nextArr[0].date.format('ddd, MMM Do')
		var parkedBlurb = `You are parked at:`
		var parkedAddress
		if(!this.props.ASPObject) {
			parkedAddress = 'No parking spot saved'
		} else {
			parkedAddress = this.props.ASPObject.parkedAt
		}
		var goodTill
		if(!this.props.ASPObject) {
			goodTill = ''
		} else {
			goodTill = this.props.ASPObject.goodTill
		}
		var isHol 
		if(!this.props.ASPObject) {
			isHol = ''
		} else {
			isHol = this.props.ASPObject.isASPHoliday
		}


		if(this.state.showComp) {
		return(
			<View style={{flex: 1, backgroundColor: '#1F2C4B', marginLeft: 24, marginRight: 24, justifyContent: 'flex-start'}}>
				<View>		
					 <TouchableOpacity onPress={() => this.closeASPWindow()}>
					 	<Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={28} color="white"/></Text> 
					 </TouchableOpacity>		
				</View>	 
				<View>
				<View style={{marginLeft:24}}>
					<Text style={{color: 'yellow',  fontSize: 14, fontWeight: 'bold'}}>{blurbText}</Text>
				</View>
				<View style={{flexDirection: 'column'}}>
					<View>
						<Text style={{marginTop: 6, marginLeft:24, color: 'white', fontSize: 16, fontWeight: 'bold'}}>{nextHolidayDate}</Text>
					</View>
					<View style={{marginBottom: 12}}>
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'coral', fontSize: 14}}>{nextHoliday}</Text>
					</View>
					<View
					  style={{
					    borderBottomColor: 'coral',
					    borderBottomWidth: 1,
					  }}
					/>
					<View style={{marginTop: 12}}>
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'white', fontSize: 14}}>{parkedAddress}</Text>
					</View>
					<View >
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'white', fontSize: 18, fontWeight: 'bold'}}>{goodTill}</Text>
					</View>
				</View>
				</View>
				<View style={{marginBottom: 18}}>
			<Text style={{textAlign: 'center', color: 'yellow',  fontSize: 14, fontWeight: 'bold', paddingTop: 14}}>{isHol}</Text>
				</View>
				{this.showSignOnSummary()}
			</View>

			)
	} else{
		return null
	}
	}
}