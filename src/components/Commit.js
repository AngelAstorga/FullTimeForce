import React from "react";
import "./styles/commit.css";
import imgCopy from "./images/copy.png";

class Commit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            flagCopy:false
        }
    }

    copy=()=>{

        window.setTimeout(()=>{
            this.setState({
                flagCopy:false,
            })
        },500);

        navigator.clipboard.writeText(this.props.shaCode);
        this.setState({
            flagCopy:true
        });

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
                        <img onClick={this.copy}  className="Commit__copyImg" src={imgCopy} alt="" />
                        {this.state.flagCopy && 
                         <span className="Commit__modalCopy">
                            copied
                        </span>}
                        <span className="Commit__shaCode">{this.props.shaCode.slice(0,7)}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export {Commit};