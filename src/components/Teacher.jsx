import React from 'react';
// import Context from './context.jsx';
import {  form, FormGroup, FormControl, ControlLabel,Button,ButtonToolbar,ButtonGroup, Row,Col ,Tab,Tabs,Well} from 'react-bootstrap';
import Teacherchild from './teacherChild';
import {TimeTableContext} from './TimetableContext';
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
       
    <Tab eventKey={i} key={i} title={this.state.Teachers[i].name.length===0?'Teacher '+(i+1):this.state.Teachers[i].name}  >
      <Well>
          <FormGroup controlId="Teachers">
            <ControlLabel>Teacher Name</ControlLabel>
            <FormControl type="text" name="name" value={this.state.Teachers[i].name} onChange={el => this.onChange(el.target.name, el.target.value, i)} />
          </FormGroup>
          <Row>
                <Col md={8}>
                <Teacherchild  ref={"teacherChild"+i} SubjectsSubmit={this.SubjectTeachersSubmit} index={i} />
      
      </Col>
      <Col md={4}>
          <Button bsStyle="danger" onClick={this.removeClick.bind(this, i)}>{"Remove  Teacher"}</Button>
          </Col>
                </Row>
                </Well>
          
</Tab>

    )
  }
  panelClicked(i) {
    let open = [...this.state.open];
    open[i] = !open[i];
    this.setState({ open });
  }
  SubjectTeachersSubmit(context) {
    for(let ref in this.refs){
      let child=this.refs[ref];
    let Subjects = child.GiveTeacherSubjects();
    let Teachers = [...this.state.Teachers];
    Teachers[child.props.index]["subjects"] = Subjects;
    context.setTeachers(Teachers);
    }
   
  }

  onChange(name, value, i) {
    let Teachers = [...this.state.Teachers];
    Teachers[i][name] = value.toUpperCase();
    this.setState({ Teachers });
  }

  addClick() {
    this.setState(prevState => ({ Teachers: [...prevState.Teachers, { name: '', subjects:[] }], open: [...prevState.open, false] }));

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
      <div>
         <Row>
            <Col md={6}>
            <form onSubmit={this.handleSubmit}>
      <Tabs  id="uncontrolled-tab">
     {this.createUI()}
                 
        </Tabs>  
        <ButtonToolbar>
                <ButtonGroup>        
                  <Button bsStyle="info"   onClick={this.addClick.bind(this)}>{this.state.Teachers.length === 0 ? 'Add Teacher' : 'Add another Teacher'}</Button>
                  </ButtonGroup>
                <ButtonGroup> 
                <TimeTableContext.Consumer>
                     {(context)=>( <Button bsStyle="success" onClick={()=>this.SubjectTeachersSubmit(context)}>Save</Button>)}
                </TimeTableContext.Consumer>
       </ButtonGroup>
          
                </ButtonToolbar>   
                </form>         
    </Col>
    </Row>
</div>
        
    );
  }
}
export default Teacher;
