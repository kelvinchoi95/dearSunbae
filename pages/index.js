import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CreatePost from "../components/Post/CreatePost";
import CardPost from "../components/Post/CardPost";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import { PlaceHolderPosts, EndMessage } from "../components/Layout/PlaceHolderGroup";
import cookie from "js-cookie";
import getUserInfo from "../utils/getUserInfo";
import MessageNotificationModal from "../components/Home/MessageNotificationModal";
import newMsgSound from "../utils/newMsgSound";
import NotificationPortal from "../components/Home/NotificationPortal";
import Link from "next/link";
import { Button, Card } from "antd";
//import { Context } from "../context";
import 'bootstrap/dist/css/bootstrap.min.css';

function Index({ user, postsData, errorLoading }) {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [pageNumber, setPageNumber] = useState(2);

  const socket = useRef();

  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessageModal, showNewMessageModal] = useState(false);

  const [newNotification, setNewNotification] = useState(null);
  const [notificationPopup, showNotificationPopup] = useState(false);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        const { name, profilePicUrl } = await getUserInfo(newMsg.sender);

        if (user.newMessagePopup) {
          setNewMessageReceived({
            ...newMsg,
            senderName: name,
            senderProfilePic: profilePicUrl
          });
          showNewMessageModal(true);
        }
        newMsgSound(name);
      });
    }

    document.title = `Welcome, ${user.name.split(" ")[0]}`;

    return () => {
      if (socket.current) {
        socket.current.emit("disconnect");
        socket.current.off();
      }
    };
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber }
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts(prev => [...prev, ...res.data]);
      setPageNumber(prev => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };

  if (posts.length === 0 || errorLoading) return <NoPosts />;

  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        "newNotificationReceived",
        ({ name, profilePicUrl, username, postId }) => {
          setNewNotification({ name, profilePicUrl, username, postId });

          showNotificationPopup(true);
        }
      );
    }
  }, []);

  return (
    <>
      {notificationPopup && newNotification !== null && (
        <NotificationPortal
          newNotification={newNotification}
          notificationPopup={notificationPopup}
          showNotificationPopup={showNotificationPopup}
        />
      )}

      {showToastr && <PostDeleteToastr />}

      {newMessageModal && newMessageReceived !== null && (
        <MessageNotificationModal
          socket={socket}
          showNewMessageModal={showNewMessageModal}
          newMessageModal={newMessageModal}
          newMessageReceived={newMessageReceived}
          user={user}
        />
      )}

      <Segment>
        <CreatePost user={user} setPosts={setPosts} />
        <section class="main display-flex">
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
                            <Card style={{ border:'#923737', borderRadius: '25px'}} title="As a Hoobae">
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
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<PlaceHolderPosts />}
          endMessage={<EndMessage />}
          dataLength={posts.length}
        >
          {posts.map(post => (
            <CardPost
              socket={socket}
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
            />
          ))}
        </InfiniteScroll>
      </Segment>


    </>
  );
}

Index.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 }
    });

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
