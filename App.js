import React from "react";
import { StyleSheet,Text,TextInput,View,Image,FlatList ,KeyboardAvoidingView,Platform,Modal, Button,TouchableOpacity, SafeAreaView, ScrollView,} from "react-native";
import { useState,useEffect } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import uuid from "react-native-uuid";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";


function App(){

  const [todo,setTodo] = useState();
  const [todoItems,setTodoItems] = useState([]);
  const [duplicate,setDuplicate]=useState([]);


useEffect(() => {
  setDuplicate([...todoItems]);
  }, [todoItems])
    

const completed=()=>{
  const result = todoItems.filter((item)=>item.isCompleted===true)
  setDuplicate(result)
}

const active=()=>{
  const result = todoItems.filter((item)=>item.isCompleted===false)
  setDuplicate(result)
}

const all =() =>{
  setDuplicate(todoItems);
}


 function addTodo(){

  setTodoItems((pretodo) => {
   
    return [
      {
        id: uuid.v1(),
        task: todo,
        isCompleted: false,
      },
      ...pretodo,
    ];
  });
  setTodo('')

}

const deleteTodo = (id) =>{
let newTods = [...todoItems];
newTods.filter((data, index)=>{
  if(data.id === id){
    newTods.splice(index, 1)
  }
})
setTodoItems([...newTods]);
}

const completeTodo = (id) => {
let newTods = [...todoItems];
newTods.find(data=>{
  if(data.id === id )
   data.isCompleted = !data.isCompleted
})
setTodoItems([...newTods])
}



  return(
  
    <> 
    <SafeAreaView style={styles.container}>
    <View style={styles.headSec}>
        <Text style={styles.head}>The Todo App </Text>
        </View>
        <View style={styles.buttonDiv}>
        <TouchableOpacity onPress={()=>all()} style={styles.button}><Text style={styles.btnName}>All</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>active()} style={styles.button}><Text style={styles.btnName}>Active</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>completed()} style={styles.button}><Text style={styles.btnName}>Completed</Text></TouchableOpacity>
        </View>
     
{duplicate && <FlatList
        style = {styles.todoDiv}
          data = {duplicate}  // rendering value
        
          renderItem = {({item})=> (
           
            <View style={styles.todos} key={item.id}>
            <View>
             <Icon onPress={()=>completeTodo(item.id)} name={item.isCompleted ? "checkcircle" : "checkcircleo"} size={25} style={styles.checkbox} />
              </View>
           <Text key={item.id} style={[styles.todo, {textDecorationLine:item.isCompleted ? "line-through" : "none"}]}>{item.task}</Text>
         <Icon name="delete" style={styles.deleteIcon}  onPress={()=>deleteTodo(item.id)} />
         </View>

  )}
          extraData = {duplicate} // when this changes, List rerenders
          keyExtractor={item => item.id}  //  --- Each Item has a Unique ID ---

          />}

      
      <View style={styles.inputDiv}>
        <TextInput style={styles.input} placeholder="Enter Todo" value={todo} onChangeText={todo => {
          setTodo(todo)}} />
        <Icon name="pluscircle" onPress={addTodo} style={styles.addTodo}  />
      </View>
      
      </SafeAreaView>
 
    </>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:'#dee2e3'
  },
  input:{
    backgroundColor:'white',
    marginBottom:100,
    height:50,
    width:300,
    borderRadius:10,
    shadowColor:'grey',
    shadowOffset:{width:-2, height:2},
    shadowRadius:10,
    shadowOpacity:0.8,
    fontSize:25,
    paddingLeft:10


  },
  inputDiv:{
    flexDirection:'row',
    justifyContent:'center',
  },
  
  head:{
    fontSize:40,
    fontWeight:'bold',
    marginTop:50,
    marginBottom:30,
    color:'green'
  },
  headSec:{
    borderRadius:100
  },
  todo:{
   fontSize:20,
   fontWeight:'bold',
  },
  deleteIcon:{
  fontSize:30,
  color:'red'
 },
 AddIcon:{
  fontSize:30,
  color:'green'
 },

addTodo:{
  fontSize:50,
  marginLeft:20,
  color:'green',
  shadowColor:'black',
  shadowOffset:{width:-2, height:2},
  shadowRadius:6,
  shadowOpacity:0.3,
},
todoDiv:{
  backgroundColor:'#dee2e3',
  flex:1,
  // justifyContent:'flex-start',
  // alignItems:'center',
  width:400,
  marginTop:50,
  marginBottom:10
},
todos:{
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
  backgroundColor:'white',
  height:50,
  width:350,
  borderRadius:10,
  shadowColor:'black',
  shadowOffset:{width:-2, height:2},
  shadowRadius:6,
  shadowOpacity:0.3,
  marginLeft:'auto',
  marginRight:'auto',
  marginTop:25
},
checkbox:{
  color:'green'
},
buttonDiv:{
  width:'100%',
  justifyContent:'space-around',
  flexDirection:"row",
  alignItems:'center',
  height:50
},
button:{
  backgroundColor:'green',
  flex:1,
  justifyContent:'space-around',
  alignItems:'center',
  height:50,
  width:100,
  borderWidth:2,
  borderColor:'black',
  marginLeft:5,
  marginRight:5,
  borderRadius:50,
},
btnName:{
  fontWeight:'bold',
  color:'white',
  fontSize:20,
  borderColor:'black'
}


  
})

export default App;