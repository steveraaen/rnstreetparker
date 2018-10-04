        
    <NotInNYC { ...this.state} hideSearch={this.hideSearch} getPlaces={this.getPlaces} getNewMapLoc={this.getNewMapLoc}/>



          selectedValue={"dow"}
          onValueChange={(itemValue, itemPosition) => this.setState({todayMarkersArray: itemValue[0], selDay: itemValue[1]})}
          itemStyle={styles.daySwipeText}>
          <Picker.Item label={"Sunday"}  value={[this.state.sunArray, "Sunday"]} dow={"Sunday"}/>
          <Picker.Item label={"Monday"}  value={[this.state.monArray, "Monday"]} dow={"Monday"}/>
          <Picker.Item label={"Tuesday"}  value={[this.state.tueArray, "Tuesday"]} dow={"Tuesday"}/>
          <Picker.Item label={"Wednesday"}   value={[this.state.wedArray, "Thursday"]} dow={"Wednesday"}/>
          <Picker.Item label={"Thursday"}  value={[this.state.thuArray, "Friday"]} dow={"Thursday"}/>
          <Picker.Item label={"Friday"}  value={[this.state.friArray, "Saturday"]} dow={"Friday"}/>
          <Picker.Item label={"Saturday"}  value={[this.state.satArray, "Sunday"]} dow={"Saturday"}/>



 showCarLoc() {

  if(this.state.carLoc) {
      var splitCarLoc = this.state.carLoc.data.results[0].formatted.split(',')
      var savedCarLoc = {
        latitude: this.state.ll[1],
        longitude: this.state.ll[0],
        location: splitCarLoc[0] + "," + splitCarLoc[1]
      }
      AsyncStorage.setItem('carSpot', JSON.stringify(savedCarLoc), () => {
        AsyncStorage.getItem('carSpot', (err, res) => {
          console.log(JSON.parse(res))
        })
      })
      


  /*  console.log(splitCarLoc)*/
     return( <View>
            <View >
                <Text style={{fontSize: 20, color: 'yellow'}}>You are parked next to:</Text>  
            </View> 
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>{splitCarLoc[0] + "," + splitCarLoc[1] }</Text>
            </View> 
            <View style={{marginTop: 20, alignItems: 'center'}}>  
                 <Text style={{fontSize: 16, color: 'yellow'}}>Would you like to save this location? </Text>
            </View>
              <TouchableOpacity>
                <Button 
                  title="Yes"
                  onPress={(e) => this.getTenSigns(this.state.carLoc.data.results[0].geometry)}
                >
                </Button>
                <Button 
                  title="No"
                  onPress={(e) => this.dontSaveSpot()}
                >
                </Button>
              </TouchableOpacity>
              <View><Text></Text></View>
            </View>)
  } else {return null}
 }





         <FlatList 
          data={this.state.nextArr}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <View style={{flexDirection: 'column', paddingLeft: 10, paddingRight: 10}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 2}}>
                <View><Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>{item.date.format('MMMM, Do')}</Text></View>
                <View><Text style={{color: '#F1C137', fontSize: 14, fontWeight: 'bold'}}>{item.holiday}</Text></View>             
              </View>
            </View>
            )}
          />  