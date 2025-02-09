export default class TweetService {
  constructor(http, socketClient) {
    this.http = http;
    this.socket = socketClient;
  }
  async getTweets(nickname) {
    const query = nickname ? `?nickname=${nickname}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET',
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
