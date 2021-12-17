import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Form, Segment, Divider, Select, Button, Image, List } from "semantic-ui-react";
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
import { addMeeting } from "../../utils/addMeeting";




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
  const [price, setPrice] = useState(0);
  const [timezone, setTimezone] = useState("");
      //date handler
      const [startDate, onStartChange] = useState(new Date());
      const [endDate, onEndChange] = useState(new Date());
      const [eventTitle, setEventTitle] = useState("");
      const [payPal, setpayPal] = useState(false);
      var gapi;
      const style = {"layout":"vertical", "width" : "20%", marginTop: "100px"};
      const PayPalButton = window.paypal.Buttons.driver("react", {React, ReactDOM});
      const priceOptions = [
        {key: 'a', text: '$1', value: 1},
        { key: 's', text: '$50 for 30 Minutes', value: 50 },
        { key: 'h', text: '$90 for 60 Minutes', value: 90 },
        
      ]
      
      let options = tz.map(function(timezone) {
        return ({key: timezone, text: timezone, value: timezone})
    })
    const handleSelectChange=(e,{name, value})=> {
    //const {value} = e.target;
    console.log("value is: " + value);
    console.log("name is: " + name);
    setPrice(value);

    //classification = value;
    console.log("price is: " + price);
  }

  const handleTimeZone = (e,{name, value})=> {
    //const {value} = e.target;
    console.log("value is: " + value);
    console.log("name is: " + name);
    setTimezone(value);

    //classification = value;
    console.log("timezone is: " + timezone);
  }
      
  useEffect(() => {
    
    gapi = window.gapi;
  })
  var CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  var API_KEY = process.env.GOOGLE_API_KEY;
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"
  //const Meeting = require('google-meet-api').meet;

  

  const createOrder = (data, actions) =>{
    console.log("price is: " + price);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
          

          
        },
      ],
      
    });
  };

  const onApprove = (data, actions) => {
    setpayPal(true);
    return actions.order.capture();
  };

  const handleClick = () => {
    
    const addMeetingToDB = async() => {
      console.log(user.email);
      console.log(profile.user.email);
      console.log(price);
      await addMeeting(user, profile.user, endDate, price);
    }
    //addMeetingToDB();
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          
          apiKey: process.env.GOOGLE_API_KEY,
          clientId: process.env.GOOGLE_CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
        //var timezone = document.getElementById("timezone").value;
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
            addMeetingToDB();
            toast.success("Event successfully created! An email notification was sent out to all attendees!");
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
    
    <div  align="center" style={{backgroundColor: "white", height: "1000px"}}>

    <h1 align="center">Schedule Your Meeting With {profile.user.name}</h1>
    <p>Please Pick a Starting and End Time For Your Meeting</p>
    <div style={{height: "275px"}}>
    <DateTimePicker
                onChange={onStartChange}
                value={startDate}         
      />
      
      <DateTimePicker
                onChange={onEndChange}
                value={endDate}         
      />
    </div>
    
     
    
    <Form onSubmit = {handleClick}>
      <Segment>
      

      
      <Form.Input
        control = {Select}
        label = 'Timezone'
        options = {options}
        name = "Timezone"
        onChange={handleTimeZone}
        placeholder='Timezone'
        required
      />

      <Form.Input
        label="Event Title"
        placeholder = "Event Title"
        value={eventTitle}
        onChange={e => {
          setEventTitle(e.target.value);

        }}
        required
      />

      <Form.Input
        control = {Select}
        label= 'Price'
        options = {priceOptions}
        name = "price"
        placeholder = "Choose Price"
        onChange = {handleSelectChange}
        required
      />
      <Divider style={{marginTop: "100px"}}/>
      <PayPalButton
                
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
      />

      <Button
            icon="signup"
            content="Schedule Meeting"
            type="submit"
            color="blue"
            disabled= {!eventTitle || !timezone || !startDate || !endDate || !payPal || !price}
          /> 
      </Segment>
    </Form>  
    </div>
      
    {/*<div class="row justify-content-center pt-2 id" style={{border:"solid"}}>
          
            
            <h1 align="center">Schedule Your Meeting With {profile.user.name}</h1>
            <div style={{marginTop: "20px"}}>
            {/*<img src="url(../public/img/logo2cropped2.png)" class="rounded mx-auto d-block" alt=""/> */}
           
            
    </>
  );
};

export default Schedule;
