import { useState } from "preact/hooks";

export type CounterProps = {
    initialCount: number,
}

export const Counter = ({initialCount}: CounterProps) => {
    const [count, setCount] = useState(initialCount);
    const increment = () => setCount(count + 1);

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    );
};
