import React from 'react';
import { withRouter } from 'react-router-dom';
import DashChild from './dashboardchild';
import {Panel,form, FormGroup, FormControl, ControlLabel, Button,Row,Col,PanelGroup } from 'react-bootstrap';
import NavigationBar from './navigation_bar';
class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Sections:[],open:[] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.SubjectsSubmit = this.SubjectsSubmit.bind(this);
    }
componentWillMount(){
   if(!sessionStorage.getItem('token')) this.props.history.push('/');
}

    createUI() {

        return this.state.Sections.map((el, i) =>


        <Panel id="collapsible-panel-section"  onClick={this.panelClicked.bind(this,i)} eventKey={i} key={i}>
        <Panel.Heading  >
          <Panel.Title toggle>
          <Row><Col md={5} xs={6}>{this.state.Sections[i].section_name.length===0?'Click Me to Enter Section details':this.state.Sections[i].section_name}</Col> <Col md={1} mdOffset={6} xs={1} xsOffset={5}> {this.state.open[i]?<span className="glyphicon glyphicon-menu-up" aria-hidden="true"></span>:<span className="glyphicon glyphicon-menu-down" aria-hidden="true"></span>}</Col></Row>
            </Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>
            <FormGroup controlId="Sections">
              <ControlLabel>Section Name</ControlLabel>
              <FormControl type="text" name="section_name" value={this.state.Sections[i].section_name}  onChange={el=>this.onChange(el.target.name,el.target.value,i)}/>
            </FormGroup>

            <Button onClick={this.removeClick.bind(this, i)}>{"Remove this section"}</Button>
                <DashChild onRef={ref=>this.child=ref} SubjectsSubmit={this.SubjectsSubmit} index={i}/>
              </Panel.Body>
                      </Panel>



        )
    }
    panelClicked(i){
      let open=[...this.state.open];
      open[i]=!open[i];
       this.setState({open});
     }
   SubjectsSubmit(){
     let data=this.child.GiveSubjects();
     let index=data.index;
     let Subjects=data.subjects;
     let Sections=[...this.state.Sections];
     Sections[index]["subjects"]=Subjects;
     this.setState({Sections});
   }

    onChange(name,value,i) {
       let Sections=[...this.state.Sections];
       Sections[i][name]=value;
       this.setState({Sections});
    }

    addClick() {
      this.setState(prevState => ({ Sections: [...prevState.Sections, { section_name:'', subjects:'' }] ,open:[...prevState.open,false]} ));

    }

    removeClick(i) {
        let Sections = [...this.state.Sections];
        let open = [...this.state.open];
        Sections.splice(i, 1);
        open.splice(i, 1);
        this.setState({ Sections,open });
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

            <PanelGroup accordion id="accordion-example">
                {this.createUI()}
                </PanelGroup>
                <Button onClick={this.addClick.bind(this)}>{this.state.Sections.length===0?'Add Section':'Add another section'}</Button>
                <Button type="submit">Submit</Button>

            </form>
            </Col>
            </Row>
            </div>
        );
    }
}
export default withRouter(DashBoard);
