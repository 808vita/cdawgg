import { Checkbox } from "@nextui-org/react";

export default function MenuShowOnlyGapMarkers({
  showOnlyGapMarkers, setShowOnlyGapMarkers
}) {
  return (
    <Checkbox
      defaultSelected
      color="success"
      isSelected={showOnlyGapMarkers}
      onValueChange={setShowOnlyGapMarkers}
    >
      Display Only Gaps
    </Checkbox>
  );
}
