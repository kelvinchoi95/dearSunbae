import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import Router from "next/router";
import cookie from "js-cookie";
const addMeeting = async(hoobae, sunbae, endDate, price) => {
    try {
        console.log("in add meeting");
        //console.log("hoobaeEmail is: " + hoobaeEmail);

        const res = await axios.post(`${baseUrl}/api/profile/schedule/createMeeting`, {hoobae: hoobae, sunbae: sunbae, completionTime: endDate, price: price},
         { headers: {Authorization: cookie.get("token"), 
        }}, 
        );
        res.send(ok);
        
        
      } catch (error) {
          //console.log(error);
        const errorMsg = catchErrors(error);
        console.log("something went wrong");
        console.log(errorMsg);
      }
      
}


module.exports = {
    addMeeting
};
