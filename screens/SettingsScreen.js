import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  InputAccessoryView,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';

import { StoreFactory } from '../services/Storage/StoreFactory';
import Messages from '../services/Messages/Message';

/**
 * TODO:
 * - On clicking save, remove keyboard
 */

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  constructor(props) {
    super(props);
    this.initialise();
    this.loadConfiguration();
  }

  /** Load initial configuration values */
  initialise(){
    this.store = StoreFactory.getStore('configuration');
    this.state = { username: '', password: '',  kodiip: ''};
  }

  async loadConfiguration(){
    this.setState({
      username: await this.store.getItem('en-username') || 'un',
      password: await this.store.getItem('en-password') || 'pw',
      kodiip: await this.store.getItem('kodi-ip') || '',
      kodiport: await this.store.getItem('kodi-port') || ''
    });
  }

  saveConfiguration(){
    this.store.setItem('en-username', this.state.username);
    this.store.setItem('en-password', this.state.password);
    this.store.setItem('kodi-ip', this.state.kodiip);
    this.store.setItem('kodi-port', this.state.kodiport);

    Messages.textMessage("Saved settings");
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    <View style={styles.welcomeContainer}>
      <Text>Easynews Username</Text>
      <TextInput
        placeholder='username'
        value={this.state.username}
        onChangeText={(username) => this.setState({username})}
      />

      <Text>Easynews Password</Text>
      <TextInput
        placeholder='password'
        value={this.state.password}
        onChangeText={(password) => this.setState({password})}
      />

      <Text>Kodi IP Address</Text>
      <TextInput
        placeholder='IP Address '
        value={this.state.kodiip}
        onChangeText={(kodiip) => this.setState({kodiip})}
      />

      <Text>Kodi Port</Text>
      <TextInput
        placeholder='IP Address '
        value={this.state.kodiport}
        onChangeText={(kodiport) => this.setState({kodiport})}
      />

      <Button
        onPress={() => this.saveConfiguration()}
        title="Save"
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
});
