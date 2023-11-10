import { useQuery } from "@apollo/client";
import { getuserinjury } from "../graphql/queries";
import { useUser } from "@auth0/nextjs-auth0/client";
import { format } from "date-fns";
import Chart from "chart.js/auto";
import PieChart from "./Piechart";
import { useState } from "react";
import { Data } from "./data";
import Card from "antd/es/card/Card";
import { Statistic } from "antd";
import TableComponent from "./TableComponent";

function ReportsComponent() {
  const { user } = useUser();
  const email = user?.name;

  const { loading, error, data } = useQuery(getuserinjury, {
    variables: {
      email: email,
    },
  });

  const injuries = data?.injuriesByUserEmail;
  console.log(injuries);

  // console.log("injurydata")
  // const lables =[]
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
  // console.log(Data.map((data) => data.userGain))

  const [chartData, setChartData] = useState({
    labels: lables?.map((lable) => lable),
    datasets: [
      {
        label: "Injury reports by user",
        data: Data?.map((data) => data.userGain),
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
  console.log(formatDate(1698759145998));
  const formatDateTime = (date) => {
    if (date) {
      const formattedDate = new Date(Number.isNaN(Number(date)) ? date : Number(date));
      if (!isNaN(formattedDate.getTime())) {
        return formattedDate.toLocaleString(); // This includes both date and time
      }
    }
    // Handle the case where date is not a valid Date object
    return "Invalid Date";
  };

  if (loading) return "Loading...";
  if (error) return `Error: Refresh the page`;

  return (
    <div
      className="ReportComponent"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Reports</h1>
      <Statistic title="Total Report" value={Data.length} precision={2} />
      <div
        style={{
          width: "400px",
          margin: "auto",
        }}
      >
        <PieChart chartData={chartData} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          // justifyContent: "center",
          // alignItems: "center",
          // width:"100%",
          // border:"1px solid black",
        }}
      >
        {injuries.map((userInjury, index) => (
          <div
            style={{
              display: "flex",
              padding: "10px",
            }}
            key={index}
          >
            <h2>{userInjury.fullName}</h2>
            {/* <ul> */}
            {userInjury.injuryList.map((injury, i) => (
              <Card style={{ margin: "10px", display:"flex" }} key={injury.index}>
                <li style={{ justifyContent:'space-between', gap:'3rem' }} key={i}>
                  <h3>Body Part: {injury.bodyPart}</h3>
                  <p>Injury Date: {formatDate(userInjury.injuryDate)}</p>
                  <p>Injury Time: {formatDateTime(userInjury.injuryTime)}</p>
                  <p>Description: {injury.description}</p>
                </li>
              </Card>
              // <TableComponent key={i} data={{
              //   name: injury.fullName,
              //   bodyPart: injury.bodyPart,
              //   injuryDate: formatDate(userInjury.injuryDate),
              //   injuryTime: formatDate(userInjury.injuryTime),
              //   description: injury.description,
              // }} />
            ))}
            {/* </ul> */}
          </div>
        ))}
      </div>
      {/* <TableComponent data={
        injuries.map((userInjury, index) => (
          userInjury.injuryList.map((injury, i) => ({
            key: i,
            name: userInjury.fullName,
          }))
        ))
      } /> */}
    </div>
  );
}

export default ReportsComponent;
