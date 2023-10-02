import React from "react";
import "./styles/resumeOption.css";
import { Button } from "./Button";
import { DropdownButton } from "./DropdownButton";
import { Octokit } from "octokit";

class ResumeOptions extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    getNewer=()=>{

    }

    getOlderCommits=async()=>{
            const octokit = new Octokit({
              auth: process.env.REACT_APP_GITHUB_API
            });
        
              await octokit.request("GET /repos/"+this.props.testUser+"/"+this.props.testRepo+"/commits?page="+this.props.lastPageRepo, {
                owner: 'OWNER',
                repo: 'REPO',
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              }).then((response)=>{
                  this.props.updateListCommits(response.data);
              });

             

        }
    componentDidMount(){
    }


    render(){
        return(
            <div className="ResumeOptionsContainer">
                <div className="ResumeOptionsWrapper">
                    <div className="ResumeOptions__header">
                        <div className="ResumeOptions__totalCommitsWrapper">
                            <span className="ResumeOptions__totalCommitsDescription">Total Commits :</span>
                            <span className="ResumeOptions__totalCommits">{this.props.totalCommits}</span>
                        </div>
                        <div className="ResumeOptions__brancheList">
                            <DropdownButton
                                text="Branch Name"
                            />
                        </div>
                    </div>
                    <div className="ResumeOptions__buttons">
                        <Button text="Newer" left="true" active="true" />
                        <Button handleOnclick={this.getOlderCommits} text="Older" left="false" active="false"/>
                    </div>
                </div>
            </div>
        );
    }
}
export {ResumeOptions};