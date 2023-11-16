import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Users($userId: String!) {
    user(id: $userId) {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query Users {
    users {
      email
    }
  }
`;

export const GET_USER_INJURY = gql`
  query InjuriesByUserEmail($email: String!) {
    injuriesByUserEmail(email: $email) {
      injuryDate
      injuryList {
        bodyPart
        description
      }
      injuryTime
      injuredPersonName
    }
  }
`;
