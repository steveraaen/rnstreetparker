import React, { Component } from 'react';
import {StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ColorKey from './ColorKey.js'
import FadeInView from './Anim.js'

export default class Info extends Component {
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
	}
})

return (
	<View  style={{display: 'flex', alignItems: 'center', marginBottom: 12, backgroundColor: this.props.bgColor, marginLeft: 10, marginRight: 10, paddingBottom: 6, borderRadius: 8}}>
		<FadeInView>
		<View style={{display: 'flex', backgroundColor: this.props.bgColor}}>

		<TouchableOpacity onPress={() => this.props.openCloseASP(false)}>
		 	<Text style={{paddingTop: 14, paddingRight: 20}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
		 </TouchableOpacity>
	</View>

		   <Image
         
          source={require('./assets/compacthelp.png')}
       />
<View style={{marginTop: 10}} >
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
	</FadeInView>
</View>
      )

     }

}