import React from 'react'
import './style.css';

function ImageHolder(props) {
    let {url, key,imageId, onClickImage} = props;
    return (
        <div className="imageBoxItem"onClick = {() => onClickImage(imageId)}>
            <img className="image" src={url} alt={"alt"} key={key} />
        </div>
    )
}
export default ImageHolder
