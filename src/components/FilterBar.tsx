import React from "react";
import { ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";

interface FilterBarProps {
  availableLabels: string[];
  selectedLabels: string[];
  onChange: (newSelected: string[]) => void;
}

/**
 * A toggle button group for selecting labels to filter creatives by.
 *
 * @example
 * <FilterBar
 *   availableLabels={["foo", "bar", "baz"]}
 *   selectedLabels={["foo", "bar"]}
 *   onChange={newSelected => {}}
 * />
 *
 * @param {string[]} availableLabels - The set of labels that are available to filter by.
 * @param {string[]} selectedLabels - The set of labels that are currently selected.
 * @param {function(string[]):void} onChange - A callback that is called whenever the set of selected labels changes.
 */
const FilterBar: React.FC<FilterBarProps> = ({
  availableLabels,
  selectedLabels,
  onChange,
}) => {
  /**
   * A callback that is called whenever the ToggleButtonGroup's value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} _ - The event that triggered the change.
   * @param {string[]} newSelected - The new set of selected labels.
   */
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
