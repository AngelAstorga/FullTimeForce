import React from "react";
import "./styles/resumeOption.css";
import { Button } from "./Button";
import { DropdownButton } from "./DropdownButton";

class ResumeOptions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            totalCommits: 0
        }
    }
    render(){
        return(
            <div className="ResumeOptionsContainer">
                <div className="ResumeOptionsWrapper">
                    <div className="ResumeOptions__header">
                        <div className="ResumeOptions__totalCommitsWrapper">
                            <span className="ResumeOptions__totalCommitsDescription">Total Commits :</span>
                            <span className="ResumeOptions__totalCommits">{this.state.totalCommits}</span>
                        </div>
                        <div className="ResumeOptions__brancheList">
                            <DropdownButton
                                text="Branch Name"
                            />
                        </div>
                    </div>
                    <div className="ResumeOptions__buttons">
                        <Button text="Newer" left="true" active="true" />
                        <Button text="Older" left="false" active="false"/>
                    </div>
                </div>
            </div>
        );
    }
}
export {ResumeOptions};