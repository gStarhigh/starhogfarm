// React imports
import { createContext } from "react";
import { Route, Switch } from "react-router-dom";

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


export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {

  return (
    <AlertProvider>
      <div className={styles.App}>
        <NavBar />
        <Container className={styles.Main}>
          <Switch>
            <Route exact path="/signin" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />


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
      </div>
    </AlertProvider>
  );
}

export default App;
