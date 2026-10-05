export const finalPhotoSource = "/images/finale/photo-finale.jpg";

export const fragmentPhotoPositions = {
  1: { column: 1, row: 0, shape: "top-middle" },
  2: { column: 0, row: 1, shape: "bottom-left" },
  3: { column: 2, row: 1, shape: "bottom-right" },
  4: { column: 0, row: 0, shape: "top-left" },
  5: { column: 1, row: 1, shape: "bottom-middle" },
  6: { column: 2, row: 0, shape: "top-right" },
};

export const finalPhotoLayout = [4, 1, 6, 2, 5, 3];

export function photoBackgroundPosition(fragmentId) {
  const position = fragmentPhotoPositions[fragmentId];
  return `${position.column === 0 ? "0" : position.column === 1 ? "50%" : "100%"} ${position.row === 0 ? "0" : "100%"}`;
}
