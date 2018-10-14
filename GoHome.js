import React, { Component } from 'react';
import { Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class GoHome extends Component {
	constructor(props) {
		super(props)
		this.handlePress = this.handlePress.bind(this)
	}
	handlePress() {
		this.props.setGoHome()
		this.props.hoodStatus()
	}
	render() {
		return (
	

		<TouchableOpacity onPress={() => this.handlePress()}>
		 	<Text style={{paddingTop: 14, paddingRight: 20}}>  <Icon name="ios-locate-outline" size={34} color={'rgba(0,0,0)'}/></Text> 
		 </TouchableOpacity>

			)
	}
}
