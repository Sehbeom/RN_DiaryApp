import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';

var wwidth = Dimensions.get('window').width;
var wheight = Dimensions.get('window').height;

export default class DetailPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.liststyle}>
          
          <ScrollView>
            <FlatList
              data={this.props.route.params.contents}
              renderItem={({ item, index }) => {
                // if(item.date===this.state.selectedDate){
                return (
                  <View>
                    <View>
                      <Text style={styles.titlestyle}>{item.title}</Text>
                    </View>
                    <View>
                      <Text>{item.content}</Text>
                    </View>
                  </View>
                )
                // }
              }}
              keyExtractor={(item, index) => { return `${index}` }} />
          </ScrollView>
 

        </View>
        <TouchableOpacity 
          style={styles.btnbox} 
          activeOpacity={0.7}
          onPress={()=>{this.props.navigation.navigate('WritePage')}}>
            <View style={styles.writebtn}>
                <FontAwesome name="plus" size={24} color="black" />
            </View>
        </TouchableOpacity>


        <StatusBar style="auto" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  liststyle:{
    height:wheight*0.9,
    //zIndex:2,
  },
  titlestyle:{
    fontSize:40,
  },

  btnbox:{    
    marginTop:wheight*0.7,
    marginLeft:wwidth*0.75,
    position:'absolute',
  },

  writebtn: {
    backgroundColor: 'skyblue',
    borderRadius: 100,
    alignItems:'center',
    justifyContent:'center',
    width: wheight*0.07,
    height: wheight*0.07,
    //zIndex:100,
  }
});
