import React from 'react';
import {Button,ButtonGroup,ButtonToolbar,FormControl,FormGroup,ControlLabel,Row,Col,Well} from 'react-bootstrap';
import {TimeTableContext} from './TimetableContext';
export default class DaysDescription extends React.Component{
constructor(props){
    super(props);
     this.state={
         DaysDescription:[],
         open:[]
     };
}
   createUI(){
       return this.state.DaysDescription.map((el,i)=>
       <React.Fragment key={i}>
       <Well>
       <FormGroup controlId="Day">
              <ControlLabel>Day</ControlLabel>
              <FormControl type="number" name="Day" value={this.state.DaysDescription[i].Day}  onChange={el=>this.onChange(el.target.name,el.target.value,i)}/>
            </FormGroup>
            <FormGroup controlId="Period">
              <ControlLabel>Period</ControlLabel>
              <FormControl type="number" name="Period" value={this.state.DaysDescription[i].Period}  onChange={el=>this.onChange(el.target.name,el.target.value,i)}/>
            </FormGroup>
          
            <Button  bsStyle="danger" onClick={this.removeClick.bind(this, i)}>{"Remove this Day"}</Button>
           
               
                </Well>
       </React.Fragment>         
    
    )
   }
onChange(name,value,i) {
    let DaysDescription=[...this.state.DaysDescription];
    DaysDescription[i][name]=value;
    this.setState({DaysDescription});
 }
addClick() {
    this.setState(prevState => ({ DaysDescription: [...prevState.DaysDescription, { Day:0, Period:0 }] } ));

  }

  removeClick(i) {
      let DaysDescription = [...this.state.DaysDescription];
       DaysDescription.splice(i, 1);
       this.setState({ DaysDescription });
  }
  submitDays(context){
    context.setDaysDescription(this.state.DaysDescription);
  }
 
render(){
    return(
        <React.Fragment>
            <Row>
            <Col md={6} >
        {this.createUI()}
        <ButtonToolbar>
                <ButtonGroup>        
                <Button bsStyle= "info" onClick={this.addClick.bind(this)}>{this.state.DaysDescription.length===0?'Add a Day':'Add another Day'}</Button>
                </ButtonGroup>
                <ButtonGroup> 
                 <TimeTableContext.Consumer>
                     {(context)=>( <Button bsStyle="success" onClick={()=>this.submitDays(context)}>Save</Button>)}
                </TimeTableContext.Consumer>
                </ButtonGroup>
                </ButtonToolbar>
                </Col>
            </Row>
        </React.Fragment>
    );
}

}