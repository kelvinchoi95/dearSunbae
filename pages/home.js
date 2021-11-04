import React, { useEffect, useState } from "react";
import Link from "next/link";
import { List, Icon } from "semantic-ui-react";
import { Button, Card} from "antd";


import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";


function Home({ user }) {
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
    <div className="about">
        
        <div class="container-fluid py-5 " style={{ backgroundImage: "url(/img/homepagepic.png)"
}}>

                <div class="row py-5">
                    

                    <div class="col-lg-7 m-auto pt-5 text-center">
                        
                        
                        <div>
                        <h1 className="pt-0" style={{color: "#CC6633"}}><strong>Broaden Your Network And Opportunities In No Time </strong> </h1>
                        {user ? (
                        <Link href={`/${user.username}`} className="btn btn-primary">
                        
                            <Button type="primary" shape="round" style={{marginTop: 90}}>Find Your Sunbae</Button>
                        </Link>)
                        : 
                        (<Link href={"/signup"} className="btn btn-primary">
                        
                            <Button type="primary" shape="round" style={{marginTop: 90}}>Sign Up</Button>
                        </Link>
                        )}
                        </div> 
                            
                    </div>

                </div>

            </div>
    </div>

    

    <div class = "container-fluid py-4 bg pt-5 pb-5" >
      <div className="row">
        <div className="col-md-4 offset-md-4">
        <Card style = {{borderRadius: '25px'}}>
      <h1 class=" text-center" style ={{paddingBottom: "10px", color: "#CC6633"}}><strong>About Us</strong></h1>
                {/*
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
                    </svg>
                    </div>
                    <div class="divider-custom-line"></div>
                 </div>
                */}
                


                <div>
                    <p class="text-center">Dear Sunbae is an online platform meant for students and individuals desiring to connect with experienced individuals who provide professional insight in educational/career path settings.</p>

                </div>
      </Card>
        </div>
      </div>
      <div class = "container-fluid py-4 bg pt-5 pb-5" style={{textAlign: "center"}} >

      <div className="row pb-4" >
        <div className="col-md-4 offset-md-2">
            <Card id="featurecard">
            <Icon name="user outline" size="large"  />

              <h2>Follow Others</h2>
            </Card>
        </div>
        <div className="col-md-4">
          <Card id="featurecard" >
          <Icon name="mail outline" size="large"  />

            <h2>Messaging</h2>
          </Card>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 offset-md-2">
            <Card id="featurecard">
            <Icon name="video" size="large"  />

              <h2>Schedule a Google Meet Call</h2>
            </Card>
        </div>
        <div className="col-md-4">
          <Card id="featurecard">
          <Icon name="edit outline" size="large"  />

            <h2>Create and Share Posts</h2>
          </Card>
        </div>
      </div>
      </div>


    <br/>
    <br/>
    <br/>
    <div className="row pb-4">
      <div className="col md-3">
          <Card id="howitworks" style={{borderRadius: '25px'}}>
                <h1 style={{borderBottom: "solid #00A0DC", paddingBottom: "10px"}}><strong>As a Hoobae</strong></h1>
                <ol style={{paddingTop: "20px"}}>
                                    <li>Register as a Hoobae</li>
                                    <li>Find and connect with a Sunbae</li>
                                    <li>Give brief introduction in messenger</li>
                                    <li>Pay via PayPal</li>
                                    <li>Schedule 1 on 1 meeting</li>
                                    <li>Receive email for meeting link</li>
                                    <li>Give feedback to Dear Sunbae Team.</li>
                                    
                </ol>
          </Card>
      </div>

      <div className="col md-3">
      <Card id="howitworks"  style={{borderRadius: '25px', backgroundImage: "url(/img/homepagepic3.png)"}}>
                
          </Card>
        
      </div>
    </div>

    <div className="row">
      <div className="col md-3">
      <Card id="howitworks"  style={{borderRadius: '25px', backgroundImage: "url(/img/homepagepic4.jpg)"}}>
                
          </Card>
      </div>

      <div className="col md-3">
      <Card id="howitworks" style={{borderRadius: '25px'}}>
                <h1 style={{borderBottom: "solid #00A0DC", paddingBottom: "10px"}}><strong>As a Sunbae</strong></h1>
                <ol style={{paddingTop: "20px"}}>
                                    <li>Register as a Sunbae</li>
                                    <li>Accept a Hoobae’s request to connect</li>
                                    <li>Give brief introduction in messenger</li>
                                    <li>Schedule 1 on 1 meeting</li>
                                    <li>Receive email for meeting link</li>
                                    <li>Receive payment from Dear Sunbae Team via PayPal</li>
                                    <li>Give feedback to Dear Sunbae Team</li>
                                </ol>
          </Card>
        
      </div>
    </div>



    </div>
{/*
            <div>
            <Card style={{borderRadius: '25px'}}>
                <h1 class="container-fluid py-3 text-center" style={{textAlign: "center"}}><strong>How it Works</strong></h1>
                    <div className="row">
                      
                        <div className=" col-md-6 text-center">
                            <Card style={{ border:'#923737', borderRadius: '25px'}} title={<strong>As a Hoobae</strong>}>
                                <ol>
                                    <li>Register as a Hoobae</li>
                                    <li>Find and connect with a Sunbae</li>
                                    <li>Give brief introduction in messenger</li>
                                    <li>Pay via PayPal</li>
                                    <li>Schedule 1 on 1 meeting</li>
                                    <li>Receive email for meeting link</li>
                                    <li>Give feedback to Dear Sunbae Team.</li>
                                    
                                </ol>
                            </Card>
                            
                        </div>

                        <div className="  col-md-6 text-center">
                            <Card style={{ border:'#923737', borderRadius: '25px'}} title={<strong>As a Sunbae</strong>}>
                                <ol>
                                    <li>Register as a Sunbae</li>
                                    <li>Accept a Hoobae’s request to connect</li>
                                    <li>Give brief introduction in messenger</li>
                                    <li>Schedule 1 on 1 meeting</li>
                                    <li>Receive email for meeting link</li>
                                    <li>Receive payment from Dear Sunbae Team via PayPal</li>
                                    <li>Give feedback to Dear Sunbae Team</li>
                                </ol>
                            </Card>
                        </div>
                        
                    </div>
                    </Card>
            </div>
*/}
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
