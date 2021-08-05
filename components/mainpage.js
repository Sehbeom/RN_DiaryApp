import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View,ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


var tdy = new Date();
var tdystring = tdy.getFullYear()+'-'+(tdy.getMonth()+1)+'-'+tdy.getDate();
var alldates = {};
var prevselectedDate = '';
var wwidth = Dimensions.get('window').width;
var wheight = Dimensions.get('window').height;

export default class MainPage extends React.Component {

  constructor(props){
    super(props);

    this.state={
      selectedDate: tdystring,
      Posts:[{
        title : '5월 30일에 쓴 글',
        content : '본문',
        date : '2021-05-30',
      },
      {
        title : '5월 29일에 쓴 글',
        content : '본문',
        date : '2021-05-29',
      },
      {
        title : '5월 16일에 쓴 글',
        content : '본문',
        date : '2021-05-16',
      },
      {
        title : '5월 18일에 쓴 글',
        content : '본문',
        date : '2021-05-18',
      },
      {
        title : '6월 4일에 쓴 글',
        content : '본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문본문 본문',
        date : '2021-06-04',
      },
      {
        title : '6월 4일에 쓴 글',
        content : 'ㅇㅇㅇㅇ',
        date : '2021-06-04',
      },
      {
        title : '6월 4일에 쓴 글',
        content : '???',
        date : '2021-06-04',
      }

      ],
      
    }
  }

  componentWillMount(){
    this._setMarkedDates(tdystring);

    // this._AddPosts();


    
    // console.log(this.props.route.params.newPost);

    // if(this.props.route.params.newPost !== null){
    //   var newPost = [this.props.route.params.newPost];
    //   const AddPost = this.state.Posts.concat(newPost);
    //   this.setState({
    //     Posts : AddPost,
    //   })
    // }
    
  }

  _AddPosts = () =>{
    if (this.props.newPost !== null) {
      var newPost = [this.props.newPost];
      const AddPost = this.state.Posts.concat(newPost);
      this.setState({
        Posts: AddPost,
      })
    }
  }

  _returnContents = (selectedDT) =>{
    var contents=[];
    for(let i=0;i<this.state.Posts.length;i++){
      if(selectedDT === this.state.Posts[i].date){
        contents.push(this.state.Posts[i]);
      }
    }

    return contents;
  }

  _setMarkedDates = (selectedDT) =>{
    if(prevselectedDate===selectedDT){
      alldates[prevselectedDate] = {selected:true};
      var contents=this._returnContents(selectedDT);
      this.props.navigation.navigate('DetailPage',{contents : contents});
    }

    else{
      alldates[selectedDT] = {selected:true};
      alldates[prevselectedDate] = {selected:false};
    }

    for(let i=0;i<this.state.Posts.length;i++){
      if(selectedDT===this.state.Posts[i].date){
        alldates[this.state.Posts[i].date]={marked:true, selected:true};
      }

      else{
        alldates[this.state.Posts[i].date]={marked:true};
      }
    }

    prevselectedDate = selectedDT;
    console.log(alldates)
  }

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.calendarstyle}>
        <Calendar 
          onDayPress={(day) => {
            this.setState({
              selectedDate : day.dateString
            })
            this._setMarkedDates(day.dateString);}}
          markedDates={alldates}
          enableSwipeMonths={true}
          />
        <ScrollView>
          <FlatList
            data = {this.state.Posts.filter(data => {return data.date === this.state.selectedDate})}
            renderItem = {({item,index}) => {
              // if(item.date===this.state.selectedDate){
                return(
                  <TouchableOpacity
                    onPress = {() => {
                      var contents = this._returnContents(this.state.selectedDate);
                      this.props.navigation.navigate('DetailPage',{contents:contents})}}>
                    <View style={styles.textbox}>
                      <View style={styles.titlebox}>
                        <Text style={styles.titlestyle}>{item.title}</Text>
                      </View>
                      <View style={styles.contentbox}>
                        <Text style={styles.contentstyle}>{item.content}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              // }
            }} 
            keyExtractor = {(item, index) => {return `${index}`}} />
        </ScrollView>
      </View>
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
  calendarstyle:{
    marginTop:100,
  },
  textbox:{
    marginTop:wheight*0.05,
    alignItems:'center',
  },
  titlebox:{
    width:wwidth*0.8,
    borderBottomWidth:0.5,
    alignItems:'center',
  },
  titlestyle:{
    fontWeight:'bold',
    fontSize:wheight*0.03,
  },

  contentbox:{
    marginTop:wheight*0.02,
    width:wwidth*0.8,
  },
  contentstyle:{
    fontSize:wheight*0.02,
  }
});
