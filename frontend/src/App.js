// React imports
import { createContext } from "react";
import { Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

// React Bootstrap imports
import Container from "react-bootstrap/Container";

// My own imports
import styles from "./App.module.css";

import NavBar from "./components/NavBar";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PrivateRoute from "./pages/auth/PrivateRoute";
import CreateInformation from "./pages/information/CreateInformation";
import EditInformation from "./pages/information/EditInformation";
import { AlertProvider } from "./contexts/AlertContext";
import HomePage from "../src/pages/HomePage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import Events from "./components/Events";
import AdultEvent1 from "./pages/AdultEvent1";
import BookingForm from "./components/Adultbooking";
import KidsEvent1 from "./components/Kidsbooking";
import KidsEvent from "./pages/KidsEvent1";
import Contact from "./pages/ContactPage";
import RideLessons from "./pages/RideLessons";
import SuperUserPage from "./pages/SuperUserPage";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <AlertProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/om-oss" render={() => <AboutPage />} />
            <Route exact path="/events" render={() => <Events />} />
            <Route exact path="/vuxna" render={() => <AdultEvent1 />} />
            <Route exact path="/vuxna/event" render={() => <BookingForm />} />
            <Route exact path="/ungdomar" render={() => <KidsEvent />} />
            <Route exact path="/ungdomar/event" render={() => <KidsEvent1 />} />
            <Route exact path="/kontakt" render={() => <Contact />} />
            <Route exact path="/ridlektioner" render={() => <RideLessons />} />
            <Route exact path="/bokningar" render={() => <SuperUserPage />} />

            <PrivateRoute
              exact
              path="/information/:id/edit"
              component={EditInformation}
            />
            <PrivateRoute
              exact
              path="/createinformation"
              component={CreateInformation}
            />
          </Switch>
        </Container>
        <Footer />
      </div>
    </AlertProvider>
  );
}

export default App;
