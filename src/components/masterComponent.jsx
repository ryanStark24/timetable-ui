import React from 'react';
import NavigationBar from './navigation_bar';
import Section from './section';
import Teacher from './Teacher';
import DaysDescription from './daysDescription';
import AdditionalDetails from './additionalDetails';
import {Tab,NavItem,Nav,Row,Col} from 'react-bootstrap';
import {TimeTableContext} from './TimetableContext';
import RequestHandler from '../request_handler';

class DataProvider extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Sections:[],
            Teachers:[],
            DaysDescription:[],
            totalPeriods:0,
            lab_periods_after:0
        };
    }
    render(){
        return(
            <TimeTableContext.Provider value={{
                state:this.state,
                setSections :(Sections) =>this.setState({Sections},()=>console.log(this.state.Sections)),
                setTeachers :(Teachers) =>this.setState({Teachers},()=>console.log(this.state.Teachers)),
                setDaysDescription :(DaysDescription) =>this.setState({DaysDescription},()=>console.log(this.state.DaysDescription)),
                setTotalPeriods :(totalPeriods) =>this.setState({totalPeriods},()=>console.log(this.state.totalPeriods)),
                setLabsAfter :(lab_periods_after) =>this.setState({lab_periods_after},()=>console.log(this.state.lab_periods_after)),
                commit:()=> RequestHandler.generateTimeTable(this.state)
                
            }}>
                {this.props.children}
                </TimeTableContext.Provider>
        );
    }
}
export default class MainComp extends React.Component{

   

    render(){
        return(
           
                <DataProvider>
                    <React.Fragment>
                 <NavigationBar/>
                 <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                 <Row className="clearfix">
    <Col sm={2}>
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="first">Sections Details</NavItem>
        <NavItem eventKey="second" >Teachers Details</NavItem>
        <NavItem eventKey="third" >Days Description</NavItem>
        <NavItem eventKey="fourth" >Additional Details</NavItem>
      </Nav>
    </Col>
    <Col sm={10}>
      <Tab.Content animation>
        <Tab.Pane eventKey="first">
        <h4> Enter Details of Every Section</h4>
        <Section/>
        </Tab.Pane>
        <Tab.Pane eventKey="second">
        <h4> Enter Details of Teachers</h4>
        <Teacher/>
        </Tab.Pane>
        <Tab.Pane eventKey="third">
        <h4> Enter  Days and their Periods</h4>
        <DaysDescription/>
        </Tab.Pane>
        <Tab.Pane eventKey="fourth">
        <h4> Additional Details</h4>
        <AdditionalDetails/>
        </Tab.Pane>
      </Tab.Content>
    </Col>
  </Row>
  </Tab.Container>
  </React.Fragment>
  </DataProvider>
 
        );
    }
}