import React, { Component } from 'react';
import logo from './media/logo.svg';
import {logout} from './helpers/Auth'
import './index.css';
import 'pure-css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import About from './pages/About'
import Error404 from './pages/Error404'
import Protegida from './pages/protected/'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
import { firebaseAuth } from '../data/config'


const PrivateRoute = ({component: Component,authed,rest })=>(
  <Route
  {...rest}
  render={
    props => authed === true
    ? <Component {...props} />
    : <Redirect to={ { pathname:'/login', state: { from: props.location } }}/>
  }
  />
)
const PublicRoute = ({component: Component,authed,rest })=>(
  <Route
  {...rest}
  render={
    props=>authed === false
    ? <Component {...props} />
    : <Redirect to='/cursos'/>
  }
  />
)




class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true
    };
    this.handleOnClick = this.handleOnClick.bind(this);

  }

  handleOnClick(e) {
    document.getElementById('tuckedMenu').classList.toggle('custom-menu-tucked');
    document.getElementById('toggle').classList.toggle('x');

  }


  componentDidMount(){
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
if(user){
  this.setState({
    authed: true,
    loading: false
  })
}else{
  this.setState({
    loading: false
  })
}

    })

  }
  componentWillUnmount(){
    this.removeListener();
  }


  //  aqui es el metodo de consumir servicio
  // componentWillMount() {
  //   fetch('https://api.myjson.com/bins/15gh5h')
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((cur) => {
  //       this.setState({ cursos: cur.cursos })
  //       console.log(cur.cursos)
  //     })
  // }



  render() {
    return (this.state.loading === true
      ?
      <h1>CARGANDO...</h1>
      :
      <Router>
        <div className="Appp">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Bienvenidos a React 2018</h1>
          </header>
          <div className="custom-menu-wrapper">
          <div className="pure-menu custom-menu custom-menu-top">
              <a href="" className="pure-menu-heading custom-menu-brand">
              <img src={logo} className="App-logo" alt="logo" />
              </a>
              <a href="#" className="custom-menu-toggle" id="toggle" onClick={this.handleOnClick} ><s className="bar"></s><s className="bar"></s></a>
          </div>
          <div className="pure-menu pure-menu-horizontal pure-menu-scrollable custom-menu custom-menu-bottom custom-menu-tucked" id="tuckedMenu">
              <div className="custom-menu-screen"></div>
              <ul className="pure-menu-list">
                  <li className="pure-menu-item"><Link to="/" className="pure-menu-link"onClick={this.handleOnClick}>Home</Link></li>
                  <li className="pure-menu-item"><Link to="/about" className="pure-menu-link"onClick={this.handleOnClick}>About</Link></li>
                  {
                    (this.state.authed)
                    ?
                    <span>
                      <li className="pure-menu-item"><Link to="/cursos" className="pure-menu-link"onClick={this.handleOnClick}>Cursos</Link></li>
                      <li className="pure-menu-item"><Link to="/login" className="pure-menu-link"onClick={()=>{
                        logout()
                        this.setState({authed:false})
                        this.handleOnClick()

                       } }>Logout</Link></li>
                    </span>
                    :
                    <span>
                      <li className="pure-menu-item"><Link to="/login" className="pure-menu-link"onClick={this.handleOnClick}>Login</Link></li>
                      <li className="pure-menu-item"><Link to="/register" className="pure-menu-link"onClick={this.handleOnClick}>Register</Link></li>
                  
                    </span>
                  }
                
                  
                  
              </ul>
          </div>
      </div>
          <main className="Main">
            <Switch>
              <Route path='/' exact component={Home} />
              <Route authed={this.state.authed} path='/about' component={About} />
              <PublicRoute authed={this.state.authed} path='/login' component={Login} />
              <PublicRoute authed={this.state.authed} path='/register' component={Register} />
              <PrivateRoute authed={this.state.authed} path='/cursos' component={Protegida} />
              <Route Component={Error404} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
};


export default MyComponent;







