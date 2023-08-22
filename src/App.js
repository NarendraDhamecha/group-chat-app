import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import { Route, Switch } from "react-router-dom";
import GroupChat from "./components/Chat/GroupChat";
import Groups from "./components/Chat/Groups";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/chat" component={GroupChat}/>
        <Route exact path="/groups" component={Groups}/>
      </Switch>
    </>
  );
};

export default App;
