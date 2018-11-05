import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom'
import axios from 'axios';

function RenderError(state) {
  if (state.error === true) {
    return (<div className="mdl-color-text--red">Username/Password incorrect</div>);
  }
  return (<div></div>);
}

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false,
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUser(event) {
    this.setState({
      username: event.target.value
    });
  }
  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleClick() {
    var formData = new FormData();
    formData.set('username', this.state.username);
    formData.set('password', this.state.password);
    axios.post('', formData).then(response => {
      console.log(response)
      this.setState({
        error: !response.data.success
      });
      if (this.state.error === false) {
        this.props.history.push('/');
      }
    }).catch(response => {
      this.setState({
        error: true
      });
    });
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout">
        <main className="mdl-layout__content">
          <div className="mdl-grid">
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-card mdl-cell mdl-shadow--2dp">
              <div className="mdl-card__title mdl-color--primary mdl-color-text--white">
                <h1 className="mdl-card__title-text">Login</h1>
              </div>
              <div className="mdl-card__supporting-text">
                <form>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="text" id="username" onChange={this.handleUser}/>
                    <label className="mdl-textfield__label" htmlFor="username">Username</label>
                  </div>
                  <div className="mdl-textfield mdl-js-textfield">
                    <input className="mdl-textfield__input" type="password" id="userpass" onChange={this.handlePassword}/>
                    <label className="mdl-textfield__label" htmlFor="userpass">Password</label>
                  </div>
                </form>
              </div>
              <div className="mdl-card__actions mdl-card__border">
                <RenderError error={this.state.error} />
                <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" onClick={this.handleClick}>LOG IN</button>
              </div>
            </div>
            <div className="mdl-layout-spacer"></div>
          </div>
        </main>
        <footer className="mdl-mini-footer">
          <div className="mdl-mini-footer__middle-section">
            <ul className="mdl-mini-footer__link-list">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='accounts/recover/'>Recover</Link></li>
              <li><Link to='accounts/register/'>Register</Link></li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

export default Login;
