import React from 'react'
import './style.css';

const Info = props => {
    const {selectedImage, toggleInfoPopup} = props;   
    // loacl date string options
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    
    return (
        <div className = "infoContainer">
        <div className="infoClose" onClick={toggleInfoPopup}>
            <div class="close-container">
              <div class="leftright"></div>
              <div class="rightleft"></div>
            </div>
          </div>

          <div className="infoHeader">
            <span className='headerText'>Info</span>
            <div className='subHeader'>{`Published on ${new Date(selectedImage?.created_at).toLocaleDateString('en-us',options)}`}</div>
          </div>

          {/* Image statistics */}

          <div className="statistics">
            <div className ="viewStats">
              <span className="title">Views</span>
              <div className = 'value'>{selectedImage?.views.toLocaleString()}</div>
            </div>
            <div className="downloadStat">
              <span className="title">Downloads</span>
              <div className = 'value'>{selectedImage?.downloads.toLocaleString()}</div>
            </div>
            <div className="likesStat">
            <span className="title">Likes</span>
              <div className = 'value'>{selectedImage?.likes.toLocaleString()}</div>
            </div>
          </div>

          {/* Camera details */}

          <div className="cameraDetails">

            <div className="cameraItemGroup">
              <div className="cameraItem">
                <span className="title">Camera Make</span>
                <div className = 'value'>{selectedImage?.exif.make || "--"}</div>
              </div>
              <div className="cameraItemBottom">
                <span className="title">Aperture</span>
                <div className = 'value'>{selectedImage?.exif.aperture  || "--"}</div>
              </div>
            </div>

              <div className="cameraItemGroup">
                <div className="cameraItem">
                  <span className="title">Camera Model</span>
                  <div className = 'value'>{selectedImage?.exif.model  || "--"}</div>
                </div>
                <div className="cameraItemBottom">
                  <span className="title">Shutter speed</span>
                  <div className = 'value'>{selectedImage?.exif.exposure_time  || "--"}</div>
                </div>
              </div>

              <div className="cameraItemGroup">
                <div className="cameraItem">
                  <span className="title">Focal Length</span>
                  <div className = 'value'>{selectedImage?.exif.focal_length  || "--"}</div>
                </div>
                <div className="cameraItemBottom">
                  <span className="title">ISO</span>
                  <div className = 'value'>{selectedImage?.exif.iso  || "--"}</div>
                </div>
              </div>
            </div>

            {/* Image dimensions */}
            <div className="dimension">
                <span className="title">Dimensions</span>
                <div className ='value'>{`${selectedImage?.width} x ${selectedImage?.height}`}</div>
            </div>
        </div>
    )
}

export default Info;
