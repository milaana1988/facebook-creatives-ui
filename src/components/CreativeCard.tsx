import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import MetricsPopover from "./MetricsPopover";
import { Creative } from "../api/creatives";
import LabelsPopover from "./LabelsPopover";

interface CreativeCardProps {
  creative: Creative;
}

const CreativeCard: React.FC<CreativeCardProps> = ({ creative }) => {
  const metrics = JSON.parse(creative.performance_metrics);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [labelsAnchorEl, setLabelsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLabelsClick = (event: React.MouseEvent<HTMLElement>) => {
    setLabelsAnchorEl(event.currentTarget);
  };

  const handleLabelsClose = () => {
    setLabelsAnchorEl(null);
  };
  const imageUrl = creative.image_url || "";
  let objective = "";
  if (creative.relevant_metadata) {
    try {
      const metadata = JSON.parse(creative.relevant_metadata);
      objective = metadata.objective || "";
    } catch (error) {
      console.error("Error parsing metadata", error);
    }
  }

  let labels: string[] = [];
  if (creative.labels) {
    try {
      labels = JSON.parse(creative.labels);
    } catch (error) {
      console.error("Error parsing labels:", error);
    }
  }
  return (
    <>
      <Card className="shadow-2xl" sx={{ p: 1, height: 500 }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={creative.creative_id.toString()}
          sx={{ height: "62%", objectFit: "inherit", width: "98%" }}
        />
        <CardContent
          sx={{
            p: 2,
            backgroundColor: "#f9fafb",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: "bold",
              color: "#333",
              mb: 2,
              fontSize: "14px",
            }}
          >
            <span style={{ color: "#ed6c02", fontWeight: 800 }}>
              Creative ID:
            </span>{" "}
            {creative.creative_id}
            <Divider sx={{ my: 1 }} />
            <span style={{ color: "#ed6c02", fontWeight: 800 }}>
              Objective:
            </span>{" "}
            {objective}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-center">
          <Button
            size="small"
            color="warning"
            variant="contained"
            sx={{ fontWeight: "bold" }}
            onClick={handleClick}
          >
            Show Metrics
          </Button>
          <Button
            size="small"
            color="info"
            variant="contained"
            sx={{ fontWeight: "bold", ml: 1 }}
            onClick={handleLabelsClick}
          >
            Show Labels
          </Button>
        </CardActions>
      </Card>
      <MetricsPopover
        metrics={metrics}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
      <LabelsPopover
        labels={labels}
        anchorEl={labelsAnchorEl}
        onClose={handleLabelsClose}
      />
    </>
  );
};

export default CreativeCard;
