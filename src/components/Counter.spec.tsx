import { render } from "@testing-library/preact";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("SHOULD display initial count", () => {
    const { container } = render(<Counter initialCount={5} />);
    expect(container.textContent).toBe("Current value: 5Increment");
  });
});
