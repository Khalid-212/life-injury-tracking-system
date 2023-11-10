import React from "react";

function Card({ bodypart, date, time, description }) {
  return (
    <div style={{
      width:"400px",
      height:"200px",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
    }}>
      <h3>Body Part: {bodypart}</h3>
      <p>Injury Date: {date}</p>
      <p>Injury Time: {time}</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default Card;
