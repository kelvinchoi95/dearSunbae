import React, { useState, useRef } from "react";
import { Form, Button, Message, Divider, Select } from "semantic-ui-react";
import ImageDropDiv from "../Common/ImageDropDiv";
import CommonInputs from "../Common/CommonInputs";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { profileUpdate } from "../../utils/profileActions";

function UpdateProfile({ Profile }) {
  const [profile, setProfile] = useState({
    profilePicUrl: Profile.user.profilePicUrl,
    bio: Profile.bio || "",
    education: Profile.education || "",
    occupation: Profile.occupation || "",
    company: Profile.company || "",
    classification: Profile.classification || "",
    facebook: (Profile.social && Profile.social.facebook) || "",
    youtube: (Profile.social && Profile.social.youtube) || "",
    instagram: (Profile.social && Profile.social.instagram) || "",
    twitter: (Profile.social && Profile.social.twitter) || ""
  });

  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = e => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  const handleSelectChange=(e,{name, value})=> {
    //const {value} = e.target;
    console.log("value is: " + value);
    console.log("name is: " + name);
    setProfile(prev => ({ ...prev, [name]: value }));

    //classification = value;
    //console.log("classification is: " + classification);
  }
  const options = [
    { key: 's', text: 'Sunbae', value: 'sunbae' },
    { key: 'h', text: 'Hoobae', value: 'hoobae' },
    
  ]

  return (
    <>
      <Form
        error={errorMsg !== null}
        loading={loading}
        onSubmit={async e => {
          e.preventDefault();
          setLoading(true);

          let profilePicUrl;

          if (media !== null) {
            profilePicUrl = await uploadPic(media);
          }

          if (media !== null && !profilePicUrl) {
            setLoading(false);
            return setErrorMsg("Error Uploading Image");
          }

          await profileUpdate(profile, setLoading, setErrorMsg, profilePicUrl);
        }}
      >
        <Message
          onDismiss={() => setErrorMsg(false)}
          error
          content={errorMsg}
          attached
          header="Oops!"
        />

        <ImageDropDiv
          inputRef={inputRef}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          handleChange={handleChange}
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={setMedia}
          profilePicUrl={profile.profilePicUrl}
        />

        <Form.Input
            control={Select}
            label='Classification'
            options={options}
            name = "classification"
            //value={classification} 
            //onChange={handleChange}
            onChange={handleSelectChange}
            //onChange={(e, { value }) => alert(value)}
            placeholder='Classification'
            //onChange={handleChange}
            //required
          />

        <CommonInputs
          user={profile}
          handleChange={handleChange}
          showSocialLinks={showSocialLinks}
          setShowSocialLinks={setShowSocialLinks}
        />

        <Divider hidden />

        <Button
          color="blue"
          icon="pencil alternate"
          disabled={profile.bio === "" || profile.classification === "" || profile.occupation === "" || profile.education === "" || profile.company === "" || loading}
          content="Submit"
          type="submit"
        />
      </Form>
    </>
  );
}

export default UpdateProfile;
