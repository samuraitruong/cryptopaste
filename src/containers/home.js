import React, {Component} from 'react'
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup, Button} from 'react-bootstrap'
import HomeActions from '../redux/home-redux'
import { connect } from 'react-redux'
import pwgen from '../services/password-generator'
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text:null,
        }
     }
     handleChange(event) {

     }
     getValidationState() {

     }
     generatePassword() {
         const password = pwgen()
         this.setState({
            password
         })
     }
     render() {
         return (
             <div className="row mt-5">
                <div className="col-md-12">
                    <Form>
                        <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                        >
                        <ControlLabel className="float-left">Enter text you want protect</ControlLabel>
                        <FormControl
                            componentClass="textarea" 
                            value={this.state.text}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                            rows="7"
                        />
                        </FormGroup>

                        <FormGroup>
                        <ControlLabel  className="float-left">Enter password</ControlLabel>
                            
                            <InputGroup>
                            <FormControl type="text" value={this.state.password}/>
                            <InputGroup.Addon>
                                <Button bsStyle="primary" onClick={this.generatePassword.bind(this)}>Generate Password</Button>
                            </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup className="text-left">
                            <Button bsStyle="success">PIN IT</Button>
                            <Button bsStyle="danger">DELETE</Button>
                        </FormGroup>
                    </Form>
                </div>
          </div>
          
         )
     }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submit: (text, password, expires) => {
            dispatch(HomeActions.submit(text, password, expires))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        home: state.home
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)