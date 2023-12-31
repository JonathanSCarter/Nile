import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ItemSearch from "./components/ItemSearch";
import ItemForm from "./components/CreateItemForm";
import ItemPage from "./components/ItemPage";
import UpdateItemForm from "./components/UpdateItemForm";
import CartPage from "./components/CartPage";
import OrderHistory from "./components/OrderHistory";
import Footer from "./components/Footer";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div style={{padding: "0px 0px 150px 0px"}}>

      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/create">
            <ItemForm />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/history">
            <OrderHistory />
          </Route>
          <Route path="/items/:id/update">
            <UpdateItemForm />
          </Route>
          <Route path="/items/:id">
            <ItemPage />
          </Route>
          <Route path="/">
            <ItemSearch />
          </Route>
        </Switch>
      )}
      </div>
      <Footer />
    </>
  );
}

export default App;
