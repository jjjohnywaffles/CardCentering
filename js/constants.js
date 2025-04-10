// Application constants
export const CANVAS_BACKGROUND_COLOR = "#1a202c";
export const OUTER_BORDER_COLOR = "#3182ce";
export const INNER_BORDER_COLOR = "#ecc94b";
export const BORDER_WIDTH = 3;
export const TAB_SIZE = 15;
export const HIT_TOLERANCE = 20;
export const IMAGE_SCALE_FACTOR = 0.95;

// PSA Grades
export const PSA_GRADES = [
  { max: 5, text: "Gem Mint (PSA 10)", class: "grade-excellent" },
  { max: 10, text: "Mint (PSA 9)", class: "grade-good" },
  { max: 15, text: "NM-MT (PSA 8)", class: "grade-good" },
  { max: 20, text: "Near Mint (PSA 7)", class: "grade-fair" },
  { max: Infinity, text: "EX-NM or Lower", class: "grade-poor" }
];

// BGS Grades
export const BGS_GRADES = [
  { max: 2.5, text: "Pristine (10)", class: "grade-excellent" },
  { max: 5, text: "Gem Mint (9.5)", class: "grade-excellent" },
  { max: 10, text: "Mint (9.0)", class: "grade-good" },
  { max: 15, text: "NM-MT+ (8.5)", class: "grade-good" },
  { max: 20, text: "NM-MT (8.0)", class: "grade-fair" },
  { max: Infinity, text: "NM or Lower", class: "grade-poor" }
];