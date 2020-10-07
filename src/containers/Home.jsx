import React, { useEffect, useState, useRef } from 'react';
import queryString from 'query-string';
import styled from 'styled-components/macro';
import { fromUnixTime } from 'date-fns';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Container, InnerContainer } from '../components/general/Containers';
import { Heading2, Text } from '../components/general/Headings';
import Navbar from '../components/general/Navbar';
import Post from '../components/general/Post';
import Loading from '../components/general/Loading';
import PrimaryButton from '../components/general/Buttons';
import { primaryColor, lightPrimaryColor } from '../constants/websiteColors';

const MainHeading = styled(Heading2)`
  margin-bottom: 2rem;
`;

const MainText = styled(Text)`
  width: 100%;
  margin-bottom: 2.5rem !important;
  @media (min-width: 576px) {
    width: 60%;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
  & > *:not(:last-child) {
    margin-right: 32px;
  }
`;

const TagFilter = styled.button`
  font-family: 'Raleway';
  font-variation-settings: 'wght' 700;
  font-size: 1rem;
  color: ${(props) => (props.active ? '#ffffff' : primaryColor)};
  background-color: ${(props) => (props.active ? primaryColor : lightPrimaryColor)};
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  transition-duration: 200ms;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: ${primaryColor};
  }
`;

const PostsRow = styled.section`
  width: 100%;
  display: grid;
  gap: 60px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-auto-rows: min-content;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  margin-bottom: 60px;
`;

const LoadMoreContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  & > *:first-child {
    margin-right: 32px;
  }
`;

const GET_PAGE = gql`
  query GetPage($pageNumber: Int, $pageSize: Int, $tag: String) {
    posts(pageNumber: $pageNumber, pageSize: $pageSize, tag: $tag) {
      hasMore
      posts {
        author
        description
        indexName
        image
        postedOn
        tag
        title
        readingTime
        _id
      }
    }
  }
`;

const Home = () => {
  const { number } = useParams();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(+number);
  const [tags, setTags] = useState(['All']);
  const [currentTagFilter, setCurrentTagFilter] = useState(
    queryString.parse(history.location.search).tag || 'All',
  );
  const { loading, data } = useQuery(GET_PAGE, {
    variables: {
      pageNumber: currentPage,
      pageSize: 28,
      tag: currentTagFilter !== 'All' ? currentTagFilter : null,
    },
  });

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current && !data) {
      isInitialMount.current = false;
    } else if (data) {
      setTags([...new Set([...tags, ...data.posts.posts.map((post) => post.tag)])]);
    }
  }, [loading]);
  const handleTagFilterChange = (tag) => {
    history.push(tag !== 'All' ? `/page/1?tag=${tag}` : '/page/1');
    setCurrentTagFilter(queryString.parse(history.location.search).tag || 'All');
    setCurrentPage(1);
  };
  const handleForwardPageChange = () => {
    const newPath = `/page/${currentPage + 1}${history.location.search}`;
    history.push(newPath);
    setCurrentPage(+history.location.pathname.split('/')[2] || 1);
  };
  const handleBackPageChange = () => {
    const newPath = `/page/${currentPage - 1}${history.location.search}`;
    history.push(newPath);
    setCurrentPage(+history.location.pathname.split('/')[2] || 1);
  };
  return (
    <Container>
      <InnerContainer>
        <Navbar />
        <MainHeading>Let&apos;s talk science</MainHeading>
        <MainText>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis voluptate exercitationem
          earum, possimus deleniti sed? Dolorum quae velit pariatur provident ducimus, beatae rerum
          dolorem ut deleniti nam facere, molestiae illum!
        </MainText>
        <TagContainer>
          {tags.map((tag) => (
            <TagFilter
              key={tag}
              active={tag === currentTagFilter}
              onClick={() => handleTagFilterChange(tag)}
            >
              {tag}
            </TagFilter>
          ))}
        </TagContainer>
        {!loading ? (
          <>
            <PostsRow>
              {data.posts.posts.map((post, i) => {
                return (
                  <Post
                    key={post._id}
                    isHuge={i % 7 === 0}
                    author={post.author}
                    description={post.description}
                    image={post.image}
                    postedOn={fromUnixTime(post.postedOn / 1000)}
                    tag={post.tag}
                    title={post.title}
                    indexName={post.indexName}
                    readingTime={post.readingTime}
                  />
                );
              })}
            </PostsRow>
            <LoadMoreContainer>
              {currentPage > 1 && (
                <PrimaryButton onClick={handleBackPageChange} type="button">
                  Previous page
                </PrimaryButton>
              )}
              {!loading && data.posts.hasMore && (
                <PrimaryButton onClick={handleForwardPageChange} type="button">
                  Next Page
                </PrimaryButton>
              )}
            </LoadMoreContainer>
          </>
        ) : (
          <Loading height="100px" width="100%" />
        )}
      </InnerContainer>
    </Container>
  );
};

export default Home;
