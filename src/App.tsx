import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import classes from './App.module.scss';
import Navigation from './components/layout/Navigation/Navigation';
import { Switch, Route } from 'react-router';
import Success from './components/other/Success/Success';
import Documents from './pages/Documents/Documents';
import Sponsors from './pages/Sponsors/Sponsors';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Teams from './pages/Teams/Teams';
import Token from './pages/Token/Token';
import Contestants from './pages/Contestants/Contestants';
import Join from './pages/Join/Join';
import Schools from './pages/Schools/Schools';
import Footer from './components/layout/Footer/Footer';
import axios from './axios/axios';
import {AxiosResponse} from 'axios'
import ScrollToTop from './components/other/ScrollToTop/ScrollToTop';
import { Context } from './store/context';
import { useLocation } from 'react-router';
import { useEffect, useContext} from 'react';
import Rules from './pages/Rules/Rules';
import GamePage from './pages/GamePage/GamePage';
import About from './pages/About/About';
import Winners from './pages/Winners/Winners';
import { ApiError, School, Game } from './types/types';
import { loadJwt } from './utils/jwt';

import Bracket from './pages/Bracket/Bracket';

function App() {
  const context = useContext(Context);
  useEffect(() => {
    axios('/school/listAll/').then((response: AxiosResponse<ApiError | School[]>) => {
      if (Array.isArray(response.data)) {
        context.setSchools(response.data);
      } else {
        console.error("Wrong response");
        console.error(response);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios('/event/listAll').then((response: AxiosResponse<ApiError | Event[]>) => {
      if (Array.isArray(response.data)) {
        context.setEvents(response.data);
      } else {
        console.error("Wrong response");
        console.error(response);
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios('/game/all/').then((response: AxiosResponse<ApiError | Game[]>) => {
        if (Array.isArray(response.data)) {
          context.setGames(response.data);
        } else {
          console.error("Wrong response");
          console.error(response);
        }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    let res = loadJwt();
    context.setUserObject(res.userObject);
    context.setDiscordId(res.discordId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const location = useLocation();

  return (
    <div className={classes.App}>
      <Navigation className={classes.App__navigation}></Navigation>
      <div className={classes.App__content}>
        <ScrollToTop></ScrollToTop>
        <Route path="/success" component={Success}></Route>
        <Switch location={location} key={location.key}>
          <Route path="/Error" exact component={ErrorPage}></Route>
          <Route path="/sponsors" exact component={Sponsors}></Route>
          <Route path="/documents" exact component={Documents}></Route>
          <Route path="/account" exact component={Account}></Route>
          <Route path="/join" exact component={Join}></Route>
          <Route path="/token" exact component={Token}></Route>
          <Route path="/gamepage" exact component={GamePage}></Route>
          <Route path="/contestants" exact component={Contestants}></Route>
          <Route path="/teams" exact component={Teams}></Route>
          <Route path="/rules" exact component={Rules}></Route>
          <Route path="/schools" exact component={Schools}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/winners" exact component={Winners}></Route>
          <Route path="/bracket" exact component={Bracket}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
      <Footer className={classes.App__footer}></Footer>
    </div>
  );
}

export default App;
