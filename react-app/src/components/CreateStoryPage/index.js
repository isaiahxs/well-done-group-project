import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import './CreateStoryPage.css';
import addContent from '../../public/add-content.svg';
// import textIcon from '../../public/text-icon.svg';

import * as storyActions from '../../store/story';
import AutoExpandTextArea from '../AutoExpandTextArea';

const CreateStoryPage = ({ story }) => {
  const location = useLocation();
  const [blocks, setBlocks] = useState([]);
  const [titleText, setTitleText] = useState('');
  const [storyTags, setStoryTags] = useState([{ id: 2, tag: 'Programming' }]);
  const [imagesToUpdate, setImagesToUpdate] = useState({});
  const [validationErrors, setValidationErrors] = useState({ hasBlockContent: false, hasTitle: false });
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [showPublishButton, setShowPublishButton] = useState(false)



  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  // const tags = useSelector((state) => state.story.tags);
  const currentStory = useSelector((state) => state.story.currentStory);

  const { id } = useParams();



  useEffect(() => {

    if (!user) {
      history.push('/home')
    }

  }, [user]);


  useEffect(() => {

    if (location.pathname === `/create/${id}/edit`) {
      if (id) {
        dispatch(storyActions.getStoryById(id));
      }
    }

  }, [id]);


  useEffect(() => {
    setBlocks([]);
    setTitleText('');
  }, [location]);


  useEffect(() => {

    if (location.pathname !== `/create/${id}/edit`) {
      return
    }


    if (currentStory && currentStory.authorId !== user.id) {
      history.push('/create');
    }

    if (currentStory && currentStory.authorId === user.id) {
      // let tempArr = [];
      let lastPosition = 0;
      let blocksTemp = [];

      setTitleText(currentStory.title);

      currentStory.images.forEach((image, i) => {

        imagesToUpdate[image.id] = image;
        setImagesToUpdate({ ...imagesToUpdate });

        let text = currentStory.content.slice(lastPosition, image.position);
        let img = image.url;
        let altTag = image.altTag;

        // add text block if there is text before the image
        if (image.position > 0) {
          blocksTemp.push({ type: 'text', content: text });
        }

        // add image block
        blocksTemp.push({
          type: 'awsimage',
          content: img,
          altTag,
          id: image.id,
          position: image.position,
        });

        lastPosition = image.position;
      });

      // Check if there's remaining content
      if (lastPosition < currentStory.content.length) {
        let remainingText = currentStory.content.slice(lastPosition);
        blocksTemp.push({ type: 'text', content: remainingText });
      }

      // set blocks for the current currentStory
      setBlocks(blocksTemp);
    }
  }, [currentStory]);



  useEffect(() => {
    setButtonDisabled(true)

    setShowPublishButton(false)

    if (blocks.length > 3) {
      setShowPublishButton(true)
    }

    const errors = {};

    if (!titleText.length) {
      errors['hasTitle'] = true;
      setButtonDisabled(true)
    } else {
      errors['hasTitle'] = false;
    }

    if (!blocks.length) {
      errors['hasBlock'] = true;
    }

    if (blocks.length) {
      errors['hasBlockContent'] = !blocks.some(block => block.type === 'text' && block.content.length > 0);
    }

    setValidationErrors(errors);
  }, [blocks, titleText]);



  useEffect(() => {
    const hasTrueValue = obj => Object.values(obj).some(v => v === true);
    if (hasTrueValue(validationErrors)) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }

  }, [validationErrors, blocks, titleText]);


  const addBlock = (type, content = '', altTag = '') => {
    if (type === 'image') {
      fileInputRef.current.click();
    }
    if (type === 'text') {

      const newBlock = { type: 'text', content, altTag };
      setBlocks([...blocks, newBlock]);

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 500);
    }
  };


  const deleteBlock = (index) => {
    //if this block contains an image that we need to update, handle the block in imagesToUpdate
    if (imagesToUpdate[blocks[index].id]) {
      delete imagesToUpdate[blocks[index].id];
      setImagesToUpdate({ ...imagesToUpdate });
    }

    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const handleFileSelect = (e) => {


    let file = e.target.files[0];
    let timestamp = Date.now();

    let filenameParts = file.name.split('.');
    let extension = filenameParts.pop();
    let filename = filenameParts.join('.');

    // Create a new file name with timestamp
    let newFileName = `${filename}_${timestamp}.${extension}`;

    // Create a new file with the same content but with a new name
    let newFile = new File([file], newFileName, { type: file.type });

    if (newFile) {
      const newBlock = { type: 'image', content: newFile, altTag: '' };
      setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    }


    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);

    e.target.value = null;
  };

  const handleSubmit = async (e) => {

    if (!user) return;
    if (buttonDisabled) return;



    e.preventDefault();
    let createStoryObj = {};
    let content = [];
    let storyImages = [];
    let lastPos = 0;

    createStoryObj['author'] = user.id;
    createStoryObj['title'] = titleText;
    createStoryObj['id'] = id;
    createStoryObj['timeToRead'] = Math.floor(Math.random() * 20 + 4);
    createStoryObj['tags'] = storyTags;

    if (location.pathname !== `/create/${id}/edit`) {
      blocks.map((block) => {
        if (block.type === 'text') {
          content.push(block.content);
          lastPos += block.content.length;
        }

        if (block.type === 'image') {
          storyImages.push({
            file: block.content,
            altTag: block.altTag ? block.altTag : 'Story image',
            position: lastPos,
          });
        }
      });

      let joinedContent = content.join('');
      createStoryObj['slicedIntro'] = joinedContent.slice(0, 130) + '...';
      createStoryObj['content'] = joinedContent;
      createStoryObj['images'] = storyImages;
    }

    if (location.pathname === `/create/${id}/edit`) {
      blocks.map((block) => {
        if (block.type === 'text') {
          content.push(block.content);
          lastPos += block.content.length;
        }

        if (block.type === 'awsimage') {
          // if the image is still at the position we delete the image from the imagesToUpdate obj
          if (lastPos === imagesToUpdate[block.id].position) {
            delete imagesToUpdate[block.id];
            setImagesToUpdate({ ...imagesToUpdate });
          }

          // if the image is NOT at the position we update the image's position in the imagesToUpdate obj
          else if (lastPos !== imagesToUpdate[block.id].position) {
            imagesToUpdate[block.id].position = lastPos;
            setImagesToUpdate({ ...imagesToUpdate });
          }
        }

        if (block.type === 'image') {
          storyImages.push({
            file: block.content,
            altTag: block.altTag ? block.altTag : 'Story image',
            position: lastPos,
          });
        }
      });

      let joinedContent = content.join('');
      createStoryObj['slicedIntro'] = joinedContent.slice(0, 130) + '...';
      createStoryObj['content'] = joinedContent;
      createStoryObj['images'] = storyImages;
      createStoryObj['imagesToUpdate'] = imagesToUpdate;
    }

    let response;

    if (location.pathname === `/create/${id}/edit`) {
      response = await dispatch(storyActions.updateStory(createStoryObj));
    }

    if (location.pathname !== `/create/${id}/edit`) {
      response = await dispatch(storyActions.createStory(createStoryObj));
    }

    if (response && response.id) {
      history.push(`/story/${response.id}`);
      return;
    }
  };



  return (
    <div className="createstory-container">
      <form className="article-container">

        <div className='flex publish-container'>

          <div
            className={`createstorypage-publish memo-text flexcenter ${buttonDisabled ? 'disabled' : ''}`}
            type="submit"
            onClick={handleSubmit}
          >
            Publish
          </div>
        </div>



        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />

        <div className="title-input-container">
          <label className="input-label">
            <input
              className="title-input header-text"
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              placeholder="Title"
            />
          </label>
        </div>

        {blocks.map((block, index) => {
          if (block.type === 'text') {
            return (
              <div className="text-wrapper" key={index}>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteBlock(index)}
                >
                  X
                </button>

                <div className="text-container memo-text">
                  <AutoExpandTextArea
                    text={block.content}
                    onTextChange={(value) => {
                      const newBlocks = [...blocks];
                      newBlocks[index].content = value;
                      setBlocks(newBlocks);
                    }}

                  />
                </div>



              </div>
            );
          } else if (block.type === 'image') {
            return (
              <div className="image-wrapper" key={index}>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteBlock(index)}
                >
                  X
                </button>
                <div className="image-container">
                  {block.content ? (
                    <img
                      className="story-image"
                      src={URL.createObjectURL(block.content)}
                      alt=""
                    />
                  ) : null}
                  <input
                    className="alt-text-input"
                    value={block.altTag}
                    onChange={(e) => {
                      const newBlocks = [...blocks];
                      newBlocks[index].altTag = e.target.value;
                      setBlocks(newBlocks);
                    }}
                    placeholder="Add alt tag"
                  />
                </div>
              </div>
            );
          } else if (block.type === 'awsimage') {
            return (
              <div className="image-wrapper" key={index}>
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteBlock(index)}
                >
                  X
                </button>
                <div className="image-container">
                  {block.content ? (
                    <img className="story-image" src={block.content} alt="" />
                  ) : null}
                  <input
                    className="alt-text-input"
                    value={block.altTag}
                    onChange={(e) => {
                      const newBlocks = [...blocks];
                      newBlocks[index].altTag = e.target.value;
                      setBlocks(newBlocks);
                    }}
                    placeholder="Add alt tag"
                  />
                </div>
              </div>
            );
          }
        })}

        <div className="tags-container">
          <div className="added-tags-container"></div>
          <div className="tags-container"></div>
        </div>

        <div className="createstorypage-buttons-container">
          <div className="createstorypage-add-content-button">
            {' '}
            <img src={addContent} alt="" />
          </div>
          {blocks.length > 0 && blocks[blocks.length - 1].type !== 'text' && (
            <button
              type="button"
              className="add-button"
              onClick={() => addBlock('text')}
            >
              <i className="fa-solid fa-font"></i>

            </button>
          )}
          {blocks.length === 0 && (
            <button
              type="button"
              className="add-button"
              onClick={() => addBlock('text')}
            >
              <i className="fa-solid fa-font"></i>

            </button>
          )}
          <button
            type="button"
            className="add-button"
            onClick={() => addBlock('image')}
          >
            <i className="fa-solid fa-camera"></i>
          </button>
        </div>

        <div className='flex publish-container bottom'>


        </div>
        {showPublishButton && (<div
          className={`createstorypage-publish memo-text flexcenter ${buttonDisabled ? 'disabled' : ''}`}
          type="submit"
          onClick={handleSubmit}
        >
          Publish
        </div>)}
      </form>

    </div>
  );
};

export default CreateStoryPage;
