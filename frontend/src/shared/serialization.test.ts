import { deserialize, serialize } from "./serialization";

describe("Test shared/serialization", () => {
  it("Should serialize a grid into an string of length x^2", () => {
    const threeSquareGrid = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(serialize(threeSquareGrid)).toMatch(/^.{9}$/);
  });

  it.each<[number[][]]>([
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    [
      [
        [1, 2, 3, 4],
        [4, 5, 6, 7],
        [7, 8, 9, 10],
        [10, 11, 12, 13],
      ],
    ],
  ])("Should deserialize into the same grid that was serialized", (grid) => {
    const serialized = serialize(grid);
    expect(deserialize(serialized)).toMatchObject(grid);
  });

  it("Should throw if the string cannot be deserialized into a square", () => {
    const invalidString = "abcdef";
    expect(() => deserialize(invalidString)).toThrow();
  });
});
