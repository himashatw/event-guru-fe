import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Header from "./Components/HomePage/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
