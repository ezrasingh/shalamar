import { HexColorPicker } from "react-colorful";
import { ContentWrapper } from "@editor/common/components";

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
}) => {
  return (
    <ContentWrapper
      title="color picker"
      containerClass="max-h-full"
      className="flex justify-center items-center outline-none overflow-hidden"
    >
      <HexColorPicker {...{ color, onChange }} />
    </ContentWrapper>
  );
};
