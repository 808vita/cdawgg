import { Slider } from "@nextui-org/react";

/**
 * 
 * @param ({ radius, setRadius }) 
 * @returns jsx component
 * 
 * slider component for selecting range
 * controls and sets range of radius 
 */
export default function MenuRadiusSlider({ radius, setRadius }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Slider
        size="md"
        step={0.5}
        color="success"
        label="Search Radius(km)"
        showSteps={true}
        maxValue={5}
        minValue={0.5}
        defaultValue={2}
        value={radius / 1000}
        className="max-w-md"
        getValue={(value) => `${value} km`}
        onChangeEnd={(e) => setRadius((e as number) * 1000)}
      />
    </div>
  );
}
