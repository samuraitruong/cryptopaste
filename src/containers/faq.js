import React, {Component} from 'react'
import { connect } from 'react-redux'
import FAQActions from '../redux/faq-redux'

class FAQScreen extends Component {
    // constructor(props) {
    //     super(props)
    //  }
    componentDidMount() {
        this.props.getFAQ();
    }
    render() {
        const { loading, faqs} = this.props.faq
        if(faqs.length === 0) {
            return <span>Loading....</span>
        }
         return (
             <div className="faq-list">
                {faqs.map(item => {
                    return (<div key={item.id}>
                        <h5>{item.question}</h5>
                        <p  dangerouslySetInnerHTML={ {__html:item.anwser}} ></p>

                    </div>)
                })}
             </div>
         )
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getFAQ : () => dispatch(FAQActions.getFAQ())
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        faq: state.faq
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FAQScreen)