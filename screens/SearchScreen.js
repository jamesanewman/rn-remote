import React from 'react';
import Easynews from '../services/Search/Easynews';
import {StoreFactory} from '../services/Storage/StoreFactory';
import Messages from '../services/Messages/Message';
import { Utils } from '../services/Utils';
import LoadIndicator from '../components/LoadIndicator';

// TODO: Cleanup when easynews username/password is set
import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    ActivityIndicator,
    View
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
        this.state = {
          searchText: '',
          searchInProgress: false,
        };

        this.store = StoreFactory.getStore('configuration');
        const {un, pw} = this.getAuthenticationDetails();
        this.easynews = new Easynews(un, pw);
    }

    async search(){
        // To do make state include opts : {}
        console.log("Searching in progress...");
        await this.setEasynewsDetails();
        this.setState(previous => ({searchInProgress: true}));
        const searchOpts = {keywords: 'haven', minSize: Utils.convert.mb2Byte(300)};
        const records = this.easynews.search(searchOpts);
        records
          .then(results => {
            console.log("Search Opts -> " + JSON.stringify(searchOpts) + " -> ", results.length);
            return results;
          })
          .catch(err => {
            Messages.textMessage("Search failed: " + err.toString());
            return false;
          })
          .finally(() => {
            this.setState({searchInProgress: false});
          });
    }

    async getAuthenticationDetails(){
      const un = await this.store.getItem('en-username');
      const pw = await this.store.getItem('en-password');

      if(!un || !pw){
          Messages.textMessage("Username and password not found.");
      }
      return {un, pw};
    }


    async setEasynewsDetails(){
      const {un, pw} = await this.getAuthenticationDetails();
      this.easynews.username = un;
      this.easynews.password = pw;
    }

    render() {
      /* Go ahead and delete ExpoConfigView and replace it with your
       * content, we just wanted to give you a quick view of your config */
      const animating = this.state.searchInProgress;
      return (
      <View style={styles.welcomeContainer}>

        <LoadIndicator loading={this.state.searchInProgress} />

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
  