import React, { useState, useEffect, useCallback } from 'react'
import axios from  'axios';

import ImageHolder from "../../components/ImageContainer";
import Loading from '../../components/Loading';
import Info from '../../components/InfoContainer';
import ImagePreview from '../../components/ImagePreview';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import './App.css'

const imagePreviewModalStyles = {
  overlay:{
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content : {
    border: 'none',
    overflow:'hidden',
    background:'transparent',
    paddingRight: 120,
    paddingLeft: 120,
  }
};

const infoModalStyles = {
  overlay:{
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content : {
    border: 'none',
    overflow:'hidden',
    background: 'transparent',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
};

function App() {

  const [imageData, setImageData] = useState([]);  // holsd the fetched image collection

  const [selectedImage, setSelectedImage] = useState(); // current selected image for preview

  const [showPreview, setShowPreview] = useState(false); // flag to toggle image preview modal

  const [showInfo, setShowInfo] = useState(false); //flag to toggle image info modal

  const [isPrevDisabled, setprevDisabled] = useState(false);  // flag to set the previous button disabled


  // fucntion to fetch image data
  const fetchUserData =  (count=10) =>{
    let url = 'https://api.unsplash.com/photos/random?client_id=';
    let accesskey = process.env.REACT_APP_ACCESSKEY1;

    axios.get(`${url}${accesskey}&count=${count}`)
    .then((res) => {
      setImageData([...imageData, ...res.data]);
    });
    
  }

  useEffect(() => {
   fetchUserData();
  },[]);

  useEffect(() => {
    let totalImages = imageData.length -1;
    if(selectedImage){
      const selectedImageIndex = imageData?.findIndex((image) => image.id === selectedImage.id);

      // disabling/ enabling the previous button based on current index  
      if(selectedImageIndex === 0){
        setprevDisabled(true);
      }else{
        setprevDisabled(false);
      }
      // loading next set of images before reaching the end of imageData
      if(totalImages - selectedImageIndex <= 3){
        fetchUserData();
      }
    }
  }, [selectedImage])

  const onSelectImage = (id) => {
    const selectedImageIndex = imageData?.findIndex((image) => image.id === id);
    setSelectedImage(imageData[selectedImageIndex]);
    setShowPreview(true);
  }

  // next - previous click handlers

  const onClickNext = useCallback(() => {
    const selectedImageIndex = imageData?.findIndex((image) => image.id === selectedImage?.id);
    setSelectedImage(imageData[selectedImageIndex + 1]);
  },[imageData,selectedImage]);

  const onClickPrev = useCallback(() => {
    const selectedImageIndex = imageData?.findIndex((image) => image.id === selectedImage?.id);
    setSelectedImage(imageData[selectedImageIndex - 1]);
  },[imageData,selectedImage]);

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={imageData.length}
        next={fetchUserData}
        hasMore={true}
        loader={<Loading/>}
        style={{ overflow: 'hidden' }}
      >
        <div className="imageWrapper">
          {imageData.map(image => 
            <ImageHolder 
              url={image?.urls.full} 
              user = {image?.user} 
              key = {image.id} 
              imageId = {image.id}
              onClickImage = {onSelectImage}
            />  
          )}     
        </div>
      </InfiniteScroll>

      {/* image previe modal */}
      <Modal
          isOpen={showPreview}
          onRequestClose={()=> setShowPreview(false)}
          style={imagePreviewModalStyles}
        > 
          <ImagePreview 
            selectedImage={selectedImage} 
            toggleInfoPopup={() => setShowInfo(true)} 
            togglePreviewPopup={() => setShowPreview(false)}
            isPrevDisabled={isPrevDisabled}
            onClickPrev={onClickPrev}
            onClickNext ={onClickNext}
          />
        </Modal>

      {/* image Info modal */}
        <Modal
          isOpen={showInfo}
          onRequestClose={()=>setShowInfo(false)}
          style={infoModalStyles}
        >
          <Info selectedImage={selectedImage} toggleInfoPopup={() => setShowInfo(false)}/>
        </Modal>
    </div>
  );
}

export default App;
