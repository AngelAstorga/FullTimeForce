import React from "react";
import "./styles/dropdownButton.css";
import imgBranch from "./images/branch.png";

class DropdownButton extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="DropdownButtonContainer">
                <div className="DropdownButtonWrapper">

                    <button className="DropdownButton">
                        <img className="DropdownButton__image" src={imgBranch} alt="" />
                        {this.props.text}
                        <span className="DropdownButton__arrow">▼</span>
                    </button>
                </div>
            </div>

        );
    }
}
export {DropdownButton};