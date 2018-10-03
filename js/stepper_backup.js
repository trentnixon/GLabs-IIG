import React from 'react';
import PropTypes from 'prop-types';

import {SetUIActive} from "../actions/actions";

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
                this.handleNext()
              }
            break;
        case ARROW_LEFT:
              if(this.state.activeStep > 0){
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

  handleNext = () => {

    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));

    SetUIActive(this.state.activeStep + 1)
   
  };

  handleBack = () => {

    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));

    SetUIActive(this.state.activeStep - 1);

  };

  handleStepChange = activeStep => {

    this.setState({ activeStep });

  };

// <img key={i} className={classes.img} src={} alt={step.label} />
  render() {
    
    const {  theme } = this.props;
    const { activeStep } = this.state;

    const maxSteps = tutorialSteps.length;

    return (
      <div className="row CardOuter">

        <div className="col-md-12 col-sm-12 CardImage"
            style={{backgroundImage: "url(" + tutorialSteps[activeStep].IMG  + ")"}}
        >
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.activeStep}
                onChangeIndex={this.handleStepChange}
                enableMouseEvents
                className="Image"
            >
                {
                    tutorialSteps.map((step,i)=>{
                        let ii = i+1;
                        return(
                            <div key={i} className="ImageOverlay">
                                <h2>{ii}. {step.Title}</h2>
                            </div>
                        )
                    })
                }
            </SwipeableViews>
        </div>

      <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className="Stepper hidden-xs-down"
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />

        <div className="col-md-12 CardContent">
                <h2>{activeStep+1}. {tutorialSteps[activeStep].Title}</h2>
                <p>{tutorialSteps[activeStep].Description}</p>
        </div>
      </div>
    );
  }
}

SwipeableTextMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);