import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import gkey from './keys.js'

var sixMonthsAgo = moment().subtract(180, 'days').format('MMMM Do YYYY')

var blurb = `Streetparker is for New Yorkers who park on the street.\n\nThere are approximately one million non-metered parking spaces in the five boros, with only restriction being that drivers must move their cars at least once per week so that street sweepers can do their job.
             `
export default class FirstUse extends Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {


		if(this.props.uLngLat) {
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + parseFloat(this.props.uLngLat[1]).toFixed(5) +',' + parseFloat(this.props.uLngLat[0]).toFixed(5) + '&key=' + gkey, {}
  ).then((doc) => {
    console.log(doc)
    this.setState({
      carLoc: doc
      })
    })
  }
	}
	render() {

	/*	const { navigate } = this.props.navigation;*/
		return(
			<View style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
			
			<View style={{backgroundColor: 'black', margin: 2}}>
				<Text style={{textAlign: 'center', fontSize: 14, color: '#F6FEAC'}}>{blurb}<Text style={{color: 'white', fontWeight: 'bold'}}>{sixMonthsAgo}?</Text></Text>
			</View>
			<Button	
				onPress={() => this.props.ackIn()}
				title="Yes"
				color="#FF6B4E"
				accessibilityLabel="I have been to Europe in the past six months"
			/>

			</View>
			)
	}
}