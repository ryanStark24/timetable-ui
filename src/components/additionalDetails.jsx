import React from 'react';
import {TimeTableContext} from './TimetableContext';
import {Button,FormControl,FormGroup,ControlLabel,Well} from 'react-bootstrap';
export default class AdditionalDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            totalPeriods:0,
            lab_periods_after:0,
            disable:false
        };
     
    }
    onChange(name,value){
        this.setState({[name]:value});
        
    }
    submitAdditional(context){
        context.setTotalPeriods(this.state.totalPeriods);
        context.setLabsAfter(this.state.lab_periods_after);
        let status=window.confirm("Do you want to submit");
       if(status){
           this.setState({disable:true});
           context.commit();
       }
    }
    render(){
        return(
            <React.Fragment>
                 <Well>
                 <FormGroup controlId="totalPeriods">
              <ControlLabel>Day</ControlLabel>
              <FormControl type="number" name="totalPeriods" value={this.state.totalPeriods}  onChange={el=>this.onChange(el.target.name,el.target.value)}/>
            </FormGroup>
            <FormGroup controlId="lab_periods_after">
              <ControlLabel>Period</ControlLabel>
              <FormControl type="number" name="lab_periods_after" value={this.state.lab_periods_after}  onChange={el=>this.onChange(el.target.name,el.target.value)}/>
            </FormGroup>
            <TimeTableContext.Consumer>
                     {(context)=>( <Button disabled={this.state.disable} bsStyle="success" onClick={()=>this.submitAdditional(context)}>{this.state.disable?'Generating timetable':'Submit'}</Button>)}
                </TimeTableContext.Consumer>

            </Well>
                </React.Fragment>
        );
    }
}