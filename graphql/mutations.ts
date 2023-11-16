import { gql } from "@apollo/client";

export const CREATE_INJURY = gql`
mutation Mutation($injuredPersonName: String, $injuryDate: String, $injuryTime: String, $reportedBy: String, $injuryList: [InjuryListInput]) {
  createInjury(injuredPersonName: $injuredPersonName, injuryDate: $injuryDate, injuryTime: $injuryTime, reportedBy: $reportedBy, injuryList: $injuryList) {
    id
    injuryList {
      bodyPart
      description
    }
  }
}
`;
