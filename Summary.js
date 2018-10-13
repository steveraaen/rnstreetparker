import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/Ionicons';
import gkey from './keys.js'
import aspDays from './asp.js'
import ColorKey from './ColorKey.js'
import FadeInView from './Anim.js'

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
		AsyncStorage.getItem('parkingObject', (error, value) => {})
	   .then((value) => {
	      this.setState({
	      	ASPObject: value
	      })
	   })
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
				<View >
					<Text style={{fontSize: 20,  color: 'cyan', textAlign: 'center'}}> ASP IS SUSPENDED TODAY for</Text>
					<Text style={{fontSize: 20,  color: 'white', textAlign: 'center'}}>{this.state.todayHolidayName}</Text>
				</View>
				)
		} else { return (
				<View style={{marginBottom: 2}}>
					<Text style={{fontSize: 20,  color: '#FFFB00', textAlign: 'center'}}> ASP rules are in effect today</Text>
				</View>
			)}
	}

	
	closeASPWindow() {
		this.setState({showComp: false})
	}
	showSignOnSummary() {
		if(this.props.signText) {
			

			return(
			<View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 22, marginRight: 22, backgroundColor: 'white', justifyContent:'center', borderWidth: 3, borderColor: '#941100', borderRadius: 12}}>
			<View>
				<Image source={require('./assets/p20x144-1.png')} style={{height: 28, width: 28, margin: 6}}/>
			</View>
			<View style={{justifyContent:'center', paddingLeft: 8, paddingRight: 8}}>
				<Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold'}}>{this.props.signText}</Text>
			</View>
			</View>
			)
		} else return null
	}

	render() {
switch (this.props.orientation) {
  case 'portrait':
var summaryHeight = this.props.height * .7
    break;
  case 'landscape':
var summaryHeight = this.props.height * .66
    break;
  default:
    var summaryHeight = this.props.height * .7
}
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
		if(this.props.toggleSum && this.props.dist < 20) {
		return(
			<View style={{borderRadius: 12,  height: summaryHeight, marginBottom:4, backgroundColor: this.props.bgColor, marginLeft: 10, marginRight: 10, justifyContent: 'flex-start'}}>
				<View>		
					 <TouchableOpacity onPress={() => this.props.openCloseSummary(false)}>
					 	<Text style={{paddingTop: 4}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
					 </TouchableOpacity>		
				</View>
<ScrollView>
				<FadeInView>
					{this.showASPHol()}
				<View
					  style={{
					    borderBottomColor: '#3d405b',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
				/>
				<View style={{marginLeft:12}}>
					<Text style={{color: this.props.fgColor,  fontSize: 20,  textAlign: 'center'}}>{blurbText}</Text>
				</View>
				<View style={{flexDirection: 'column'}}>
					<View>
						<Text style={{marginTop: 12, marginLeft:24, color: 'white', fontSize: 22,  textAlign: 'center'}}>{nextHolidayDate}</Text>
					</View>
					<View >
						<Text style={{marginTop: 12,  marginLeft:24, color: 'white', fontSize: 22,  textAlign: 'center'}}>{nextHoliday}</Text>
					</View>
					<View
					  style={{
					    borderBottomColor: '#3d405b',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
					/>
					 
					<View style={{marginTop: 2}}>
						<Text style={{marginBottom: 2, marginLeft:24, color: this.props.fgColor, fontSize: 20,  textAlign: 'center'}}>{parkedBlurb}</Text>
					</View>

					<View style={{marginTop: 8, marginBottom: 8}}>
						<Text style={{textAlign: 'center', marginTop: 6, marginBottom: 6, color: 'white', fontSize: 22, }}>{parkedAddress}</Text>
					</View>
					<View>
					{this.showSignOnSummary()}
					</View>
					<View style={{marginTop: 2}}>
						<Text style={{marginTop: 6, marginBottom: 12, marginLeft:24, color: this.props.fgColor, fontSize: 20,  textAlign: 'center'}}>{moveBlurb}</Text>
					</View>
						
					<View >
						<Text style={{marginTop: 6, marginLeft:24, color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>{goodTill}</Text>
					</View>
				</View>			
				
				<View style={{marginBottom: 8}}>
			<Text style={{textAlign: 'center', color: 'yellow',  fontSize: 16,  paddingTop: 4}}>{isHol}</Text>
				</View>
			</FadeInView>
			</ScrollView>
</View>
			)
	} else{
		return null
	}
	}
}