// Grade calculation functions
import { PSA_GRADES, BGS_GRADES } from './constants.js';

/**
 * Calculate centering percentages and update info display
 * @param {Object} borders - Border positions
 * @param {HTMLElement} verticalInfo - Vertical info display element
 * @param {HTMLElement} horizontalInfo - Horizontal info display element
 * @return {Object} - Calculated centering data
 */
export function calculateCentering(borders) {
  // Calculate centering percentages
  const verticalTopGap = borders.innerTop - borders.outerTop;
  const verticalBottomGap = borders.outerBottom - borders.innerBottom;
  const verticalTotal = verticalTopGap + verticalBottomGap;
  const verticalPercent = verticalTotal ? (verticalTopGap / verticalTotal) * 100 : 50;
  
  const horizontalLeftGap = borders.innerLeft - borders.outerLeft;
  const horizontalRightGap = borders.outerRight - borders.innerRight;
  const horizontalTotal = horizontalLeftGap + horizontalRightGap;
  const horizontalPercent = horizontalTotal ? (horizontalLeftGap / horizontalTotal) * 100 : 50;
  
  // Calculate worst centering deviation
  const worstCentering = Math.max(
    Math.abs(verticalPercent - 50),
    Math.abs(horizontalPercent - 50)
  );
  
  return {
    verticalPercent,
    horizontalPercent,
    worstCentering
  };
}

/**
 * Update measurement displays with centering data
 * @param {Object} centeringData - Centering calculation data
 * @param {HTMLElement} verticalInfo - Vertical info display element
 * @param {HTMLElement} horizontalInfo - Horizontal info display element
 */
export function updateMeasurementDisplay(centeringData, verticalInfo, horizontalInfo) {
  // Update the info display
  verticalInfo.textContent = centeringData.verticalPercent.toFixed(1) + "% top / " + 
    (100 - centeringData.verticalPercent).toFixed(1) + "% bottom";
  
  horizontalInfo.textContent = centeringData.horizontalPercent.toFixed(1) + "% left / " + 
    (100 - centeringData.horizontalPercent).toFixed(1) + "% right";
}

/**
 * Calculate and display PSA grade based on centering
 * @param {number} worstCentering - Worst centering deviation percentage
 * @param {HTMLElement} psaGrade - PSA grade display element
 */
export function setPSAGrade(worstCentering, psaGrade) {
  for (const grade of PSA_GRADES) {
    if (worstCentering <= grade.max) {
      psaGrade.textContent = grade.text;
      psaGrade.className = `grade-value ${grade.class}`;
      break;
    }
  }
}

/**
 * Calculate and display BGS grade based on centering
 * @param {number} worstCentering - Worst centering deviation percentage
 * @param {HTMLElement} bgsGrade - BGS grade display element
 */
export function setBGSGrade(worstCentering, bgsGrade) {
  for (const grade of BGS_GRADES) {
    if (worstCentering <= grade.max) {
      bgsGrade.textContent = grade.text;
      bgsGrade.className = `grade-value ${grade.class}`;
      break;
    }
  }
}