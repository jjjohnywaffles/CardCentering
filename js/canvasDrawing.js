// Canvas drawing functions
import { 
  CANVAS_BACKGROUND_COLOR, 
  OUTER_BORDER_COLOR, 
  INNER_BORDER_COLOR, 
  BORDER_WIDTH,
  TAB_SIZE 
} from './constants.js';

/**
 * Resize the canvas to fit its container
 * @param {HTMLCanvasElement} canvas - Canvas element
 */
export function resizeCanvas(canvas) {
  try {
    const container = document.getElementById('canvasContainer');
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      console.log(`Canvas resized to ${canvas.width}x${canvas.height}`);
    } else {
      console.error('Canvas container not found');
    }
  } catch (error) {
    console.error('Error resizing canvas:', error);
  }
}

/**
 * Draw the canvas with current state
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 */
export function drawCanvas(canvas, ctx, state) {
  try {
    // Clear the canvas with dark background
    ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // If no image is loaded, exit early
    if (!state.hasImage || !state.image) {
      return;
    }
    
    const img = state.image;
    const scale = state.scale;
    const borders = state.borders;
    
    // Calculate image position (centered in canvas)
    const imgWidthScaled = img.width * scale;
    const imgHeightScaled = img.height * scale;
    const imgX = (canvas.width - imgWidthScaled) / 2;
    const imgY = (canvas.height - imgHeightScaled) / 2;
    
    console.log(`Drawing image: ${img.width}x${img.height} at scale ${scale}`);
    
    // Draw the rotated image
    ctx.save();
    const centerX = imgX + imgWidthScaled/2;
    const centerY = imgY + imgHeightScaled/2;
    ctx.translate(centerX, centerY);
    ctx.rotate(state.rad);
    
    try {
      ctx.drawImage(img, -imgWidthScaled/2, -imgHeightScaled/2, imgWidthScaled, imgHeightScaled);
    } catch (err) {
      console.error('Error drawing image:', err);
    }
    
    ctx.restore();
    
    drawBorders(ctx, imgX, imgY, imgWidthScaled, imgHeightScaled, borders, scale);
    drawDraggableTabs(ctx, imgX, imgY, img.width, img.height, borders, scale);
  } catch (error) {
    console.error('Error in drawCanvas:', error);
  }
}

/**
 * Draw outer and inner borders
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} imgX - Image X position
 * @param {number} imgY - Image Y position
 * @param {number} imgWidthScaled - Scaled image width
 * @param {number} imgHeightScaled - Scaled image height
 * @param {Object} borders - Border positions
 * @param {number} scale - Scale factor
 */
function drawBorders(ctx, imgX, imgY, imgWidthScaled, imgHeightScaled, borders, scale) {
  try {
    // Draw outer borders with increased width
    ctx.lineWidth = BORDER_WIDTH;
    ctx.strokeStyle = OUTER_BORDER_COLOR;
    
    // Horizontal outer borders
    ctx.beginPath();
    ctx.moveTo(imgX, imgY + borders.outerTop * scale);
    ctx.lineTo(imgX + imgWidthScaled, imgY + borders.outerTop * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(imgX, imgY + borders.outerBottom * scale);
    ctx.lineTo(imgX + imgWidthScaled, imgY + borders.outerBottom * scale);
    ctx.stroke();
    
    // Vertical outer borders
    ctx.beginPath();
    ctx.moveTo(imgX + borders.outerLeft * scale, imgY);
    ctx.lineTo(imgX + borders.outerLeft * scale, imgY + imgHeightScaled);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(imgX + borders.outerRight * scale, imgY);
    ctx.lineTo(imgX + borders.outerRight * scale, imgY + imgHeightScaled);
    ctx.stroke();
    
    // Inner borders
    ctx.strokeStyle = INNER_BORDER_COLOR;
    
    // Horizontal inner borders
    ctx.beginPath();
    ctx.moveTo(imgX, imgY + borders.innerTop * scale);
    ctx.lineTo(imgX + imgWidthScaled, imgY + borders.innerTop * scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(imgX, imgY + borders.innerBottom * scale);
    ctx.lineTo(imgX + imgWidthScaled, imgY + borders.innerBottom * scale);
    ctx.stroke();
    
    // Vertical inner borders
    ctx.beginPath();
    ctx.moveTo(imgX + borders.innerLeft * scale, imgY);
    ctx.lineTo(imgX + borders.innerLeft * scale, imgY + imgHeightScaled);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(imgX + borders.innerRight * scale, imgY);
    ctx.lineTo(imgX + borders.innerRight * scale, imgY + imgHeightScaled);
    ctx.stroke();
  } catch (error) {
    console.error('Error in drawBorders:', error);
  }
}

/**
 * Draw draggable tabs for borders
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {number} imgX - Image X position
 * @param {number} imgY - Image Y position
 * @param {number} imgWidth - Image width
 * @param {number} imgHeight - Image height
 * @param {Object} borders - Border positions
 * @param {number} scale - Scale factor
 */
function drawDraggableTabs(ctx, imgX, imgY, imgWidth, imgHeight, borders, scale) {
  try {
    // Draw draggable tabs
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#2c5282";
    ctx.lineWidth = 1;
    
    // Top outer tab
    ctx.beginPath();
    ctx.rect(imgX + (imgWidth/2 - TAB_SIZE/2 - 10) * scale, imgY + (borders.outerTop - TAB_SIZE/2) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Bottom outer tab
    ctx.beginPath();
    ctx.rect(imgX + (imgWidth/2 - TAB_SIZE/2 - 10) * scale, imgY + (borders.outerBottom - TAB_SIZE/2) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Top inner tab
    ctx.beginPath();
    ctx.rect(imgX + (imgWidth/2 - TAB_SIZE/2 + 10) * scale, imgY + (borders.innerTop - TAB_SIZE/2) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Bottom inner tab
    ctx.beginPath();
    ctx.rect(imgX + (imgWidth/2 - TAB_SIZE/2 + 10) * scale, imgY + (borders.innerBottom - TAB_SIZE/2) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Left outer tab
    ctx.beginPath();
    ctx.rect(imgX + (borders.outerLeft - TAB_SIZE/2) * scale, imgY + (imgHeight/2 - TAB_SIZE/2 - 10) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Right outer tab
    ctx.beginPath();
    ctx.rect(imgX + (borders.outerRight - TAB_SIZE/2) * scale, imgY + (imgHeight/2 - TAB_SIZE/2 - 10) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Left inner tab
    ctx.beginPath();
    ctx.rect(imgX + (borders.innerLeft - TAB_SIZE/2) * scale, imgY + (imgHeight/2 - TAB_SIZE/2 + 10) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
    
    // Right inner tab
    ctx.beginPath();
    ctx.rect(imgX + (borders.innerRight - TAB_SIZE/2) * scale, imgY + (imgHeight/2 - TAB_SIZE/2 + 10) * scale, TAB_SIZE * scale, TAB_SIZE * scale);
    ctx.fill();
    ctx.stroke();
  } catch (error) {
    console.error('Error in drawDraggableTabs:', error);
  }
}