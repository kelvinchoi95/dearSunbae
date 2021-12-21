const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const MeetingModel = require("../models/MeetingModel");
const bcrypt = require("bcryptjs");
const paypal = require('@paypal/payouts-sdk');

const {
  newFollowerNotification,
  removeFollowerNotification
} = require("../utilsServer/notificationActions");

//GET SCHOOL USERS
router.get("/network/:username", authMiddleware, async (req, res) => {
  console.log("in network api");
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    console.log("user: " + user);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    const profile = await ProfileModel.findOne({ user: user._id }).populate("user");
    console.log("profile: " + profile);
    const userEducation = profile.education;
    console.log("found profile");
    //find all profiles with matching school
    const profilesResult = await ProfileModel.find({education: userEducation}).populate("user");
    console.log("about to return profiles Result");
    console.log("profilesResult is: " + profilesResult);
    return res.json(profilesResult);
  } catch(error) {
    console.error(error);
  }
});

//GET OCCUPATION USERS
router.get("/networkOccupation/:username", authMiddleware, async (req, res) => {
  console.log("in network api");
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    const profile = await ProfileModel.findOne({ user: user._id }).populate("user");

    const userOccupation = profile.occupation;
    //find all profiles with matching school
    const profilesResult = await ProfileModel.find({occupation: userOccupation}).populate("user");
    
    return res.json(profilesResult);
  } catch(error) {
    console.error(error);
  }
});
//GET SUNBAE USERS
router.get("/networkSunbae/:username", authMiddleware, async (req, res) => {
  console.log("in network api");
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    const profile = await ProfileModel.findOne({ user: user._id }).populate("user");

    //const userClassification = profile.classification;
    //find all profiles with matching school
    const profilesResult = await ProfileModel.find({classification: 'sunbae'}).populate("user");
    
    return res.json(profilesResult);
  } catch(error) {
    console.error(error);
  }
});
//GET COMPANY USERS
router.get("/networkCompany/:username", authMiddleware, async (req, res) => {
  console.log("in network api");
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    const profile = await ProfileModel.findOne({ user: user._id }).populate("user");

    const userCompany = profile.company;
    //find all profiles with matching school
    const profilesResult = await ProfileModel.find({company: userCompany}).populate("user");
    
    return res.json(profilesResult);
  } catch(error) {
    console.error(error);
  }
});
// Homepage profile info
router.get("/", async(req, res) => {
  console.log("in get homepage profile info");
  try{
    
    const {userId} = req;
    console.log("userId is: " + userId);
    const user = await UserModel.findById(userId);
    if(!user) {
      return res.status(404).send("No User Found");
    }
    return res.json({user});
  } catch(error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
})
// GET PROFILE INFO
router.get("/:username", authMiddleware, async (req, res) => {
  try {
    console.log("in get profileapi");
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("No User Found");
    }
    
    
    
    const profile = await ProfileModel.findOne({ user: user._id }).populate("user");

    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    return res.json({
      profile,

      followersLength:
        profileFollowStats.followers.length > 0 ? profileFollowStats.followers.length : 0,

      followingLength:
        profileFollowStats.following.length > 0 ? profileFollowStats.following.length : 0,

        user
      
      
      

    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET POSTS OF USER
router.get(`/posts/:username`, authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("No User Found");
    }

    const posts = await PostModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET FOLLOWERS OF USER
router.get("/followers/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await FollowerModel.findOne({ user: userId }).populate("followers.user");

    return res.json(user.followers);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// GET FOLLOWING OF USER
router.get("/following/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await FollowerModel.findOne({ user: userId }).populate("following.user");

    return res.json(user.following);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// FOLLOW A USER
router.post("/follow/:userToFollowId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { userToFollowId } = req.params;

    const user = await FollowerModel.findOne({ user: userId });
    const userToFollow = await FollowerModel.findOne({ user: userToFollowId });

    if (!user || !userToFollow) {
      return res.status(404).send("User not found");
    }

    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(following => following.user.toString() === userToFollowId)
        .length > 0;

    if (isFollowing) {
      return res.status(401).send("User Already Followed");
    }

    await user.following.unshift({ user: userToFollowId });
    await user.save();

    await userToFollow.followers.unshift({ user: userId });
    await userToFollow.save();

    await newFollowerNotification(userId, userToFollowId);

    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// UNFOLLOW A USER
router.put("/unfollow/:userToUnfollowId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { userToUnfollowId } = req.params;

    const user = await FollowerModel.findOne({
      user: userId
    });

    const userToUnfollow = await FollowerModel.findOne({
      user: userToUnfollowId
    });

    if (!user || !userToUnfollow) {
      return res.status(404).send("User not found");
    }

    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(following => following.user.toString() === userToUnfollowId)
        .length === 0;

    if (isFollowing) {
      return res.status(401).send("User Not Followed before");
    }

    const removeFollowing = await user.following
      .map(following => following.user.toString())
      .indexOf(userToUnfollowId);

    await user.following.splice(removeFollowing, 1);
    await user.save();

    const removeFollower = await userToUnfollow.followers
      .map(follower => follower.user.toString())
      .indexOf(userId);

    await userToUnfollow.followers.splice(removeFollower, 1);
    await userToUnfollow.save();

    await removeFollowerNotification(userId, userToUnfollowId);

    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// UPDATE PROFILE
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    //console.log("userId is: " + userId);

    const { bio, occupation, education, company, classification, facebook, youtube, twitter, instagram, profilePicUrl } = req.body;

    let profileFields = {};
    profileFields.user = userId;

    profileFields.bio = bio;

    profileFields.occupation = occupation.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());;
    
    profileFields.education = education.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());;
    profileFields.company = company.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());;
    profileFields.classification = classification;
    console.log("classification: " + classification);
    profileFields.social = {};

    if (facebook) profileFields.social.facebook = facebook;

    if (youtube) profileFields.social.youtube = youtube;

    if (instagram) profileFields.social.instagram = instagram;

    if (twitter) profileFields.social.twitter = twitter;

    await ProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true }
    );

    if (profilePicUrl) {
      const user = await UserModel.findById(userId);
      user.profilePicUrl = profilePicUrl;
      await user.save();
    }

    return res.status(200).send("Success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// UPDATE PASSWORD
router.post("/settings/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (newPassword.length < 6) {
      return res.status(400).send("Password must be atleast 6 characters");
    }

    const user = await UserModel.findById(req.userId).select("+password");

    const isPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isPassword) {
      return res.status(401).send("Invalid Password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).send("Updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// UPDATE MESSAGE POPUP SETTINGS
router.post("/settings/messagePopup", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (user.newMessagePopup) {
      user.newMessagePopup = false;
    }
    //
    else {
      user.newMessagePopup = true;
    }

    await user.save();
    return res.status(200).send("updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

router.post("/schedule/createMeeting", authMiddleware, async(req, res) => {
  console.log("INSIDE MEETING API");
  try {
    console.log("i am in PROFILE API");
    /*const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    if (!user) {
      return res.status(404).send("No User Found");
    }*/
    console.log(req.body);
    //console.log(req.params);
    console.log(req.body.sunbae);
    const meeting = new MeetingModel({
      sunbae: req.body.sunbae,
      hoobae: req.body.hoobae,
      completionTime: req.body.completionTime,
      price: req.body.price

    });

    
    await meeting.save();
    
    console.log(meeting);
    return res.status(200).send("created meeting");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
})

//GET SCHOOL USERS
router.get("/completedMeetings/:username", authMiddleware, async (req, res) => {
  console.log("in completedMeetings api");
  try {
    //console.log(req);
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    //console.log("user: " + user);
    console.log(user.email);
    if (!user) {
      return res.status(404).send("No User Found");
    }

    //const meetings = await MeetingModel.find({sunbae: user._id}).populate("sunbae hoobae");
    const meetings = await MeetingModel.find({$or : [{ hoobae: user._id}, {sunbae: user._id}]}).populate("sunbae hoobae");
    console.log("meetings are: " + meetings);
    return res.json(meetings);

    /*const profile = await ProfileModel.findOne({ user: user._id }).populate("user");
    console.log("profile: " + profile);
    const userEducation = profile.education;
    console.log("found profile");
    //find all profiles with matching school
    const profilesResult = await ProfileModel.find({education: userEducation}).populate("user");
    console.log("about to return profiles Result");
    console.log("profilesResult is: " + profilesResult);
    return res.json(profilesResult); */
  } catch(error) {
    console.error(error);
  }
});

router.post("/confirmMeeting/:username", authMiddleware, async(req, res) => {
  console.log("in confirm Meeting api");
  try {
    const hoobae = req.body.meeting.hoobae._id;
    const sunbae = req.body.meeting.sunbae._id;
    const {username} = req.params;
    const meetingId = req.body.meeting._id;
    console.log("meeting id is: " + req.body.meeting._id);
    const user = await UserModel.findOne({ username: username.toLowerCase() });
    console.log("user name is: " + user.username);
    //console.log("user: " + user);
    console.log(user.email);
    if (!user) {
      return res.status(404).send("No User Found");
    }
    console.log("user id is: " + user._id);
    console.log("hoobae id is: " + req.body.meeting.hoobae._id);
    console.log("sunbae id is: " + sunbae);
    let currentUser = "";
    let receiverUser = "";
    if(hoobae.toString() === user._id.toString()) {
      console.log("user is hoobae");
      currentUser = hoobae.username;
      receiverUser = sunbae.username;
      const meeting = await MeetingModel.findByIdAndUpdate({_id: meetingId}, {hoobaeConfirmation: true});
      await meeting.save();
    }
    else if(sunbae.toString() === user._id.toString()) {
      console.log("user is sunbae");
      currentUser = sunbae.username;
      receiverUser = hoobae.username;
      const meeting = await MeetingModel.findByIdAndUpdate({_id: meetingId}, {sunbaeConfirmation: true});
      await meeting.save();
    }

    const meeting = await MeetingModel.findById(meetingId);
    console.log("meeting details: " + meeting);
    if(meeting.hoobaeConfirmation === true && meeting.sunbaeConfirmation === true) {
      console.log("BOTH MEETINGS ARE TRUE");

      let clientId = process.env.PAYPAL_CLIENT_ID;
      let clientSecret = process.env.PAYPAL_SECRET;
      console.log("PRICE BEFORE DEDUCTION: " + req.body.meeting.price);
      let price = req.body.meeting.price * 0.70;
      console.log("PRICE IS: " + price);      
      let environment = new paypal.core.ProductionEnvironment(clientId, clientSecret);
      let client = new paypal.core.PayPalHttpClient(environment);

      let requestBody = {
        "sender_batch_header": {
          "recipient_type": "EMAIL",
          "email_message": `We have sent your payment of ${price} to your PayPal account.`,
          "note": `Meeting with ${req.body.meeting.hoobae.name} at ${req.body.meeting.completionTime}`,
          "sender_batch_id": `Meeting with ${req.body.meeting.hoobae.name} at ${req.body.meeting.completionTime}`,
          "email_subject": "Your Paypal Payment From Dear Sunbae"
        },
        "items": [{
          "note": `Your ${price} Payout!`,
          "amount": {
            "currency": "USD",
            "value": price.toFixed(2),
          },
          //"receiver": "sb-wi5pd8898790@personal.example.com",
          "receiver": req.body.meeting.sunbae.email,
          "sender_item_id": "Test_txn_1"
        }
        /*, {
          "note": "Your 1$ Payout!",
          "amount": {
            "currency": "USD",
            "value": "1.00"
          },
          "receiver": "payout-sdk-2@paypal.com",
          "sender_item_id": "Test_txn_2"
        }, {
          "note": "Your 1$ Payout!",
          "amount": {
            "currency": "USD",
            "value": "1.00"
          },
          "receiver": "payout-sdk-3@paypal.com",
          "sender_item_id": "Test_txn_3"
        }, {
          "note": "Your 1$ Payout!",
          "amount": {
            "currency": "USD",
            "value": "1.00"
          },
          "receiver": "payout-sdk-4@paypal.com",
          "sender_item_id": "Test_txn_4"
        }, {
          "note": "Your 1$ Payout!",
          "amount": {
            "currency": "USD",
            "value": "1.00"
          },
          "receiver": "payout-sdk-5@paypal.com",
          "sender_item_id": "Test_txn_5"
        } */
      ]
      }
      
      // Construct a request object and set desired parameters
      // Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
      let request = new paypal.payouts.PayoutsPostRequest();
      request.requestBody(requestBody);
      
      // Call API with your client and get a response for your call
      createPayouts  = async function(){
          console.log("IN CREATE PAYOUT FUNCTION");
            let response = await client.execute(request);
            console.log(`Response: ${JSON.stringify(response)}`);
            // If call returns body in response, you can get the deserialized version from the result attribute of the response.
            console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
      }

      try {
        await createPayouts();
        console.log("PAYOUTS SENT");
      } catch(error) {
        console.error(error);
      }
      

    }
    return res.json(meeting);



  }catch(error) {
    console.error(error);
  }
})

module.exports = router;
