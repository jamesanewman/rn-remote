import React from 'React';
import {Component,StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native'; 

export default class Panel extends React.Component{
    constructor(props){
        super(props);

        this.icons = {     //Step 2
            'up'    : require('./images/up-arrow.png'),
            'down'  : require('./images/down-arrow.png')
        };

        this.state = {       //Step 3
            title       : props.title,
            expanded    : props.expanded || false
        };
    }

    toggle(){
        this.setState({expanded: !this.state.expanded});
        console.log("Toggle: ", this.state);
    }

    showContents(){
        if(this.state.expanded){
            return (
                <View style={styles.body} hide={true}>
                    {this.props.children}
                </View>
            )
        } else {
            return null;
        }
    }
    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];   //Step 4
        }

        //Step 5
        return ( 
            <View style={styles.container} >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <TouchableHighlight 
                        style={styles.button} 
                        onPress={this.toggle.bind(this)}
                        underlayColor="#f1f1f1">
                        <Image
                            style={styles.buttonImage}
                            source={icon}
                        ></Image>
                    </TouchableHighlight>
                </View>
                
                {this.showContents()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container   : {
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button      : {

    },
    buttonImage : {
        width   : 30,
        height  : 25
    },
    body        : {
        padding     : 10,
        paddingTop  : 0
    }
});