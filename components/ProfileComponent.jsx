import { useUser } from "@auth0/nextjs-auth0/client";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import React from "react";

function ProfileComponent() {
  const { user, error, isLoading } = useUser();

  return (
    <div style={{
      width:'100%',
      margin:'auto'
    }}>
      {
    user && (
      <Card hoverable style={{
        width: 540,
        margin: "auto"
      }}>
        <Meta
          avatar={<Avatar src={user.picture} />}
          title={user.name}
          description={`wellcome ${user.name} ${user.org_id}}`}
        />
      </Card>
    )}
    </div>
  );
}

export default ProfileComponent;
