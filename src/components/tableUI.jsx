import React from 'react';
import {Table,thead,tr,Row,Col} from 'react-bootstrap';
export default class TableUI extends React.Component{

    
    createBodyUI(day){
      
        return day.periods.map((period,i)=>{
                   return  <td key={i}> {period.subject}<br/>{"("+period.teacher+')'} </td>
                
        })
        }

        createDayUI(section){
            let Timetable=section.timetable;
            return Timetable.map((day,i)=>{
             return (
                 <React.Fragment key={i}>
                     <tr>
                 <td>{day.day}</td>
                 {this.createBodyUI(day)}
                 </tr>
                 </React.Fragment>
             )       
            })
            }
    createHeaderUI(section){
        let Timetable=section.timetable;
        let max=0;
        let index=0;
        for(let day of Timetable){
          if(max<day.periods.length){
              max=day.periods.length;
              index=Timetable.indexOf(day);}
        }
        return Timetable[index].periods.map((period,i)=>{
                return  <th key={i}> {'Period '+(i+1)} </th>
            
                
                
         
       
        })
    }

    render(){
        return(
            <React.Fragment>
            <Row>
                <Col mdOffset={2} md={10}>           
              {this.props.timetable.timetable.map((section,index)=>{
                  return (
                      <React.Fragment key={index}>
                      <h4>{section.sectionName}</h4>
                    <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                         <th>Day</th>  
                   { this.createHeaderUI(section) } 
                  
                    </tr>
                </thead>
                <tbody>
                    {this.createDayUI(section)}
              
                    </tbody>
                </Table>
                </React.Fragment>
                
                  )}
              )}
            </Col>
            </Row>
                </React.Fragment>
        );
    }
}