// "use client";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div
      className="chart-container">
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of Injury reported",
            },
            colors: {
              scheme: "brewer.Paired12",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
      {/* </div> */}
    </div>
  );
}
export default PieChart;
