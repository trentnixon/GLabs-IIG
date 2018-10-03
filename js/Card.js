import React from 'react';

// Dialog Components
import Stepper from "./stepper";


import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import Icon from '@material-ui/core/Icon';

// Application Settings
import {SetUIActive} from "../actions/actions";
import {GA} from "../../../../actions/ga";

function Transition(props) { 
  return <Grow direction="down" {...props} />;
}

export default class FullScreenDialog extends React.Component {
  state = { open: false, }; 

  componentWillMount(){}

  handleClickOpen = () => {
    SetUIActive(this.props.count)
    GA("Grid Item Opened", "Click",this.props.Item.Title)
    this.setState({ open: true });
  };
 
  handleClose = () => {
    this.setState({ open: false });
    GA("Grid Item Closed", "Click", this.props.Item.Title)
  }; 

  render() {
   // console.log(this.props.Item.GridMeta.Where)
    return (
  
      <div className="CardCTA"> 
          <a  
            onClick={this.handleClickOpen}  
            className="GridItemCTA" 
            style={
                {backgroundImage: "url( https://gdn-cdn.s3.amazonaws.com/embed/2018/09/amex-image-grid/assets/images/Grid_Images/" + this.props.Item.Thumb + ")",
                height:this.props.height
              }}

          >
            <div className="ActionBar">
              <div className="iconLabel">
                  <h2>{this.props.Item.Title}</h2>
                  <h4>{this.props.Item.GridMeta.Title} | {this.props.Item.GridMeta.Where}</h4>
              </div>
            </div>
          </a>

          <Dialog
            fullScreen 
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
            className="Card"
            scroll="body"
          >
            <div>
              <IconButton color="inherit" className="CloseCard" onClick={this.handleClose} aria-label="Close">
                <Icon> {this.props.APP.APPLICATION.Icons.IconClose} </Icon>
              </IconButton>
              
              <Stepper 
                int={this.props.count}
                {... this.props}
              />
            </div>
          </Dialog>
      </div>
    );
  }
}
