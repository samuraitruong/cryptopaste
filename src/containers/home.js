import React, {Component} from 'react'
import HomeActions from '../redux/home-redux'
import { connect } from 'react-redux'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
     }
     render() {
         return (
             <div>  Crypto paste </div>
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