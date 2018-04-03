import React, {Component} from 'react'
import Select from 'react-select';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup, Button, Row, Col, Alert} from 'react-bootstrap'
import Clipboard from 'clipboard-polyfill'
//import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faKey from '@fortawesome/fontawesome-free-solid/faKey'


import pwgen from '../services/password-generator'

export default class TicketForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copied: false,
            text:'',
            password:'',
            expiresOpt: '',
            expires:0,
            errorText: null,
            errorPassword: null,
            errorExpiresOpt: null,
            ErrorExpires: null
        }
     }
     handleTextChange(event) {
        const text = event.target.value;
        this.setState({text})
     }
     handlePasswordChange(event) {
        const password = event.target.value;
        this.setState({password})
     }
     getValidationState() {

     }
     generatePassword() {
         const password = pwgen()
         this.setState({
            password,
            copied: true
         })
         Clipboard.writeText(password).then(() => {
            setTimeout(()=>this.setState({copied: false}), 3000)
         });
     }
     handleExpiresOptChange(e) {
         if(e == null || e.value == null) {
            this.setState({ expiresOpt: null })
            return;
         }
        const expiresOpt = e.value;
        const expires = (expiresOpt === '-1')?15: parseInt(expiresOpt, 10)
        this.setState({ expiresOpt, expires })
    
     }
     handleExpiresChange({target:{value}}) {
        this.setState({expires: value})
     }
     handleSubmit(f) {
        console.log(this.state)
        const {text, password, expires, expiresOpt} = this.state;
        const errorText = (text === '')?'Please enter text': null
        const errorPassword = (password === '')?'Please enter or generate a password': null
        const errorExpiresOpt = (expiresOpt === '')?'Please select expires time ': null
        this.setState({errorText, errorPassword, errorExpiresOpt})
        
        if(errorText || errorPassword || errorExpiresOpt) {
            return;
        }
        const oneTime = expiresOpt === '0'
        this.props.onSubmit(text, password, expires, oneTime)
     }
    render() {
        const { sending } = this.props;
        return (
            
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                        >
                        <ControlLabel>Enter text you want protect:</ControlLabel>
                        <FormControl
                            componentClass="textarea" 
                            value={this.state.text}
                            placeholder="Enter text"
                            onChange={this.handleTextChange.bind(this)}
                            rows="7"
                        />
                        { this.state.errorText && <HelpBlock className="text-danger">{this.state.errorText}</HelpBlock> }
                        </FormGroup>

                        <FormGroup className="position-relative">
                            <ControlLabel>Enter password:</ControlLabel>
                            
                            <InputGroup>
                            <FormControl type="text" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}/>
                            <InputGroup.Addon>
                                <Button title="Generate a strong password" bsStyle="primary" onClick={this.generatePassword.bind(this)}><FontAwesomeIcon icon={faKey}/></Button>
                            </InputGroup.Addon>
                            </InputGroup>

                            { this.state.errorPassword && <HelpBlock className="text-danger">{this.state.errorPassword}</HelpBlock> }
                            { this.state.copied && <span className="copied-label position-absolute">Copied</span> }
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Expires:</ControlLabel>
                            <Row>
                                <Select
                                    name="form-field-name"
                                    className="col-md-4"
                                    value={this.state.expiresOpt}
                                    onChange={this.handleExpiresOptChange.bind(this)}
                                    options={[
                                        { value: '0', label: 'After read' },
                                        { value: '10', label: 'After 10 Minutes' },
                                        { value: '60', label: 'After 1 hours' },
                                        { value: '720', label: 'After 12 hours' },
                                        { value: '1440', label: 'After 1 day' },
                                        { value: '43200', label: 'After 30 days' },
                                        { value: '528400', label: 'After a year' },
                                        { value: '52840000', label: 'Infinity' },
                                        { value: '-1', label: 'Custom' },
                                    ]}f
                                />
                                { (this.state.expiresOpt === '-1' ) && (<FormControl type="text" placeholder="Custom expires time in minute" className="col-md-4" value={this.state.expires} onChange={this.handleExpiresChange.bind(this)}/>)}
                            </Row>
                            { this.state.errorExpiresOpt && <HelpBlock className="text-danger">{this.state.errorExpiresOpt}</HelpBlock> }

                        </FormGroup>
                        <FormGroup className="text-right">
                            <Button bsStyle="success" disabled={sending} onClick={this.handleSubmit.bind(this)}>{sending?"Sending...": "BIN IT"}</Button> &nbsp;
                        </FormGroup>

                        <Row>
                            <Col xs={12} md={12}> 
                            <Alert bsStyle="info">Your data will be protected with AES-256, We only storage the encrypted data so that if you loose your password it won't be recovery.</Alert>
                            </Col>
                        </Row>

                    </Form>
                    
          
        )
    }
}