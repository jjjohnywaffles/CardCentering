// Utility functions

/**
 * Converts angle in degrees to radians
 * @param {number} degrees - Angle in degrees
 * @return {number} - Angle in radians
 */
export function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

/**
 * Calculates scale to fit an image in a canvas
 * @param {number} imageWidth - Image width
 * @param {number} imageHeight - Image height 
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {number} scaleFactor - Additional scale factor
 * @return {number} - Calculated scale
 */
export function calculateScale(imageWidth, imageHeight, canvasWidth, canvasHeight, scaleFactor) {
  return Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight) * scaleFactor;
}

/**
 * Initialize borders based on image dimensions
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @return {Object} - Border positions
 */
export function initializeBorders(width, height) {
  return {
    outerTop: height * 0.05,     // 5% from top edge
    outerBottom: height * 0.95,  // 5% from bottom edge
    outerLeft: width * 0.05,     // 5% from left edge
    outerRight: width * 0.95,    // 5% from right edge
    innerTop: height * 0.15,     // 15% from top edge
    innerBottom: height * 0.85,  // 15% from bottom edge
    innerLeft: width * 0.15,     // 15% from left edge
    innerRight: width * 0.85     // 15% from right edge
  };
}