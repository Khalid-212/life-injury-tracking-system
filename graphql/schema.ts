import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    injuries: [Injury]!
  }  

  type Injury {
    id: String!
    injuredPersonName: String!
    injuryDate: String!
    injuryTime: String!
    injuryList: [InjuryList]!
    reportedBy: User!
    createdAt: String!
    updatedAt: String!
  }

  type InjuryList {
    bodyPart: String!
    description: String!
  }

  type Query {
    users: [User]!
    injuries: [Injury]!
    injury(id: String!): Injury!
    user(id: String!): User!
    injuriesByUserEmail(email: String!): [Injury]!
  }
  type Mutation {
    createUser(email: String!): User
    createInjury(
      injuredPersonName: String
      injuryDate: String
      injuryTime: String
      injuryList: [InjuryListInput]
      reportedBy: String
    ): Injury
  }
  input InjuryListInput {
    bodyPart: String
    description: String
  }

  type Subscription {
    injuryAdded: Injury
  }
`;
