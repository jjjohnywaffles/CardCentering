// Image handling functions
import { initializeBorders } from './utils.js';
import { calculateScale } from './utils.js';
import { IMAGE_SCALE_FACTOR } from './constants.js';
import { drawCanvas } from './canvasDrawing.js';

/**
 * Process the uploaded file
 * @param {File} file - The file to process
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {HTMLElement} instructions - Instructions element
 * @param {Function} updateMeasurements - Function to update measurements
 */
export function processFile(file, canvas, ctx, state, instructions, updateMeasurements) {
  // Check if file is an image
  if (!file.type.match('image.*')) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();
  
  reader.onload = function(event) {
    const img = new Image();
    
    img.onload = function() {
      // Store the image in state
      state.image = img;
      state.hasImage = true;
      
      // Hide instructions
      if (instructions) {
        instructions.style.display = 'none';
      }
      
      // Initialize borders based on image dimensions
      state.borders = initializeBorders(img.width, img.height);
      
      // Calculate scale
      state.scale = calculateScale(img.width, img.height, canvas.width, canvas.height, IMAGE_SCALE_FACTOR);
      
      // Draw the canvas
      drawCanvas(canvas, ctx, state);
      
      // Update measurements
      if (typeof updateMeasurements === 'function') {
        updateMeasurements();
      }
    };
    
    img.onerror = function() {
      console.error("Failed to load image");
      alert("Failed to load image. Please try another image.");
    };
    
    // Set the image source from the FileReader result
    img.src = event.target.result;
  };
  
  reader.onerror = function() {
    console.error("Error reading file");
    alert("Error reading file. Please try again.");
  };
  
  reader.readAsDataURL(file);
}