/**
 * Load an image file into the card image
 * @param {File} file - The image file to load
 * @param {HTMLImageElement} cardImage - The card image element
 */
function loadFile(file, cardImage) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) { 
        cardImage.src = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }
  
  /**
   * Initialize border positions based on loaded card image
   * @param {HTMLImageElement} cardImage - The card image element
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @returns {Object} - Initial border positions and scale
   */
  function initializeImageAndBorders(cardImage, canvas) {
    // Calculate initial scale to fit image in canvas
    const scale = Math.min(canvas.width / cardImage.width, canvas.height / cardImage.height) * 0.9;
    
    // Set initial border positions
    const borders = {
      outerTop: cardImage.height * CONSTANTS.DEFAULT_OUTER_TOP_RATIO,
      outerBottom: cardImage.height * CONSTANTS.DEFAULT_OUTER_BOTTOM_RATIO,
      outerLeft: cardImage.width * CONSTANTS.DEFAULT_OUTER_LEFT_RATIO,
      outerRight: cardImage.width * CONSTANTS.DEFAULT_OUTER_RIGHT_RATIO,
      innerTop: cardImage.height * CONSTANTS.DEFAULT_INNER_TOP_RATIO,
      innerBottom: cardImage.height * CONSTANTS.DEFAULT_INNER_BOTTOM_RATIO,
      innerLeft: cardImage.width * CONSTANTS.DEFAULT_INNER_LEFT_RATIO,
      innerRight: cardImage.width * CONSTANTS.DEFAULT_INNER_RIGHT_RATIO
    };
    
    // Hide instructions
    document.getElementById('instructions').style.display = 'none';
    
    return { scale, borders };
  }
  
  /**
   * Set up file drop event listeners
   * @param {HTMLElement} canvasWrapper - The canvas wrapper element
   * @param {HTMLImageElement} cardImage - The card image element
   */
  function setupFileDrop(canvasWrapper, cardImage) {
    canvasWrapper.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      canvasWrapper.classList.add('dragover');
    });
    
    canvasWrapper.addEventListener('dragleave', (evt) => {
      evt.preventDefault();
      canvasWrapper.classList.remove('dragover');
    });
    
    canvasWrapper.addEventListener('drop', (evt) => {
      evt.preventDefault();
      canvasWrapper.classList.remove('dragover');
      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        loadFile(files[0], cardImage);
        console.log("File dropped:", files[0].name);
      }
    });
  }
  
  /**
   * Reset the tool to initial state
   * @param {HTMLImageElement} cardImage - The card image element
   * @param {Object} state - The application state object
   * @param {Function} drawCanvas - The function to redraw the canvas
   */
  function resetTool(cardImage, state, drawCanvas) {
    // Reset rotation
    state.rotationAngle = 0;
    state.rad = 0;
    document.getElementById('rotateSlider').value = 0;
    document.getElementById('angleValue').textContent = "0°";
    
    if (cardImage.complete && cardImage.naturalWidth > 0) {
      // Reset borders to default positions
      state.borders.outerTop = cardImage.height * CONSTANTS.DEFAULT_OUTER_TOP_RATIO;
      state.borders.outerBottom = cardImage.height * CONSTANTS.DEFAULT_OUTER_BOTTOM_RATIO;
      state.borders.outerLeft = cardImage.width * CONSTANTS.DEFAULT_OUTER_LEFT_RATIO;
      state.borders.outerRight = cardImage.width * CONSTANTS.DEFAULT_OUTER_RIGHT_RATIO;
      state.borders.innerTop = cardImage.height * CONSTANTS.DEFAULT_INNER_TOP_RATIO;
      state.borders.innerBottom = cardImage.height * CONSTANTS.DEFAULT_INNER_BOTTOM_RATIO;
      state.borders.innerLeft = cardImage.width * CONSTANTS.DEFAULT_INNER_LEFT_RATIO;
      state.borders.innerRight = cardImage.width * CONSTANTS.DEFAULT_INNER_RIGHT_RATIO;
      
      drawCanvas();
    }
  }