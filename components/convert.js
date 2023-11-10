function convertFormResponseToInjury(data, user, bodyParts) {
    const { values } = data;
  
    const injuryData = {
      injuryDate: new Date(values["Injury Date"]),
      injuryTime: new Date(values["Injury Time"]),
      injuryList: [],
      reportedById: user.id,
    };
  
    bodyParts.forEach((part) => {
      const partName = part.name;
      const partValue = values[partName];
  
      if (partValue) {
        injuryData.injuryList.push({
          bodyPart: partName,
          description: partValue,
        });
      }
    });
  
    return injuryData;
  }
  
  // Example usage:
  const formData = {
    "values": {
      "Full Name": "khalid ibrahim",
      "Injury Date": "2023-11-08T16:44:56.198Z",
      "Injury Time": "2023-11-08T16:05:58.766Z",
      "right_arm": "cut",
      "right_shoulder": "cut"
    },
    "user": { "id": "replaceWithUserId" } // Replace with the actual user object
  };
  
 
const bodyPartsResponse = [
    { "name": "head" },
    { "name": "right_leg_upper" },
    { "name": "chest" },
    { "name": "right_shoulder" },
    { "name": "right_arm" },
    { "name": "right_hand" },
    { "name": "stomach" },
    { "name": "left_leg_upper" },
    { "name": "left_leg_lower" },
    { "name": "right_leg_lower" },
    { "name": "right_foot" },
    { "name": "left_foot" },
    { "name": "left_hand" },
    { "name": "left_arm" },
    { "name": "left_shoulder" },
  ];
  
  const injuryData = convertFormResponseToInjury(formData, formData.user, bodyPartsResponse);
  console.log(injuryData);
  