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