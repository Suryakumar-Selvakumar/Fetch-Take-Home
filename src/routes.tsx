import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Search from "@/pages/Search";
import Favorties from "./pages/Favorites";
import AuthProvider from "@/AuthProvider";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout>
          <Home />
        </Layout>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Layout>
          <Login />
        </Layout>
      </AuthProvider>
    ),
  },
  {
    path: "/search",
    element: (
      <AuthProvider>
        <Layout>
          <Search />
        </Layout>
      </AuthProvider>
    ),
  },
  {
    path: "/favorites",
    element: (
      <AuthProvider>
        <Layout>
          <Favorties />
        </Layout>
      </AuthProvider>
    ),
  },
];
