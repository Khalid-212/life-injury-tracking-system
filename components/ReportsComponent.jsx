import { useQuery } from "@apollo/client";
import { getuserinjury } from "../graphql/queries";
import { useUser } from "@auth0/nextjs-auth0/client";
import { format } from "date-fns";

function ReportsComponent() {
  const { user } = useUser();
  const email = user?.name;

  const { loading, error, data } = useQuery(getuserinjury, {
    variables: {
      email: email,
    },
  });
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  console.log(formatTimestamp("1698759149850"));

  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;

  const injuries = data?.injuriesByUserEmail;
  console.log(injuries);

  return (
    <div>
      <h1>Injury List</h1>
      <ul>
        {injuries.map((userInjury, index) => (
          <div key={index}>
            <h2>{userInjury.fullName}</h2>
            <ul>
              {userInjury.injuryList.map((injury, i) => (
                <li key={i}>
                  <h3>Body Part: {injury.bodyPart}</h3>
                  <p>Injury Date: {injury.injuryDate}</p>
                  <p>Injury Time: {injury.injuryDate}</p>
                  <p>Description: {injury.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ReportsComponent;
