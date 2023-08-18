import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
};

export default App;
