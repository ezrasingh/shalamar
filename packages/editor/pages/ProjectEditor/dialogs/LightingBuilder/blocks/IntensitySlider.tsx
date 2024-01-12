import { ContentWrapper } from "@editor/common/components";

export interface IntensitySliderProps {
  intensity: number;
  onChange: (intensity: number) => void;
}

export const IntensitySlider: React.FC<IntensitySliderProps> = ({
  intensity,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = parseFloat(event.target.value);
    onChange(value);
  };
  return (
    <ContentWrapper
      title={`intensity (${intensity})`}
      containerClass="max-h-full"
      className="flex justify-center items-center outline-none overflow-hidden"
    >
      <input
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={intensity}
        className="range range-info mx-4"
        onChange={handleChange}
      />
    </ContentWrapper>
  );
};
