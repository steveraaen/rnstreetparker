import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import FadeInView from './Anim.js'

export default class Dots extends Component {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 32, width: 32, marginTop: 24, borderWidth: 1, backgroundColor: this.props.colorColor, borderRadius: 4}}>
				<Image 
					source={require('./assets/blueDot12pt.png')}
					style={{height: 8, width: 8}}
				/>
				<Image 
					source={require('./assets/orangeDot12pt.png')}
					style={{height: 8, width: 8}}
				/>
				<Image 
					source={require('./assets/purpleDot12pt.png')}
					style={{height: 8, width: 8}}
				/>
			</View>

			)
	}
}
