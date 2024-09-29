import { Checkbox } from "@nextui-org/react";

/**
 * 
 * @param ({
  showMarkerLabels,
  setShowMarkerLabels,
}) 
 * @returns jsx component
 * 
 * check box component
 * used for toggling the display of labels
 */
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
