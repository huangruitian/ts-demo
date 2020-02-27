import React from 'react';
import Layout from "./pages/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={Layout}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
