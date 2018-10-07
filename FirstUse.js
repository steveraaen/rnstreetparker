import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import gkey from './keys.js'
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements';

var blurbOne = `Alternate Side Parking Manager.`
var blurbTwo = `Features:`
var blurbMap = `ASP turnover for any day of the week, near your location.`
var blurbSave = `Saves location and parking rules for exactly where you are parked.`
var blurbCal = `Adds time & date of next-move and car's location to your iOS calendar.`
var blurbAdjust = `Adjusts if your next-move date falls on an ASP holiday.`
var blurbAlarm = `Generates an iOS notification two hours before the next-move time.`
var blurbImport = `Lets you import the entire ASP suspention schedule into your iOS calendar.`
export default class FirstUse extends Component {
	constructor(props) {
		super(props);
		this.state={
			checked: false
		}
		
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

	savePrevStatus() {

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
				backgroundColor: '#1F2C4B'
			}
		})
	/*	const { navigate } = this.props.navigation;*/
		return(
			<View style={{flex: 1, justifyContent: 'center', backgroundColor: '#1F2C4B'}}>
			<StatusBar barStyle="light-content" hidden ={false}/>
			<View style={{alignItems: 'center', marginTop: 30, marginBottom: 30}}>
				<Image style={{paddingLeft: 16, height: 56, width: 56, borderRadius: 8}}source={require('./assets/p60x216.png')}/>
			</View>
			<View style={{backgroundColor: '#1F2C4B'}}>
				<Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold',color: '#F6FEAC'}}>{blurbOne}</Text>
			</View>
			<View    >
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
			<CheckBox
			checked={this.state.checked}
			onPress={() => this.props.handleCheck()}
			  title="Don't show this again"
			  containerStyle={{backgroundColor: 'black'}}
			  textStyle={{color: "#F6FEAC"}}
			  checkedColor='red'
			/>

			<TouchableOpacity onPress={() => this.props.ackPrevLaunched()}>
			<Text style={{paddingTop: 4, textAlign: 'right', marginRight: 36}}>  <Icon name="ios-arrow-round-forward" size={48} color="#F6FEAC"/></Text> 				
			</TouchableOpacity>

			</View>
			</View>
			)
	}
}