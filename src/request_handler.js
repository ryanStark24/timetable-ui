import axios from 'axios';
let base_path = 'https://time-table-generator-flaky.herokuapp.com';

export default class RequestHandler {

  static login(email, password, callback) {
    let data = { "param": email, "password": password };
    axios.post(base_path + '/user/login', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        let data = res.data;
        sessionStorage.setItem('name', data.User.name);
        sessionStorage.setItem('id', data.User.id);
        sessionStorage.setItem('token', data.webToken);
        if (callback instanceof Function)
          callback();
      })
      .catch(err => console.log(err.msg));

  }
  static signup(Data, callback) {
    axios.post(base_path + '/user/signup', Data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (callback instanceof Function)
          callback();
      })
      .catch(err => console.log(err.msg));
  }

  static generateTimeTable(Data,callback){
   
  return  axios.post(base_path + '/timetable',Data,{
      headers:{ 'Content-Type': 'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('token')
    }
    }).then(res=>{
     if(callback instanceof Function) callback(res);
    }).catch(err=>console.log(err));
  }

}