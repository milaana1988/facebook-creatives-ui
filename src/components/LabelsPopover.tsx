import React from "react";
import { Popover, Box, Typography, Chip, Stack } from "@mui/material";

interface LabelsPopoverProps {
  labels: string[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

/**
 * A popover component that displays a list of labels as chips.
 *
 * @example
 * <LabelsPopover
 *   labels={["foo", "bar", "baz"]}
 *   anchorEl={anchorEl}
 *   onClose={onClose}
 * />
 *
 * @param {string[]} labels - The list of labels to display.
 * @param {HTMLElement | null} anchorEl - The element that the popover is anchored to.
 * @param {function()} onClose - A callback that is called when the popover is closed.
 *
 * @returns {ReactElement} The LabelsPopover component.
 */
const LabelsPopover: React.FC<LabelsPopoverProps> = ({
  labels,
  anchorEl,
  onClose,
}) => {
  const open = Boolean(anchorEl);

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
      <Box sx={{ p: 2, width: 300 }}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {labels.length > 0 ? (
            labels.map((label, index) => (
              <Chip
                key={index}
                label={`#${label}`}
                variant="outlined"
                sx={{ mb: 1 }}
                color="primary"
              />
            ))
          ) : (
            <Typography variant="body2">No labels found</Typography>
          )}
        </Stack>
      </Box>
    </Popover>
  );
};

export default LabelsPopover;
