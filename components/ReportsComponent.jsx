import { useQuery } from "@apollo/client";
import { GET_USER_INJURY } from "../graphql/queries";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { Card, Statistic } from "antd";

// import TableComponent from "./TableComponent";
// import {nodata} from "../../public/assets/nodata.svg"

function ReportsComponent() {
  const { user } = useUser();
  const email = user?.name;

  const { loading, error, data } = useQuery(GET_USER_INJURY, {
    variables: {
      email: email,
    },
  });

  const injuries = data?.injuriesByUserEmail;
  console.log(injuries);

  const createLables = () => {
    const lables = [];
    const temp = [];
    injuries?.map((userInjury) =>
      userInjury.injuryList.map((injury) => temp.push(injury.bodyPart))
    );
    return temp;
  };
  const lables = createLables();

  // count the number of each body part
  const countBodyPart = (bodyPart) => {
    let count = 0;
    injuries?.map((userInjury) =>
      userInjury.injuryList.map((injury) => {
        if (injury.bodyPart === bodyPart) {
          count++;
        }
      })
    );
    return count;
  };

  const createData = () => {
    const temp = [];
    lables.map((lable) =>
      temp.push({ bodyPart: lable, userGain: countBodyPart(lable) })
    );
    return temp;
  };
  const Data = createData();

  const [chartData, setChartData] = useState({
    labels: lables?lables?.map((lable) => lable):["head","head","head"],
    datasets: [
      {
        label: "Injury reports by user",
        data: Data?Data?.map((data) => data.userGain):[100,200,300],
        backgroundColor: [
          "#ADC6FF",
          "#1D39C4",
          "#389E0D",
          "#D4380D",
          "#FFBB96",
          "#F6FFED",
          "#F5F5F5",
          "#B7EB8F",
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  });
  const formatDate = (date) => {
    if (date) {
      const formattedDate = new Date(
        Number.isNaN(Number(date)) ? date : Number(date)
      );
      if (!isNaN(formattedDate.getTime())) {
        return formattedDate.toLocaleDateString();
      }
    }
    // Handle the case where date is not a valid Date object
    return "Invalid Date";
  };

  const formatedTime = (time)=>{
    if (time) {
      const formattedTime = new Date(Number.isNaN(Number(time)) ? time : Number(time));
      if (!isNaN(formattedTime.getTime())) {
        return formattedTime.toLocaleTimeString(); // This includes both date and time
      }
    }
    // Handle the case where date is not a valid Date object
    return "Invalid Date";
  }

  if (loading) return "Loading...";
  if (error) return `Error: Refresh the page`;

  return (
    <div className="ReportComponent">
      <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
        {injuries?.length <= 0 ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <h1>No reports</h1>
          </div>
        ) : (
          injuries.map((userInjury, index) => (
            <div style={{ display: "flex", padding: "10px" }} key={index}>
              <h2>{userInjury?.fullName}</h2>
              {userInjury?.injuryList?.length > 0 ? (
                userInjury.injuryList.map((injury, i) => (
                  <Card style={{ margin: "10px", display: "flex" }} key={i}>
                    <li style={{ justifyContent: 'space-between', gap: '3rem' }} key={i}>
                      <h3><strong>Name:</strong> {userInjury?.injuredPersonName}</h3>
                      <br />
                      <p><strong>Body Part:</strong> {injury?.bodyPart}</p>
                      <p><strong>Injury Date:</strong> {formatDate(userInjury?.injuryDate)}</p>
                      <p><strong>Injury Time:</strong> {formatedTime(userInjury?.injuryTime)}</p>
                      <p><strong>Description:</strong> {injury?.description}</p>
                    </li>
                  </Card>
                ))
              ) : (
                <p>No injuries reported</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReportsComponent;