import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import firebase from '../utils/firebaseSetup';
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

const Home = () => {
  const history = useHistory();
  // Posts info
  const [posts, setPosts] = useState([]);
  // Status of post laoding
  const [loadedPosts, setLoadedPosts] = useState(false);
  // Pagination tracking
  const [startDoc, setStartDoc] = useState(null);
  // Page number
  const [currentPage, setCurrentPage] = useState(+history.location.pathname.split('/')[2] || 1);
  // Array of loaded tags
  const [tags, setTags] = useState(['All']);
  // Current tag filter
  const [currentTagFilter, setCurrentTagFilter] = useState(
    history.location.search.split('=')[1] || 'All',
  );
  // TODO: Work on pagination (going back from page > 3 is broken)
  useEffect(() => {
    // Allows us to control unsubscribing
    let isSubscribed = true;
    const fetchPosts = async () => {
      let postsQuery = firebase.firestore().collection('/posts').orderBy('postedOn', 'asc');
      if (currentTagFilter !== 'All') {
        postsQuery = postsQuery.where('tag', '==', currentTagFilter);
      }
      if (currentPage > 1) {
        postsQuery = postsQuery.endBefore(startDoc);
      }
      const postsQuerySnapshot = await postsQuery.limitToLast(10).get();
      const loadedPostsArray = postsQuerySnapshot.docs.reverse().map((post) => {
        return {
          author: post.data().author,
          content: post.data().content,
          description: post.data().description,
          image: post.data().smallImage,
          postedOn: post.data().postedOn.toDate(),
          tag: post.data().tag,
          title: post.data().title,
          indexName: post.data().indexName,
          id: post.id,
        };
      });
      setTimeout(() => {
        if (isSubscribed) {
          setLoadedPosts(true);
          setPosts([...posts, ...loadedPostsArray]);
          setStartDoc(postsQuerySnapshot.docs[0]);
          setTags([...new Set([...tags, ...loadedPostsArray.map((post) => post.tag)])]);
        }
      }, 200);
    };
    fetchPosts();
    return () => {
      isSubscribed = false;
    };
  }, [currentPage, currentTagFilter]);
  history.listen((location) => {
    setPosts([]);
    setLoadedPosts(false);
    setCurrentPage(+location.pathname.split('/')[2] || 1);
    setCurrentTagFilter(location.search.split('=')[1] || 'All');
  });
  const handleTagFilterChange = (tag) => {
    history.push(tag !== 'All' ? `/?tag=${tag}` : '/');
  };
  const handleForwardPageChange = () => {
    const newPath = `/page/${currentPage + 1}${history.location.search}`;
    history.push(newPath);
  };
  const handleBackPageChange = () => {
    const newPath =
      currentPage !== 2
        ? `/page/${currentPage - 1}${history.location.search}`
        : `/${history.location.search}`;
    history.push(newPath);
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
        {loadedPosts ? (
          <>
            <PostsRow>
              {posts.map((post, i) => {
                return (
                  <Post
                    key={post.id}
                    isHuge={i % 7 === 0}
                    author={post.author}
                    content={post.content}
                    description={post.description}
                    image={post.image}
                    postedOn={post.postedOn}
                    tag={post.tag}
                    title={post.title}
                    indexName={post.indexName}
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
              <PrimaryButton onClick={handleForwardPageChange} type="button">
                Next Page
              </PrimaryButton>
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
