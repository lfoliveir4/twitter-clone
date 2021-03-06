import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from './../utils/helpers';
import  TiArrowBackOutline  from 'react-icons/lib/ti';
import  TiHeartOutline  from 'react-icons/lib/ti';
import  TiHeartFullOutline  from 'react-icons/lib/ti';

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()
  }
  toParent = (e, id) => {
    e.preventDefault()
    // todo: redirect to parent
  }
  render() {
    const {tweet} = this.props

    if (tweet === null) {
      return <p>This tweet not exist</p>
    }

    const {
      name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
    } = tweet

    console.log(this.props)

    return(
      <div className='tweet'>
        <img
        src={avatar}
        alt={`Avatar of ${name}`}
        className='avatar'
        />
        <div className='tweet-info'>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
              Replying To @{parent.author}
            </button>
          )}
          <p>{text}</p>
        </div>
        <div className='tweet-icons'>
          <TiArrowBackOutline className='tweet-icon' />
          <span>{ replies !== 0 && replies }</span>
          <button className='heart-button' onClick={this.handleLike}>
            { hasLiked === true 
            
            ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
            : <TiHeartOutline className='tweet-icon' />   
            }
          </button>
          <span>{likes !==0 && likes}</span>
        </div>
      </div>

    )
  }
}

function mapStateToProps({ authedUser, users, tweets }, {id}) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return{
    authedUser,
    tweet: tweet
    ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    : null
  }
}

export default connect(mapStateToProps)(Tweet)