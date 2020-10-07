/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { formatDistance, fromUnixTime } from 'date-fns';
import { useQuery, gql } from '@apollo/client';
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

const GET_POST = gql`
  query GetPage($id: ID!) {
    post(id: $id) {
      author
      content
      indexName
      image
      postedOn
      tag
      title
      readingTime
      _id
    }
  }
`;

const SinglePost = () => {
  const { id: postId } = useParams();
  const { loading, data } = useQuery(GET_POST, {
    variables: { id: postId },
  });
  const postDateFormatted =
    !loading &&
    data &&
    `${formatDistance(new Date(), fromUnixTime(data.post.postedOn / 1000))} ago`;
  return (
    <Container>
      <InnerContainer>
        <Navbar />
        {!loading ? (
          <>
            <PostInfo>
              <PostTitle>{data.post.title}</PostTitle>
              <PostMeta>
                <PostTopData>
                  <Text>{data.post.author}</Text>
                  <Heading5 color={primaryColor}>{`#${data.post.tag}`}</Heading5>
                </PostTopData>
                <PostBottomData>
                  <Time color={grayColor} height={16} />
                  <Text color={grayColor}>{`${data.post.readingTime} min read`}</Text>
                  <Text color={grayColor}>|</Text>
                  <Text color={grayColor}>{postDateFormatted}</Text>
                </PostBottomData>
              </PostMeta>
            </PostInfo>
            <PostImage src={data.post.image} />
            {!!data.post.content &&
              data.post.content.split('\n').map((paragraph, i) => {
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
