import React from 'react';
import PropTypes from 'prop-types';

import {SetUIActive} from "../actions/actions";
import {GA} from "../../../../actions/ga";
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';


const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    overflow: 'hidden',
    width: '100%',
  },
});

let tutorialSteps=[];
let ARROW_RIGHT = 39, ARROW_LEFT=37;
class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: this.props.int,
    maxStep:0
  };


  _handleKeyDown = (event) => {

    let SetMaxStep = this.state.maxStep-1;

    switch( event.keyCode ) {
        case ARROW_RIGHT:
              if(this.state.activeStep < SetMaxStep){
                GA("Next Card", "Keyboard Arrow ", "right")
                this.handleNext()
              }
            break;
        case ARROW_LEFT:
              if(this.state.activeStep > 0){
                GA("Prev Card", "Keyboard Arrow ", "left")
                this.handleBack()
              }
            break;
        default: 
            break;
    }
}

  componentWillMount(){

    tutorialSteps = this.props.FilteredList;
    this.setState({  maxStep:tutorialSteps.length })
    document.addEventListener("keydown", this._handleKeyDown.bind(this));

   }
   componentWillUnmount() {
    this.isCancelled = true;    
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  handleCTAClick = (obj) => { GA("Client CTA", "Click",obj) };

  handleNext = () => {

    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));

    SetUIActive(this.state.activeStep + 1)
    GA("Next Card", "Click", "Button")
   
  };

  handleBack = () => {

    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));

    SetUIActive(this.state.activeStep - 1);
    GA("Prev Card", "Click", "Button")
  };

  handleStepChange = activeStep => {

    this.setState({ activeStep: activeStep });
    SetUIActive(activeStep)
  };

// <img key={i} className={classes.img} src={} alt={step.label} />
  render() {
   
    const {  theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className="row CardOuter">

        
  <SwipeableViews
    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    index={this.state.activeStep}
    onChangeIndex={this.handleStepChange}
    enableMouseEvents
    className="Image"
  >
  {
  tutorialSteps.map((step,i)=>{
    //console.log(step);
    //let ii = i+1;
      return( 
        <div  key={i} className="row" >
          <div className="col-md-5 col-sm-12 CardImage" >
            <div className="ImageOverlay">
                <img src={"https://gdn-cdn.s3.amazonaws.com/embed/2018/09/amex-image-grid/assets/images/Grid_Images/"+step.IMG} alt={step.GridMeta.Title}/>
                <h1>{step.Title}</h1>
                <h2>{step.GridMeta.Title} - {step.GridMeta.Sub}</h2>
                <h3>{step.GridMeta.When} - <small>{step.GridMeta.Where}</small></h3>
                <div className="CardBottomCTA">
                  

                  <p dangerouslySetInnerHTML={ { __html: step.CTA[0]} }></p> 
                </div>
            </div>
          </div>

          <div className="col-md-7 CardContent">
                <h2>What</h2>
              
                <p dangerouslySetInnerHTML={ { __html: step.GridMeta.What} }></p> 
                <h2>While you’re there </h2>
                <p>{step.GridMeta.While}</p>
          </div>
          
        </div>
      )
    })
  }
    </SwipeableViews>
        


    <div className="Counter">
        {activeStep+1} / {maxSteps}
    </div>
    

      <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          variant="text"
          className="Stepper hidden-xs-down"
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              
            </Button> 
          }
        >
   
        </MobileStepper> 
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);