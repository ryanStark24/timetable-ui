import React from 'react';
import { withRouter } from 'react-router-dom';
import DashChild from './dashboardchild';
import {form, FormGroup, FormControl, ControlLabel, Button,Row,Col,Tabs,Tab,ButtonGroup,ButtonToolbar } from 'react-bootstrap';
import NavigationBar from './navigation_bar';



class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Sections:[] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.SubjectsSubmit = this.SubjectsSubmit.bind(this);
    }


    createUI() {

        return this.state.Sections.map((el, i) =>


        <Tab eventKey={i} key={i} title={this.state.Sections[i].section_name.length===0?'Section '+(i+1):this.state.Sections[i].section_name}  >
          
            <FormGroup controlId="Sections">
              <ControlLabel>Section Name</ControlLabel>
              <FormControl type="text" name="section_name" value={this.state.Sections[i].section_name}  onChange={el=>this.onChange(el.target.name,el.target.value,i)}/>
            </FormGroup>
            <Row>
                <Col md={8}>
            <DashChild ref={"subjectChild"+i}  SubjectsSubmit={this.SubjectsSubmit} index={i}/>
            </Col>
            <Col md={4}>
            <Button  bsStyle="danger" onClick={this.removeClick.bind(this, i)}>{"Remove this section"}</Button>
              </Col>
                </Row>
           </Tab>



        )
    }
 
   SubjectsSubmit(){
       for(let ref in this.refs){
       let child=this.refs[ref];
        let Subjects=child.GiveSubjects();
        let Sections=[...this.state.Sections];
        Sections[child.props.index]["subjects"]=Subjects;
        this.setState({Sections});
       }
     
   }

    onChange(name,value,i) {
       let Sections=[...this.state.Sections];
       Sections[i][name]=value;
       this.setState({Sections});
    }

    addClick() {
      this.setState(prevState => ({ Sections: [...prevState.Sections, { section_name:'', subjects:'' }] } ));

    }

    removeClick(i) {
        let Sections = [...this.state.Sections];
         Sections.splice(i, 1);
         this.setState({ Sections });
    }

    handleSubmit(event) {

        event.preventDefault();
    }

    render() {
        return (
           <div>
           <NavigationBar/>
          <Row>
            <Col md={6} mdOffset={2}>
            <form onSubmit={this.handleSubmit}>
            
           <Tabs  id="uncontrolled-tab-example">
                {this.createUI()}
                </Tabs>
                <ButtonToolbar>
                <ButtonGroup>        
                <Button bsStyle= "info" onClick={this.addClick.bind(this)}>{this.state.Sections.length===0?'Add Section':'Add another section'}</Button>
                </ButtonGroup>
                <ButtonGroup> 
                <Button bsStyle="success" onClick={this.SubjectsSubmit}>Submit</Button>
                </ButtonGroup>
                </ButtonToolbar>
            </form>
            </Col>
            </Row>
            </div>
        );
    }
}
export default withRouter(DashBoard);
