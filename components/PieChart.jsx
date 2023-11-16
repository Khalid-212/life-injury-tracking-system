import React from "react";
import { Pie } from "react-chartjs-2";


function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      {chartData.length === 0 ? (
        <h1>No Data</h1>
      ) : (
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Number of Injury reported",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
            color: {
              scheme: "brewer.Paired12", // Deprecated, consider using 'schemes' or 'backgrounds' instead
            },
          }}
        />
      )}
    </div>
  );
}

export default PieChart;
