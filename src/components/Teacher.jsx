import React, { Component,createContext} from 'react';
// import Context from './context.jsx';
import { Panel, form, FormGroup, FormControl, ControlLabel, Row, Col, PanelGroup, Jumbotron} from 'react-bootstrap';
import Teacherchild from './Teacherchild';
import {  Button,Card } from 'reactstrap'
class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Teachers: [], open: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.SubjectTeachersSubmit = this.SubjectTeachersSubmit.bind(this);
  }

  createUI() {
    return this.state.Teachers.map((el, i) =>
<Jumbotron>
      <Panel id="collapsible-panel-section" onClick={this.panelClicked.bind(this, i)} eventKey={i} key={i}>
        <Panel.Heading  >
          <Panel.Title toggle>
            <Row><Col md={5} xs={6}>{this.state.Teachers[i].name.length === 0 ? 'Click Me to Enter Teacher details' : this.state.Teachers[i].name}</Col> <Col md={1} mdOffset={6} xs={1} xsOffset={5}> {this.state.open[i] ? <span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span> : <span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>}</Col></Row>
          </Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>
          <FormGroup controlId="Teachers">
            <ControlLabel>Teacher Name</ControlLabel>
            <FormControl type="text" name="name" value={this.state.Teachers[i].name} onChange={el => this.onChange(el.target.name, el.target.value, i)} />
          </FormGroup>

          <Button color="primary" size="lg" block onClick={this.removeClick.bind(this, i)}>{"Remove Added Teacher"}</Button>

          <Teacherchild onRef={ref => this.child = ref} SubjectsSubmit={this.SubjectTeachersSubmit} index={i} />
        </Panel.Body>
      </Panel>


</Jumbotron>
    )
  }
  panelClicked(i) {
    let open = [...this.state.open];
    open[i] = !open[i];
    this.setState({ open });
  }
  SubjectTeachersSubmit() {
    let data = this.child.GiveTeacherSubjects();
    let index = data.index;
    let Subjects = data.subjects;
    let Teachers = [...this.state.Teachers];
    Teachers[index]["subjects"] = Subjects;
    this.setState({ Teachers });
    console.log("Teachers");
    
    console.log(this.state.Teachers);
    
    //return this.state.Teachers;


  }

  onChange(name, value, i) {
    let Teachers = [...this.state.Teachers];
    Teachers[i][name] = value.toUpperCase();
    this.setState({ Teachers });
  }

  addClick() {
    this.setState(prevState => ({ Teachers: [...prevState.Teachers, { name: '', subjects: '' }], open: [...prevState.open, false] }));

  }

  removeClick(i) {
    let Teachers = [...this.state.Teachers];
    let open = [...this.state.open];
    Teachers.splice(i, 1);
    open.splice(i, 1);
    this.setState({ Teachers, open });
  }

  handleSubmit(event) {
    console.log("handlesubmit");
    
    //console.log(this.state.Teachers);
    event.preventDefault();
  }

  render() {
    return (
   
      //  <Context.Provider value={{teacherjson:this.state.Teachers}}>
      //  {this.props.children}

         <Row>
        <Col md={6} mdOffset={2}>
          <form onSubmit={this.handleJSONdata}>

            <PanelGroup accordion id="accordion-example">
              {this.createUI()}
            </PanelGroup>


         
        <Card body inverse>
         {/* <CardTitle style={{ marginBottom: '2%',marginLeft: '32%' }}><h1><Label>Teachers Section</Label>
  </h1></CardTitle>  */}
            <Row>
            <div style={{ marginTop: '15px' }}>
              <Col sm="6">
             
                <Card body>

                  <Button color="primary" size="lg" block onClick={this.addClick.bind(this)}>{this.state.Teachers.length === 0 ? 'Add Teacher' : 'Add another Teacher'}</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>

                  <Button color="primary" size="lg" type="submit" block>Submit</Button>
                </Card>
              </Col>
              </div>
            </Row>
            </Card>
          </form>
        </Col>
      </Row>  
    

        // </Context.Provider> 
    );
  }
}
export default Teacher;

