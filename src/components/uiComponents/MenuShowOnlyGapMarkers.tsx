import { Checkbox } from "@nextui-org/react";
/**
 *
 * @param ({
  showOnlyGapMarkers,
  setShowOnlyGapMarkers,
})
 * @returns jsx component
 *
 * check box component
 * used for toggling the display of location markers
 */
export default function MenuShowOnlyGapMarkers({
  showOnlyGapMarkers,
  setShowOnlyGapMarkers,
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
