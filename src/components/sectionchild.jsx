import React from 'react';
import {Panel, Checkbox, FormGroup, FormControl, ControlLabel, Button,Row,Col,PanelGroup } from 'react-bootstrap';
class sectionChild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: [],
            open:[]

        };

        this.onChange=this.onChange.bind(this);
        this.addClick=this.addClick.bind(this);
        this.removeClick=this.removeClick.bind(this);
    }
  
    createUI() {
        let me=this;
        return this.state.subjects.map((el, i) =>
        <Panel id="collapsible-panel-subject"  onClick={this.panelClicked.bind(this,i)} eventKey={i} key={i}>
        <Panel.Heading  >
          <Panel.Title toggle>
          <Row><Col xs={10} md={10}>{this.state.subjects[i].subject.length ===0?'Click me to add subject Detail':this.state.subjects[i].subject}</Col> <Col md={1} xs={1} > {this.state.open[i]?<span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>:<span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>}</Col></Row>
            </Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>
                    <FormGroup controlId="subject_name">
                        <ControlLabel>Subject Name</ControlLabel>
                        <FormControl type="text" name="subject" value={this.state.subjects[i].subject}  onChange={el=>this.onChange(el.target.name,el.target.value,i)} />
                    </FormGroup>

                    <FormGroup controlId="subject_periodLock">
                        <ControlLabel>PeriodLock</ControlLabel>
                        <FormControl type="number" name="periodLock" value={this.state.subjects[i].periodLock}placeholder="Enter Period Number" onChange={el=>this.onChange(el.target.name,el.target.value,i)} />
                    </FormGroup>

                    <FormGroup controlId="periodLock_day">
                        <ControlLabel>Day</ControlLabel>
                        <FormControl type="number" name="day" value={this.state.subjects[i].day} placeholder="Enter day between 1 to 7"  onChange={el=>this.onChange(el.target.name,el.target.value,i)} />
                    </FormGroup>

                    <Checkbox name="isLab" checked={this.state.subjects[i].isLab} onChange={el=>this.onChange(el.target.name,el.target.checked,i)}>Is this subject a lab?</Checkbox>


                <Button bsStyle="danger" onClick={me.removeClick.bind(i)}>Remove this Subject</Button>
                </Panel.Body>
                      </Panel>

        )
    }
   panelClicked(i){
    let open=[...this.state.open];
    open[i]=!open[i];
     this.setState({open});
   }
    addClick() {
        this.setState(prevState => ({ subjects: [...prevState.subjects, {
            subject:'',
            periodLock:-1,
            day:-1,
            isLab:false
        }] ,open:[...prevState.open,false]}));
    }
onChange(name,value,i){
      let subjects=[...this.state.subjects];
      subjects[i][name]=value;
       this.setState({subjects});
}
    removeClick(i) {
        let subjects = [...this.state.subjects];
        let open=[...this.state.open];
        subjects.splice(i, 1);
        open.splice(i, 1);

        this.setState({ subjects,open });
     
    }

    GiveSubjects() {

       return this.state.subjects;
    }

    render() {
        return (
          <div>
            <Button onClick={this.addClick}>{this.state.subjects.length === 0?"Add Subject":"Add another subject"}</Button>
               <br/>
               <br/>
               
            <PanelGroup accordion id="accordion">
                {this.createUI()}
                </PanelGroup>
              
         </div>
        );
    }
}
export default sectionChild;
