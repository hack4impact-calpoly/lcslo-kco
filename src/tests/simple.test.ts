describe("Simple Jest Test", () => {
  it("should add numbers correctly", () => {
    const sum = 1 + 1;
    expect(sum).toBe(2);
  });

  it("should subtract numbers correctly", () => {
    const difference = 2 - 1;
    expect(difference).toBe(1);
  });
});
