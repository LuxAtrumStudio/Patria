import React, {
    Component
} from 'react';
import {
    withRouter
} from 'react-router'
import Clock from './components/Clock.js';

class Grid extends Component {
    render() {
        return (
            <div className="mdl-grid">
        <div className="mdl-layout-spacer"></div>
        <Clock />
        <div className="mdl-layout-spacer"></div>
      </div>
        );
    }
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/accounts/current/").then(res => res.json()).then((result) => {
            this.setState({
                loggedIn: result.logged_in,
                currentUser: result.username,
            });
        });
    }

    getSetting() {
        if (this.state.loggedIn === false) {
            return (<li><a href="accounts/register/">Register</a></li>);
        } else {
            return (<li><a href="">Settings</a></li>);
        }
    }

    getLoggedIn() {
        if (this.state.loggedIn === false) {
            return (<li><a href="accounts/login/">Login</a></li>);
        } else {
            return (<li><a href="#">Logout</a></li>);
        }
    }

    render() {
        return (
            <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__middle-section">
          <ul className="mdl-mini-footer__link-list">
            {this.getLoggedIn()}
            {this.getSetting()}
          </ul>
          {this.state.currentUser}
        </div>
      </footer>
        );
    }
}

class Home extends Component {
    render() {
        return (
            <div className="mdl-layout mdl-js-layout">
        <main className="mdl-layout__content">
          <Grid />
        </main>
        <Footer />
      </div>
        );
    }
}


export default withRouter(Home);
