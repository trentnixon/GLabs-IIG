import React, { Component } from 'react';
import TheGrid from "./js/GridItem";


/**
 * 
 * Set UP Requirements
 * 
 * 1. include in package.json
 * 
    "react-swipeable-views": "^0.12.14",
    "react-tooltip": "^3.6.1",
    "react-slick": "^0.23.1"
 * 
 * 2. Link in Actions.js
 * 3. Hook in teh Application Reducer
 * 4. Hook in the Application SCSS File to the Main.scss File
 * 
 * 
 * 
 * Include this Component to add a Filter
 * 
 *  import CategorySelector from "./js/Category-Selector";
 *  <CategorySelector {... this.props} />
 */

let delay=0, SelectedCat=false, FilteredList=[];
export default  class Wall extends Component {
  componentWillMount(){} 

  CreateFilteredList(filter, list){
    let ReturnFilter=[]
    if(filter === 'false'){ return list} else
    {
      // eslint-disable-next-line
      list.map((item,i)=>{
          if(item.category.toLowerCase().replace(/\s/g, '') === filter){ ReturnFilter.push(item) }
      }) 
      return ReturnFilter;
    }
  }
  render() {
  
    SelectedCat = this.props.APP.DisplayCategory;
    FilteredList = this.CreateFilteredList(this.props.APP.DisplayCategory,this.props.APP.APPLICATION.Grid );
 
    delay=0;
    return(
      <div className="container TheGrid"> 
           
        <div className="row">
              {
                // eslint-disable-next-line
                FilteredList.map((Item,i)=>{
                  //console.log(Item.category.toLowerCase().replace(/\s/g, ''), SelectedCat)
                  if(Item.category.toLowerCase().replace(/\s/g, '') === SelectedCat || SelectedCat === 'false'){
                    delay = delay+100
                      return( 
                            <TheGrid   
                                key={i}
                                FilteredList={FilteredList}
                                Item={Item}
                                count={i}
                                {... this.props} 
                                delay={delay}
                            /> 
                      )
                  } 
                })
              }
        </div>
      </div>
    )
  }
}