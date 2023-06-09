import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpot.css';

import * as sessionActions from '../../store/session';
import * as storyActions from '../../store/story';
import { ModalContext } from '../../context/ModalContext';

const CreateSpot = () => {
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
  

  let timeoutId;




  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await dispatch(storyActions.createStory())
          
        
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
    <div className="host-form-page">
     
          <form onSubmit={handleSubmit}>


            <div className="host-form-spot-preview-image-header">
              Liven up your spot with photos
            </div>

            <div className="host-form-spot-preview-image-memo">
              Choose a file or submit a link to at least one photo to publish
              your spot.
            </div>

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
 
      <div className="image-container">
        <div className="image-main-container">
          <div className="image-main">
            {spotPreviewImageLoaded && (
              <img src={spotPreviewImage} alt="preview"></img>
            )}
          </div>
        </div>

        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />

        <div className="image-main-buttons">
          <button
            className="image-main-button-add button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Add Image
          </button>
          <button
            className="image-main-button-default button"
            onClick={makeDefault}
          >
            Make Default
          </button>
          <button
            className="image-main-button-delete button"
            onClick={deleteImage}
          >
            Delete Image
          </button>
        </div>


      </div>
    </div>

  );
};

export default CreateSpot;
