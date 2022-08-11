import { applyGravity } from "./gravity";

const inputA = [
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 1, 1],
];
const inputB = [
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 1],
];
const X = 9;
const inputWithObstacles = [
  [0, 1, 0, 0],
  [2, 0, X, 1],
  [0, X, 1, 0],
  [1, 1, 1, 1],
];

describe("Test gravity mechanics", () => {
  // Left
  const outputALeft = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [2, 1, 0, 0],
  ];
  const outputBLeft = [
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [2, 2, 0, 0],
  ];
  const outputWithObstaclesLeft = [
    [1, 0, 0, 0],
    [2, 0, X, 1],
    [0, X, 1, 0],
    [2, 2, 0, 0],
  ];
  it.each([
    [inputA, outputALeft],
    [inputB, outputBLeft],
    [inputWithObstacles, outputWithObstaclesLeft],
  ])("When gravity is left", (input, output) => {
    expect(applyGravity(input, "left", X)).toMatchObject(output);
  });

  // Right
  const outputARight = [
    [0, 0, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 2],
  ];
  const outputBRight = [
    [0, 0, 0, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 2],
  ];
  const outputWithObstaclesRight = [
    [0, 0, 0, 1],
    [0, 2, X, 1],
    [0, X, 0, 1],
    [0, 0, 2, 2],
  ];
  it.each([
    [inputA, outputARight],
    [inputB, outputBRight],
    [inputWithObstacles, outputWithObstaclesRight],
  ])("When gravity is right", (input, output) => {
    expect(applyGravity(input, "right", X)).toMatchObject(output);
  });

  // Bottom
  const outputADown = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 2, 2, 1],
  ];
  const outputBDown = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 2, 1, 1],
  ];
  const outputWithObstaclesDown = [
    [0, 0, 0, 0],
    [0, 1, X, 0],
    [2, X, 0, 0],
    [1, 1, 2, 2],
  ];
  it.each([
    [inputA, outputADown],
    [inputB, outputBDown],
    [inputWithObstacles, outputWithObstaclesDown],
  ])("When gravity is down", (input, output) => {
    expect(applyGravity(input, "down", X)).toMatchObject(output);
  });

  // Top
  const outputAUp = [
    [0, 2, 2, 1],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const outputBUp = [
    [1, 2, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const outputWithObstaclesUp = [
    [2, 1, 0, 2],
    [1, 0, X, 0],
    [0, X, 2, 0],
    [0, 1, 0, 0],
  ];
  it.each([
    [inputA, outputAUp],
    [inputB, outputBUp],
    [inputWithObstacles, outputWithObstaclesUp],
  ])("When gravity is up", (input, output) => {
    expect(applyGravity(input, "up", X)).toMatchObject(output);
  });
});
