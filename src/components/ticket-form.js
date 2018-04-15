import React, {Component} from 'react'
import ReactPasswordStrength from './react-password-strength'
import Select from 'react-select';
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Row, Col, Alert} from 'react-bootstrap'
import Clipboard from 'clipboard-polyfill'
import { Editor } from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js'
//import {stateToHTML} from 'draft-js-export-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faKey from '@fortawesome/fontawesome-free-solid/faKey'
import pwgen from '../services/password-generator'

export default class TicketForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            clientMode: true,
            copied: false,
            ipRestricted: false,
            text:'',
            ipAddresses: '',
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
        //console.log('event', event)
        const password = event.password;
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
         this.reactPasswordStrength.setValue( password);
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
        
        const {password, expires, expiresOpt, editorState, ipRestricted, ipAddresses, clientMode} = this.state;
        const errorText = !editorState.getCurrentContent().hasText()?'Please enter text': null
        const errorPassword = (password === '')?'Please enter or generate a password': null
        const errorExpiresOpt = (expiresOpt === '')?'Please select expires time ': null
        const ipAddressesError = (ipRestricted && ipAddresses === '')?'Please enter at least one ip address ': null
        this.setState({errorText, errorPassword, errorExpiresOpt, ipAddressesError})
        
        if(errorText || errorPassword || errorExpiresOpt) {
            return;
        }
        const oneTime = expiresOpt === '0'
        const {ip} = this.props
        const addresses = [];
        if(ip && ipRestricted) {
            addresses.push(ip)
            ipAddresses.split(';').map(x => addresses.push(x))
        }
        const html = document.querySelector('.DraftEditor-editorContainer').innerHTML;
        //console.log('html', html)
        this.props.onSubmit(html, password, expires, oneTime, addresses, clientMode)
     }
     onEditorStateChange(editorState) {
        const text = editorState.getCurrentContent().getPlainText();
        
        this.setState({editorState, text})
     }
    render() {
        const { sending, ip } = this.props;
        return (
            
            <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                <div className="pretty p-switch p-fill">
                    <input type="checkbox" checked={this.state.clientMode} onChange={({target: {checked}}) => this.setState({clientMode: checked})} />
                    <div className="state">
                        <label>Enable Client Encrypt/Decrypt</label>
                    </div>
                </div>
                
                </FormGroup>
                <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
                >
                <ControlLabel>Enter your content:</ControlLabel>
                <Editor
                    editorState={this.state.editorState}
                    toolbarClassName="editor-toolbar"
                    wrapperClassName="editor"
                    editorClassName="editor-input-control"
                    onEditorStateChange={this.onEditorStateChange.bind(this)}
                    />
                
                { this.state.errorText && <HelpBlock className="text-danger">{this.state.errorText}</HelpBlock> }
                </FormGroup>
                <FormGroup className="position-relative">
                    <ControlLabel>Enter password:</ControlLabel>
                    <div className="row">
                        <div className="col-md-12">
                            <ReactPasswordStrength
                                ref={ref => this.reactPasswordStrength = ref}
                                minLength={5}
                                minScore={2}
                                scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                                changeCallback={this.handlePasswordChange.bind(this)}
                                inputProps={{ name: "password_input", autoComplete: "off", className: "form-control", type:"text"}}
                                />
                        
                            <Button className="btn-generate-password" title="Generate a strong password" bsStyle="primary" onClick={this.generatePassword.bind(this)}><FontAwesomeIcon icon={faKey}/></Button>

                            { this.state.errorPassword && <HelpBlock className="text-danger">{this.state.errorPassword}</HelpBlock> }
                            { this.state.copied && <span className="copied-label position-absolute">Password copied to clipboard</span> }
                        </div>
                    </div>
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
                <FormGroup>
                <div className="pretty p-icon p-rotate">
                    <input type="checkbox" disabled={this.state.clientMode} checked={this.state.ipRestricted} onChange={({target: {checked}}) => this.setState({ipRestricted: checked})} />
                    <div className="state p-success">
                        <i className="icon mdi mdi-check"></i>
                        <label>IP Restricts:</label>

                    </div>
                </div>
                {this.state.ipRestricted && (<div className="mt-1">
                <FormControl placeholder="Enter ip addresses, separate by ';' " type="text" value={this.state.ipAddresses} onChange={({target: {value}}) => this.setState({ipAddresses: value})}/>
                <span className="text-info">Your IP Address: {ip} , will be allowed automatically. </span> <br/>
                { this.state.ipAddressesError && <HelpBlock className="text-danger">{this.state.ipAddressesError}</HelpBlock> }
                </div>)}
                    
                </FormGroup>
                <FormGroup className="text-right">
                    <Button bsStyle="success" disabled={sending} onClick={this.handleSubmit.bind(this)}>{sending?"Sending...": "PROTECT IT"}</Button> &nbsp;
                </FormGroup>

                <Row>
                    <Col xs={12} md={12}> 
                    <Alert bsStyle="info">Your data will be protected with AES-256, We only storage the encrypted data so that if you lost your password it won't be recovery.</Alert>
                    </Col>
                </Row>

            </Form>
                    
          
        )
    }
}
