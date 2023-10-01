import React from "react";
import './styles/header.css';
import imgConfig from "./images/config.png";

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            owner: "Angel Astorga",
            nameRepository: "FulltimeForce"
        }
    }
    render(){
        return(
            <div className="HeaderContainer">
                <div className="HeaderWrapper">
                    <div className="Header__container">
                        <div className="Header__ownerRepository">
                            <span className="Header__owner" >{this.state.owner}</span>
                            <span className="Header__slash">/</span>
                            <span className="Header__nameRepository">{this.state.nameRepository}</span>
                        </div>
                        <img className="Header__imgConfig" src={imgConfig} alt="" />
                    </div>

                </div>
            </div>
        );
    }
}
export {Header};