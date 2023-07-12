// Hooks
import { useEffect, useState } from "react";
import { useAudioTouch } from "../../hooks/useAudioTouch";
import { useFetchData } from "../../hooks/useFetchData";

// CSS
import styles from "./Dashboard.module.css";

// ApexChart
import ApexChart from "react-apexcharts";
import { useFetchUser } from "../../hooks/useFetchUser";

// components
import ToBack from "../../components/ToBack/ToBack";

const Dashboard = ({ user }) => {
  const data = new Date();

  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = data.getFullYear();

  const [sale, setSale] = useState(0);
  const [saleProducts, setSaleProducts] = useState(0);
  const [saleMonth, setSaleMonth] = useState(0);
  const [saleProductsMonth, setSaleProductsMonth] = useState(0);

  // Before month sales
  const [twoBeforeMonth, setTwoBeforeMonth] = useState(0);
  const [threeBeforeMonth, setThreeBeforeMonth] = useState(0);
  const [fourBeforeMonth, setFourBeforeMonth] = useState(0);
  const [fiveBeforeMonth, setFiveBeforeMonth] = useState(0);

  const [salesMonth1, setSalesMonth1] = useState(0);
  const [salesMonth2, setSalesMonth2] = useState(0);
  const [salesMonth3, setSalesMonth3] = useState(0);
  const [salesMonth4, setSalesMonth4] = useState(0);
  const [salesMonth5, setSalesMonth5] = useState(0);
  const [salesMonth6, setSalesMonth6] = useState(0);
  const [salesMonth7, setSalesMonth7] = useState(0);
  const [salesMonth8, setSalesMonth8] = useState(0);
  const [salesMonth9, setSalesMonth9] = useState(0);
  const [salesMonth10, setSalesMonth10] = useState(0);
  const [salesMonth11, setSalesMonth11] = useState(0);
  const [salesMonth12, setSalesMonth12] = useState(0);

  const [nameProductGraph, setNameProductGraph] = useState([]);
  const [qtdSalesGraph, setQtdSalesGraph] = useState([]);
  const [salesGraph, setSalesGraph] = useState([]);

  const { documents } = useFetchData(user.uid, "orders");

  const { documents: userDoc } = useFetchUser(user.uid, "users");

  useEffect(() => {
    setSale(0);
    setSaleProducts(0);
    setSaleMonth(0);
    setSaleProductsMonth(0);

    setTwoBeforeMonth(0);
    setThreeBeforeMonth(0);
    setFourBeforeMonth(0);
    setFiveBeforeMonth(0);

    setSalesMonth1(0);
    setSalesMonth2(0);
    setSalesMonth3(0);
    setSalesMonth4(0);
    setSalesMonth5(0);
    setSalesMonth6(0);
    setSalesMonth7(0);
    setSalesMonth8(0);
    setSalesMonth9(0);
    setSalesMonth10(0);
    setSalesMonth11(0);
    setSalesMonth12(0);
    documents.map((doc) => {
      // Begin values box

      setSale((actualSale) => actualSale + doc.amount);
      doc.products?.map((product) => {
        setSaleProducts(
          (actualSaleProducts) => actualSaleProducts + parseInt(product.qtd)
        );
        return null;
      });

      const date = new Date(doc.createAt.seconds * 1000);
      const dateSplit = date.toLocaleDateString("pt-BR").split("/");

      if (month.includes(dateSplit[1]) && year === parseInt(dateSplit[2])) {
        setSaleMonth((actualSaleMonth) => actualSaleMonth + doc.amount);
        doc.products?.map((product) => {
          setSaleProductsMonth(
            (actualSaleProductsMonth) =>
              actualSaleProductsMonth + parseInt(product.qtd)
          );

          return null;
        });
      }

      // returns last five months
      if (
        month - 1 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        doc.products?.map((product) => {
          setTwoBeforeMonth(
            (actualTwoBeforeMonth) =>
              actualTwoBeforeMonth + parseInt(product.qtd)
          );
          return null;
        });
      } else if (
        month - 2 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        doc.products?.map((product) => {
          setThreeBeforeMonth(
            (actualThreeBeforeMonth) =>
              actualThreeBeforeMonth + parseInt(product.qtd)
          );
          return null;
        });
      } else if (
        month - 3 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        doc.products?.map((product) => {
          setFourBeforeMonth(
            (actualFourBeforeMonth) =>
              actualFourBeforeMonth + parseInt(product.qtd)
          );

          return null;
        });
      } else if (
        month - 4 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        doc.products?.map((product) => {
          setFiveBeforeMonth(
            (actualFiveBeforeMonth) =>
              actualFiveBeforeMonth + parseInt(product.qtd)
          );
          return null;
        });
      }

      // Return sales in year for month
      if (1 === parseInt(dateSplit[1]) && year === parseInt(dateSplit[2])) {
        setSalesMonth1((actualSalesMonth1) => actualSalesMonth1 + doc.amount);
      } else if (
        2 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth2((actualSalesMonth2) => actualSalesMonth2 + doc.amount);
      } else if (
        3 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth3((actualSalesMonth3) => actualSalesMonth3 + doc.amount);
      } else if (
        4 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth4((actualSalesMonth4) => actualSalesMonth4 + doc.amount);
      } else if (
        5 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth5((actualSalesMonth5) => actualSalesMonth5 + doc.amount);
      } else if (
        6 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth6((actualSalesMonth6) => actualSalesMonth6 + doc.amount);
      } else if (
        7 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth7((actualSalesMonth7) => actualSalesMonth7 + doc.amount);
      } else if (
        8 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth8((actualSalesMonth8) => actualSalesMonth8 + doc.amount);
      } else if (
        9 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth9((actualSalesMonth9) => actualSalesMonth9 + doc.amount);
      } else if (
        10 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth10(
          (actualSalesMonth10) => actualSalesMonth10 + doc.amount
        );
      } else if (
        11 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth11(
          (actualSalesMonth11) => actualSalesMonth11 + doc.amount
        );
      } else if (
        12 === parseInt(dateSplit[1]) &&
        year === parseInt(dateSplit[2])
      ) {
        setSalesMonth12(
          (actualSalesMonth12) => actualSalesMonth12 + doc.amount
        );
      }

      // End values box
      return null;
    });
  }, [documents]);

  // UseEffect return sales for products and qtd sales for products
  useEffect(() => {
    setNameProductGraph([]);
    setQtdSalesGraph([]);
    setSalesGraph([]);
    userDoc[0]?.salesProducts?.map((product) => {
      setNameProductGraph((actualNameProductGraph) => [
        ...actualNameProductGraph,
        product.nameProduct,
      ]);

      setQtdSalesGraph((actualQtdSalesGraph) => [
        ...actualQtdSalesGraph,
        product.qtdSales,
      ]);

      setSalesGraph((actualSalesGraph) => [
        ...actualSalesGraph,
        product.valueSales,
      ]);

      return null;
    });
  }, [userDoc]);

  // Graph bar

  const stateBar = {
    options: {
      xaxis: {
        categories: nameProductGraph,
      },
      title: {
        text: "Total de vendas por produto",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
        },
      },
    },
    series: [
      {
        name: "Vendas",
        data: qtdSalesGraph,
      },
    ],
  };

  // Graph donut

  const monthArray = [
    `Mês ${month - 1}`,
    `Mês ${month - 2}`,
    `Mês ${month - 3}`,
    `Mês ${month - 4}`,
  ];

  const state = {
    series: [
      twoBeforeMonth,
      threeBeforeMonth,
      fourBeforeMonth,
      fiveBeforeMonth,
    ],
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return (
            monthArray[opts.seriesIndex] +
            " - " +
            `<strong>${opts.w.globals.series[opts.seriesIndex]}</strong>`
          );
        },
        position: "bottom",
      },
      title: {
        text: "Venda total de produtos nos ultimos 5 meses",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            title: {
              text: "Vendas ultimos 5 meses",
            },
          },
        },
      ],
    },
  };

  // Graph bar

  const stateValue = {
    options: {
      xaxis: {
        categories: nameProductGraph,
      },
      title: {
        text: "Total de lucro por produto",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
        },
      },
    },
    series: [
      {
        name: "R$",
        data: salesGraph,
      },
    ],
  };

  // Graph line

  const stateLine = {
    series: [
      {
        name: "R$",
        data: [
          salesMonth1,
          salesMonth2,
          salesMonth3,
          salesMonth4,
          salesMonth5,
          salesMonth6,
          salesMonth7,
          salesMonth8,
          salesMonth9,
          salesMonth10,
          salesMonth11,
          salesMonth12,
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Lucro durante esse ano",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ],
      },
    },
  };

  useAudioTouch();

  return (
    <div className={styles.container}>
      <ToBack />
      <section className={styles.container_info}>
        <div className={styles.info_outline1}>
          <h4>Renda total</h4>
          <span>R$ {sale}</span>
        </div>
        <div className={styles.info_outline2}>
          <h4>Venda total produtos</h4>
          <span>{saleProducts}</span>
        </div>
        <div className={styles.info_outline3}>
          <h4>Renda total esse mês</h4>
          <span>R$ {saleMonth}</span>
        </div>
        <div className={styles.info_outline4}>
          <h4>Venda total produtos esse mês</h4>
          <span>{saleProductsMonth}</span>
        </div>
      </section>

      <section className={styles.container_graph}>
        <div className={styles.box}>
          <ApexChart
            options={stateBar.options}
            series={stateBar.series}
            type="bar"
            width={qtdSalesGraph?.length < 6 ? 550 : qtdSalesGraph?.length * 150}
            height={300}
          />
        </div>
        <div className={styles.box}>
          <ApexChart
            options={state.options}
            series={state.series}
            type="donut"
            width={"100%"}
            height={300}
          />
        </div>
        <div className={styles.box}>
          <ApexChart
            options={stateLine.options}
            series={stateLine.series}
            type="line"
            width={530}
            height={290}
          />
        </div>
        <div className={styles.box}>
          <ApexChart
            options={stateValue.options}
            series={stateValue.series}
            type="bar"
            width={qtdSalesGraph?.length < 6 ? 550 : qtdSalesGraph?.length * 150}
            height={300}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
