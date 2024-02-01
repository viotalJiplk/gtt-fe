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
import axios, { addAuthorization } from './axios/axios';
import ScrollToTop from './components/other/ScrollToTop/ScrollToTop';
import { Context } from './store/context';
import { useLocation } from 'react-router';
import { useEffect, useContext} from 'react';
import Rules from './pages/Rules/Rules';
import { isExpired, decodeToken } from "react-jwt";
import GamePage from './pages/GamePage/GamePage';
import About from './pages/About/About';
import Winners from './pages/Winners/Winners';

function App() {
  const context = useContext(Context);
  useEffect(() => {
    axios('/schools').then((response) => {
        context.setSchools(response.data.schools);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    axios('/game/all/').then((response) => {
        context.setGames(response.data.games);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(()=>{
    let jwtString = localStorage.getItem("jwt") || "";
    let userObject = localStorage.getItem("userObject") || "";
    let isTokenExpired = isExpired(jwtString);
    if(isTokenExpired){
      localStorage.removeItem("jwt");
      localStorage.removeItem("userObject");
      context.setUserObject({});
      context.setDiscordId("notLoggedIn");
    }else{
      addAuthorization("Bearer " + jwtString);
      let decodedToken = decodeToken(jwtString) as any;
      context.setUserObject(JSON.parse(userObject));
      context.setDiscordId(decodedToken[decodedToken["iss"]+"/discord/userid"]);
      console.log("test");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Route path="/" component={Home}></Route>
        </Switch>
      </div>
      <Footer className={classes.App__footer}></Footer>
    </div>
  );
}

export default App;
