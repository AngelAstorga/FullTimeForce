import React from "react";
import "./styles/listCommits.css";
import {Commit} from "./Commit";

class ListCommits extends React.Component{
    constructor(props){
      super(props);
      this.state={
        groupDates:[],
        flagGroup:false,
    }  
    }

    createGroups=()=>{
     
        var currentIndex=0;
        var groupDates= [];
        groupDates.push([]);


       var auxListCommits= this.props.listCommits.map((commit)=>{
           commit.commit.committer.realDate = new Date(commit.commit.committer.date);
        //    console.log(commit.commit.committer.realDate);
            let auxCommitDate= new Date(commit.commit.committer.date);
            auxCommitDate.setHours(0,0,0,0);
            commit.commit.committer.date = auxCommitDate;
            let newCommit= commit;
            return newCommit;
        });
        // console.log(auxListCommits);
        for(var i=0;i < auxListCommits.length ;i++){
            if(i===0){
                groupDates[currentIndex].push(auxListCommits[i]);
                
            }else{

                var oldDate = new Date(auxListCommits[i-1].commit.committer.date);
                var newDate = new Date(auxListCommits[i].commit.committer.date);

                if( ( oldDate - newDate) === 0){
                     groupDates[currentIndex].push(auxListCommits[i]);
                }else{
                    groupDates[currentIndex + 1]=[];
                    groupDates[currentIndex + 1].push(auxListCommits[i]);
                    currentIndex++;
                }
            }
                    }        
                                
            this.setState({
                groupDates: groupDates,
                flagGroup:true,
            });
    }

    componentDidMount(){
        
    }
  
    componentDidUpdate(prevState,prevProps){
        if(this.props.flagCommits && this.props.flagCommits && !this.state.flagGroup){
            console.log(" llegaron los datos");
            this.createGroups();
        }

    }

    render(){
        return(
            <div className="ListCommitsContainer">
                <div className="ListCommitsWrapper">
                {this.state.flagGroup && this.state.groupDates.map((commitGroup, index)=>{
                   let commitGroupTimeWrapper= commitGroup[0].commit.committer.date.toString();
                   commitGroupTimeWrapper= commitGroupTimeWrapper.split(" ");
                   commitGroupTimeWrapper= commitGroupTimeWrapper[0] +" "+commitGroupTimeWrapper[1]+" "+commitGroupTimeWrapper[2]+" "+commitGroupTimeWrapper[3];
                    return(
                        <div key={index} className="ListCommits__listDateGroup">
                            <div className="ListCommits__listDateGroupHeader">
                            <span className="ListCommits__listDateGroupTitle"> {commitGroupTimeWrapper}  </span>
                            </div>
                            <div className="ListCommits__listDateGroupBody">
                            {commitGroup.map((commit, index)=>{
                                let commitTimeWrapper= commit.commit.committer.realDate.toString();
                                commitTimeWrapper= commitTimeWrapper.split(" ");
                                commitTimeWrapper= commitTimeWrapper[4] +" "+commitTimeWrapper[5];
                                
                                return(   <Commit key={index+commit.sha}
                                    description={commit.commit.message}
                                    committerName= {commit.commit.author.name}
                                    committerImg= {commit.author.avatar_url}
                                    commitTime={commitTimeWrapper}
                                    shaCode={commit.sha}
                                    />
                                    )
                            })

                            }
                            
                        </div>
                        </div>
                    )
                    }) 
                }
                </div>
            </div>
    
        )}

}
export {ListCommits};