import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import gkey from './keys.js'
import Icon from 'react-native-vector-icons/Ionicons';

var blurbOne = `Alternate Side Parking Manager.`
var blurbTwo = `Features:`
var blurbMap = `ASP turnover for any day of the week, near your location.`
var blurbSave = `Saves location and parking rules for exactly where you are parked.`
var blurbCal = `Adds time & date of next-move and car's location to your iOS calendar.`
var blurbAdjust = `Adjusts if your next-move date falls on an ASP holiday.`
var blurbAlarm = `Generates an iOS notification two hours before the next-move time.`
var blurbImport = `Import the entire ASP suspention schedule into your iOS calendar.`
export default class FirstUse extends Component {
	constructor(props) {
		super(props);
		this.state={
			checked: false
		}
		
	}
	render() {
		const styles = StyleSheet.create({
			meterDot: {
				marginLeft: 24, 
				height: 8,
				width: 8,
				borderRadius: 4,
				backgroundColor: 'rgba(223, 117, 63,.9)'
			},
			eachRow: {				
				marginRight: 24, 
				marginTop: 12,				
				flexDirection: 'row', 
				flexWrap: 'wrap', 
				justifyContent: 'space-between', 
				backgroundColor: 'black'
			},
	AMDot: {
		marginLeft: 24, 
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: 'rgb(0, 59, 255)',
		marginBottom: 6
	},
	PMDot: {
		marginLeft: 24, 
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: 'rgb(255, 147, 0)',
		marginBottom: 6
	},
	nightDot: {
		marginLeft: 24, 
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: 'rgb(156, 42, 168)',
		marginBottom: 6
	},
	txt: {
		color: 'white'
	},
	meterDot: {
		marginLeft: 24, 
		height: 8,
		width: 8,
		borderRadius: 4,
		backgroundColor: 'rgba(223, 117, 63,.9)'
	}
		})
	/*	const { navigate } = this.props.navigation;*/
		return(
			<View style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
			<StatusBar barStyle="light-content" hidden ={false}/>
			<View style={{alignItems: 'center', marginTop: 30, marginBottom: 30}}>
				<Image style={{paddingLeft: 16, height: 56, width: 56, borderRadius: 8}}source={require('./assets/bp60x216.png')}/>
			</View>
			<View style={{backgroundColor: 'black'}}>
				<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold',color: '#F6FEAC'}}>{blurbOne}</Text>
			</View>
			<View>

			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View style={{flex: .9}}><Text style={{textAlign: 'justify', fontSize: 16,fontWeight: 'bold', color: 'white'}}>{blurbMap}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View style={{flex: .9}}><Text style={{textAlign: 'justify', fontSize: 16,fontWeight: 'bold', color: 'white'}}>{blurbSave}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View style={{flex: .9}}><Text style={{textAlign: 'justify', fontSize: 16,fontWeight: 'bold', color: 'white'}}>{blurbCal}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View style={{flex: .9}}><Text style={{textAlign: 'justify', fontSize: 16,fontWeight: 'bold', color: 'white'}}>{blurbAdjust}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View style={{flex: .9}}><Text style={{textAlign: 'justify', fontSize: 16,fontWeight: 'bold', color: 'white'}}>{blurbAlarm}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			<View style={styles.eachRow}>
				<View style={styles.meterDot}></View>
				<View style={{flex: .9}}><Text style={{textAlign: 'justify', fontSize: 16,fontWeight: 'bold', color: 'white'}}>{blurbImport}<Text style={{color: 'white', fontWeight: 'bold'}}></Text></Text></View>
			</View>
			</View>
			<View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 24, marginBottom: 12}}>


			<TouchableOpacity onPress={() => this.props.ackPrevLaunched()}>
			<Text style={{paddingTop: 4, textAlign: 'right', marginRight: 36}}>  <Icon name="ios-arrow-round-forward" size={48} color="#F6FEAC"/></Text> 				
			</TouchableOpacity>

			</View>
			<View style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center', alignItems: 'center', padding: 4}}>
				<View style={{display: 'flex', justifyContent: 'flex-start', marginRight: 4}}>
				 	<Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>To see this info again, tap the </Text>
				 </View>
				 <View style={{display: 'flex', justifyContent: 'flex-end'}}>
				 	<Icon name="ios-information-circle-outline" size={34} color="#F6FEAC"/> 
				</View>
				<View style={{display: 'flex', justifyContent: 'flex-end', marginLeft: 4}}>
				 <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>icon on the main page. </Text>
				</View>
				</View>
			</View>
			)
	}
}