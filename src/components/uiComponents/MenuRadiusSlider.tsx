import { Slider } from "@nextui-org/react";

export default function MenuRadiusSlider({ setRaduis }) {
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
        className="max-w-md"
        getValue={(value) => `${value} km`}
        onChangeEnd={(e) => setRaduis((e as number) * 1000)}
      />
    </div>
  );
}
