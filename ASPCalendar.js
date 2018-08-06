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
			showASPList: true
		}
		this.closeList = this.closeList.bind(this)
	}
	closeList() {
		this.setState({showASPList: false})
	}
	render() {
		var ASPList = aspDays.map((day, idx) => {
			return(
				<View>

				<ScrollView>
					<View><Text style={{color: 'white', fontWeight: 'bold'}} key={idx}>{day.date.format('ddd, MMM Do')}<Text style={{color: 'coral'}}>   {day.holiday}</Text></Text></View>
					
				</ScrollView>
				</View>
				)
		})
		if(this.state.showASPList) {
		return(
			<View>
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