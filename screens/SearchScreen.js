import React from 'react';
//import Easynews from '../services/Search/Easynews';
import {StoreFactory} from '../services/Storage/StoreFactory';
//import Messages from '../services/Messages/Message';

import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    View,
  } from 'react-native';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
      title: 'app.json',
    };
  
    constructor(props) {
      super(props);
      this.initialise();
    }
  
    /** Load initial configuration values */
    async initialise(){
        this.state = {searchText: ''};

        console.log("Store factory = ", StoreFactory);
        this.store = StoreFactory.getStore('configuration');
        console.log("Store = ", this.store);
        
        const un = await this.store.getItem('en-username');
        // const pw = await this.store.getItem('en-password');

        console.log("Username = ", un);
        // if(!un || !pw){
        //     Messages.textMessage("Username and password not found.");
        // }
        // this.easynews = new Easynews(un, pw);

    }

    searchChange(searchText){
        console.log("Search text changed: ", searchText);
    }

    search(){
        console.log("Searching in progress...");
    }

    render() {
      /* Go ahead and delete ExpoConfigView and replace it with your
       * content, we just wanted to give you a quick view of your config */
      return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.searchHeader}>Search</Text>

        <TextInput
          placeholder='Search Text'
          value={this.state.searchText}
          onChangeText={(searchText) => this.setState({searchText})}
        />
  
        <Button
          onPress={() => this.search()}
          title="Search"
          color="#841584"
        />

      </View>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    searchHeader: {
        fontWeight: 'bold'
    }
  });
  