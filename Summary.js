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
				this.setState({
									todayIsASP: true,
									todayHolidayName: this.state.aspArray[i].holiday
								})
			}
		}
	/*	console.log(nextArr)*/
		this.setState({nextArr: nextArr})
	}
	showASPHol(a) {

				if(this.state.todayIsASP) {
			return  (
				<View style={{marginBottom: 2, borderWidth: 2, borderRadius: 8, borderColor: '#f15152', padding: 8}}>
					<Text style={{fontSize: 20,  color: 'cyan', textAlign: 'center'}}> ASP IS SUSPENDED TODAY for</Text>
					<Text style={{fontSize: 20,  color: 'white', textAlign: 'center'}}>{this.state.todayHolidayName}</Text>
				</View>
				)
		} else { return (
				<View style={{marginBottom: 2}}>
					<Text style={{fontSize: 20,  color: '#FFFB00', textAlign: 'center'}}> ASP is in effect today</Text>
				</View>
			)}
	}

	
	closeASPWindow() {
		this.setState({showComp: false})
	}
	showSignOnSummary() {
		if(this.props.signText) {
			

			return(
			<View style={{marginLeft: 32, marginRight: 32, backgroundColor: 'white', borderWidth: 3, borderColor: 'red', borderRadius: 12, marginTop: 14, padding: 8}}>
			<Text  style={{ textAlign: 'center', color: 'black', fontSize: 16, }}>{this.props.signText}</Text>
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
			var goodTill = this.props.ASPObject.goodTill
			var isHol = this.props.ASPObject.isASPHoliday
		}	



		if(this.props.toggleSum) {
		return(
			<View style={{flex: 1, flexWrap: 'wrap', borderRadius: 12,  marginBottom:4, backgroundColor: this.props.bgColor, marginLeft: 14, marginRight: 14, justifyContent: 'flex-start'}}>
				<View>		
					 <TouchableOpacity onPress={() => this.props.openCloseSummary(false)}>
					 	<Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
					 </TouchableOpacity>		
				</View>	
				<View>
					{this.showASPHol()}
				<View
					  style={{
					    borderBottomColor: '#3d405b',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
				/>
				<View style={{marginLeft:12}}>
					<Text style={{color: this.props.fgColor,  fontSize: 16,  textAlign: 'center'}}>{blurbText}</Text>
				</View>
				<View style={{flexDirection: 'column'}}>
					<View>
						<Text style={{marginTop: 6, marginLeft:24, color: 'white', fontSize: 18,  textAlign: 'center'}}>{nextHolidayDate}</Text>
					</View>
					<View >
						<Text style={{marginTop: 6,  marginLeft:24, color: this.props.fgColor, fontSize: 16, textAlign: 'center'}}>{nextHoliday}</Text>
					</View>
					<View
					  style={{
					    borderBottomColor: this.props.fgColor,
					    borderBottomWidth: 1,
					    margin: 14
					  }}
					/>
					 
					<View style={{marginTop: 2}}>
						<Text style={{marginBottom: 6, marginLeft:24, color: this.props.fgColor, fontSize: 16,  textAlign: 'center'}}>{parkedBlurb}</Text>
					</View>

					<View style={{marginTop: 4}}>
						<Text style={{textAlign: 'center', marginTop: 6, marginBottom: 6, color: 'white', fontSize: 18, }}>{parkedAddress}</Text>
					</View>
					<View style={{marginTop: 12}}>
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: this.props.fgColor, fontSize: 16,  textAlign: 'center'}}>{moveBlurb}</Text>
					</View>

					<View >
						<Text style={{marginTop: 6, marginBottom: 6, marginLeft:24, color: 'white', fontSize: 18,  textAlign: 'center'}}>{goodTill}</Text>
					</View>
				</View>
				</View>
				{this.showSignOnSummary()}
				<View style={{marginBottom: 18}}>
			<Text style={{textAlign: 'center', color: this.props.fgColor,  fontSize: 14,  paddingTop: 14}}>{isHol}</Text>
				</View>
				
			</View>

			)
	} else{
		return null
	}
	}
}