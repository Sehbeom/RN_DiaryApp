import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View, Platform, TextInput,Dimensions, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

var wwidth = Dimensions.get('window').width;
var wheight = Dimensions.get('window').height;

var tdy = new Date();
var tdystring = tdy.getFullYear()+'-'+(tdy.getMonth()+1)+'-'+tdy.getDate();

export default class WritePage extends React.Component {

  constructor(props){
    super(props);
    this.state={
      selectedDate : new Date(),
      titleinput : '',
      contentinput : '',
      newPost : {        
        title : '',
        content : '',
        date : '',
      }
    }
  }


  _setDate = (event,date) => {
    const currentDate = date;
    this.setState({
      selectedDate : currentDate
    })
  }

  _onChangeTitleInput = (title) => {
    this.setState({
      titleinput : title,
    })
  }

  _onChangeContentInput = (content) => {
    this.setState({
      contentinput : content,
    })
  }

  _onEndEditTitle = () =>{
    this.setState({
      titleinput:this.state.titleinput,
    })
  }
  
  _onEndEditContent = () =>{
    this.setState({
      contentinput:this.state.contentinput,
    })
  }

  _setNewPost = () =>{
    if(this.state.titleinput===''){
      alert("제목을 작성해주세요");
    }
    else if(this.state.contentinput===''){
      alert("내용을 작성해주세요");
    }
    else{
      const dateinfo = this.state.selectedDate;
      var datestring = dateinfo.getFullYear() + '-' + (dateinfo.getMonth() + 1) + '-' + dateinfo.getDate();
      const enteredPost = {
        date : datestring,
        title : this.state.titleinput,
        content : this.state.contentinput, 
      }
      this.setState({
        newPost : enteredPost,
      });
      // console.log(this.state.newPost);
      this.props.navigation.navigate('Main',{newPost : this.state.newPost})
    }
  }


  render(){
    // const { date } = this.state.selectedDate;

  return (
    <View style={styles.container}>
        <DateTimePicker
          value={this.state.selectedDate}
          mode='date'
          display='default'
          onChange = {(event,date) => this._setDate(event,date)}
        />
        <DateTimePicker
          value={new Date()}
          mode='time'
          display='default'
          // onChange = {(date) => { this.setState({date : date}) }}
        />

        <View style={styles.inputbox}>
          <View >
            <TextInput 
              style={styles.titleinput} 
              placeholder='제목'
              onChangeText = {(title)=>this._onChangeTitleInput(title)}
              onEndEditing = {()=>this._onEndEditTitle()}
              />
          </View>
          <View style={styles.contentbox}>
            <TextInput 
              style={styles.contentinput} 
              placeholder='내용'
              multiline={true}
              blurOnSubmit={true}
              onChangeText = {(content)=>this._onChangeContentInput(content)}
              onEndEditing = {()=>this._onEndEditContent()}
              />
          </View>
        </View>

        <TouchableOpacity 
        activeOpacity={0.7} 
        style={styles.btnstyle}
        onPress={()=>{
          this._setNewPost()
          }}>
          <View style={styles.completebtn}>
            <Text style={styles.btntext}>추가하기</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  pickerbox:{
    
  },
  inputbox:{
    alignItems:'center',
    marginTop:wheight*0.03,
  },

  titleinput:{
    borderBottomWidth:0.5,
    width:wwidth*0.8,
    height:wheight*0.05,
    fontSize:wheight*0.03,
  },
  contentbox:{
    borderWidth:0.5,    
    height:wheight*0.1,
    marginTop:wheight*0.03,
  },
  contentinput:{
    width:wwidth*0.8,
    fontSize:wheight*0.02,
  },

  btnstyle:{
    marginTop:wheight*0.4,
    alignItems:'center',
    justifyContent:'center',
  },
  completebtn:{
    width:wwidth*0.8,
    height:wheight*0.07,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'skyblue',
    borderRadius:20,
  },

  btntext:{
    fontSize:wwidth*0.05,
    fontWeight:'bold',
    color:'white',
  }
  
});
