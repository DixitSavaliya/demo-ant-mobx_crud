import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import PrivateRoute from './component/privateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Post from './pages/Post';

function IfLogin() {
    return <Navigate to="/" />;
  }

function RouterList() {
   const token = localStorage.getItem('token')
   
  return (
    <Router>
      <Routes>
      <Route
          exact
          path="/login"
          element={token ? <IfLogin /> : <Login />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path="/"
            element={<Post />}
          />
          <Route
            exact
            path="/home"
            element={<Home />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouterList;
