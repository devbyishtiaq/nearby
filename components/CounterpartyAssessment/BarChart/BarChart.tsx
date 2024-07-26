import React from "react";
import styles from "./BarChart.module.css";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,
    LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

interface BarChartProps{
    labels: any;
    datasets: any;
    chartType?: string;
    title: string;
    }

const BarChart:React.FC<BarChartProps> = ({ labels, datasets, chartType="line", title }) => {
  const data: any = {
    labels: labels,
    datasets: datasets,
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        position: "top",
      },
    },
  };

  return (
      <div className={`mt-3 ${styles.chartParent}`}>

          {
            chartType === "line"
                ? <Line data={data} options={options} />
                : chartType === "line"
                    ?   <Bar data={data} options={options} />
                    :   <Pie data={data} options={options} />
          }
      </div>
  )
};

export default BarChart;