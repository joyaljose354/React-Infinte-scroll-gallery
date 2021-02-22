import React from 'react'
import Loading from '../Loading';
import './style.css';

const ImagePreview = (props) => {

    const {selectedImage , toggleInfoPopup, togglePreviewPopup , isPrevDisabled ,onClickPrev, onClickNext} = props;
    return (
        <>
            <div className="close" onClick={togglePreviewPopup}>
              <div class="close-container">
                <div class="leftright"></div>
                <div class="rightleft"></div>
              </div>
            </div>
            <div className="buttonLeft">
                <div className="arrow arrowLeft" disabled={isPrevDisabled} onClick ={onClickPrev}></div>
            </div>
            <div className="imagePreview">
              <div className="header">
                <div className="user">
                  <div className= "profilePic">
                    <img src = {selectedImage?.user.profile_image.small}/>
                  </div>
                  <div className="userName">
                    <span className="name">{selectedImage?.user.name}</span>
                    {selectedImage?.user.instagram_username && (
                      <div>
                        {`@${selectedImage?.user.instagram_username}`}
                      </div>)}
                  </div>
                </div>
                <div className="infoButton" onClick={toggleInfoPopup}>
                  <button className= "infoButton">Info</button>
                </div>
              </div>
              {selectedImage ? (
                <div className='imageContainer'>
                  <div className='imageBox'>
                    <img className="imageSrc" src={selectedImage?.urls.regular}  loading ="lazy" alt={'alt'} />
                  </div>
                </div>
              ) 
              :(
                <div className="imageSrc">
                  <Loading/>
                </div>
              )}       
            </div>
            <div className="buttonRight">    
                <div className="arrow arrowRight" onClick ={onClickNext}></div>
             </div>
        </>
    )
}

export default ImagePreview;