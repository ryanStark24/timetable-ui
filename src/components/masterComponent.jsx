import React from 'react';
import NavigationBar from './navigation_bar';
import Section from './section';
import Teacher from './Teacher';
import DaysDescription from './daysDescription';
import AdditionalDetails from './additionalDetails';
import TableUI from './tableUI';
import {Tab,NavItem,Nav,Row,Col} from 'react-bootstrap';
import {TimeTableContext} from './TimetableContext';
// import {timetable} from './constants';
class DataProvider extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{
            Sections:[],
            Teachers:[],
            DaysDescription:[],
            totalPeriods:0,
            lab_periods_after:0
            },result:null
        };
    }
    render(){
        return(
            <TimeTableContext.Provider value={{
                state:this.state,
                result:null,
                setSections :(Sections) =>this.setState({Sections}),
                setTeachers :(Teachers) =>this.setState({Teachers}),
                setDaysDescription :(DaysDescription) =>this.setState({DaysDescription}),
                setTotalPeriods :(totalPeriods) =>this.setState({totalPeriods}),
                setLabsAfter :(lab_periods_after) =>this.setState({lab_periods_after}),
                setResult:(result)=>this.setState({result})
                
                
            }}>
                {this.props.children}
                </TimeTableContext.Provider>
        );
    }
}
export default class MainComp extends React.Component{

   constructor(props){
       super(props);
       this.state={
           activeKey:'first'
       };
       this.changeKey=this.changeKey.bind(this);
   }
changeKey(name){
    switch(name){
        case 'sections': this.setState({activeKey:'second'});break;
        case 'Teachers':this.setState({activeKey:'third'});break;
        case 'DaysDescription':this.setState({activeKey:'fourth'});break;
        default:this.setState({activeKey:'first'});break;
    }
  
}
    render(){
        return(
           
                <DataProvider>
                    <React.Fragment>
                 <NavigationBar/>
                 <TimeTableContext.Consumer>
                 
  
                     {(context)=>( <React.Fragment>
                         <Tab.Container id="left-tabs-example" onSelect={(e,any)=>this.setState({activeKey:e})} activeKey={this.state.activeKey}>
                 <Row className="clearfix">
    <Col sm={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first">Sections Details</NavItem>
        <NavItem disabled= {context.state.data.Sections.length === 0} eventKey="second" >Teachers Details</NavItem>
        <NavItem disabled= {context.state.data.Teachers.length === 0} eventKey="third" >Days Description</NavItem>
        <NavItem disabled= {context.state.data.DaysDescription.length === 0} eventKey="fourth" >Additional Details</NavItem>
      </Nav>
    </Col>
    <Col sm={10}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first" >
        <h4> Enter Details of Every Section</h4>
        <Section changeKey={this.changeKey}/>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        <h4> Enter Details of Teachers</h4>
        <Teacher changeKey={this.changeKey}/>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
        <h4> Enter  Days and their Periods</h4>
        <DaysDescription changeKey={this.changeKey}/>
        </Tab.Pane>
        <Tab.Pane eventKey="fourth">
        <h4> Additional Details</h4>
        <AdditionalDetails/>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
  </Tab.Container>
  {/* <button onClick={()=>context.setResult(timetable)}>click kar bc</button> */}
  {context.state.result !== null? <TableUI timetable={context.state.result}/>:''}
     </React.Fragment> )}

  </TimeTableContext.Consumer>
           
  </React.Fragment>
  </DataProvider>
 
        );
    }
}