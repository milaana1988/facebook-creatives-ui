import React from "react";
import { Popover, Box } from "@mui/material";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface MetricsPopoverProps {
  metrics: {
    impressions: number;
    clicks: number;
    spend: number;
    conversions: number;
    ctr: number;
  };
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

/**
 * A popover component that displays various performance metrics using charts.
 *
 * @example
 * <MetricsPopover
 *   metrics={{
 *     impressions: 1000,
 *     clicks: 100,
 *     spend: 50,
 *     conversions: 10,
 *     ctr: 0.1
 *   }}
 *   anchorEl={anchorEl}
 *   onClose={onClose}
 * />
 *
 * @param {Object} metrics - An object containing performance metrics data.
 * @param {number} metrics.impressions - The number of impressions.
 * @param {number} metrics.clicks - The number of clicks.
 * @param {number} metrics.spend - The amount spent.
 * @param {number} metrics.conversions - The number of conversions.
 * @param {number} metrics.ctr - The click-through rate.
 * @param {HTMLElement | null} anchorEl - The element to which the popover is anchored.
 * @param {function()} onClose - Callback function to close the popover.
 *
 * @returns {ReactElement} The MetricsPopover component.
 */

const MetricsPopover: React.FC<MetricsPopoverProps> = ({
  metrics,
  anchorEl,
  onClose,
}) => {
  const open = Boolean(anchorEl);

  const verticalBarData = {
    labels: ["Impressions", "Clicks", "Spend", "Conversions", "CTR"],
    datasets: [
      {
        label: "Performance",
        data: [
          metrics.impressions,
          metrics.clicks,
          metrics.spend,
          metrics.conversions,
          metrics.ctr,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  const verticalBarOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Overall Metrics",
        font: { size: 16 },
      },
    },
  };

  const nonClicks = metrics.impressions - metrics.clicks;
  const doughnutData = {
    labels: ["Clicks", "Non-Clicks"],
    datasets: [
      {
        label: "Clicks Distribution",
        data: [metrics.clicks, nonClicks < 0 ? 0 : nonClicks],
        backgroundColor: [
          "rgba(153, 102, 255, 0.7)",
          "rgba(201, 203, 207, 0.7)",
        ],
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" as const },
      title: {
        display: true,
        text: "Clicks vs Non-Clicks",
        font: { size: 16 },
      },
    },
  };

  const horizontalBarData = {
    labels: ["Spend", "Conversions"],
    datasets: [
      {
        label: "Spend & Conversions",
        data: [metrics.spend, metrics.conversions],
        backgroundColor: ["rgba(255, 159, 64, 0.7)", "rgba(255, 99, 132, 0.7)"],
      },
    ],
  };

  const horizontalBarOptions = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Spend & Conversions",
        font: { size: 16 },
      },
    },
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, width: 350, height: 650 }}>
        <Box sx={{ mb: 2, height: 200 }}>
          <Bar data={verticalBarData} options={verticalBarOptions} />
        </Box>

        <Box sx={{ mb: 2, ml: 8, height: 200 }}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </Box>

        <Box sx={{ height: 200 }}>
          <Bar data={horizontalBarData} options={horizontalBarOptions} />
        </Box>
      </Box>
    </Popover>
  );
};

export default MetricsPopover;
