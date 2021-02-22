import React from 'react'
import './style.css';

function ImageHolder(props) {
    let {url, key, user,imageId, onClickImage} = props;
    return (
        <div className="imageBoxItem"onClick = {() => onClickImage(imageId)}>
            <img className="image" src={url}  loading ="lazy" alt={"alt"} key={key} />
        </div>
    )
}

export default ImageHolder
