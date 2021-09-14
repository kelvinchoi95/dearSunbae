import React, { useState, useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
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
  function capitalize(s)
  {
      return s[0].toUpperCase() + s.slice(1);
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
    <>
    <h2>Users Who Attend/Attended {capitalize(profile.education)}</h2>
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
            
            <List key={schoolUser.user._id} divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  {schoolUser.user._id !== user._id && (
                    <Button
                      color={isFollowing ? "instagram" : "twitter"}
                      icon={isFollowing ? "check" : "add user"}
                      content={isFollowing ? "Following" : "Follow"}
                      disabled={followLoading}
                      onClick={() => {
                        setFollowLoading(true);

                        isFollowing
                          ? unfollowUser(schoolUser.user._id, setUserFollowStats)
                          : followUser(schoolUser.user._id, setUserFollowStats);

                        setFollowLoading(false);
                      }}
                    />
                  )}
                </List.Content>
                <Image avatar src={schoolUser.user.profilePicUrl} />
                <List.Content as="a" href={`/${schoolUser.user.username}`}>
                  {schoolUser.user.name}
                </List.Content>
              </List.Item>
            </List>
            )}
            </>
          );
            
        })
      ) : (
        
        <div>No Results Found </div>
        )}
      <h2>Users Who Are Also {capitalize(profile.occupation)}s</h2>
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
            
            <List key={occupationUser.user._id} divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  {occupationUser.user._id !== user._id && (
                    <Button
                      color={isFollowing ? "instagram" : "twitter"}
                      icon={isFollowing ? "check" : "add user"}
                      content={isFollowing ? "Following" : "Follow"}
                      disabled={followLoading}
                      onClick={() => {
                        setFollowLoading(true);

                        isFollowing
                          ? unfollowUser(occupationUser.user._id, setUserFollowStats)
                          : followUser(occupationUser.user._id, setUserFollowStats);

                        setFollowLoading(false);
                      }}
                    />
                  )}
                </List.Content>
                <Image avatar src={occupationUser.user.profilePicUrl} />
                <List.Content as="a" href={`/${occupationUser.user.username}`}>
                  {occupationUser.user.name}
                </List.Content>
              </List.Item>
            </List>
            )}
            </>
          );
            
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}
      <h2>Users Who Also Work At {capitalize(profile.company)}</h2>
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
            
            <List key={companyUser.user._id} divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  {companyUser.user._id !== user._id && (
                    <Button
                      color={isFollowing ? "instagram" : "twitter"}
                      icon={isFollowing ? "check" : "add user"}
                      content={isFollowing ? "Following" : "Follow"}
                      disabled={followLoading}
                      onClick={() => {
                        setFollowLoading(true);

                        isFollowing
                          ? unfollowUser(companyUser.user._id, setUserFollowStats)
                          : followUser(companyUser.user._id, setUserFollowStats);

                        setFollowLoading(false);
                      }}
                    />
                  )}
                </List.Content>
                <Image avatar src={companyUser.user.profilePicUrl} />
                <List.Content as="a" href={`/${companyUser.user.username}`}>
                  {companyUser.user.name}
                </List.Content>
              </List.Item>
            </List>
            )}
            </>
          );
            
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}
      <h2>List of Sunbaes</h2>
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
            
            <List key={sunbae.user._id} divided verticalAlign="middle">
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
            </List>
            )}
            </>
          );
            
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}  

    </>
  );
};

export default Network;
