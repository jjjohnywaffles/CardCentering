// Border handling functions
import { HIT_TOLERANCE } from './constants.js';
import { drawCanvas } from './canvasDrawing.js';

/**
 * Handle mousedown event for border dragging
 * @param {MouseEvent} evt - Mouse event
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {Object} state - Application state
 */
export function handleMouseDown(evt, canvas, state) {
  if (!state.hasImage) return;
  
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const canvasX = (evt.clientX - rect.left) * scaleX;
  const canvasY = (evt.clientY - rect.top) * scaleY;
  
  // Calculate image position
  const img = state.image;
  const scale = state.scale;
  const imgWidthScaled = img.width * scale;
  const imgHeightScaled = img.height * scale;
  const imgX = (canvas.width - imgWidthScaled) / 2;
  const imgY = (canvas.height - imgHeightScaled) / 2;
  
  // Convert to image coordinates
  const imgCoordX = (canvasX - imgX) / scale;
  const imgCoordY = (canvasY - imgY) / scale;
  
  const borders = state.borders;
  
  // Check if we're clicking on a border
  if (Math.abs(imgCoordY - borders.outerTop) < HIT_TOLERANCE) {
    state.dragItem = "outerTop";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordY - borders.outerBottom) < HIT_TOLERANCE) {
    state.dragItem = "outerBottom";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordX - borders.outerLeft) < HIT_TOLERANCE) {
    state.dragItem = "outerLeft";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordX - borders.outerRight) < HIT_TOLERANCE) {
    state.dragItem = "outerRight";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordY - borders.innerTop) < HIT_TOLERANCE) {
    state.dragItem = "innerTop";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordY - borders.innerBottom) < HIT_TOLERANCE) {
    state.dragItem = "innerBottom";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordX - borders.innerLeft) < HIT_TOLERANCE) {
    state.dragItem = "innerLeft";
    state.dragging = true;
  }
  else if (Math.abs(imgCoordX - borders.innerRight) < HIT_TOLERANCE) {
    state.dragItem = "innerRight";
    state.dragging = true;
  }
}

/**
 * Handle mousemove event for border dragging
 * @param {MouseEvent} evt - Mouse event
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {Function} updateMeasurements - Function to update measurements
 */
export function handleMouseMove(evt, canvas, ctx, state, updateMeasurements) {
  if (!state.dragging) return;
  
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const canvasX = (evt.clientX - rect.left) * scaleX;
  const canvasY = (evt.clientY - rect.top) * scaleY;
  
  // Calculate image position
  const img = state.image;
  const scale = state.scale;
  const imgWidthScaled = img.width * scale;
  const imgHeightScaled = img.height * scale;
  const imgX = (canvas.width - imgWidthScaled) / 2;
  const imgY = (canvas.height - imgHeightScaled) / 2;
  
  // Convert to image coordinates
  const imgCoordX = (canvasX - imgX) / scale;
  const imgCoordY = (canvasY - imgY) / scale;
  
  // Update only the border that's being dragged
  switch(state.dragItem) {
    case "outerTop":
      state.borders.outerTop = Math.min(imgCoordY, state.borders.innerTop);
      break;
    case "innerTop":
      state.borders.innerTop = Math.min(Math.max(imgCoordY, state.borders.outerTop), state.borders.innerBottom);
      break;
    case "innerBottom":
      state.borders.innerBottom = Math.max(Math.min(imgCoordY, state.borders.outerBottom), state.borders.innerTop);
      break;
    case "outerBottom":
      state.borders.outerBottom = Math.max(imgCoordY, state.borders.innerBottom);
      break;
    case "outerLeft":
      state.borders.outerLeft = Math.min(imgCoordX, state.borders.innerLeft);
      break;
    case "innerLeft":
      state.borders.innerLeft = Math.min(Math.max(imgCoordX, state.borders.outerLeft), state.borders.innerRight);
      break;
    case "innerRight":
      state.borders.innerRight = Math.max(Math.min(imgCoordX, state.borders.outerRight), state.borders.innerLeft);
      break;
    case "outerRight":
      state.borders.outerRight = Math.max(imgCoordX, state.borders.innerRight);
      break;
  }
  
  drawCanvas(canvas, ctx, state);
  updateMeasurements();
}

/**
 * Handle mouseup event for border dragging
 * @param {Object} state - Application state
 */
export function handleMouseUp(state) {
  state.dragging = false;
  state.dragItem = null;
}

/**
 * Handle mouseleave event for border dragging
 * @param {Object} state - Application state
 */
export function handleMouseLeave(state) {
  state.dragging = false;
  state.dragItem = null;
}