/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import ky from 'ky';
import { Container, InnerContainer } from '../components/general/Containers';
import { Heading2, Heading5, Text } from '../components/general/Headings';
import Navbar from '../components/general/Navbar';
import Time from '../components/icons/Time';
import Loading from '../components/general/Loading';
import { grayColor, primaryColor } from '../constants/websiteColors';

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const PostTitle = styled(Heading2)`
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > *:first-child {
    margin-bottom: 0.5rem;
  }
  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

const PostTopData = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  & > *:last-child {
    margin-right: 0.5rem;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    & > *:first-child {
      margin-right: 0.5rem;
    }
    & > *:last-child {
      margin-right: 0px;
    }
  }
`;

const PostBottomData = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const PostImage = styled.img`
  border-radius: 4px;
  margin-bottom: 2rem;
  width: 100%;
  max-height: 50vh;
  object-fit: cover;
`;

const SinglePost = () => {
  const { id: postId } = useParams();
  const [postData, setPostData] = useState({});
  const [loadedPost, setLoadedPost] = useState(false);
  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await ky
        .get(` https://py89pcivba.execute-api.eu-central-1.amazonaws.com/dev/posts/${postId}`)
        .json();
      setTimeout(() => {
        setLoadedPost(true);
        setPostData(fetchedPost);
      }, 200);
    };
    fetchPost();
  }, []);
  const postDateFormatted =
    !!postData.postedOn && `${formatDistance(new Date(), new Date(postData.postedOn))} ago`;
  return (
    <Container>
      <InnerContainer>
        <Navbar />
        {loadedPost ? (
          <>
            <PostInfo>
              <PostTitle>{postData.title}</PostTitle>
              <PostMeta>
                <PostTopData>
                  <Text>{postData.author}</Text>
                  <Heading5 color={primaryColor}>{`#${postData.tag}`}</Heading5>
                </PostTopData>
                <PostBottomData>
                  <Time color={grayColor} height={16} />
                  <Text color={grayColor}>{`${postData.readingTime} min read`}</Text>
                  <Text color={grayColor}>|</Text>
                  <Text color={grayColor}>{postDateFormatted}</Text>
                </PostBottomData>
              </PostMeta>
            </PostInfo>
            <PostImage src={postData.image} />
            {!!postData.content &&
              postData.content.split('\n').map((paragraph, i) => {
                return (
                  <React.Fragment key={i}>
                    <Text>{paragraph}</Text>
                    <br />
                  </React.Fragment>
                );
              })}
          </>
        ) : (
          <Loading height="100px" width="100%" />
        )}
      </InnerContainer>
    </Container>
  );
};

export default SinglePost;
