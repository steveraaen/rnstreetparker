import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import gkey from './keys.js'


var blurbOne = `Streetparker is for New Yorkers who park on the street.\n\nThere are approximately one million non-metered parking spaces in the five boros, with only restriction being that drivers must move their cars at least once per week so that street sweepers can do their job.`
var blurbTwo = `Each dot represents a color-coded "No Parking - Street Sweeping" sign.`
var blurbAM = `Morning ASP turnover.`
var blurbPM = `Afternoon ASP turnover.`
var blurbMeters = `Paid parking meters.`
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
		const styles = StyleSheet.create({
			amDot: {
				height: 20,
				width: 20,
				borderRadius: 10,
				backgroundColor: 'rgba(22,56,123,.9)'
			},
			pmDot: {
				height: 20,
				width: 20,
				borderRadius: 10,
				backgroundColor: 'rgba(223, 117, 63,.9)'
			},
			meterDot: {
				height: 20,
				width: 20,
				borderRadius: 10,
				backgroundColor: 'red'
			},
			eachRow: {
				marginLeft: 48, 
				marginRight: 48, 
				marginTop: 12, 
				flexDirection: 'row', 
				flexWrap: 'wrap', 
				justifyContent: 'space-between', 
				backgroundColor: 'black'
			}
		})
	/*	const { navigate } = this.props.navigation;*/
		return(
			<View style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
			<View style={{alignItems: 'center', marginBottom: 36}}>
				<Image style={{marginTop: 32, paddingLeft: 16, height: 72, width: 72, borderRadius: 8}}source={require('./assets/sp60*3.png')}/>
			</View>
			<View style={{backgroundColor: 'black'}}>
				<Text style={{textAlign: 'center', fontSize: 16, color: '#F6FEAC'}}>{blurbOne}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text>
			</View>
			<View style={{backgroundColor: 'black', marginTop: 16, marginBottom: 16}}>
				<Text style={{textAlign: 'center', fontSize: 16, color: 'white', fontWeight: 'bold', fontStyle: 'italic'}}>{blurbTwo}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.amDot}></View>
				<View><Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>{blurbAM}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.pmDot}></View>
				<View><Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>{blurbPM}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View><Text style={{textAlign: 'center', fontSize: 16, color: 'white'}}>{blurbMeters}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={{marginTop: 24}}>
			<Button	
				onPress={() => this.props.ackIn()}
				title="Go to the map"
				color="green"
				accessibilityLabel="I have been to Europe in the past six months"
			/>
			</View>
			</View>
			)
	}
}