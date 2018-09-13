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

		this.showASPHol = this.showASPHol.bind(this)
		this.showSignOnSummary = this.showSignOnSummary.bind(this)

	}

	componentWillMount() {

		var nextArr = []
		for(let i = 0; i < this.state.aspArray.length; i++) {
			if(this.state.aspArray[i].date.isAfter(this.state.today)){
				nextArr.push(this.state.aspArray[i])
			}
			if(moment(this.state.aspArray[i].date).format('MMM Do, YYYY') === moment(this.state.today).format('MMM Do, YYYY')) {
				this.setState({todayIsASP: true})
			}
		}
	/*	console.log(nextArr)*/
		this.setState({nextArr: nextArr})
	}
	showASPHol(a) {

				if(this.state.todayIsASP) {
			return  (
				<View style={{marginBottom: 12}}>
					<Text style={{fontSize: 20, fontWeight: 'bold', color: 'red', textAlign: 'center'}}> ASP IS SUSPENDED TODAY!</Text>
				</View>
				)
		} else { return (
				<View style={{marginBottom: 12}}>
					<Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center'}}> ASP is in effect today</Text>
				</View>
			)}
	}

	
	closeASPWindow() {
		this.setState({showComp: false})
	}
	showSignOnSummary() {
		if(this.props.signText) {
			var signText = this.props.signText

			return(
			<View style={{marginLeft: 32, marginRight: 32, backgroundColor: 'white', borderWidth: 3, borderColor: 'red', borderRadius: 12, marginTop: 14, padding: 8}}>
			<Text  style={{ textAlign: 'center', color: 'black', fontSize: 16, fontWeight: 'bold'}}>{signText}</Text>
			</View>
			)
		} else return null
	}

	render() {
		/*console.log(this.state.savedSpot)*/
		var blurb = `Next ASP holiday: ${this.state.nextArr[0].holiday} on ${this.state.nextArr[0].date.format('ddd, MMM Do')}`
		var blurbText = `The next street sweeping holiday is:`
		var nextHoliday = this.state.nextArr[0].holiday
		var nextHolidayDate = this.state.nextArr[0].date.format('dddd, MMMM Do')

		
		if(this.props.ASPObject) {
			var moveBlurb = 'You can park there until:'
			var parkedBlurb = 'You are parked at:'
			var parkedAddress = this.props.ASPObject.location
			var goodTill = moment(this.props.ASPObject.endDate).format('dddd, MMMM do')
			var isHol = this.props.ASPObject.isASPHoliday
		}	



		if(this.props.toggleSum) {
		return(
			<View style={{display: 'flex', flex: 1, marginBottom:4, backgroundColor: 'black', marginLeft: 20, marginRight: 20, justifyContent: 'flex-start'}}>
				<View>		
					 <TouchableOpacity onPress={() => this.props.openCloseSummary(false)}>
					 	<Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={36} color="coral"/></Text> 
					 </TouchableOpacity>		
				</View>	
				<View>
					{this.showASPHol()}
				<View
					  style={{
					    borderBottomColor: 'coral',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
				/>
				<View style={{marginLeft:12}}>
					<Text style={{color: 'coral',  fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{blurbText}</Text>
				</View>
				<View style={{flexDirection: 'column'}}>
					<View>
						<Text style={{marginTop: 6, marginLeft:24, color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>{nextHolidayDate}</Text>
					</View>
					<View style={{marginBottom: 12}}>
						<Text style={{marginTop: 6,  marginLeft:24, color: 'coral', fontSize: 16, textAlign: 'center'}}>{nextHoliday}</Text>
					</View>
					<View
					  style={{
					    borderBottomColor: 'coral',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
					/>
					 
					<View style={{marginTop: 12}}>
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'coral', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{parkedBlurb}</Text>
					</View>

					<View style={{marginTop: 4}}>
						<Text style={{textAlign: 'center', marginTop: 6, marginBottom: 6, color: 'white', fontSize: 18, fontWeight: 'bold'}}>{parkedAddress}</Text>
					</View>
					<View style={{marginTop: 12}}>
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'coral', fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>{moveBlurb}</Text>
					</View>

					<View >
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'white', fontSize: 18, fontWeight: 'bold'}}>{goodTill}</Text>
					</View>
				</View>
				</View>
				{this.showSignOnSummary()}
				<View style={{marginBottom: 18}}>
			<Text style={{textAlign: 'center', color: 'red',  fontSize: 14, fontWeight: 'bold', paddingTop: 14}}>{isHol}</Text>
				</View>
				
			</View>

			)
	} else{
		return null
	}
	}
}