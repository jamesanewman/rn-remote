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

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  constructor(props) {
    super(props);

    this.initialiseSettings();
  }

  /** Load initial configuration values */
  initialiseSettings(){
    this.state = { text: '', password: '' };
    // override with settings from storage storage <==> state
    // so we can just swap state/config/and visa verca
  }

  saveConfiguration(){
    console.log("Save: ", Object.keys(this.state).join('/'));
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    <View style={styles.welcomeContainer}>
      <Text>Easynews Username</Text>
      <TextInput
        placeholder='username'
        value={this.state.text}
        onChangeText={(text) => this.setState({text})}
      />
      <Text>Easynews Password</Text>
      <TextInput
        placeholder='password'
        value={this.state.password}
        onChangeText={(password) => this.setState({password})}
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
