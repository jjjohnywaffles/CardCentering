// UI event handlers
import { processFile } from './imageHandlers.js';
import { drawCanvas } from './canvasDrawing.js';
import { degreesToRadians } from './utils.js';
import { initializeBorders } from './utils.js';

/**
 * Set up file input change event handler
 * @param {HTMLInputElement} fileInput - File input element
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {HTMLElement} instructions - Instructions element
 * @param {Function} updateMeasurements - Function to update measurements
 */
export function setupFileInputHandler(fileInput, canvas, ctx, state, instructions, updateMeasurements) {
  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      processFile(file, canvas, ctx, state, instructions, updateMeasurements);
    }
  });
}

/**
 * Set up paste event handler
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {HTMLElement} instructions - Instructions element
 * @param {Function} updateMeasurements - Function to update measurements
 */
export function setupPasteHandler(canvas, ctx, state, instructions, updateMeasurements) {
  document.addEventListener('paste', function(event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file, canvas, ctx, state, instructions, updateMeasurements);
          break;
        }
      }
    }
  });
}

/**
 * Set up drag and drop event handlers
 * @param {HTMLElement} canvasWrapper - Canvas wrapper element
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {HTMLElement} instructions - Instructions element
 * @param {Function} updateMeasurements - Function to update measurements
 */
export function setupDragDropHandlers(canvasWrapper, canvas, ctx, state, instructions, updateMeasurements) {
  canvasWrapper.addEventListener('dragover', function(event) {
    event.preventDefault();
    canvasWrapper.classList.add('dragover');
  });

  canvasWrapper.addEventListener('dragleave', function(event) {
    event.preventDefault();
    canvasWrapper.classList.remove('dragover');
  });

  canvasWrapper.addEventListener('drop', function(event) {
    event.preventDefault();
    canvasWrapper.classList.remove('dragover');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0], canvas, ctx, state, instructions, updateMeasurements);
    }
  });
}

/**
 * Set up rotation slider event handler
 * @param {HTMLInputElement} rotateSlider - Rotation slider element
 * @param {HTMLElement} angleValue - Angle value display element
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 */
export function setupRotationHandler(rotateSlider, angleValue, canvas, ctx, state) {
  rotateSlider.addEventListener('input', function() {
    state.rotationAngle = parseFloat(this.value);
    angleValue.textContent = state.rotationAngle + "°";
    state.rad = degreesToRadians(state.rotationAngle);
    drawCanvas(canvas, ctx, state);
  });
}

/**
 * Set up reset button event handler
 * @param {HTMLButtonElement} resetButton - Reset button element
 * @param {HTMLInputElement} rotateSlider - Rotation slider element
 * @param {HTMLElement} angleValue - Angle value display element
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {Function} updateMeasurements - Function to update measurements
 */
export function setupResetHandler(resetButton, rotateSlider, angleValue, canvas, ctx, state, updateMeasurements) {
  resetButton.addEventListener('click', function() {
    // Reset rotation
    state.rotationAngle = 0;
    state.rad = 0;
    rotateSlider.value = 0;
    angleValue.textContent = "0°";
    
    if (state.hasImage && state.image) {
      // Reset borders to default positions
      state.borders = initializeBorders(state.image.width, state.image.height);
      
      // Redraw and update measurements
      drawCanvas(canvas, ctx, state);
      updateMeasurements();
    }
  });
}

/**
 * Set up company tabs functionality
 * @param {NodeList} companyTabs - Company tab elements
 * @param {NodeList} companyContents - Company content elements
 */
export function setupCompanyTabs(companyTabs, companyContents) {
  companyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and content
      companyTabs.forEach(t => t.classList.remove('active'));
      companyContents.forEach(c => c.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

/**
 * Set up window resize handler
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Object} state - Application state
 * @param {Function} resizeCanvasFunc - Function to resize canvas
 */
export function setupResizeHandler(canvas, ctx, state, resizeCanvasFunc) {
  window.addEventListener('resize', function() {
    resizeCanvasFunc(canvas);
    drawCanvas(canvas, ctx, state);
  });
}

// Debug logs for setupFileInputHandler function

export function setupFileInputHandler(fileInput, canvas, ctx, state, instructions, updateMeasurements) {
    console.log("Setting up file input handler");
    
    fileInput.addEventListener('change', function(event) {
      console.log("File input change detected");
      
      const file = event.target.files[0];
      if (file) {
        console.log("File selected:", file.name, "Type:", file.type, "Size:", file.size);
        processFile(file, canvas, ctx, state, instructions, updateMeasurements);
      } else {
        console.log("No file selected");
      }
    });
  }