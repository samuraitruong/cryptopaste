import React, {Component} from 'react'
import { connect } from 'react-redux'
class StatisticWidget extends Component {
    constructor(props) {
        super(props)
     }
     
     render() {
         const {stats: {encrypt=0, decrypt}} = this.props.home;
        return (<span className="text-success">
           Encrypt: { encrypt }  - Decrypt: {decrypt}        </span>)
     }
}

const mapStateToProps = (state, ownProps) => {
    return {
        home: state.home
    }
}
export default connect(mapStateToProps, null)(StatisticWidget)