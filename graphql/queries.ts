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

export const get_All_Users = gql`
query Users {
    users {
      email
    }
  }
`;


export const getuserinjury = gql`
query Query($email: String!) {
  injuriesByUserEmail(email: $email) {
    injuryList {
      bodyPart
      description
    }
    injuryDate
    injuryTime
  }
}
    `;