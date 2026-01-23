import React from "react";
import IconoOnline from "./IconoOnline.jsx";

const Avatar = React.memo(({ avatar, isOnline }) => {
    console.log("Avatar render");

    return (
        <div style={{ position: "relative", width: 50 }}>
            <img src={avatar} width={50} alt="avatar" />
            <IconoOnline isOnline={isOnline} />
        </div>
    );
});

export default Avatar;