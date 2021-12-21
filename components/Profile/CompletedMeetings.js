import React, { useState, useEffect } from "react";
import { Button, Image, List, Container, Card } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";
import moment from "moment";

import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
/*
    Display all completed meetings for user
    
*/
const CompletedMeetings = ({
  user,

}) => {
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [hoobae, setHoobae] = useState(false);
  const [sunbae, setSunbae] = useState(false);
  const [disable, setDisable] = useState([]);
  
  //const [following, setFollowing] = useState([]);
  //const [loading, setLoading] = useState(false);
  //const [followLoading, setFollowLoading] = useState(false);
  
  const confirm = async(meeting) => {
    const res = await axios.post(`${baseUrl}/api/profile/confirmMeeting/${user.username}`,{meeting: meeting}, {
      headers: { Authorization: cookie.get("token") }
    }
    
  )
    

    const responseMeeting = res.data;
    console.log("meeting after api called is: " + responseMeeting.hoobaeConfirmation);
    if(responseMeeting.hoobaeConfirmation === true && responseMeeting.sunbaeConfirmation === true) {
      console.log("Both sunbae and hoobae confirmed meeting took place");
      setDisable([...disable, meeting.hoobaeConfirmation]);
     //window.location.reload();
    }
    window.location.reload();
};
function parseIsoDatetime(dtstr) {
  var dt = dtstr.split(/[: T-]/).map(parseFloat);
  var date = new Date(dt[0], dt[1] - 1, dt[2], dt[3] || 0, dt[4] || 0, dt[5] || 0, 0);
  console.log(date);
  return date;
}

  useEffect(() => {
    const getMeetings = async () => {
      setLoading(true);

      try {
          console.log(user.username);
        const res = await axios.get(`${baseUrl}/api/profile/completedMeetings/${user.username}`, {
          headers: { Authorization: cookie.get("token") }
        });
        console.log("back to completedmeetings.js");
        console.log("here is the data" + res.data);
        setMeetings(res.data);
        console.log("meetings length is: " + meetings.length);
        //console.log("meetings are: " + meetings[0]);
        
        meetings.map(meeting => {
          
          console.log("in loop");
          console.log(meeting.completionTime);
        })
        //console.log("occupation users: " + occupationUsers[0].user);
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    }
    getMeetings();
  }, []);

  return (
    <Container>
     <h2>List of Meetings</h2>
     <Card.Group>
     {loading ? (
        <Spinner />
      ) : meetings.length > 0 ? (
        meetings.map(meeting => {
          //sunbaeOrHoobae(meeting);
          const date = parseIsoDatetime(meeting.completionTime);
          console.log("date is: " + date);
          console.log("user id is: " + user._id);
          console.log("sunbae id is: " + meeting.hoobae);
          /* 
          if(user._id === meeting.hoobae._id) {
            console.log("setting hoobae to true");
            setHoobae(true);
            
          }
          else if(user._id === meeting.sunbae._id) {
            console.log("setting sunbae to true");
            setSunbae(true);
            
          }
          */
          /* on {new Date(meeting.completionTime).getFullYear()+'-' + (new Date(meeting.completionTime).getMonth() + 1) + '-'+(new Date(meeting.completionTime).getDate() + 1)} 
                   at {new Date(meeting.completionTime).getHours()}
          */
          return (
           
            <>
            {(meeting.hoobae._id === user._id) && (
            <Card style={{border: "solid", marginLeft: "40px", marginRight: "25px", marginBottom: "25px", display: "flex", textAlign: "center"}}>
            Meeting With <Card.Content as="a" href={`/${meeting.sunbae.username}`}> 
            
                        <Image
                          avatar src={meeting.sunbae.profilePicUrl}
                          
                        />
                        
                        {meeting.sunbae.name}
                        
                    </Card.Content>
                    
                   on {moment(meeting.completionTime).format('YYYY-MM-DD h:mm:ss a')}

                    
                    
                    
                      <Card.Content>
                      
                      {meeting.sunbae._id !== user._id && (
                        
                        <Button 
                        disabled={meeting.hoobaeConfirmation === true} 
                        content={meeting.hoobaeConfirmation ? "I have attended this meeting" : "Confirm Meeting took place"}
                        onClick={() => confirm(meeting)}>I attended this meeting</Button>
                          
                        )}
                       
                      
                        </Card.Content>
                      
                    </Card>

            )}

            {(meeting.sunbae._id === user._id) && (
              <Card style={{border: "solid", marginLeft: "40px", marginRight: "25px", marginBottom: "25px", display: "flex", textAlign: "center"}}>
            Meeting With <Card.Content as="a" href={`/${meeting.hoobae.username}`}>
                        <Image
                          avatar src={meeting.hoobae.profilePicUrl}
                          
                        />
                        
                        {meeting.hoobae.name}
                        
                    </Card.Content>
                    on {moment(meeting.completionTime).format('YYYY-MM-DD h:mm:ss a')}
                      <Card.Content>
                      
                      {meeting.hoobae._id !== user._id && (
                        
                        <Button 
                        disabled={meeting.sunbaeConfirmation === true} 
                        content={meeting.sunbaeConfirmation ? "I have attended this meeting" : "Confirm Meeting took place"}
                        onClick={() => confirm(meeting)}>I attended this meeting</Button>
                          
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
    </Container>
  );
};

export default CompletedMeetings;
