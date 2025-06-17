import { Route } from "react-router-dom";
import AuthProvider from "@/AuthProvider";
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Favorties from "@/pages/Favorites";

export const HomeRoute = (
  <Route
    path="/"
    element={
      <AuthProvider>
        <Layout>
          <Home />
        </Layout>
      </AuthProvider>
    }
  />
);

export const LoginRoute = (
  <Route
    path="login"
    element={
      <AuthProvider>
        <Layout>
          <Login />
        </Layout>
      </AuthProvider>
    }
  />
);

export const SearchRoute = (
  <Route
    path="search"
    element={
      <AuthProvider>
        <Layout>
          <Search />
        </Layout>
      </AuthProvider>
    }
  />
);

export const FavoritesRoute = (
  <Route
    path="favorites"
    element={
      <AuthProvider>
        <Layout>
          <Favorties />
        </Layout>
      </AuthProvider>
    }
  />
);
