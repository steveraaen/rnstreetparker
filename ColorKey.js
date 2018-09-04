import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ColorKey extends Component {
	constructor(props) {
		super(props);


	}
	render() {
		const styles = StyleSheet.create({
			AMDot: {
				marginLeft: 24, 
				height: 12,
				width: 12,
				borderRadius: 6,
				backgroundColor: 'rgb(244, 203, 66)',
				marginBottom: 6
			},
			PMDot: {
				marginLeft: 24, 
				height: 12,
				width: 12,
				borderRadius: 6,
				backgroundColor: 'rgb(65, 244, 202)',
				marginBottom: 6
			},
			nightDot: {
				marginLeft: 24, 
				height: 12,
				width: 12,
				borderRadius: 6,
				backgroundColor: 'rgb(244, 65, 205)',
				marginBottom: 6
			},
			txt: {
				color: 'white'
			}
		})
		if(this.props.showKey) {
		return (
			<View style={{flex: .1, flexDirection: 'row', justifyContent: 'space-around',height: 6, alignItems: 'center', backgroundColor: 'black', marginLeft: 24, marginRight: 24}}>
				<TouchableOpacity onPress={() => this.props.hideKey(false)}>
				 	<Text style={{paddingTop: 14}}>  <Icon name="ios-close" size={36} color="coral"/></Text> 
				 </TouchableOpacity>
				<View style={{flex: .3, flexDirection: 'column'}}>
					<View style={styles.AMDot}></View>
					<View><Text style={styles.txt}>6:00AM to 12:00PM</Text></View>
				</View>
				<View style={{flex: .3, flexDirection: 'column'}}>
					<View style={styles.PMDot}></View>
					<View><Text style={styles.txt}>12:00PM to 6:00PM</Text></View>
				</View>
				<View style={{flex: .3, flexDirection: 'column'}}>
					<View style={styles.nightDot}></View>
					<View><Text style={styles.txt}>Muni Parking Meters</Text></View>
				</View>
			</View>
			)
	} else return null
	}
}