import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FadeInView from './Anim.js'

export default class ColorKey extends Component {
render() {

var blurbOne = `Alternate Side Parking Manager.`
var blurbTwo = `Features:`
var blurbMap = `ASP turnover for any day of the week, near your location.`
var blurbSave = `Saves location and parking rules for exactly where you are parked.`
var blurbCal = `Adds time & date of next-move and car's location to your iOS calendar.`
var blurbAdjust = `Adjusts if your next-move date falls on an ASP holiday.`
var blurbAlarm = `Generates an iOS notification two hours before the next-move time.`
var blurbImport = `Lets you import the entire ASP suspention schedule into your iOS calendar.`

const styles = StyleSheet.create({
	pic: {
		height: this.props.height * .5, 
		width: this.props.width - .3
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
	},
	eachRow: {				
		marginRight: 24, 
		marginTop: 12,				
		flexDirection: 'row', 
		flexWrap: 'wrap', 
		justifyContent: 'space-between', 
		backgroundColor: 'black'
	}
})
if(this.props.toggleColorKey) {
return (
	<View  style={{display: 'flex', height: this.props.height * .8, alignItems: 'center', marginBottom: 12, backgroundColor: this.props.bgColor, marginLeft: 10, marginRight: 10, paddingBottom: 6, borderRadius: 8}}>
		<FadeInView>
		<View style={{display: 'flex', backgroundColor: this.props.bgColor}}>

		<TouchableOpacity onPress={() => this.props.hideKey(false)}>
		 	<Text style={{paddingTop: 14, paddingRight: 20}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
		 </TouchableOpacity>
	</View>
	<ScrollView>
	<Text style={{color: 'white', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Icons</Text>
		   <Image      
          source={require('./assets/help2.png')}
       />
   				<View
					  style={{
					    borderBottomColor: '#3d405b',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
				/>
<View style={{marginTop: 10}} >
<Text style={{color: 'white', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Dots on the Map</Text>
      			<FadeInView style={{display: 'flex',flexDirection: 'row', alignItems: 'space-between',marginBottom: 6, backgroundColor: this.props.bgColor, marginLeft: 10, marginRight: 10, paddingTop: 6, paddingBottom: 6, borderRadius: 8}}>
				<View style={{flex: .15}} >
				 </View>
				<View style={{flex: .33, flexDirection: 'column'}}>
					<View style={styles.AMDot}></View>
					<View><Text style={styles.txt}>6:00AM to 12:00PM</Text></View>
				</View>
				<View style={{flex: .33, flexDirection: 'column'}}>
					<View style={styles.PMDot}></View>
					<View><Text style={styles.txt}>12:00PM to 6:00PM</Text></View>
				</View>
				<View style={{flex: .33, flexDirection: 'column'}}>
					<View style={styles.nightDot}></View>
					<View><Text style={styles.txt}>Muni Parking Meters</Text></View>
				</View>
			</FadeInView>
</View>
				<View
					  style={{
					    borderBottomColor: '#3d405b',
					    borderBottomWidth: 1,
					    margin: 14
					  }}
				/>
			<View style={{marginTop: 8}}   >
			<Text style={{color: 'white', fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>Features</Text>
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
</ScrollView>
	</FadeInView>
</View>
      )
			} else return null
     }
	}
