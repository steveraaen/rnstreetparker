import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/Ionicons';
import gkey from './keys.js'
import aspDays from './asp.js'

export default class ASPCalendar extends Component {
	constructor(props) {
		super(props)
		this.state={
			showASPList: true,
			aspArray: aspDays
		}
		this.closeList = this.closeList.bind(this)
	}
	closeList() {
		this.setState({showASPList: false})
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
	render() {
		var ASPList = this.state.nextArr.map((day, idx) => {
			return(
				<View style={{backgroundColor: 'rgba(31,44,75,.9)'}}>

				<ScrollView>
					 <View key={idx}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 16, marginRight: 16}}>
					<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{day.date.format('ddd, MMM Do')}</Text>
					<Text style={{color: 'coral'}}>   {day.holiday}</Text>
					</View>
					</View>
					
				</ScrollView>
				</View>
				)
		})
		if(this.state.showASPList) {
		return(
			<View style={{marginTop: 24}}>
				<TouchableOpacity onPress={() => this.closeList()}>
				 	<Text style={{paddingTop: 14}}>  <Icon name="ios-close" size={36} color="white"/></Text> 
				 </TouchableOpacity>
			
				{ASPList}
			
			</View>
			)
	} else {
		return null
	}
	}
}