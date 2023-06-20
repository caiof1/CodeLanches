// Hooks
import { useAudioTouch } from "../../hooks/useAudioTouch";

// CSS
import styles from "./Dashboard.module.css";

// ApexChart
import ApexChart from "react-apexcharts";

const Dashboard = () => {
  const options = {
    xaxis: {
      categories: [
        "X-tudo",
        "Peperrone",
        "Hamburguer",
        "BigMac",
        "Big fish",
        "BK Frango",
        "Pizza",
        "Queijo",
        "Suco",
      ],
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true,
      },
    },
  };

  const series = [
    {
      name: "sales",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  useAudioTouch();

  return (
    <div className={styles.container}>
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width={500}
        height={300}
      />
    </div>
  );
};

export default Dashboard;
