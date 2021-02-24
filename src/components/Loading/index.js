import React from 'react'
import './style.css';

const Loading = props => {
    return (
        <div className="loadingContainer">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
export default Loading;
