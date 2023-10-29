import React from "react";
import { render } from "react-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

// const styles = {
//     fontFamily: "sans-serif",
//     textAlign: "center"
// };

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         };
//         this.increaseCount = () => {
//             this.setState((prevState) => ({ count: prevState.count + 1 }));
//             this.setState((prevState) => ({ count: prevState.count + 1 }));
//             console.log(this.state.count);
//         };
//     }

//     render() {
//         return (       
//         <div style={styles}>
//           <h2> {this.state.count} </h2>
//           <button onClick={this.increaseCount}> Click here </button>
//         </div>
//         );
//     }
// }

const Todo = props => (
    <li> 
        <input type="checkbox" checked={props.todo.checked} onChange={props.onCheck} />
        <button onClick={props.onDelete}> Delete </button>   
        <span>{props.todo.text}</span> 
     </li>
)

let id = 0

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            todos: [

            ],
        }
    }
    addTodo() {
        const text = prompt("Todo text please")
        this.setState({
            todos: [...this.state.todos,{text:text,id:id++,checked:false}],
        })
    }

    removeTodo(id){
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        })
    }
    
    toggleTodo(id){
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) {
                    return todo
                }
                todo.checked = !todo.checked
                return todo
                // return {
                //     id: todo.id,
                //     text: todo.text,
                //     checked: !todo.checked
                // }
            })
        })
    }

    render() {
        return (
            <div>
                <div>Todo count: {this.state.todos.length}</div>
                <div>Ubchecked todo count: {this.state.todos.filter(todo => !todo.checked).length} </div>
                <button onClick={() => this.addTodo()}> Add todo </button>
                <ul>
                    {this.state.todos.map(todo =>
                        <Todo 
                            key={todo + id++}
                            onDelete={() => this.removeTodo(todo.id)}
                            onCheck = {() => this.toggleTodo(todo.id)}
                            todo={todo}
                            
                        />
                    )}
                </ul>
            </div>
        )
    }
}

render( < App/>, document.getElementById("root"));


        // If you want to start measuring performance in your app, pass a function
        // to log results (for example: reportWebVitals(console.log))
        // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
        reportWebVitals();