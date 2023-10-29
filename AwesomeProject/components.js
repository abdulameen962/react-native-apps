import PropTypes from 'prop-types'
import React, { Component } from 'react';
import styles from './styles'
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, Switch } from 'react-native';


class CountEvenNumbers extends React.Component{
    static propTypes = {
        count: PropTypes.number.isRequired
    }

    shouldComponentUpdate(nextProps){
      return !(nextProps.count % 2)
    }
  
  
    render() {
      return (
        <Text style={[styles.count]}>{this.props.count}</Text>
      )
    }
  }
  
  
class Counter extends Component{
    constructor(){
      super()
      this.state = {
        count: 0,
      }
    }
  
    incrementCount = () => {
      this.setState(
        prevState => ({
          count: prevState.count + 1,
        })
      )
    }
  
    componentDidMount(){
      this.interval = setInterval(this.incrementCount,1000)
    }
  
    
    componentWillUnmount(){
      clearInterval(this.interval)
    }
  
    render(){
      return (
        <View>
          <CountEvenNumbers count={this.state.count}/>
        </View>
      )
    }
  }

//   CountEvenNumbers.propTypes = {
//     count: PropTypes.number.isRequired
// }

export default Counter

// import MapView from 'react-native-maps';

// import * as Location from 'expo-location';

// import * as Permissions from 'expo-permissions';

// import { DeviceMotion } from 'expo-sensors';

// todo app
// const Todo = props => (
//   <View style={[styles.liststyle,styles.listContainer,styles.flexer]}> 
//       {/* <input type="checkbox" checked={props.todo.checked} onChange={props.onCheck} /> */}
//       <Switch value={props.todo.checked} onValueChange={props.onCheck}/>
//       <Button onPress={props.onDelete} title='delete task'/> 
//       <Text>{props.todo.text}</Text> 
//    </View>
// )

// let id = 0

// export default class App extends Component {
//   constructor() {
//       super();
//       this.state = {
//           todos: [

//           ],
//       }
//   }
//   addTodo() {
//       id++;
//       const text = `Todo number ${id}`
//       this.setState({
//           todos: [...this.state.todos,{text:text,id:id++,checked:false}],
//       })
//   }

//   removeTodo(id){
//       this.setState({
//           todos: this.state.todos.filter(todo => todo.id !== id)
//       })
//   }
  
//   toggleTodo(id){
//       this.setState({
//           todos: this.state.todos.map(todo => {
//               if (todo.id !== id) {
//                   return todo
//               }
//               todo.checked = !todo.checked
//               return todo
//           })
//       })
//   }

//   blockJS(){
//     console.log('blocking!');
//     const done = Date.now() + 5000
//     while (Date.now() < done) {
      
//     }
//     console.log('unblocked');
//   }
//   render(){
//     return (
//       <ScrollView contentContainerStyle={styles.container}>
//             <View style={[styles.flexer]}>
//               <Text>Todo count: {this.state.todos.length}</Text>
//               <Text>Ubchecked todo count: {this.state.todos.filter(todo => !todo.checked).length} </Text>
//               <Button onPress={() => this.addTodo()} title='Add todo'/>
//             </View>
//             <View style={styles.listContainer}>
//                 {this.state.todos.map(todo =>
//                     <Todo 
//                         key={todo + id++}
//                         onDelete={() => this.removeTodo(todo.id)}
//                         onCheck = {() => this.toggleTodo(todo.id)}
//                         todo={todo}
                        
//                     />
//                 )}
//             </View>
//         <StatusBar style="auto" />
//       </ScrollView>
      
//     );
//   }
//   componentDidMount(){
    
//   }
// }