import React from 'react';
import DisplayItem from './DisplayItem';

export default class MultiSelectList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>)};
  
    _keyExtractor(item, index){
        return 4;   
    }
  
    _onPressItem(id){
        console.log("Pressing ... xxx");
    }
  
    _renderItem(item){
      <DisplayItem
        id='1'
        onPressItem={this._onPressItem}
        selected='false'
        title='wow'
      />
    };
  
    render() {
      return (
        <FlatList
          data={this.props.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }
