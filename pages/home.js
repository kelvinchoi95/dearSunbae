import React, { useEffect, useState } from "react";

import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";


function Home() {
  //const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  /*useEffect(() => {
    const notificationRead = async () => {
      try {
        await axios.post(
          `${baseUrl}/api/notifications`,
          {},
          { headers: { Authorization: cookie.get("token") } }
        );
      } catch (error) {
        console.log(error);
      }
    };

    notificationRead();
  }, []);
  */
  return (
    <>
    <div>
        <h1>IN HOMEPAGE</h1>
        
    </div>
    </>
  );
}
/*
Notifications.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token }
    });

    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
}; */

export default Home;
