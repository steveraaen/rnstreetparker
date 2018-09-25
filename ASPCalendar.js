import React, { Component } from 'react';
import { Alert, Animated, AsyncStorage, Button,  FlatList, NetInfo, Platform, ScrollView, SectionList, StatusBar, StyleSheet, Image, Text, View, TouchableHighlight ,TouchableOpacity } from 'react-native';
import moment from 'moment'
import axios from 'axios'
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/Ionicons';
import gkey from './keys.js'
import aspDays from './asp.js'
import aspDays19 from './asp19.js'

export default class ASPCalendar extends Component {
	constructor(props) {
		super(props)
		this.state={
			aspArray: aspDays,
			aspArray19: aspDays19
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
		this.props.importASPList(this.state.nextArr[i].date, this.state.nextArr[i].date, this.state.nextArr[i].holiday, () => {
			this.props.importASPList(this.state.aspArray19[i].date, this.state.aspArray19[i].date, this.state.aspArray19[i].holiday)
		})
	}
    Alert.alert(
   `${this.state.nextArr.length + this.state.aspArray19.length} ASP holidays added to your iPhone Calendar`,
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
		

				<View style={{flex: .7, marginLeft: 14, paddingRight: 8, marginRight: 14, paddingLeft: 8,backgroundColor: this.props.bgColor, borderRadius: 14, marginBottom: 6}}>
				<TouchableOpacity onPress={() => this.props.openCloseASP(false)}>
				 	<Text style={{paddingTop: 14}}>  <Icon name="ios-close" size={36} color={this.props.fgColor}/></Text> 
				 </TouchableOpacity>

<SectionList
  renderItem={({item, index, section}) => (
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 2}}>
                <View><Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{item.date.format('MMMM, Do')}</Text></View>
                <View><Text style={{color: this.props.fgColor, fontSize: 14, fontWeight: 'bold'}}>{item.holiday}</Text></View>             
              </View>
  	)}
  renderSectionHeader={({section: {title}}) => (
    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold', margin: 8, textAlign:'center'}}>{title}</Text>
  )}
  sections={[
    {title: '2018 ASP Holiday Suspensions', data: this.state.nextArr},
    {title: '2019 ASP Holiday Suspensions', data: this.state.aspArray19}
  ]}
  keyExtractor={(item, index) => item + index}
/>		
		
				<Button 
				title={"Save List to iPhone Calendar"}
				onPress={()=> this.saveAllASP()}
				/>
			</View>
			)
	} else {
		return null
	}
	}
}