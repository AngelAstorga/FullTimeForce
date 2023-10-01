import './App.css';
import './variables.css';
import React from 'react';
import { Octokit } from 'octokit';
import {Header} from './components/Header';
import { ListCommits } from './components/ListCommits';
import { ResumeOptions } from './components/ResumeOptions';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      testUser:"airbnb",
      testRepo:"lottie-android",
      currentRepo:"",
      listCommits:[],
      lastPageRepo:0,
      firstPageRepo:0,
      commitsCurrentPage:0,
      owner:"",
      repositoryName:"",
      totalCommits:0,
      branches:[],
      lastPageBranches:0,
      firstPageBranches:0,
      dateGroups:[],
    }
  }
  getBranches= async()=>{
    const octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_API
    });
    
      // const responseBranches = await octokit.request("GET /repos/"+process.env.REACT_APP_REPO_USER+"/"+process.env.REACT_APP_REPO_NAME+"/branches", {
      //   owner: 'OWNER',
      //   repo: 'REPO',
      //   headers: {
      //     'X-GitHub-Api-Version': '2022-11-28'
      //   }
      // });
      const responseBranches = await octokit.request("GET /repos/"+this.state.testUser+"/"+this.state.testRepo+"/branches", {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      console.log(responseBranches);

      this.setState(
        {
          ...this.state,
          branches:responseBranches.data
        }
      );
  }


  getGlobalData= async()=>{
    var commitsRestPages=0;
    var commitsLastPage=0;
    const octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_API
    });

      const responseCommits = await octokit.request("GET /repos/"+this.state.testUser+"/"+this.state.testRepo+"/commits", {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      // const responseCommits = await octokit.request("GET /repos/"+process.env.REACT_APP_REPO_USER+"/"+process.env.REACT_APP_REPO_NAME+"/commits", {
      //   owner: 'OWNER',
      //   repo: 'REPO',
      //   headers: {
      //     'X-GitHub-Api-Version': '2022-11-28'
      //   }
      // });



      //here we are checking if there are more than 30 commits and getting the last page number.
      if(responseCommits.headers.link.includes(",") && responseCommits.headers.link.includes('rel="last"') ){

        var lastPage= responseCommits.headers.link.split(",");
        lastPage = lastPage[1];
        lastPage= /page=[0-9]*/.exec(lastPage).toString();

        lastPage= lastPage.split("=");
        lastPage= lastPage[1];
        commitsRestPages= 30 * (parseInt(lastPage) - 1);


        const octokit2 = new Octokit({
          auth: process.env.REACT_APP_GITHUB_API
        });
        const lastPageCommits = await octokit2.request("GET /repos/"+this.state.testUser+"/"+this.state.testRepo+"/commits?page="+lastPage, {
          owner: 'OWNER',
          repo: 'REPO',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        
        commitsLastPage= lastPageCommits.data.length;

      }else{
        commitsRestPages=0;
      }
      this.setState(
        {
          ...this.state,
          listCommits:responseCommits.data,
          totalCommits: commitsLastPage + commitsRestPages,
      
        }
      );

  }

  calculateTotalCommits=()=>{

  }

  componentDidMount(){
    this.getGlobalData();
    this.getBranches();
  }


  render(){
    return (
      <div className="App">
        <Header/>
        <ResumeOptions totalCommits={this.state.totalCommits} />
        {this.state.listCommits.length >0 && <ListCommits listCommits={this.state.listCommits}/>}
        
      </div>
    );
  }

}

export default App;
