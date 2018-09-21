import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  FlatList, NetInfo, Platform, ScrollView, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/Ionicons';
import gkey from './keys.js'
import aspDays from './asp.js'

export default class ASPCalendar extends Component {
	constructor(props) {
		super(props)
		this.state={
			aspArray: aspDays
		}
		this.saveAllASP = this.saveAllASP.bind(this)
	}

	componentWillMount() {
		var nextArr = []
		for(let i = 0; i < this.state.aspArray.length; i++) {
			if(this.state.aspArray[i].date.isAfter(this.state.today)){
				nextArr.push(this.state.aspArray[i])
			}
			if(this.state.aspArray[i].date === this.state.today) {
				this.setState({todayIsASP: true})
			}
		}
		/*console.log(nextArr)*/
		this.setState({nextArr: nextArr})
	}
saveAllASP() {
	for(let i = 0; i < this.state.nextArr.length; i++) {
		this.props.importASPList(this.state.nextArr[i].date, this.state.nextArr[i].date, this.state.nextArr[i].holiday)
	}
    Alert.alert(
   `${this.state.nextArr.length} ASP holidays added to your iPhone Calendar`,
   ``,
   [
     {text: 'Okay', onPress: () => console.log('added')},
   ],
   { cancelable: true }
 )

}
	render() {
		var keyExtractor = (item, index) => item.date.format('MMMM, Do');
		if(this.props.toggleASP) {
		return(
		

				<View style={{flex: 1, marginLeft: 20, marginRight: 20,backgroundColor: 'black'}}>
				<TouchableOpacity onPress={() => this.props.openCloseASP(false)}>
				 	<Text style={{paddingTop: 14}}>  <Icon name="ios-close" size={36} color="coral"/></Text> 
				 </TouchableOpacity>
				<View style={{marginBottom: 12}}><Text style={{color: 'yellow', fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Remaining 2018 ASP holidays</Text></View>
				 <FlatList 
				 	data={this.state.nextArr}
				 	keyExtractor={keyExtractor}
				 	renderItem={({ item }) => (
				 		<View style={{flexDirection: 'column', paddingLeft: 10, paddingRight: 10}}>
				 			<View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 2}}>

				 				<View><Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{item.date.format('MMMM, Do')}</Text></View>
				 				<View><Text style={{color: 'coral', fontSize: 14, fontWeight: 'bold'}}>{item.holiday}</Text></View>				 			
				 			</View>
				 		</View>
				 		)}
				 	/>			
		
			<View style={{marginLeft: 24, marginRight: 24, backgroundColor: 'black', marginTop: 12}}>
				<Text style={{color: 'yellow', fontSize: 14, fontWeight: 'bold'}}>Save this list to your phone's native calendar?</Text>
				<Button 
				title={"Save List"}
				onPress={()=> this.saveAllASP()}
				/>
			</View>
			</View>
			)
	} else {
		return null
	}
	}
}