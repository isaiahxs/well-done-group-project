import React from 'react'
import './ArticleTileOne.css'

const ArticleTileOne = ({article}) => {


  console.log(article);

console.log(article.firstName);

  return (
    <div className='article-tile-style1'>
      <div className='style1-number memo-text'>0{article.num}</div>


      <div className='style1-content'>
      
        <div className='style1-author-container flexbetween'>
          <div className='style1-profile-pic'>{article.profileImage}</div>
          <div className='style1-author-name memo-text'>{article.firstName}{' '}{article.lastName}</div>
        </div>
        <div className='style1-article-title-container'>
          <div className=' style1-article-title memo-text'>{article.title}</div>
        </div>
      
        <div className='style1-date-read-time-container flexbetween memo-text'>
          <div className='style1-date-content'>{article.date}</div>
          <i className="style1 fa-solid fa-circle"></i>
          <div className='style1-date-read-time-content'>{article.readTime} min read</div>
        </div>
      </div>
    </div>
  )
}
export default ArticleTileOne