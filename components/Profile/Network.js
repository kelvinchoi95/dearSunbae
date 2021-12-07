import React, { useState, useEffect } from "react";
import { Button, Image, List, Container, Card, Icon } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";
import { NoFollowData } from "../Layout/NoData";
import { followUser, unfollowUser } from "../../utils/profileActions";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
//const ProfileModel = require("../models/ProfileModel");

const Network = ({
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId,
  profile
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const [schoolUsers, setSchoolUsers] = useState([]);
  const [occupationUsers, setOccupationUsers] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);
  const [sunbaes, setSunbaes] = useState([]);
  /*function capitalize(s)
  {
      return s[0].toUpperCase() + s.slice(1);
  }*/
  function capitalize(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }
 const showCards = (classType) => {
   console.log("i am in show card function");
  let showCards = document.getElementsByClassName(classType);
  console.log("length is: " + showCards.length);
  if(showCards.length > 0) {
    for(let i = 0; i < showCards.length; i++) {
      if(showCards[i].style.display === 'none') {
        showCards[i].style.display = "block";
      }
      else {
        showCards[i].style.display = "none";
      }
    }
  }
  
  
  
}
  useEffect(() => {
    const getSchoolUsers = async () => {
      setLoading(true);

      try {
          console.log(user.username);
        const res = await axios.get(`${baseUrl}/api/profile/network/${user.username}`, {
          headers: { Authorization: cookie.get("token") }
        });
        console.log(res.data);
        setSchoolUsers(res.data);
        //console.log("occupation users: " + occupationUsers[0].user);
      } catch (error) {
        alert("Error Loading Profiles");
      }
      setLoading(false);
    };

    const getOccupationUsers = async() => {
      setLoading(true);
      try {
        console.log(user.username);
        const res = await axios.get(`${baseUrl}/api/profile/networkOccupation/${user.username}`, {
          headers: { Authorization: cookie.get("token") }
        });
        console.log(res.data);
        setOccupationUsers(res.data);
      } catch(error) {
        alert("Error Loading Occupation Profiles")
      }
      setLoading(false);
    };
    
    const getCompanyUsers = async() => {
      setLoading(true);
      try {
        console.log(user.username);
        const res = await axios.get(`${baseUrl}/api/profile/networkCompany/${user.username}`, {
          headers: { Authorization: cookie.get("token") }
        });
        console.log(res.data);
        setCompanyUsers(res.data);
      } catch(error) {
        alert("Error Loading Occupation Profiles")
      }
      setLoading(false);
    }

    const getSunbaes = async() => {
      setLoading(true);
      try {
        console.log(user.username);
        const res = await axios.get(`${baseUrl}/api/profile/networkSunbae/${user.username}`, {
          headers: { Authorization: cookie.get("token") }
        });
        console.log(res.data);
        setSunbaes(res.data);
      } catch(error) {
        alert("Error Loading Occupation Profiles")
      }
      setLoading(false);
    }

    

    getSchoolUsers();
    getOccupationUsers();
    getCompanyUsers();
    getSunbaes();
  }, []);

  return (
    <Container style={{marginTop: "25px", border: "solid", height: "150%"}}>
    <div style={{width: "100%", borderRadius: "25px", marginTop: "20px", marginBottom: "35px"}} > 
    <h4 style={{textAlign: "left"}}>Users Who Attend/Attended {capitalize(profile.education)} 
    <Icon name="angle down" onClick={() => {showCards("schoolCards")}}/>
    </h4>
    </div>
    <Card.Group>
      {loading ? (
        <Spinner />
      ) : schoolUsers.length > 0 ? (
        schoolUsers.map(schoolUser => {
          /*  */

          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              following => following.user === schoolUser.user._id
            ).length > 0;

          return (
            <>
            {(schoolUser.user._id !== user._id) && (
              <Card className="schoolCards" style={{border: "solid", marginLeft: "40px", marginRight: "25px", marginBottom: "25px", display: "hidden", textAlign: "center"}}>
                  <Card.Content as="a" href={`/${schoolUser.user.username}`}>
                              <Image
                                avatar src={schoolUser.user.profilePicUrl}
                                
                              />
                              
                              {schoolUser.user.name}
                              
                          </Card.Content>
                            
                            <Card.Content>
                            {capitalize(schoolUser.occupation)} at {capitalize(schoolUser.company)}
                            <br/>
                            {schoolUser.user._id !== user._id && (
                              
                                <Button
                                  color={isFollowing ? "instagram" : "twitter"}
                                  icon={isFollowing ? "check" : "add user"}
                                  content={isFollowing ? "Following" : "Follow"}
                                  disabled={followLoading}
                                  style={{marginTop: "25px"}}
                                  onClick={() => {
                                    setFollowLoading(true);
            
                                    isFollowing
                                      ? unfollowUser(schoolUser.user._id, setUserFollowStats)
                                      : followUser(schoolUser.user._id, setUserFollowStats);
            
                                    setFollowLoading(false);
                                  }}
                                />
                                
                              )}
                             
                            
                              </Card.Content>
                            
                          </Card>            
           
            
            )}
            </>
          );
            
        })
      ) : (
        
        <div>No Results Found </div>
        )}
      </Card.Group>

    <div style={{width: "100%",  borderRadius: "25px", marginTop: "15px", marginBottom: "20px"}} > 
    <h4 style={{textAlign: "left"}}>Users Who Are Also {capitalize(profile.occupation)}s 
    <Icon name="angle down" onClick={() => {showCards("occupationCards")}}/>
    </h4>
    </div>

      
      <Card.Group>
      {loading ? (
        <Spinner />
      ) : occupationUsers.length > 0 ? (
        occupationUsers.map(occupationUser => {
          /*  */

          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              following => following.user === occupationUser.user._id
            ).length > 0;

          return (
            <>
            {(occupationUser.user._id !== user._id) && (
              <Card className="occupationCards" style={{border: "solid", marginLeft: "40px", marginRight: "25px", marginBottom: "25px", display: "hidden", textAlign: "center"}}>
                  <Card.Content as="a" href={`/${occupationUser.user.username}`}>
                              <Image
                                avatar src={occupationUser.user.profilePicUrl}
                                
                              />
                              
                              {occupationUser.user.name}
                              
                          </Card.Content>
                            
                            <Card.Content>
                            {capitalize(occupationUser.occupation)} at {capitalize(occupationUser.company)}
                            <br/>
                            {occupationUser.user._id !== user._id && (
                              
                                <Button
                                  color={isFollowing ? "instagram" : "twitter"}
                                  icon={isFollowing ? "check" : "add user"}
                                  content={isFollowing ? "Following" : "Follow"}
                                  disabled={followLoading}
                                  style={{marginTop: "25px"}}
                                  onClick={() => {
                                    setFollowLoading(true);
            
                                    isFollowing
                                      ? unfollowUser(occupationUser.user._id, setUserFollowStats)
                                      : followUser(occupationUser.user._id, setUserFollowStats);
            
                                    setFollowLoading(false);
                                  }}
                                />
                                
                              )}
                             
                            
                              </Card.Content>
                            
                          </Card>
           
            )}
            </>
          );
            
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}
      </Card.Group>
      <div style={{width: "100%",  borderRadius: "25px", marginTop: "15px", marginBottom: "20px"}} > 
    <h4 style={{textAlign: "left"}}>Users Who Also Work At {capitalize(profile.company)} 
    <Icon name="angle down" onClick={() => {showCards("companyCards")}}/>
    </h4>
    </div>

      
      <Card.Group >
      {loading ? (
        <Spinner />
      ) : companyUsers.length > 0 ? (
        companyUsers.map(companyUser => {
          /*  */

          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              following => following.user === companyUser.user._id
            ).length > 0;

          return (
            <>
            {(companyUser.user._id !== user._id) && (
                <Card className="companyCards" style={{border: "solid", marginLeft: "40px", marginRight: "25px", marginBottom: "25px", display: "hidden", textAlign: "center"}}>
                  <Card.Content as="a" href={`/${companyUser.user.username}`}>
                              <Image
                                avatar src={companyUser.user.profilePicUrl}
                                
                              />
                              
                              {companyUser.user.name}
                              
                          </Card.Content>
                            
                            <Card.Content>
                            {capitalize(companyUser.occupation)} at {capitalize(companyUser.company)}
                            <br/>
                            {companyUser.user._id !== user._id && (
                              
                                <Button
                                  color={isFollowing ? "instagram" : "twitter"}
                                  icon={isFollowing ? "check" : "add user"}
                                  content={isFollowing ? "Following" : "Follow"}
                                  disabled={followLoading}
                                  style={{marginTop: "25px"}}
                                  onClick={() => {
                                    setFollowLoading(true);
            
                                    isFollowing
                                      ? unfollowUser(companyUser.user._id, setUserFollowStats)
                                      : followUser(companyUser.user._id, setUserFollowStats);
            
                                    setFollowLoading(false);
                                  }}
                                />
                                
                              )}
                             
                            
                              </Card.Content>
                            
                          </Card>


            )}
            </>
          );
            
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}
        </Card.Group>
        <div style={{width: "100%",  borderRadius: "25px", marginTop: "15px", marginBottom: "20px"}} > 
    <h4 style={{textAlign: "left"}}>List of Sunbaes
    <Icon name="angle down" onClick={() => {showCards("sunbaeCards")}}/>
    </h4>
    </div>
      <Card.Group>
      {loading ? (
        <Spinner />
      ) : sunbaes.length > 0 ? (
        sunbaes.map(sunbae => {
          /*  */

          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              following => following.user === sunbae.user._id
            ).length > 0;

          return (
            <>
            
            {(sunbae.user._id !== user._id) && (
            
              <Card className="sunbaeCards" style={{border: "solid", marginLeft: "40px", marginRight: "25px", marginBottom: "25px", display: "none", textAlign: "center"}}>
              <Card.Content as="a" href={`/${sunbae.user.username}`}>
                  <Image
                    avatar src={sunbae.user.profilePicUrl}
                    
                  />
                  
                  {sunbae.user.name}
                  
              </Card.Content>
                
                <Card.Content>
                {capitalize(sunbae.occupation)} at {capitalize(sunbae.company)}
                <br/>
                {sunbae.user._id !== user._id && (
                  
                    <Button
                      color={isFollowing ? "instagram" : "twitter"}
                      icon={isFollowing ? "check" : "add user"}
                      content={isFollowing ? "Following" : "Follow"}
                      disabled={followLoading}
                      style={{marginTop: "25px"}}
                      onClick={() => {
                        setFollowLoading(true);

                        isFollowing
                          ? unfollowUser(sunbae.user._id, setUserFollowStats)
                          : followUser(sunbae.user._id, setUserFollowStats);

                        setFollowLoading(false);
                      }}
                    />
                    
                  )}
                 
                
                  </Card.Content>
                
              </Card>
            
            /*<List key={sunbae.user._id} divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  {sunbae.user._id !== user._id && (
                    <Button
                      color={isFollowing ? "instagram" : "twitter"}
                      icon={isFollowing ? "check" : "add user"}
                      content={isFollowing ? "Following" : "Follow"}
                      disabled={followLoading}
                      onClick={() => {
                        setFollowLoading(true);

                        isFollowing
                          ? unfollowUser(sunbae.user._id, setUserFollowStats)
                          : followUser(sunbae.user._id, setUserFollowStats);

                        setFollowLoading(false);
                      }}
                    />
                  )}
                </List.Content>
                <Image avatar src={sunbae.user.profilePicUrl} />
                <List.Content as="a" href={`/${sunbae.user.username}`}>
                  {sunbae.user.name}
                </List.Content>
              </List.Item>
                    </List> */
                    
            )}
            
            </>
          );
            
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}  
      </Card.Group>

    </Container>
  );
};

export default Network;
