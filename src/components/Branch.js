import React from "react";
import "./styles/branch.css";


class Branch extends React.component{
    constructor(props){
        super(props);
        this.state={
            owner:"",
            nameRepository:""
        }
    }
    render(){
        return(
            <div className="BranchContainer">
                <div className="BranchWrapper">
                    <div className="Branch__OwnerRepository">
                        <span >{this.state.owner}</span>
                        <span>/</span>
                        <span>{this.state.nameRepository}</span>
                    </div>
                    <img src="" alt="" />
                </div>
            </div>
        );
    }
}
export {Branch};