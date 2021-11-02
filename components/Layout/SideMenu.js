import React from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

function SideMenu({
  user: { unreadNotification, email, unreadMessage, username },
  pc = true
}) {
/*  const CustomIcon = (
    <i className="icon">
      <img width={38} height={38} src={'url(/logo2cropped2.png)'} alt="Lasdf"height={30} style={{margin:"0 0 0 0" ,paddingTop:15, paddingBottom:0 ,float:"left", verticalAlign: "bottom"}} />
    </i>
  );*/
  const router = useRouter();

  const isActive = route => router.pathname === route;

  return (
    <>
      <List style={{ paddingTop: "1rem" }} size="big" verticalAlign="middle" selection>
      
      {/*<Link href="/signedInHomepage">
          
  <List.Item active={isActive("/signedInHomepage")}> */}
            {/* <img src='../../public/img/logo2cropped2.png' alt="Logffo"height={30} style={{margin:"0 0 0 0" ,paddingTop:15, paddingBottom:0 ,float:"left", verticalAlign: "bottom"}} />} */}
            <List.Item>
            <img
            src="/logo2cropped2.png"
            alt="Logo"
            className="img-thumbnail"
            style={{margin:"0,0,0,0" ,width: '150px', height: '70px', paddingTop:15, paddingBottom:0 ,float:"left", verticalAlign: "bottom"}}
          />
          </List.Item>
            {/*</List.Item>
        </Link> */}
        
        <br/> 
  
        {/*<Link href="/signedInHomepage">
          <List.Item active={isActive("/signedInHomepage")}>
            <Icon name="home" size="large" color={isActive("/signedInHomepage") && "teal"} />
            <List.Content>{pc && <List.Header content="Homepage" />}</List.Content>
          </List.Item>
        </Link>
      <br /> */}
      <Link href="/home">
          <List.Item id="listitem" active={isActive("/home")} >
            <Icon name="home" size="large" color={isActive("/home") && "teal"} />
            <List.Content>{pc && <List.Header content="Homepage" />}</List.Content>
          </List.Item>
        </Link>
        <br />
        <Link href="/">
          <List.Item id="listitem" active={isActive("/")}>
            <Icon name="desktop" size="large" color={isActive("/") && "teal"} />
            <List.Content>{pc && <List.Header content="Dashboard" />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href="/messages">
          <List.Item id="listitem" active={isActive("/messages")}>
            <Icon
              name={unreadMessage ? "hand point right" : "mail outline"}
              size="large"
              color={(isActive("/messages") && "teal") || (unreadMessage && "orange")}
            />
            <List.Content>{pc && <List.Header content="Messages" />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href="/notifications">
          <List.Item id="listitem" active={isActive("/notifications")}>
            <Icon
              name={unreadNotification ? "hand point right" : "bell outline"}
              size="large"
              color={
                (isActive("/notifications") && "teal") || (unreadNotification && "orange")
              }
            />
            <List.Content>{pc && <List.Header content="Notifications" />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item id="listitem" active={router.query.username === username}>
            <Icon
              name="user"
              size="large"
              color={router.query.username === username && "teal"}
            />
            <List.Content>{pc && <List.Header content="Account" />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <List.Item id="listitem" onClick={() => logoutUser(email)}>
          <Icon name="log out" size="large" />
          <List.Content>{pc && <List.Header content="Logout" />}</List.Content>
        </List.Item>
      </List>
    </>
  );
}

export default SideMenu;
