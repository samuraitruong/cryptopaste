import React, {Component} from 'react'
import HomeActions from '../redux/home-redux'
import { connect } from 'react-redux'
import TicketForm from '../components/ticket-form'
import ViewTicket from '../components/view-ticket'
class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { ticketId: null}
     }
     submitForm(text, password, expires, oneTime, ipAddresses, clientMode) {
         this.props.submit(text, password, expires, oneTime, ipAddresses, clientMode)
     }
     decryptTicket(ticket, password) {
        this.props.decryptTicket(ticket, password)
     }
     createNew() {
         this.props.reset()
     }
     
     delete(ticket, password) {
        this.props.deleteTicket(ticket, password)
     }
     componentWillReceiveProps(newProps) {
         const {id} = newProps.home;
         console.log('componentWillReceiveProps', id)
         if(id && id !== this.state.ticketId) {
             this.setState({ticketId: id})
             this.props.getTicketInfo(id)
         }
         if(!id){
            this.setState({ticketId: null})
         } 
     }
     componentDidMount() {
         const { ticketId } =  this.props
         this.setState( { ticketId}, ()=> {
            if(ticketId) {
                this.props.getTicketInfo(ticketId)
            }
        })
     }
     render() {
         const { sending, ticket, error, decrypted, deleting, deleted, ip } = this.props.home;
         return this.state.ticketId == null? <TicketForm  ip={ip} onSubmit={this.submitForm.bind(this)} sending={sending}/> :  <ViewTicket deleted={deleted} deleting={deleting} key={this.state.ticketId} onDecrypt={this.decryptTicket.bind(this)} sending={sending} error={error} ticket={ticket} onCreateNew={this.createNew.bind(this)} decrypted={decrypted} onDelete={this.delete.bind(this)}/> 
     }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submit: (text, password, expires, oneTime, ipAddresses, clientMode) =>  dispatch(HomeActions.submit(text, password, expires, oneTime, ipAddresses, clientMode)),
        getTicketInfo: (ticketId) => dispatch(HomeActions.getTicketInfo(ticketId)),
        decryptTicket : (ticket, password) => dispatch(HomeActions.decryptTicket(ticket, password)),
        deleteTicket : (ticket, password) => dispatch(HomeActions.deleteTicket(ticket, password)),
        reset :() => dispatch(HomeActions.reset())
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        home: state.home
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)