import React from 'react'
import LoadingIcon from './loading-bubbles.svg'
export default function Loading(props) {
    return (
        <div>
            <img src={LoadingIcon} width="60" alt="Loading"/>
        </div>
    )
}