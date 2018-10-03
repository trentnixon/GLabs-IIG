import React, { Component } from 'react';
export default  class Count extends Component {

  render() {
    
      if(this.props.include === true){
        return(
            <div className="count">
                  {this.props.int+1}
            </div>
        )
      }
      else{
        return(
            <div className="displayNone"></div>
        )
      } 
  }
}