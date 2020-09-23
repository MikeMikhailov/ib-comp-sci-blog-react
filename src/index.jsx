/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import { LoremIpsum } from 'lorem-ipsum';
import { subDays } from 'date-fns';
import App from './components/App';
import firebase from './utils/firebaseSetup';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const makePosts = async () => {
  const smallImagePromises = [];
  const largeImagePromises = [];
  for (let i = 0; i < 10; i += 1) {
    smallImagePromises.push(
      firebase.storage().ref(`postImages/small/scienceSmall${i}.webp`).getDownloadURL(),
    );
  }
  for (let i = 0; i < 10; i += 1) {
    largeImagePromises.push(
      firebase.storage().ref(`postImages/large/scienceLarge${i}.webp`).getDownloadURL(),
    );
  }
  const smallImages = await Promise.all(smallImagePromises);
  const largeImages = await Promise.all(largeImagePromises);
  const tags = ['AI', 'Chemistry', 'Space', 'Robotics', 'Physics'];
  const postPromises = [];
  for (let i = 0; i < 80; i += 1) {
    const newPost = {
      author: 'Michael M.',
      content: lorem.generateParagraphs(7),
      description: lorem.generateSentences(3),
      smallImage: smallImages[i % 10],
      largeImage: largeImages[i % 10],
      indexName: `sample-post-${i}`,
      postedOn: subDays(new Date(), i),
      tag: tags[i % 5],
      title: `Sample Post ${i}`,
    };
    postPromises.push(firebase.firestore().collection('/posts').add(newPost));
  }

  await Promise.all(postPromises);
};

// makePosts();

render(<App />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
