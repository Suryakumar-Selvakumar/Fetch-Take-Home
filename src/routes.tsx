import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Search from "./pages/Search";
import AuthProvider from "./AuthProvider";

export const routes = [
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
];
