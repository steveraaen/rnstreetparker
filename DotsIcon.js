import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import FadeInView from './Anim.js'

export default class Dots extends Component {
	render() {
		return (
			<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 38, width: 34,  borderWidth: 1, borderColor: this.props.color, borderRadius: 8}}>
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
