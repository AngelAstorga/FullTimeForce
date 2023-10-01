import React from "react";
import { Octokit } from "octokit";
import "./styles/listCommits.css";
import {Commit} from "./Commit";

class ListCommits extends React.Component{
    constructor(props){
      super(props);
      this.state={
        response:"default",
      }  
    }

    getCommits=async ()=>{

        console.log(process.env.REACT_APP_GITHUB_API);
        console.log(process.env.REACT_APP_REPO_NAME);
        console.log(process.env.REACT_APP_REPO_USER);
        const octokit = new Octokit({
            auth: process.env.REACT_APP_GITHUB_API
          });
          
            const responseGitHub = await octokit.request("GET /repos/"+process.env.REACT_APP_REPO_USER+"/"+process.env.REACT_APP_REPO_NAME+"/commits", {
              owner: 'OWNER',
              repo: 'REPO',
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            });
          
          console.log(responseGitHub.data);
          this.setState({
            response: responseGitHub.data
          }); 
    }

    componentDidMount=()=>{
        this.getCommits();
    }

    render(){
        return(
            <div className="ListCommitsContainer">
                <div className="ListCommitsWrapper">
                    <div className="ListCommits__listDateGroup">
                        <div className="ListCommits__listDateGroupHeader">
                            <span className="ListCommits__listDateGroupTitle"> 01 October 2023</span>
                        </div>
                        <div className="ListCommits__listDateGroupBody">
                        <Commit
                            description="Description of commit"
                            commiterName="Angel Astorga"
                            commiterImg=""
                            commitTime="23:00:02"
                            shaCode="s8s54f7"
                        />
                        <Commit
                            description="Description of commit"
                            commiterName="Angel Astorga"
                            commiterImg=""
                            commitTime="23:00:02"
                            shaCode="s8s54f7"
                        />
                        <Commit
                            description="Description of commit"
                            commiterName="Angel Astorga"
                            commiterImg=""
                            commitTime="23:00:02"
                            shaCode="s8s54f7"
                        />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export {ListCommits};