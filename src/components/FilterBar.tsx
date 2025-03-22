import React from "react";
import { ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";

interface FilterBarProps {
  availableLabels: string[];
  selectedLabels: string[];
  onChange: (newSelected: string[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  availableLabels,
  selectedLabels,
  onChange,
}) => {
  const handleToggle = (
    _: React.MouseEvent<HTMLElement>,
    newSelected: string[]
  ) => {
    onChange(newSelected);
  };

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <ToggleButtonGroup
        value={selectedLabels}
        onChange={handleToggle}
        aria-label="Label filters"
        size="small"
        sx={{
          width: "100%",
          height: 200,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          overflowY: "auto",
          p: 1,
        }}
        className="shadow-2xl"
      >
        {availableLabels.map((label) => (
          <ToggleButton
            key={label}
            value={label}
            aria-label={label}
            color="success"
          >
            #{label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};

export default FilterBar;
