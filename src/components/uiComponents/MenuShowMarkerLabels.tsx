import { Checkbox } from "@nextui-org/react";

export default function MenuShowMarkerLabels({
  showMarkerLabels,
  setShowMarkerLabels,
}) {
  return (
    <Checkbox
      defaultSelected
      color="success"
      isSelected={showMarkerLabels}
      onValueChange={setShowMarkerLabels}
    >
      Display Marker Labels
    </Checkbox>
  );
}
