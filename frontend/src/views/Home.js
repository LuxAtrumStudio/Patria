import React, {
  Component
} from 'react';
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Button from 'material-ui/Button';
import axios from 'axios';
// import Grid from 'material-ui/Grid';

import Clock from './components/Clock.js';
import Hourly from './components/Hourly.js';

class Grid extends Component {
    render() {
        return (
          <div>
            <div className="mdl-grid">
              <div className="mdl-layout-spacer"></div>
              <Clock />
              <div className="mdl-layout-spacer"></div>
            </div>
            <div className="mdl-grid">
              <Hourly />
            </div>
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
    }

    getSetting() {
        if (this.state.loggedIn === false) {
            return (<li><Link to="accounts/register/">Register</Link></li>);
        } else {
            return (<li><Link to="">Settings</Link></li>);
        }
    }

    getLoggedIn() {
        if (this.state.loggedIn === false) {
            return (<li><Link to="accounts/login/">Login</Link></li>);
        } else {
            return (<li><Link to="#">Logout</Link></li>);
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
          <div className="mdl-layout">
            <main className="mdl-layout__content">
              <Grid />
            </main>
            <Footer />
          </div>
        );
    }
}


// import Clock from './components/Clock.js';

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loggedIn: false,
//     };
//   }
//
//   getSetting() {
//     if (this.state.loggedIn === false) {
//       return (<li><a href="accounts/register/">Register</a></li>);
//     } else {
//       return (<li><a href="">Settings</a></li>);
//     }
//   }
//
//   getLoggedIn() {
//     if (this.state.loggedIn === false) {
//       return (<li><Link to="accounts/login/">Login</Link></li>);
//     } else {
//       return (<li><Link to="#">Logout</Link></li>);
//     }
//   }
//   render() {
//     return (
//       <div className="mdl-layout mdl-js-layout">
//         <main className="mdl-layout__content">
//           <div className="mdl-grid">
//             <div className="mdl-card">
//               <div className="mdl-card__title">
//                 <h2>Home</h2>
//               </div>
//             </div>
//           </div>
//         </main>
//         <footer className="mdl-mini-footer">
//           <div className="mdl-mini-footer__middle-section">
//             <ul className="mdl-mini-footer__link-list">
//               {this.getLoggedIn()}
//               {this.getSetting()}
//             </ul>
//           </div>
//         </footer>
//       </div>
//     );
//   }
// }

// class Home extends Component {
//   render(){
//     return(
//       <div>
//         <main className="mdl-layout__content">
//         </main>
//         <footer className="mdl-mini-footer">
//           <div className="mdl-mini-footer__middle-section">
//             <ul className="mdl-mini-footer__link-list">
//             </ul>
//           </div>
//         </footer>
//         <li><Link to="/accounts/login">Login</Link></li>
//       </div>
//     );
//   }
// }

export default Home;
