import axios from 'axios';

let base_path = 'https://time-table-generator-flaky.herokuapp.com';

export default class RequestHandler {



  static login(email, password) {
    let data = { "param": email, "password": password };
    axios.post(base_path + '/user/login', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        let data = res.data;
        localStorage.setItem('name', data.User.name);
        localStorage.setItem('id', data.User.id);
        localStorage.setItem('token', data.webToken);

      })
      .catch(err => console.log(err.response));

  }
  static signup(Data) {
    return axios.post(base_path + '/user/signup', Data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => true)
      .catch(err => console.log(err.response));
  }

}