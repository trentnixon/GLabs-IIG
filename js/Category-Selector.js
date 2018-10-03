import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
//import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grow from '@material-ui/core/Grow';
import {SelectCategory} from "../actions/actions";


var _ = require('lodash');

function Transition(props) {
  return <Grow direction="down" {...props} />;
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

let Filter=[], MapFilter=[];
class DialogSelect extends React.Component {
  state = {
    open: false,
    value: '*',
  };

  CreateFilterOptions(data){
    Filter=[];
    // eslint-disable-next-line 
    data.map((filter,i)=>{
        let neddle = _.find(Filter, {label:filter.category});
        console.log(neddle);
        if(neddle === undefined){
            Filter.push(
                {label:filter.category, id:filter.category.toLowerCase().replace(/\s/g, '')}
            )
        }
    })
    return Filter;
  }

  componentWillMount(){
      MapFilter = this.CreateFilterOptions(this.props.APP.APPLICATION.Grid)
      console.log(MapFilter);
  }

  handleChange = name => event => {
        console.log(event.target.value)
        SelectCategory(event.target.value)
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

 

    return (
      <div className="row">
        <div className="FilterBar">
        <Button 
                onClick={this.handleClickOpen}
                className="FilterButton"
        > Filter Grid
        </Button>


        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
          className="FilterDialog"
          maxWidth="md"
          TransitionComponent={Transition}
        >
          <DialogTitle>Filter Images</DialogTitle>


          <DialogContent>
            <form >
              <FormControl 
                fullWidth={true}
              >
                <InputLabel htmlFor="Filter">Select a Category</InputLabel>
               
                <Select
                  native
                  value={this.state.value}
                  onChange={this.handleChange('value')}
                  input={<Input id="Filter" />}
                  autoWidth={true}
                >
                  <option value={false} >All</option>
                  {
                      MapFilter.map((filter,i)=>{
                          return(
                            <option key={i} value={filter.id}>{filter.label}</option>
                          )
                      })
                  }
                </Select>
              </FormControl> 
            </form>
          </DialogContent>


          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>


        </Dialog>
        </div>
      </div>
    );
  }
}

DialogSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DialogSelect);