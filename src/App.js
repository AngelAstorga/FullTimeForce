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
      testUser:"AngelAstorga",
      testRepo:"fulltimeforce",
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
      flagUpdate:false,
      flagCommits:false,
    }
  }

  // updateListCommits=(listCommits)=>{
  //   this.setState({
  //     listCommits: listCommits
  //   });
  // }
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

  getNewerCommits=async()=>{
    const octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_API
    });

      const responseNewerCommits = await octokit.request("GET /repos/"+this.state.testUser+"/"+this.state.testRepo+"/commits?page=0", {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      this.setState({
        ...this.state,
        listCommits:responseNewerCommits.data,
      });
  }

  getGlobalData= async()=>{
    var commitsRestPages=0;
    var lastPageIndex=0;
    let responseCommits="";
    let lastPageCommits="";

    const octokit = new Octokit({
      auth: process.env.REACT_APP_GITHUB_API
    });

      await octokit.request("GET /repos/"+this.state.testUser+"/"+this.state.testRepo+"/commits", {
        owner: 'OWNER',
        repo: 'REPO',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }).then(async(result)=>{


        responseCommits= result;
   

        if(responseCommits.headers.link !== undefined ){

          lastPageIndex= responseCommits.headers.link.split(",");

          lastPageIndex = lastPageIndex[1];
          lastPageIndex= /page=[0-9]*/.exec(lastPageIndex).toString();

          lastPageIndex= lastPageIndex.split("=");
          lastPageIndex= lastPageIndex[1];
          // console.log("GETTING LAST PAGE SPLIT"+lastPage);

          const octokit2 = new Octokit({
            auth: process.env.REACT_APP_GITHUB_API
          });
          lastPageCommits = await octokit2.request("GET /repos/"+this.state.testUser+"/"+this.state.testRepo+"/commits?page="+lastPageIndex, {
            owner: 'OWNER',
            repo: 'REPO',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });

    
        let firstPage=0;
        let commitsCurrentPage=0;


          commitsCurrentPage=responseCommits.data.length;

          commitsRestPages = (30 * (parseInt(lastPageIndex) - 1) + lastPageCommits.data.length);


          this.setState({
            ...this.state,
            flagCommits:true,
            listCommits: responseCommits.data,
            totalCommits: commitsCurrentPage + commitsRestPages,
            lastPageRepo: lastPageIndex,
            firstPageRepo:firstPage,
          });
           
        }else if(responseCommits.data.length >0){
          this.setState({
            ...this.state,
            flagCommits:true,
            listCommits: responseCommits.data,
            totalCommits: responseCommits.data.length,
          });


        }else{
          this.setState({
            flagCommits: false,
            totalCommits:0,
            listCommits:[],
          });
        }




      });

 




      // const responseCommits = await octokit.request("GET /repos/"+process.env.REACT_APP_REPO_USER+"/"+process.env.REACT_APP_REPO_NAME+"/commits", {
      //   owner: 'OWNER',
      //   repo: 'REPO',
      //   headers: {
      //     'X-GitHub-Api-Version': '2022-11-28'
      //   }
      // });

  }

  updateListCommits=(listCommits)=>{
    this.setState({
      listCommits:listCommits,
    });
  }

  componentDidMount(){
    this.getGlobalData();
    // this.getBranches();
  }


  render(){
    return (
      <div className="App">
        <Header/>
        <ResumeOptions 
        updateListCommits={this.updateListCommits}
        totalCommits={this.state.totalCommits} 
        lastPageRepo={this.state.lastPageRepo}
        testUser={this.state.testUser}
        testRepo={this.state.testRepo}
        />
          <ListCommits  
            listCommits={this.state.listCommits} 
            flagCommits={this.state.flagCommits}
            />
        
      </div>
    );
  }

}

export default App;
