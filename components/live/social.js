import React from 'react';
import styled from 'styled-components';
import superagent from 'superagent';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PostContainer = styled.div`
  display: block;
  border: 1px solid #ccc;
  height: 30vh;
  width: 48%;
  display: inline-block;
  margin: 0 2% 2vh 0;
  &:nth-child(2n) {
    margin-right: 0;
  }
  overflow: hidden;
  padding: 2vh;
  box-sizing: border-box;

  &.social-post-enter, &.social-post-leave.social-post-leave-active {
    opacity: 0;
    max-width: 0;
  }

  &.social-post-enter.social-post-enter-active, &.social-post-leave {
    opacity: 1;
    transition: all .5s ease-in;
    max-width: 50%;
  }
`;

const PostContent = styled.div`
  font-size: 2vh;
  height: 100%;
  overflow: hidden;

  p {
    margin-top: 0;
  }
`;

const PostAuthor = styled.div`
  font-size: 2vh;
  img {
    height: 3vh;
    width: 3vh;
  }
  span {
    vertical-align: top;
  }
`;

const PostMedia = styled.div`
  height: 100%;
  width: 30%;
  float: left;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 1vh;
`;

export default class Social extends React.Component {
  updateSocialIntervalId = null;

  state = {
    posts: [],
  };

  componentDidMount() {
    const doUpdatePosts = async () => {
      const posts = (await superagent.get('https://micro.srnd.org/social-posts?max=12')).body;
      this.setState({ posts });
    };

    this.updateSocialIntervalId = setInterval(doUpdatePosts, 65000);
    doUpdatePosts();
  }

  componentWillUnmount() {
    clearInterval(this.updateSocialIntervalId);
  }

  render() {
    const { posts } = this.state;

    return (
      <ReactCSSTransitionGroup
        transitionName="social-post"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {posts.map((post) => (
          <PostContainer key={post.id}>
            {post.media_url && <PostMedia style={{ backgroundImage: `url(${post.media_url})` }} /> }
            <PostContent>
              <PostAuthor>
                <img src={post.user_image} alt="" /> <span>@{post.user}</span>
              </PostAuthor>
              <p>{post.text}</p>
            </PostContent>
          </PostContainer>
        ))}
      </ReactCSSTransitionGroup>
    );
  }
}
