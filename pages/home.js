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
        <div class="container-fluid py-5 " style={{ backgroundImage: "url(/img/homepageImage.png)"}}>

                <div class="row py-5">
                    

                    <div class="col-lg-7 m-auto pt-5 text-center">
                        
                        
                        <div>
                        <h1 className="pt-5">Discover New Career Paths and Gain Insight</h1>

                        <Link href={`/${user.username}`} className="btn btn-primary">
                        
                            <Button style={{borderRadius: '50px'}}>Find Your Sunbae</Button>
                        </Link>
                        </div> 
                            
                    </div>

                </div>

            </div>
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
