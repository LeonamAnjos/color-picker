import { JSX } from "preact";
import { useState } from "preact/hooks";
import "./app.css";

const copyToClipboard = (content: string) => {
  navigator.clipboard.writeText(content);
};

interface RbgColorProps {
  color: "red" | "green" | "blue";
  value?: number;
  onChange?: (value: number) => void;
  onInput?: (value: number) => void;
}

const RgbColor = ({ color, value, onChange, onInput }: RbgColorProps) => {
  const changeHandler = ({
    currentTarget,
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    onChange && onChange(+currentTarget.value);
  };

  const inputHandler = ({
    currentTarget,
  }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    onInput && onInput(+currentTarget.value);
  };

  return (
    <div class="flex-item">
      <div class="title">{color}</div>
      <div class={`content bg-${color}`}>{value}</div>
      <input
        onChange={changeHandler}
        onInput={inputHandler}
        type="range"
        value={value}
        name={`slide-${color}`}
        min="0"
        max="255"
      />
    </div>
  );
};

interface RgbColorPickerProps {
  onChange?: (rgb: string) => void;
  onInput?: (rgb: string) => void;
}

const RgbColorPicker = ({ onChange, onInput }: RgbColorPickerProps) => {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const changeHandler = (...args: number[]) => {
    const [r, g, b] = args;
    setRed(r);
    setGreen(g);
    setBlue(b);

    onChange && onChange(`rgb(${r} ${g} ${b})`);
  };

  const inputHandler = (...args: number[]) => {
    const [r, g, b] = args;
    setRed(r);
    setGreen(g);
    setBlue(b);

    onInput && onInput(`rgb(${r} ${g} ${b})`);
  };

  const rgbColor = `rgb(${red} ${green} ${blue})`;

  return (
    <>
      <div class="flex-container">
        <RgbColor
          color="red"
          value={red}
          onChange={(value) => changeHandler(value, green, blue)}
          onInput={(value) => inputHandler(value, green, blue)}
        ></RgbColor>
        <RgbColor
          color="green"
          value={green}
          onChange={(value) => changeHandler(red, value, blue)}
          onInput={(value) => inputHandler(red, value, blue)}
        ></RgbColor>
        <RgbColor
          color="blue"
          value={blue}
          onChange={(value) => changeHandler(red, green, value)}
          onInput={(value) => inputHandler(red, green, value)}
        ></RgbColor>
      </div>
      <div
        style={{
          "background-color": rgbColor,
          margin: "10px 0",
          height: "50px",
        }}
      />
    </>
  );
};

const ColorPicker = () => {
  const [color, setColor] = useState("rgb(255, 0, 0)");

  const changeHandler = (value: string) => {
    setColor(value);
    copyToClipboard(value);
  };

  return (
    <>
      <h1>Color Picker</h1>
      <h3>RGB (Red, Green, Blue)</h3>
      <RgbColorPicker onChange={changeHandler} />
      <div
        id="div-color"
        style={{ "background-color": color, height: "50px" }}
      ></div>
      <div
        class="fade-out"
        onTransitionEnd={(event) => {
          console.log(event);
          event.currentTarget.remove();
        }}
      >
        Text copied
      </div>
    </>
  );
};

export function App() {
  return <ColorPicker></ColorPicker>;
}
