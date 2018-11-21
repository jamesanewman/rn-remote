import React from 'react';

export default class extends React.PureComponent {
    _onPress = () => {
        console.log("Pressing")
      };

    render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View>
              <Text style={{ color: textColor }}>
                HELLO
              </Text>
            </View>
          </TouchableOpacity>
        );        
    }
}