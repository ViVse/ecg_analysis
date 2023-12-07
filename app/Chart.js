import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Create the chart
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i.toString()),
        datasets: [
          {
            label: "Chart Data",
            data: data,
            borderColor: "red",
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false, // Hide X-axis labels
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      },
    });

    // Cleanup the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className="bg-white">
      <canvas ref={chartRef} width="600" height="300"></canvas>
    </div>
  );
};

export default ChartComponent;
