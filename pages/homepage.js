import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import { NoProfilePosts, NoProfile } from "../components/Layout/NoData";
import CardPost from "../components/Post/CardPost";
import cookie from "js-cookie";
import { PlaceHolderPosts } from "../components/Layout/PlaceHolderGroup";
import ProfileMenuTabs from "../components/Profile/ProfileMenuTabs";
import ProfileHeader from "../components/Profile/ProfileHeader";
import Followers from "../components/Profile/Followers";
import Following from "../components/Profile/Following";
import UpdateProfile from "../components/Profile/UpdateProfile";
import Settings from "../components/Profile/Settings";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import Link from "next/link";
import { Button, Card } from "antd";
//import { Context } from "../context";
//import 'bootstrap/dist/css/bootstrap.min.css';
function HomePage({ user }) {
  const router = useRouter();




  return (
    <>
    <head>
    
    <title>Home</title>
    <link rel = "icon" href = 
    "/img/logo2cropped2.png" 
type = "image/x-icon"></link>
</head>
        

        
        <section class="main display-flex">
            <div class="container-fluid py-5 " style={{ backgroundImage: "url(/img/homepageImage.png)"}}>

                <div class="row py-5">
                    

                    <div class="col-lg-7 m-auto pt-5 text-center">
                        
                            <div>
                        <h1 class="pt-5">Discover New Career Paths and Gain Insight</h1>
                        <Link href="/signup" className="btn btn-primary">
                            <Button style={{borderRadius: '50px'}}>Join Now</Button>
                        </Link>
                        </div>
                        
                           
                    </div>

                </div>

            </div>

            {/*<div>
                <h1 class="container-fluid py-5 text-center">Testimonials</h1>
                <div className="row">
                    
                    {createTestimonialCards(3)}
                    
                    
                </div>
                

            </div> */}

            <div class = "container-fluid py-4 bg" >
                <h1 class=" text-center">About Us</h1>
                
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
                


                <div>
                    <p class="text-center">Dear Sunbae is an online platform meant for students and individuals who want to connect with experienced individuals who provide professional insight in educational/career path settings.</p>

                </div>
            </div>

            <div>
                <h1 class="container-fluid py-3 text-center">How it Works</h1>
                    <div className="row">
                        <div className=" col-md-6 text-center">
                            <Card title="As a Hoobae">
                                <ol>
                                    <li>Register as a Hoobae</li>
                                    <li>Find and connect with a Sunbae</li>
                                    <li>Give brief introduction in messenger</li>
                                    <li>Pay via Stripe</li>
                                    <li>Schedule 1 on 1 meeting</li>
                                    <li>Receive email for meeting link</li>
                                    <li>Give feedback to Dear Sunbae Team.</li>
                                </ol>
                            </Card>
                            
                        </div>

                        <div className="  col-md-6 text-center">
                            <Card title="As a Sunbae">
                                <ol>
                                    <li>Register as a Sunbae</li>
                                    <li>Accept a Hoobae’s request to connect</li>
                                    <li>Give brief introduction in messenger</li>
                                    <li>Schedule 1 on 1 meeting</li>
                                    <li>Receive email for meeting link</li>
                                    <li>Receive payment from Dear Sunbae Team via Stripe</li>
                                    <li>Give feedback to Dear Sunbae Team</li>
                                </ol>   
                            </Card>
                        </div>
                    </div>
            </div>
        </section>


        
    </>
  );
}
/*
HomePage.getInitialProps = async ctx => {
    try {
      const { username } = ctx.query;
      const { token } = parseCookies(ctx);
  
      const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
        headers: { Authorization: token }
      });
  
      const { profile, followersLength, followingLength} = res.data;
      
  
      return { profile, followersLength, followingLength};
    } catch (error) {
      return { errorLoading: true };
    }
  };
  */


export default HomePage;
