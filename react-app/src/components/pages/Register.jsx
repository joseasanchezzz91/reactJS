import React,{Component} from 'react'
import {auth} from '../helpers/Auth'
import 'pure-css'

export default class Register extends Component{
    constructor(props){
        super(props)

        this.state ={loginMessage:null
        }

        this.handleonSubmit=this.handleonSubmit.bind(this);
       
        this.setError=this.setError.bind(this);

    }

    handleonSubmit(e){
        
        e.preventDefault()
        auth(this.email.value,this.password.value)
        .catch(err=> this.setState(this.setError(`Error: ${err.message}`)))

    }

    setError(err){
        return {loginMessage: err}

    }




    render(){
        return (
            <div>

            <h1>Registro de usuarios</h1>
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
                        
                    </p>
                </div>


            }


        <div class="pure-controls">
            <input type="submit" class="pure-button pure-button-primary" value="Registrar"/>
        </div>
    
</form>
            </div>
        )
    }

}