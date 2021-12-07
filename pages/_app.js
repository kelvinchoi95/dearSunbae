import App from "next/app";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";
import Layout from "../components/Layout/Layout";
//import "../public/styles.css";
import 'antd/dist/antd.css';

import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import 'bootstrap/dist/css/bootstrap.css'


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    let pageProps = {};

    const protectedRoutes =
      ctx.pathname === "/" ||
      ctx.pathname === "/signedInHomepage" ||
      ctx.pathname === "/home" ||
      ctx.pathname === "/[username]" ||
      ctx.pathname === "/notifications" ||
      ctx.pathname === "/post/[postId]" ||
      ctx.pathname === "/messages" ||
      ctx.pathname === "/search";
      
    if (!token) {
      console.log("no token ");
      destroyCookie(ctx, "token");
      console.log("protected routes: " + protectedRoutes);
      protectedRoutes && redirectUser(ctx, "/login");
    }
    //
    else {
      console.log("there is a token");
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      try {
        const res = await axios.get(`${baseUrl}/api/auth`, {
          headers: { Authorization: token }
        });

        const { user, userFollowStats } = res.data;

        if (user) !protectedRoutes && redirectUser(ctx, "/");

        pageProps.user = user;
        pageProps.userFollowStats = userFollowStats;
      } catch (error) {
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (

      <Layout {...pageProps}>
              <head>
      <script async defer src="https://apis.google.com/js/api.js"></script>
      <script
    src="https://www.paypal.com/sdk/js?client-id=AQRhxYS5AzetfdjsMc1Z50Gho5m4v0OCHULh69tX66DokmdFje3_XHAzEXN3Ni810B0gSek_NcNehwkU"> // Required. Replace YOUR_CLIENT_ID with your sandbox client ID.
  </script>
      </head>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
