import React,{Component} from 'react'
import {login,resetPassword} from '../helpers/Auth'
import 'pure-css'

export default class Login extends Component{
    constructor(props){
        super(props)

        this.state ={loginMessage:null
        }

        this.handleonSubmit=this.handleonSubmit.bind(this);
        this.resetPassword=this.resetPassword.bind(this);
        this.setError=this.setError.bind(this);

    }

    handleonSubmit(e){
        
        e.preventDefault()
        login(this.email.value,this.password.value)
        .catch(error=> this.setState(this.setError('usuario o password invalido')))

    }

    setError(err){
        return {loginMessage: err}

    }

resetPassword(){
    resetPassword(this.email.value)
    .then(()=>this.setState(this.setError(`se ha enviado un correo a <b>${this.email.value}</b> para restablecer su contraseña`)) )
    .catch(err=> this.setState(this.setError(`el email <b>${this.email.value}</b> no esta registrado` )))

}


    render(){
        return (
            <div>

            <h1>Login</h1>
            <form class="pure-form pure-form-aligned" onSubmit={this.handleonSubmit}>
    
            <div class="pure-control-group">
            <label for="email">Email Address</label>
            <input id="email" type="email" placeholder="Email Address" ref={email=>this.email=email }/>
            </div>

        <div class="pure-control-group">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Password" ref={password=> this.password=password}/>
        </div>
            {
                this.state.loginMessage &&
                <div className="error">
                    <p className="button-error">
                        Error: {this.state.loginMessage}
                        <a href="http://" onClick={this.resetPassword} className="alert-link">¿Olvidaste tu contraseña?</a>
                    </p>
                </div>


            }


        <div class="pure-controls">
            <input type="submit" class="pure-button pure-button-primary" value="submit"/>
        </div>
    
</form>
            </div>
        )
    }

}