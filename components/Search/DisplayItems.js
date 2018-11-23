import React from 'react';
import DisplayItem from './DisplayItem';
import {
  View,
  FlatList
} from 'react-native';

export default class MultiSelectList extends React.PureComponent {
    //state = {selected: (new Map(): Map<string, boolean>)};
  
    _keyExtractor(item, index){
        return '' + index;   
    }
  
    _onPressItem(id){
        console.log("Pressing ... xxx");
    }
  
    _renderItem(item){
      console.log("Render item = ", item);
      return (
        <DisplayItem
          id={JSON.stringify(item)}
          onPressItem={this._onPressItem}
          selected='false'
          title='wow'
          position={item.index}
          description={item.item.description}
          duration={item.item.duration}
          size={item.item.size}
          thumb={item.item.thumbUrl}
          url={item.item.url}
          filename={item.item.filename}
        />
      );
    };
  
    render() {
      console.log("Render -> ", this.props.data);
      return (
        <View>
          <FlatList
            data={this.props.data}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
    }
  }
