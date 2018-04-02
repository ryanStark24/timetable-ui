import React from 'react';
import { withRouter } from 'react-router-dom';
import DashChild from './dashboardchild';
import {form, FormGroup, FormControl, ControlLabel, Button,Row,Col,Tabs,Tab } from 'react-bootstrap';
import NavigationBar from './navigation_bar';



class DashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Sections:[],open:[] };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.SubjectsSubmit = this.SubjectsSubmit.bind(this);
    }


    createUI() {

        return this.state.Sections.map((el, i) =>


        <Tab eventKey={i} title={this.state.Sections[i].section_name.length===0?'Click Me to Enter Section details':this.state.Sections[i].section_name}  >
          
            <FormGroup controlId="Sections">
              <ControlLabel>Section Name</ControlLabel>
              <FormControl type="text" name="section_name" value={this.state.Sections[i].section_name}  onChange={el=>this.onChange(el.target.name,el.target.value,i)}/>
            </FormGroup>

            <Button onClick={this.removeClick.bind(this, i)}>{"Remove this section"}</Button>
                <DashChild ref={"subjectChild"+i}  SubjectsSubmit={this.SubjectsSubmit} index={i}/>
           </Tab>



        )
    }
    panelClicked(i){
      let open=[...this.state.open];
      open[i]=!open[i];
       this.setState({open});
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
            
           <Tabs  id="uncontrolled-tab-example">
                {this.createUI()}
                </Tabs>
                         
                <Button onClick={this.addClick.bind(this)}>{this.state.Sections.length===0?'Add Section':'Add another section'}</Button>
                <Button onClick={this.SubjectsSubmit}>Submit</Button>
               
            </form>
            </Col>
            </Row>
            </div>
        );
    }
}
export default withRouter(DashBoard);
