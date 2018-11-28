import React from 'react';
import Kodi from '../../services/Player/Kodi';

console.log("Kodi -> ", Kodi);
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

export default class extends React.PureComponent {
    _onPress = () => {
        console.log("Pressing")
      };

    render() {
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View style={styles.container}>
              <View style={{ margin: 10}}>
                <Text>{this.props.position + 1}</Text>
              </View>

              <View>
                <Image source={{uri: this.props.thumb}} style={styles.image} />
              </View>

              <View style={{ margin: 10 }}>
                  <Text>{this.props.filename}</Text>
                <Text>{this.props.size} / {this.props.duration}</Text>
                <Text style={styles.description}>{this.props.description}</Text>
              </View>
              
            </View>
          </TouchableOpacity>
        );        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 5,
    flexDirection: 'row'
  },
  
  searchHeader: {
      fontWeight: 'bold'
  },

  description: {
    color: 'blue',
  },

  image: {
    width: 75, 
    height: 75
  }
});