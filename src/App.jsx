import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/Header';
import AllTweets from './pages/AllTweets';
import MyTweets from './pages/MyTweets';
import { useAuth } from './context/AuthContext';

function App({ tweetService }) {
  const history = useHistory();
  const { user, logout } = useAuth();

  const onAllTweets = () => {
    history.push('/');
  };

  const onMyTweets = () => {
    history.push(`/${user.nickname}`);
  };

  const onLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout();
      history.push('/');
    }
  };

  return (
    <div className="app">
      <Header
        nickname={user.nickname}
        onLogout={onLogout}
        onAllTweets={onAllTweets}
        onMyTweets={onMyTweets}
      />
      <Switch>
        (
        <>
          <Route exact path="/">
            <AllTweets tweetService={tweetService} />
          </Route>
          <Route exact path="/:nickname">
            <MyTweets tweetService={tweetService} />
          </Route>
        </>
        )
      </Switch>
    </div>
  );
}

export default App;
