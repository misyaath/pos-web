import axios from "axios";

export default class Authentication {
  login = (response) => {
    if (response.data.token !== undefined) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return true;
    }
    return false;
  }

  isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  }
  removeLogins = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  logout = (history) => {
    this.removeLogins();
    history.push('login')
  }
}



