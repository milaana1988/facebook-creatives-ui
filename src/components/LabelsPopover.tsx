import React from "react";
import { Popover, Box, Typography, Chip, Stack } from "@mui/material";

interface LabelsPopoverProps {
  labels: string[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

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
