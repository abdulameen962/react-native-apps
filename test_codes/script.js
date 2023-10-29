class MySet extends Set {
    constructor(arr) {
        super(arr)
        this.original = arr
    }
    add(val) {
        super.add(val)
        console.log(`Added ${val} to the set`)
    }
    toArray() {
        return Array.from(this)
    }
    reset() {
        return new MySet(this.original)
    }
}

activity = new MySet([1, 2, 3, 4, 5])
activity.add(8)
console.log(activity.toArray())
console.log(activity.reset())


import React from "react";
import { render } from "react-dom";
// import Hello from "./Hello";

// import App from "./App";
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const App = (props) => ( <
    div style = { styles } >
    <
    h2 > { props.count } < /h2> < /
    div >
);

let count = 0;
setInterval(() => {
            render( < App count = { count++ }
                />, document.getElementById("root"));
            }, 1000);