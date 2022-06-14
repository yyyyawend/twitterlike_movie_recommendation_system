import React, { useState } from "react";
import Avatar from "react-avatar-edit";

const CreateAvatar = () => {

  const src = './example/einshtein.jpg'

  const [preview, setPreview] = useState("");

  const onCrop = img => {
    setPreview(img);
  };

  const onClose = () => {
    setPreview({preview: ""});
  };

  const onBeforeFileLoad = (elem) => {
   if(elem.target.files[0].size > 71680){
      alert("File is too big!");
      elem.target.value = "";
    };
  };

  return (
    <div>
        <Avatar
          width={390}
          height={295}
          onCrop={onCrop}
          onClose={onClose}
          onBeforeFileLoad={onBeforeFileLoad}
        />
        <img src={preview} alt="Preview" />
      </div>
  );
};

export default CreateAvatar;
