import React from 'react';
import { withRouter } from 'react-router-dom';
import SectionChild from './sectionchild';
import { FormGroup, FormControl, ControlLabel, Button,Row,Col,Tabs,Tab,ButtonGroup,ButtonToolbar,Well } from 'react-bootstrap';
import {TimeTableContext} from './TimetableContext';

class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Sections:[] };
        this.onChange=this.onChange.bind(this);
        this.SubjectsSubmit = this.SubjectsSubmit.bind(this);
    }


    createUI() {

        return this.state.Sections.map((el, i) =>


        <Tab eventKey={i} key={i} title={this.state.Sections[i].section_name.length===0?'Section '+(i+1):this.state.Sections[i].section_name}  >
            <Well>
            <FormGroup controlId="Sections">
              <ControlLabel>Section Name</ControlLabel>
              <FormControl type="text" name="section_name" value={this.state.Sections[i].section_name}  onChange={el=>this.onChange(el.target.name,el.target.value,i)}/>
            </FormGroup>
            <Row>
                <Col md={8}>
            <SectionChild ref={"subjectChild"+i}  SubjectsSubmit={this.SubjectsSubmit} index={i}/>
            </Col>
            <Col md={4}>
            <Button  bsStyle="danger" onClick={this.removeClick.bind(this, i)}>{"Remove this section"}</Button>
              </Col>
                </Row>
                </Well>
           </Tab>



        )
    }
 
   SubjectsSubmit(context){
      if(Object.keys(this.refs).length ===0  ) window.alert('Please fill Section data');else{
       for(let ref in this.refs){
       let child=this.refs[ref];
        let Subjects=child.GiveSubjects();
        let Sections=[...this.state.Sections];
        Sections[child.props.index]["subjects"]=Subjects;
        context.setSections(Sections);
       
       }
    this.props.changeKey('sections');
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

  

    render() {
        return (
           <div>
          
          <Row>
            <Col md={6} >
           
           <Tabs  id="uncontrolled-tab-example">
                {this.createUI()}
                </Tabs>
                <ButtonToolbar>
                <ButtonGroup>        
                <Button bsStyle= "info" onClick={this.addClick.bind(this)}>{this.state.Sections.length===0?'Add Section':'Add another section'}</Button>
                </ButtonGroup>
                <ButtonGroup> 
                 <TimeTableContext.Consumer>
                     {(context)=>( <Button bsStyle="success" onClick={()=>this.SubjectsSubmit(context)}>Save</Button>)}
                </TimeTableContext.Consumer>
                </ButtonGroup>
                </ButtonToolbar>
          
            </Col>
            </Row>
            </div>
        );
    }
}
export default withRouter(Section);
