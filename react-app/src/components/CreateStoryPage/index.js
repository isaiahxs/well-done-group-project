import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateStoryPage.css';

import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import { ModalContext } from '../../context/ModalContext';

const CreateStoryPage = () => {
  const fileTypes = ['.png', '.jpg', 'jpeg'];
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrlClass, setImageUrlClass] = useState('');
  const [imageUrlText, setImageUrlText] = useState('');
  const [spotPreviewImage, setSpotPreviewImage] = useState('');
  const [spotPreviewImageFile, setSpotPreviewImageFile] = useState('');
  const [spotPreviewImageLoaded, setSpotPreviewImageLoaded] = useState(false);
  const [spotImages, setSpotImages] = useState([]);
  const [spotImageFiles, setSpotImageFiles] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  const [formSubmitted, setFormSubmitted] = useState(false);
  const user = useSelector((state) => state.session.user);
  const { modal, openModal, closeModal, needsRerender, setNeedsRerender, setUpdateObj } = useContext(ModalContext);
  const [defaultImage, setDefaultImage] = useState('');
  
  const image = useSelector((state) => state.story.image);
  const image2 = useSelector((state) => state.story.image2);

  console.log(image?.image);

  let timeoutId;


// console.log(imageUrl);
// console.log(spotImages[0].name);



console.log(spotPreviewImage);
console.log(spotPreviewImageFile);



  const handleSubmit = async (e) => {

    e.preventDefault();
    let createStoryObj = {}
    createStoryObj['images'] = spotImages

    const response = await dispatch(storyActions.createStory(createStoryObj))
          
        
  }


  
  const addImageFromUrl = async () => {
    if (imageUrl) {
      
      if (!fileTypes.includes(imageUrl.slice(-4))) {
        setImageUrl('Image must be .png .jpg or .jpeg format')
        setImageUrlClass('host-form-spot-preview-image-field red-font')
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setImageUrl(imageUrlText)
          setImageUrlClass('')
        }, 3000);
        return
      }
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'image_from_url', { type: blob.type });


        

        setSpotPreviewImage(URL.createObjectURL(file));
        setSpotPreviewImageFile(file);
        setSpotPreviewImageLoaded(true);
        setSpotImages((prevSpotImages) => [...prevSpotImages, file]);
        setImageUrl('');
      } catch (error) {
        console.error('Error fetching image from URL:', error);
        openModal('error')
        setUpdateObj('addImage')
      }
    }
  };

  const deleteImage = () => {
    const newImages = spotImages.filter((currentImage) => currentImage !== spotPreviewImageFile);
    setSpotImages(newImages);
  };

  const removeImage = (image) => {
    const newImages = spotImages.filter((currentImage) => currentImage !== image);
    setSpotImages(newImages);
  };




  const selectImage = (file) => {
    setSpotPreviewImage(URL.createObjectURL(file));
    setSpotPreviewImageFile(file);
  };

  const makeDefault = (file) => {
    const index = spotImages.findIndex(
      (currFile) => currFile === spotPreviewImageFile
    );
    if (index > 0) {
      const newImages = [
        spotImages[index],
        ...spotImages.slice(0, index),
        ...spotImages.slice(index + 1),
      ];
      setSpotImages(newImages);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {

      setSpotPreviewImage(URL.createObjectURL(file));
      setSpotPreviewImageFile(file);
      setSpotPreviewImageLoaded(true);
      setSpotImages(() => [...spotImages, file]);
    }
  };


  return (
    <div className="createstory-container">

    <div className="createstory-container">
     
          <form onSubmit={handleSubmit}>

            <label className="host-form-spot-preview-image">
              Add image from URL (.png .jpg .jpeg format only)
              <input
                className={ imageUrlClass === '' ? `host-form-spot-preview-image-field` : imageUrlClass}
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImageUrlText(e.target.value)
                }}
                placeholder='Add image from URL'
              />
              <button
                className="add-image-from-url button"
                type="button"
                onClick={addImageFromUrl}
              >
                Add From URL
              </button>
            </label>

            <button type="submit"> 
              Submit
            </button>
          </form>

          <button
            className="host-form-add-spot-image-button button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Add Image
          </button>
          <button
            className="host-form-add-spot-image-button button"
            onClick={() => dispatch(storyActions.storyImageTest())}
          >
            load in Image
          </button>
 
      <div className="image-container">
        <div className="image-main-container">
          <div className="image-main">
            {spotPreviewImageLoaded && (
              <img src={spotPreviewImage} alt="preview"></img>
            )}
          </div>

          <div className="image-main">
          
              <img src='https://well-done-proj.s3.us-east-2.amazonaws.com/Screenshot_2023-06-10_at_12.34.11_AM.png' alt="preview"></img>
           
          </div>
          <div className="image-main">
          
              <img src={image?.image} alt="preview"></img>
           
          </div>

          <div className="image-main">
          
              <img src={image} alt="preview"></img>
          
          </div>

          <div className="image-main">
          
              <img src={image2} alt="preview"></img>
          
          </div>

          <div className="image-main">
          
              <img src='https://well-done-proj.s3.amazonaws.com/Screenshot_2023-06-10_at_12.34.11_AM.png?AWSAccessKeyId=AKIAZX5EVMCUOIBBFI6O&Signature=fiVe6Rjtc43ODqBtno2wP%2Fy3SgE%3D&Expires=1686388467' alt="preview"></img>
          
          </div>

          
        </div>

        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />

  


      </div>
    </div>
    <div className='imagelist'>
      {spotImages && spotImages.length > 0 && spotImages.map((image, i) => {
        return image && image.name ? <div className='listitem' key={i}>{image.name}</div> : null
      })}
    </div>

    </div>

  );
};

export default CreateStoryPage;
