import React from 'react';
import {Panel, FormGroup, FormControl, ControlLabel,Row,Col,PanelGroup } from 'react-bootstrap';
import {Button} from 'reactstrap'
class Teacherchild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            open:[]

        };
     
        this.onChange=this.onChange.bind(this);
        this.removeClick=this.removeClick.bind(this);
        this.addClick=this.addClick.bind(this);
    }
    componentDidMount() {
        this.props.onRef(this)
      }
      componentWillUnmount() {
        this.props.onRef(undefined)
      }
 
    createUI() {
        return this.state.subjects.map((el, i) =>
        <div style={{ margin: '20px' }}>
        <Panel id="collapsible-panel-subject"  onClick={this.panelClicked.bind(this,i)} eventKey={i} key={i}>
        <Panel.Heading  >
          <Panel.Title toggle>
          <Row><Col xs={5} md={5}>{this.state.subjects[i].length ===0?'Click me to add subject':this.state.subjects[i]}</Col> <Col md={1} mdOffset={6} xs={1} xsOffset={6}> {this.state.open[i]?<span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>:<span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>}</Col></Row>
            </Panel.Title>
          </Panel.Heading>
        

            <Panel.Body collapsible>
                    <FormGroup controlId="subject_name">
                        <ControlLabel>Subject Name</ControlLabel>
                        <FormControl type="text" value={this.state.subjects[i]}  onChange={el=>this.onChange(el.target.value,i)} />
                    </FormGroup>                
                <Button color="primary" size="lg" block onClick={this.removeClick}>Remove Added Subject</Button>
                </Panel.Body>
                      </Panel>
            </div>


          

        )
    }
   panelClicked(i){
    let open=[...this.state.open];
    open[i]=!open[i];
     this.setState({open});
   }
    addClick() {
        this.setState(prevState => ({ subjects: [...prevState.subjects,''] ,open:[...prevState.open,false]}));
    }
   onChange(value,i){
      let subjects=[...this.state.subjects];
      subjects[i]=value.toUpperCase();
      this.setState({subjects});
}
    removeClick(i) {
        let subjects = [...this.state.subjects];
        let open=[...this.state.open];
        open.splice(i,1);
        subjects.splice(i, 1);
        this.setState({ subjects,open });
    }

    GiveTeacherSubjects() {
       
       return {subjects:this.state.subjects,index:this.props.index};
    }

    render() {
        return (
          <div>
            <PanelGroup accordion id="accordion-example">
                {this.createUI()}
                </PanelGroup>
                
                <Button color="primary" size="lg" block  onClick={this.addClick}>{this.state.subjects.length === 0?"Add Subject":"Add another subject"}</Button>
                &nbsp;&nbsp;&nbsp;
                <Button color="primary" size="lg" block  onClick={this.props.SubjectsSubmit}>save Teacher Subjects</Button>
              
         </div>
        );
    }
}
export default Teacherchild;

