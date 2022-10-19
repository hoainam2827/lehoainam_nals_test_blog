import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PageRender from './PageRender';
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import Alert from './components/alert/Alert'
import { getHomeBlogs } from './redux/actions/blogActions'
import { refreshToken } from './redux/actions/authActions';
// import { getCategories } from './redux/actions/categoryAction';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
    dispatch(getHomeBlogs())
    // dispatch(getInfo())
    // dispatch(getCategories())
    // dispatch(refreshToken())
  },[dispatch])
  return (
    <div className="container">
      <Router>
        <Alert />
        <Header /> 
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
