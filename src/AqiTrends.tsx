import { Box } from "grommet";
import { useEffect } from "react";
import randomColor from "randomcolor";

import { Line } from "react-chartjs-2";
import { AirQualityContext } from "./AirQualityStore";
import useStore from "./useStore";

export const AqiTrends = ({ refresh }: { refresh: boolean }) => {
  const { getCityTrend, trends } = useStore(AirQualityContext);

  useEffect(() => {}, [refresh]);

  const options = {
    hover: {
      mode: "index",
      intersect: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          type: "time",
          time: {
            unit: 1,
            tooltipFormat: "ll",
            displayFormats: {
              quarter: "MMM YYYY",
            },
          },
        },
      ],
    },
  };

  const data = {
    labels: Array.from({ length: 15 }, (_, i) => i + 1),
    datasets:
      trends && Object.keys(trends)
        ? Object.keys(trends).map((city) => {
            return {
              label: city,
              data: getCityTrend(city),
              fill: false,
              backgroundColor: randomColor({
                luminosity: "bright",
                seed: city,
              }),
              borderColor: randomColor({
                luminosity: "bright",
                seed: city,
              }),
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderWidth: 1,
              pointBackgroundColor: "transparent",
              pointBorderColor: "transparent",
              pointHoverBackgroundColor: randomColor({
                luminosity: "bright",
                seed: city,
              }),
              pointHoverBorderColor: "#ffffff",
            };
          })
        : {
            label: "city",
            data: getCityTrend("city"),
            fill: false,
            backgroundColor: randomColor({
              luminosity: "bright",
              seed: "city",
            }),
            borderColor: randomColor({
              luminosity: "bright",
              seed: "city",
            }),
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBorderWidth: 1,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
            pointHoverBackgroundColor: randomColor({
              luminosity: "bright",
              seed: "city",
            }),
            pointHoverBorderColor: "#ffffff",
          },
  };

  return (
    <Box width="medium" height="medium" align="center" flex fill pad="medium">
      <Line data={data} options={options} type="line" redraw={false} />
    </Box>
  );
};
