import React, { useState, useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";
import { NoFollowData } from "../Layout/NoData";
import { followUser, unfollowUser } from "../../utils/profileActions";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'; 
//import 'react-calendar/dist/Calendar.css'; 
//import 'react-clock/dist/Clock.css'; 
import 'react-datetime-picker/dist/DateTimePicker.css';
import { tz } from "./Timezone";


const Schedule = ({
  user,
  profile,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId,
  
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
      //date handler
      const [startDate, onStartChange] = useState(new Date());
      const [endDate, onEndChange] = useState(new Date());
      const [eventTitle, setEventTitle] = useState("");
      var gapi;


  useEffect(() => {
    gapi = window.gapi;
  })
  var CLIENT_ID = "109059586625-c2kld19bnp6ofstrrmadt997q6uge4rb.apps.googleusercontent.com";
  var API_KEY = "AIzaSyAdY5vyDbfiJic36wsoLjDevkG7KcvlsgA";
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"
  //const Meeting = require('google-meet-api').meet;
  const handleClick = () => {
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
        var timezone = document.getElementById("timezone").value;
        console.log(timezone);
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          /*var event = {
            'summary': eventTitle,
            //"conferenceDataVersion": 1,
            'description': 'Dear Sunbae Consultation Meeting',
            
            'start': {
              'dateTime': startDate,
              'timeZone': timezone
            },
            'end': {
              'dateTime': endDate,
              'timeZone': timezone
            },
            //'recurrence': [
              //'RRULE:FREQ=DAILY;COUNT=2'
            //],
            'attendees': [
              {'email': viewUser.email},
              {'email': user.email}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ],
              }
              
            }*/
          
  
          var request = gapi.client.calendar.events.insert({
            /*'calendarId': 'primary',
            
            'resource': event,*/
            "calendarId": "primary",
            "conferenceDataVersion": 1,
            "resource": {
              "end": {
              'dateTime': endDate,
              'timeZone': timezone
                //"date": "2021-07-29"
              },
              "start": {
                'dateTime': startDate,
                'timeZone': timezone
                //"date": "2021-07-29"
              },
              'attendees': [
                {'email': profile.user.email},
                {'email': user.email}
              ],
              "conferenceData": {
                "createRequest": {
                  "conferenceSolutionKey": {
                    "type": "hangoutsMeet"
                  },
                  "requestId": "some-random-string"
                }
              },
              "summary": eventTitle
            }

          })
          

          
  
          request.execute(event => {
            console.log(event)
            
            //toast.success("Event successfully created! An email notification was sent out to all attendees!");
            window.open(event.htmlLink);
            
          })
          
          


          
          /*var eventPatch = {
              conferenceData: {
                createRequest: {requestId: "7qxalsvy0e"}
              }
            };
            
            gapi.client.calendar.events.patch({
              calendarId: "primary",
              eventId: eventId,
              resource: eventPatch,
              sendNotifications: true,
              conferenceDataVersion: 1
            }).execute(function(event) {
              console.log("Conference created for event: %s", event.htmlLink);
            });*/
            
  
          /*
              Uncomment the following block to get events
          */
          /*
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
          })
          */
      
  
        })
      })
    }
   
  


    


  return (
    <>
    
    <div class="row justify-content-center pt-2 id">
          
            
            <h1 align="center">Schedule Your Meeting</h1>
            <div style={{marginTop: "20px"}}>
            <img src="url(/img/logo2cropped2.png)" class="rounded mx-auto d-block" alt=""/>
           
            </div>
            <p style={{ height: "20px" }}></p>           
            <div align="center">
              <h3>Please Pick a Starting Date and Time</h3>
              <DateTimePicker
                onChange={onStartChange}
                value={startDate}         
              />
              </div>
              
              <br/>
                   
              <div align="center">
              <h3>Please Pick an Ending Date and Time</h3>
              <DateTimePicker 
                onChange={onEndChange}
                value={endDate}
              />
              </div>

              
            {console.log("startDate is: "  + startDate)}
            {console.log("endDate is: "  + endDate)}
            <div align="center">
            <br/>
            <div align="center"> <h3 class="mb-0">Please Pick a Timezone:</h3></div>

            <label for="timezone"></label>
            <br/>
                
                <select id="timezone" name="carlist" form="timezone">
                  <br/>
                  <option value="">Please Select a TimeZone</option>
                    {tz && tz.map((timezone) => (
                      <option value={timezone}>{timezone}</option>
                    ))}
                </select>
                <br/>
                <p style={{ height: "20px" }}></p>
                <div>
                <div align="center"> <h3 class="mb-0">Please Enter Event Title:</h3></div>
    
                <label for="eventTitle"></label>
                <br/>
                <input type="text" id="eventTitle" name="eventTitle" value={eventTitle} onChange={e => setEventTitle(e.target.value)}/>
                </div>

                <p style={{ height: "20px" }}></p>           
            <button onClick={handleClick} disabled= {!eventTitle || !timezone || !startDate || !endDate} className="btn btn-block btn-primary" style={{width: "9%", borderRadius: "25px", backgroundColor: "#ccc" }} > Schedule Meeting</button>
            </div>

            
            
            
            
            
              

              
            
                   
                                
            
                        {/*when button is clicked run google api event script to generate google meets link
                            send toast notification to let user know that the event was successfully created, and an email containing the google meets link was sent
                        */}

            
            
            
        </div>
    </>
  );
};

export default Schedule;
