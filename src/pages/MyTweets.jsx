import React from 'react';
import { useParams } from 'react-router-dom';
import Tweets from '../components/Tweets';

const MyTweets = ({ tweetService }) => {
  const { nickname } = useParams();
  return (
    <Tweets tweetService={tweetService} nickname={nickname} addable={false} />
  );
};

export default MyTweets;
