import React from "react";
import { Octokit } from "octokit";

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
            <div>
                {this.state.response.length}
            </div>
        );
    }
}
export {ListCommits};