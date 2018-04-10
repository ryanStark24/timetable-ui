import React from 'react';
import {TimeTableContext} from './TimetableContext';
import {Button,FormControl,FormGroup,ControlLabel,Well} from 'react-bootstrap';
import RequestHandler from '../request_handler';
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
           RequestHandler.generateTimeTable(context.state.data,(result)=>context.setResult(result));
        
       }
    }
    render(){
        return(
            <React.Fragment>
                 <Well>
                 <FormGroup controlId="totalPeriods">
              <ControlLabel>After Which Period do you want labs to be alloted?</ControlLabel>
              <FormControl type="number" name="totalPeriods" value={this.state.totalPeriods}  onChange={el=>this.onChange(el.target.name,el.target.value)}/>
            </FormGroup>
            <FormGroup controlId="lab_periods_after">
              <ControlLabel>Enter Total Periods in a week</ControlLabel>
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