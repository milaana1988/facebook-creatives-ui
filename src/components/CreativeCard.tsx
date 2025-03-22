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

/**
 * CreativeCard component displays a card with details of a creative,
 * including its image, ID, and objective. It also provides buttons
 * to show performance metrics and associated labels in popovers.
 *
 * Props:
 * - creative (Creative): An object representing the creative, containing
 *   its ID, image URL, performance metrics, relevant metadata, and labels.
 *
 * The component uses state to manage the anchors for popovers that display
 * performance metrics and labels. Clicking the respective buttons opens
 * the corresponding popover.
 */

const CreativeCard: React.FC<CreativeCardProps> = ({ creative }) => {
  const metrics = JSON.parse(creative.performance_metrics);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [labelsAnchorEl, setLabelsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  /**
   * Handles a click event on the metrics button by setting the anchor element
   * state to the target element, so that the metrics popover can be displayed.
   * @param event The event that triggered this function.
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Closes the metrics popover by setting the anchor element state to null.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handles a click event on the labels button by setting the labels anchor
   * element state to the target element, so that the labels popover can be
   * displayed.
   * @param event The event that triggered this function.
   */
  const handleLabelsClick = (event: React.MouseEvent<HTMLElement>) => {
    setLabelsAnchorEl(event.currentTarget);
  };

  /**
   * Closes the labels popover by setting the labels anchor element state to null.
   */

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
