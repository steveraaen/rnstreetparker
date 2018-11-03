import React, { Component } from 'react';
import { StatusBar, StyleSheet, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FadeInView from './Anim.js'

export default class DotsPanel extends Component {
	constructor(props) {
		super(props)
	}
	render() {
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
      	<View style={{flex: 1, display: 'flex',flexDirection: 'row',marginBottom: 2, backgroundColor: this.props.bgColor, marginLeft: 10, marginRight: 10, justifyContent: 'space-between', paddingTop: 6,  borderRadius: 8}}>
				<View style={{flex: .16}} >
					<TouchableOpacity onPress={() => this.props.hideKey(false)}>
					 	<Text>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
					 </TouchableOpacity>
				 </View>
				<View style={{flex: .28, flexDirection: 'column'}}>
					<View style={styles.AMDot}></View>
					<View><Text style={styles.txt}>Morning</Text></View>
				</View>
				<View style={{flex: .28, flexDirection: 'column'}}>
					<View style={styles.PMDot}></View>
					<View><Text style={styles.txt}>Afternoon</Text></View>
				</View>
				<View style={{flex: .28, flexDirection: 'column'}}>
					<View style={styles.nightDot}></View>
					<View><Text style={styles.txt}>Meters</Text></View>
				</View>
			</View>
			)
	} else { return null }
	}
}