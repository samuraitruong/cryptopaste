import React, {Component} from 'react'
import Moment from 'moment'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import faCopy from '@fortawesome/fontawesome-free-solid/faCopy'


import { Link } from 'react-router-dom'
import {Form, FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup, Button, Alert} from 'react-bootstrap'
import Loading from '../components/loading'

export default class ViewTicket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copied: false,
            password: '',
            errorPassword: ''
        }
    }
    handleSubmit(form){
        const {password} = this.state;
        const errorPassword = (password ==='')?'Please enter valid password to decrypt this message' : ''
        this.setState({errorPassword})
        if(errorPassword !== '') {
            return;
        }
        this.props.onDecrypt(this.props.ticket.id, password)
    }
    handlePasswordChange(e) {
        const password = e.target.value;
        this.setState({password})
    }
    onCopy() {
        this.setState({copied: true})
        setTimeout(() => {
            this.setState({copied: false})
        }, 3000)
    }
    render() {
        const {ticket, error, sending, decrypted, deleting, deleted} = this.props;
        if(ticket === null &&  error === null) {
            return <Loading />
        }
        if(ticket === null && error) {
            return (<Alert bsStyle="danger">{error} <br/><Link to="/" className="btn btn-primary mt-2" onClick={()=>this.props.onCreateNew()}>Create New</Link></Alert>)
        }
        return (
                    
            <Form onSubmit={this.handleSubmit.bind(this)}>
            {error && (
                <Alert bsStyle="warning">{error}</Alert>
            )}
                <Alert bsStyle="success">
                Your Url: {document.location.href}  
                <span className="float-right pointer" title="Copy this link">
                    {this.state.copied? "Copied  ": null}
                    <CopyToClipboard text={document.location.href} onCopy={this.onCopy.bind(this)}><FontAwesomeIcon icon={faCopy} color="black" /></CopyToClipboard>
                </span>
                </Alert>
                <FormGroup controlId="formBasicText">
                <ControlLabel>{decrypted?"Your text message:":"Your encrypted message:"}</ControlLabel>
                <FormControl
                    componentClass="textarea" 
                    readOnly={true}
                    value={ticket.text}
                    rows="7"
                />
                 {!ticket.oneTime && !deleted && <HelpBlock className="text-primary">Your message will be expired in {Moment(ticket.expires*1000).fromNow()} ({Moment(ticket.expires*1000).format('DD/MM/YYYY h:mm:ss a')}).</HelpBlock> }
                {ticket.oneTime && !decrypted && !deleted  && <HelpBlock className="text-primary">Your message will be deleted after read.</HelpBlock> }
                {ticket.oneTime && decrypted && <HelpBlock className="text-danger">Your message has been deleted.</HelpBlock> }

                </FormGroup>
                { decrypted && !deleted && <Alert bsStyle="success">Your message has been decrypted successful.</Alert>}
                { deleted && <Alert bsStyle="success">Your ticket has been deleted successful.</Alert>}
                { !deleted && (
                <FormGroup>
                    <ControlLabel>Enter password:</ControlLabel>
                    
                    <InputGroup>
                    <FormControl type="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} readOnly={decrypted}/>
                    <InputGroup.Addon>
                    { !decrypted && <Button bsStyle="primary" onClick={this.handleSubmit.bind(this)} readOnly={sending}>{sending? "DECRYPTING...":" DECRYPT "}</Button> }
                    { decrypted && <Button bsStyle="danger" onClick={()=> this.props.onDelete(ticket.id, this.state.password)}>{deleting?"DELETING...":"DELETE"}</Button> }
                    </InputGroup.Addon>
                    </InputGroup>

                    { this.state.errorPassword && <HelpBlock className="text-danger">{this.state.errorPassword}</HelpBlock> }

                </FormGroup>)}
                <FormGroup className="text-right">
                    
                    <Link className="btn btn-success" to="/" onClick={()=>this.props.onCreateNew()}>CREAT NEW</Link>
                </FormGroup>
            </Form>
        )
    }
}