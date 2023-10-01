import React from "react";
import "./styles/button.css";

class Button extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        var button=document.getElementsByClassName("ButtonContainer");
        console.log(this.props.active);
        if(this.props.active === "true" &&  this.props.left === "true"){
            console.log("it's true");
            button.item(0).classList.add("ButtonContainer--active");
        }else if(this.props.active === "true" &&  this.props.left === "false"){
            console.log("it's false");
            button.item(1).classList.add("ButtonContainer--active");
        }
    }
    render(){
        return(
            <button className= {this.props.left === "true" ? "ButtonContainer ButtonContainer--left":"ButtonContainer ButtonContainer--right"}>
                {this.props.text}
            </button>
        );
    }
}
export {Button};