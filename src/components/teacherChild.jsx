import React from 'react';
import { FormGroup, FormControl, ControlLabel,Row,Col,Button } from 'react-bootstrap';

class Teacherchild extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjects: []

        };
     
        this.onChange=this.onChange.bind(this);
        this.removeClick=this.removeClick.bind(this);
        this.addClick=this.addClick.bind(this);
    }
    
 
    createUI() {
        return this.state.subjects.map((el, i) =>
        <div key={i}>
        
                    <FormGroup controlId="subject_name">
                   
                        <ControlLabel>Subject Name</ControlLabel>
                        <Row>
            <Col md={7}>
                        <FormControl type="text" value={this.state.subjects[i]}  onChange={el=>this.onChange(el.target.value,i)} />
                        </Col>
                       <Col md={5}>            
                       <Button bsStyle="danger"  onClick={this.removeClick}><span className="glyphicon glyphicon-remove"></span></Button>
                   </Col>
                   </Row>
                       </FormGroup>    
                      
               
            </div>


          

        )
    }

    addClick() {
        this.setState(prevState => ({ subjects: [...prevState.subjects,'']}));
    }
   onChange(value,i){
      let subjects=[...this.state.subjects];
      subjects[i]=value.toUpperCase();
      this.setState({subjects});
}
    removeClick(i) {
        let subjects = [...this.state.subjects];
     
        subjects.splice(i, 1);
        this.setState({ subjects });
    }

    GiveTeacherSubjects() {
       
       return this.state.subjects;
    }

    render() {
        return (
          <div>
            <Button bsStyle="default"  onClick={this.addClick}>{this.state.subjects.length === 0?"Add Subject":"Add another subject"}</Button>
            <br/>
                <br/>
                {this.createUI()}
                     
         </div>
        );
    }
}
export default Teacherchild;