import React, { useState, useEffect, useCallback, useMemo } from 'react'
import axios from  'axios';

import ImageHolder from "../../components/ImageContainer";
import Loading from '../../components/Loading';
import Info from '../../components/InfoContainer';
import ImagePreview from '../../components/ImagePreview';
import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from 'react-modal';
import GlobalStyle from '../../theme';
import './App.css'

const customStyles = {
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

const customInfoStyles = {
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

  const [imageData, setImageData] = useState([]);

  const [selectedImage, setSelectedImage] = useState();

  const [showPreview, setShowPreview] = useState(false);

  const [showInfo, setShowInfo] = useState(false);

  const [isPrevDisabled, setprevDisabled] = useState(false);

  // const [element, setElement] = useState(null);

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
      if(selectedImageIndex === 0){
        setprevDisabled(true);
      }else{
        setprevDisabled(false);
      }
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

  const onClickNext = useCallback(() => {
    const selectedImageIndex = imageData?.findIndex((image) => image.id === selectedImage?.id);
    setSelectedImage(imageData[selectedImageIndex + 1]);
  },[ImageData,selectedImage]);

  const onClickPrev = useCallback(() => {
    const selectedImageIndex = imageData?.findIndex((image) => image.id === selectedImage?.id);
    setSelectedImage(imageData[selectedImageIndex - 1]);
  },[ImageData,selectedImage])

  // const loader = React.useRef(fetchUserData);
  // const observer = React.useRef(
  //   new IntersectionObserver((entries) => {
  //     // debugger;
  //     const first = entries[0];
  //     console.log(first);
  //     if(first.isIntersecting){
  //       loader.current();
  //     }
  //   }, {threshold: 1})
  // );

  // useEffect(() => {
  //   const currentElement = element;
  //   const currentObserver = observer.current;

  //   if(currentElement){
  //     currentObserver.observe(currentElement);
  //   }
  //   return ()=> {
  //     console.log('here');
  //     if(currentElement){
  //       currentObserver.unobserve(currentElement);
  //     }
  //   }
  // },[element])

  // useEffect(() => {
  //   loader.current = fetchUserData;
  // }, [fetchUserData])

  return (
    <div className="App">
      <GlobalStyle/>
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
              url={image?.urls.regular} 
              user = {image?.user} 
              key = {image.id} 
              imageId = {image.id}
              onClickImage = {onSelectImage}
            />  
          )}     
        </div>
      </InfiniteScroll>

      <Modal
          isOpen={showPreview}
          onRequestClose={()=> setShowPreview(false)}
          style={customStyles}
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

        <Modal
          isOpen={showInfo}
          onRequestClose={()=>setShowInfo(false)}
          style={customInfoStyles}
        >
          <Info selectedImage={selectedImage} toggleInfoPopup={() => setShowInfo(false)}/>
        </Modal>
    </div>
  );
}

export default App;
