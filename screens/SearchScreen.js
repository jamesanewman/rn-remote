import React from 'react';
import Easynews from '../services/Search/Easynews';
import {StoreFactory} from '../services/Storage/StoreFactory';
import Messages from '../services/Messages/Message';
import { Utils } from '../services/Utils';
import LoadIndicator from '../components/LoadIndicator';
import DisplayItems from '../components/Search/DisplayItems';

// TODO: Cleanup when easynews username/password is set - componentDidMounted?
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
          results: []
        };

        this.store = StoreFactory.getStore('configuration');
        const {un, pw} = this.getAuthenticationDetails();
        this.easynews = new Easynews(un, pw);
    }

    async search(){
        // To do make state include opts : {}
        var searchText = this.state.searchText;
        if(searchText === '') {
          Messages.textMessage("No Search Text Specified");
          return;
        }
        console.log("Searching in progress... ", searchText);
        await this.setEasynewsDetails();
        this.setState(previous => ({searchInProgress: true}));
        const searchOpts = {keywords: searchText, minSize: Utils.convert.mb2Byte(300)};
        const records = this.easynews.search(searchOpts);
        records
          .then(results => {
            // Simple debug
            console.log("Search Opts -> " + JSON.stringify(searchOpts) + " -> ", results.length);
            return results;
          })
          .then(results => {
            // save results
            this.setState({results});
            return results;
          })
          .catch(err => {
            // error - probably loading data
            Messages.textMessage("Search failed: " + err.toString());
            return false;
          })
          .finally(() => {
            // search completed
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
      let resultText = '';
      if(this.state.results.length > 0){
        resultText = `Showing ${this.state.results.length} results`;
      }

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

        <View>
          <Text>{resultText}</Text>
          <DisplayItems data={this.state.results} />
        </View>
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
  