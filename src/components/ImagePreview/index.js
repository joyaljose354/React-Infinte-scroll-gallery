import React, {useEffect,useState} from 'react'
import Loading from '../Loading';
import './style.css';

const ImagePreview = (props) => {
  const {selectedImage , toggleInfoPopup, togglePreviewPopup , isPrevDisabled ,onClickPrev, onClickNext} = props;

  const [isImageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {
    const handleKeyPress = (e) => {
      if(e.keyCode === 39){
        onClickNext();
      }
      else if(e.keyCode === 37 && !isPrevDisabled){
        onClickPrev();
      }
      else if(e.keyCode === 27){
        togglePreviewPopup();
      } 
    }
    document.addEventListener('keydown' , handleKeyPress);
    return (() => {
      document.removeEventListener('keydown',handleKeyPress);
    })
  });
  
    return (
        <>
            <div className="close" onClick={togglePreviewPopup}>
              <div className="close-container">
                <div className="leftright"></div>
                <div className="rightleft"></div>
              </div>
            </div>

            <div className="previousButton">
                <div className="arrow arrowLeft" disabled={isPrevDisabled} onClick ={onClickPrev}></div>
            </div>

            <>
              <div className='imageContainer'>
                <div className='content'>
                  <img className="imageSrc" src={selectedImage?.urls.regular} onLoad={()=> setImageLoaded(true)} loading ="lazy" alt={'alt'} />
                  {!isImageLoaded ? (
                    <div className ="loadingIcon">
                      <Loading/>
                    </div>
                    ):(
                    <div className="header">
                      <div className="user">
                        <div className= "profilePic">
                          <img src = {selectedImage?.user.profile_image.small} alt=""/>
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
                        <button className ="infoButton">i</button>
                      </div>
                    </div>
                  )}  
                </div>
              </div>       
            </>
            <div className="nextButton">    
                <div className="arrow arrowRight" onClick ={onClickNext}></div>
             </div>
        </>
    )
}

export default ImagePreview;