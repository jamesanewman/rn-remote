import React from 'react';
import Easynews from '../services/Search/Easynews';
import {StoreFactory} from '../services/Storage/StoreFactory';
import Messages from '../services/Messages/Message';
import { Utils } from '../services/Utils';
import LoadIndicator from '../components/LoadIndicator';
import DisplayItems from '../components/Search/DisplayItems';
import Player from '../services/Player/Player';
import Panel from '../components/Panel/Panel';

// TODO: Cleanup when easynews username/password is set - componentDidMounted?
// TODO: Done auto searches
// 
import {
    StyleSheet,
    Text,
    TextInput,
    Button,
    ActivityIndicator,
    View,
    Picker,
    CheckBox
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
          searchInProgress: false,
          results: [],

          // Search options
          searchText: '',
          minSize: '300',
          maxSize: '2000',
          useSubject: true
        };

        this.store = StoreFactory.getStore('configuration');
        // Create Easynews instance
        const {un, pw} = await this.getAuthenticationDetails();
        this.easynews = new Easynews(un, pw);
        // Create Kodi instance to push down to components
        const {ip, port} = await this.getPlayerLocation();
        this.player = new Player(ip, port);
    }

    async search(){
      if(this.state.searchText === '') {
        Messages.textMessage("No Search Text Specified");
        return;
      }
        const params = this.buildSearchParams();
        // To do make state include opts : {}
        console.log("Searching in progress... ", JSON.stringify(params));
        await this.setEasynewsDetails();
        this.setState(previous => ({searchInProgress: true}));
        const records = this.easynews.search(params);
        records
          .then(results => {
            // Simple debug
            console.log("Search Opts -> " + JSON.stringify(params) + " -> ", results.length);
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
            console.log("Search complete");
          });
    }

    buildSearchParams(){
      var { minSize, maxSize, useSubject, searchText} = this.state;
      var params = {types: ['VIDEO']};
      if(minSize && minSize !== '0') params.minSize = Utils.convert.mb2Byte(minSize);
      if(maxSize && maxSize !== '0') params.maxSize = Utils.convert.mb2Byte(maxSize);
      if(useSubject === true) params.subject = searchText;
      else params.keywords = searchText;

      return params;
    }

    async getAuthenticationDetails(){
      const un = await this.store.getItem('en-username');
      const pw = await this.store.getItem('en-password');

      if(!un || !pw){
          Messages.textMessage("Username and password not found for easynews please check your settings.");
      }
      return {un, pw};
    }


    async getPlayerLocation(){
      const port = await this.store.getItem('kodi-port');
      const ip = await this.store.getItem('kodi-ip');

      if(!port || !ip){
          Messages.textMessage("Ip and port not found for Kodi please check your settings.");
      }
      return {ip, port};
    }

    async setEasynewsDetails(){
      const {un, pw} = await this.getAuthenticationDetails();
      this.easynews.username = un;
      this.easynews.password = pw;
    }

    changeSubject(useSubject){
      this.setState({useSubject})
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

        <Panel title="Search Options:">

          <Picker
            selectedValue={this.state.minSize}
            //style={{ height: 50, width: 100 }}
            onValueChange={minSize => this.setState({minSize})}>
            <Picker.Item label="Any" value="0" />
            <Picker.Item label="200MB" value="200" />
            <Picker.Item label="300MB" value="300" />
            <Picker.Item label="400MB" value="400" />
            <Picker.Item label="1GB" value="1000" />
            <Picker.Item label="2GB" value="2000" />
          </Picker>

          <Picker
            selectedValue={this.state.maxSize}
            //style={{ height: 50, width: 100 }}
            onValueChange={maxSize => this.setState({maxSize})}>
            <Picker.Item label="Any" value="0" />
            <Picker.Item label="200MB" value="200" />
            <Picker.Item label="300MB" value="300" />
            <Picker.Item label="400MB" value="400" />
            <Picker.Item label="1GB" value="1000" />
            <Picker.Item label="2GB" value="2000" />
          </Picker>

          <Text>
            Use subject to search: (if not checked then use keywords)
          </Text>
          <CheckBox label="Click me" value={this.state.useSubject} onValueChange={this.changeSubject.bind(this)}/>        
        </Panel>

        <Button
          onPress={() => this.search()}
          title="Search"
          color="#841584"
        />

        <View>
          <Text>{resultText}</Text>
          <DisplayItems data={this.state.results} player={this.player}/>
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
    },
    options: {
    }
  });
  