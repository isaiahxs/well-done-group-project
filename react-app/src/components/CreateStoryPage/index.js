import React, { useState, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateStoryPage.css';

import * as storyActions from '../../store/story';


const CreateStoryPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [titleText, setTitleText] = useState('');
  const [showLabel, setShowLabel] = useState('');
  const [storyTags, setStoryTags] = useState([{id:2, tag:"Programming"}]);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const tags = useSelector((state) => state.story.tags);



  const addBlock = (type) => {
    const newBlock = { type, content: '', altTag: '' };
    setBlocks([...blocks, newBlock]);
    if (type === 'image') {
      fileInputRef.current.click();
    }
  }

  const deleteBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newBlocks = [...blocks];
      newBlocks[blocks.length - 1].content = file; 
      setBlocks(newBlocks);
    }
  };

  const handleSubmit = async (e) => {

    console.log('submit');

    if(!user) return
    e.preventDefault();
    let createStoryObj = {};


    createStoryObj['author'] = user.id
    createStoryObj['title'] = titleText

    let content = []
    let storyImages = []

    let lastPos = 0

    blocks.map((block) => {
      console.log(lastPos);
      if (block.type === 'text') {
        content.push(block.content);
        lastPos += block.content.length;
      } 
      
      if (block.type === 'image') {
        console.log(lastPos);
        console.log(block.altTag);
        storyImages.push({
          
          file: block.content,
          altTag: block.altTag ? block.altTag : 'Story image',
          position: lastPos
        });
      }
    });


    let joinedContent = content.join(' ')
    console.log(content);

    createStoryObj['content'] = joinedContent
    createStoryObj['images'] = storyImages
    createStoryObj['tags'] = storyTags
    createStoryObj['slicedIntro'] = joinedContent.slice(0,130) + '...'
    createStoryObj['timeToRead'] = Math.floor(Math.random() * (20) + 4)


    console.log(createStoryObj);

    console.log(createStoryObj);

    


    const response = await dispatch(storyActions.createStory(createStoryObj));

    if(response && response.id){

      console.log(response);
      history.push(`/story/${response.id}`)
    }
    if(response.ok){
    }
    console.log(response);
  };
 
  
  
  
  // story{
  //   content: '3241234  1324 12 34 123 412 34 1234'
  //   storyImages [{url:'', position:6},{url:'', position:16}]
  // }
// if(story){
// for iamge in storyImages
//  content = {
//   type:text,
//   content:storyImages.slice(lastPosition,storyImage[i].position)
//  } 
//  content = {
//   type:image,
//   content: image.url
//  }

// }



console.log(blocks);


  return (
    <div className="createstory-container">
      <form className="article-container" >

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleFileSelect}
        />

<div className='title-input-container'>
  
          {showLabel === 'title' && <div className='title-label'>Title</div>}
        <label className="input-label">
          <input
            className='title-input header-text'
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="Title"
            onFocus={() => setShowLabel('title')}
            onBlur={() => setShowLabel(false)}
          />
        </label>
</div>

        {blocks.map((block, index) => {
          if (block.type === 'text') {
            return (
              <div className="text-wrapper" key={index}>
                <button type="button" className="delete-button" onClick={() => deleteBlock(index)}>X</button>
              <div className="text-container">
                <textarea
                  className="text-input"
                  value={block.content}
                  onChange={(e) => {
                    const newBlocks = [...blocks];
                    newBlocks[index].content = e.target.value;
                    setBlocks(newBlocks);
                  }}
                />
              </div>
              </div>

            );
          } else if (block.type === 'image') {
            return (
              <div className="image-wrapper" key={index}>
                  <button type="button" className="delete-button" onClick={() => deleteBlock(index)}>X</button>
                <div className="image-container">
                  {block.content ? 
                  <img className="story-image" src={URL.createObjectURL(block.content)} alt="" /> : 
                  null}
                  <input
                    className="alt-text-input"
                    value={block.altTag}
                    onChange={(e) => {
                      const newBlocks = [...blocks];
                      newBlocks[index].altTag = e.target.value;
                      setBlocks(newBlocks);
                    }}
                    placeholder='Add alt tag'
                  />
                </div>
              </div>
            );
          }
        })}

        <div className='tags-container'>
          <div className='added-tags-container'>

          </div>
          <div className='tags-container'>

          </div>


        </div>


        <div>
          {blocks.length > 0 && blocks[blocks.length-1].type !== 'text' && <button type="button" className="add-button" onClick={() => addBlock('text')}>Add New Section</button>}
          {blocks.length === 0 && <button type="button" className="add-button" onClick={() => addBlock('text')}>Add New Section</button>}
          <button type="button" className="add-button" onClick={() => addBlock('image')}>Add Image</button>
        </div>

        <button type="submit" onClick={handleSubmit} >Submit</button>
      </form>
    </div>
  );
};

export default CreateStoryPage;
