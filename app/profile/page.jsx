"use client";

import React from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import Image from "next/image";

function Profile() {
  const { user, error, isLoading } = useUser();
  console.log(user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <Image src={user.picture} alt="Profile" width={200} height={200} />
        <h2>{user.name}</h2>
        <a href="/api/auth/logout">Logout</a>
      </div>
    )
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: (error) => <ErrorMessage>{error.message}</ErrorMessage>,
});

