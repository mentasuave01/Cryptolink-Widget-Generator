import { onMount, onCleanup } from "solid-js";
import iro from "@jaames/iro";

interface ColorSelectorProps {
  setColor: (color: string) => void;
  colorSelected: string;
}

const ColorSelector = ({ setColor, colorSelected }: ColorSelectorProps) => {
  let el: HTMLDivElement | null = null;
  let colorPicker: iro.ColorPicker | undefined;

  onMount(() => {
    // create a new iro color picker and pass component props to it
    colorPicker = new iro.ColorPicker(el, {
      width: 175,
      color: colorSelected,
      borderWidth: 1,
      borderColor: "#fff",
      layout: [
        {
          component: iro.ui.Box,
        },
        {
          component: iro.ui.Slider,
          options: {
            id: "hue-slider",
            sliderType: "hue",
          },
        },
      ],
    });
    // call onColorChange prop whenever the color changes
    colorPicker?.on("color:change", (color: any) => {
      console.log(color.hexString.substring(1));
      setColor(color.hexString.substring(1));
    });
  });

  onCleanup(() => {
    colorPicker?.reset();
  });

  return (
    <div
      ref={(elRef) => {
        el = elRef;
      }}
    />
  );
};
export default ColorSelector;
