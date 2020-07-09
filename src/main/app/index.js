import React from "react";
import { Switch, Route } from "react-router-dom";

import RsLayout from "../components/layouts";
import Example from "../Example";
import Login from "./user/Login";
import Register from "./user/Register";
import UserList from "./user/UserList";
import RoleList from "./auth/RoleList";
import Category from "./category";
import Post from "./post";
import Banner from "./banner";
import Tags from "./tag";
import Product from "./product";
import AddProduct from "./product/AddProduct";
import EditProduct from "./product/EditProduct";
import NotFound from "../error/404";
import NotAuthorized from "../error/403";
import Choose from "./product/Choose";
import Contact from "./contact";

export default function RsApp() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/403">
        <NotAuthorized />
      </Route>
      <Route exact path="/">
        <RsLayout>
          <Example />
        </RsLayout>
      </Route>
      <Route path="/user_list">
        <RsLayout>
          <UserList />
        </RsLayout>
      </Route>
      <Route path="/role_list">
        <RsLayout>
          <RoleList />
        </RsLayout>
      </Route>
      <Route path="/category">
        <RsLayout>
          <Category />
        </RsLayout>
      </Route>
      <Route path="/banner">
        <RsLayout>
          <Banner />
        </RsLayout>
      </Route>
      <Route path="/post">
        <RsLayout>
          <Post />
        </RsLayout>
      </Route>
      <Route path="/tag">
        <RsLayout>
          <Tags />
        </RsLayout>
      </Route>
      <Route path="/product">
        <RsLayout>
          <Product />
        </RsLayout>
      </Route>
      <Route path="/add_product">
        <RsLayout>
          <AddProduct />
        </RsLayout>
      </Route>
      <Route path="/choose_category">
        <RsLayout>
          <Choose />
        </RsLayout>
      </Route>
      <Route path="/contact">
        <RsLayout>
          <Contact />
        </RsLayout>
      </Route>
      <Route path="/edit_product">
        <EditProduct
          style={{
            padding: "50px 70px",
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100%"
          }}
        />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
