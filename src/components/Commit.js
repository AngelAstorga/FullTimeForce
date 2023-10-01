import React from "react";
import "./styles/commit.css";
import imgCopy from "./images/copy.png";

class Commit extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="CommitContainer">
                <div className="CommitWrapper">
                    <div className="Commit__description">
                        {this.props.description}
                    </div>
                    <div className="Commit__userContainer">
                        <img className="Commit__userImg" src={this.props.committerImg} alt="" />
                        <span className="Commit__commiterName">{this.props.committerName}</span>
                        <span className="Commit__commitTime">{this.props.commitTime} </span>
                    </div>
                    <div className="Commit__shaContainer">
                        <img className="Commit__copyImg" src={imgCopy} alt="" />
                        <span className="Commit__shaCode">{this.props.shaCode.slice(0,7)}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export {Commit};