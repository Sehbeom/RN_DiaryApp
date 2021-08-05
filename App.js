import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MainPage from './components/mainpage';
import WritePage from './components/writepage';
import DetailPage from './components/detailpage';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const Placeholder = () =>{
  return (<View style={{flex:1}} />)
}

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={

    }
  }

  // WritePageNavi = ({navigation}) => {
  //   return(
  //     <Stack.Navigator mode="modal" headerMode="none">
  //       <Stack.Screen name="WritePage" component={WritePage} />
  //     </Stack.Navigator>
  //   )
  // }

  BottomTabNavi = ({navigation}) =>{
    return(
    <Tab.Navigator
      screenOptions = {({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if(route.name === 'Main'){
            return <FontAwesome name="calendar" size={24} color={color} /> 
          }
          else if(route.name === 'Placeholder'){
            return <FontAwesome name="pencil" size={24} color={color} />
          }
          else if(route.name === 'DetailPage'){
            return <MaterialCommunityIcons name="book-open-page-variant" size={24} color={color} />
          }
        }      
      })}
      
      tabBarOptions = {{
        // activeTintColor:'blue',
        showLabel:false,
        tabStyle:{borderLeftWidth:0.5,}
      }}
      >
        <Tab.Screen name="Main" component={MainPage} />  
        {/* <Tab.Screen name="DetailPage" component={DetailPage} /> */}
        <Tab.Screen 
        name="Placeholder" 
        component={Placeholder}
        listeners={({navigation}) => ({
          tabPress:(e) => {
            e.preventDefault();
            navigation.navigate('WritePage');
          }
        })} />
      </Tab.Navigator>
    )
  }


  render(){
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen options={{headerShown:false}} name="BottomTab" component={this.BottomTabNavi} />
        <RootStack.Screen options={{headerBackTitleVisible:false}} name="WritePage" component={WritePage} />
        <RootStack.Screen options={{headerBackTitleVisible:false}} name="DetailPage" component={DetailPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
