// Main application logic

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');
    const fileInput = document.getElementById('fileInput');
    const rotateSlider = document.getElementById('rotateSlider');
    const angleValue = document.getElementById('angleValue');
    const canvasWrapper = document.getElementById('canvasWrapper');
    const resetButton = document.getElementById('resetButton');
    const companyTabs = document.querySelectorAll('.company-tab');
    const companyContents = document.querySelectorAll('.company-content');
    const instructions = document.getElementById('instructions');
  
    // Create the card image
    const cardImage = new Image();
    
    // Add error handler for image loading
    cardImage.onerror = (e) => {
      console.error("Error loading image:", e);
      alert("Failed to load image. Please try another image.");
    };
  
    // Application state
    const state = {
      rotationAngle: 0,       // degrees
      rad: 0,                 // radians
      scale: 1,               // computed scale factor
      dragging: false,        // drag state
      dragItem: null,         // e.g., "outerTop", "innerLeft", etc.
      borders: {              // Border positions (will be initialized when image loads)
        outerTop: 0,
        outerBottom: 0,
        outerLeft: 0,
        outerRight: 0,
        innerTop: 0,
        innerBottom: 0,
        innerLeft: 0,
        innerRight: 0
      }
    };
  
    // Main canvas drawing function wrapper
    function redrawCanvas() {
      drawCanvas(canvas, ctx, cardImage, state);
    }
    
    // Direct implementation of loadFile function
    function loadFile(file) {
      if (file && file.type.startsWith('image/')) {
        console.log("Loading file:", file.name, "type:", file.type);
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
          console.log("FileReader onload triggered");
          cardImage.src = e.target.result;
        };
        
        reader.onerror = function(e) {
          console.error("FileReader error:", e);
          alert("Error reading the file. Please try again.");
        };
        
        reader.readAsDataURL(file);
      } else if (file) {
        console.error("Invalid file type:", file.type);
        alert("Please select an image file.");
      }
    }
  
    // Event listeners
    // File input change
    fileInput.addEventListener('change', (evt) => {
      console.log("File input change event triggered");
      const file = evt.target.files[0];
      if (file) {
        loadFile(file);
      }
    });
  
    // Rotation slider
    rotateSlider.addEventListener('input', () => {
      state.rotationAngle = parseFloat(rotateSlider.value);
      angleValue.textContent = state.rotationAngle + "°";
      state.rad = state.rotationAngle * Math.PI / 180;
      redrawCanvas();
    });
  
    // Reset button
    resetButton.addEventListener('click', () => {
      // Reset rotation
      state.rotationAngle = 0;
      state.rad = 0;
      rotateSlider.value = 0;
      angleValue.textContent = "0°";
      
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
        
        redrawCanvas();
      }
    });
  
    // Mouse events for border dragging
    canvas.addEventListener('mousedown', (evt) => {
      handleMouseDown(evt, state, canvas, cardImage);
    });
  
    canvas.addEventListener('mousemove', (evt) => {
      handleMouseMove(evt, state, canvas, cardImage, redrawCanvas);
    });
  
    canvas.addEventListener('mouseup', () => { 
      state.dragging = false; 
      state.dragItem = null; 
    });
  
    canvas.addEventListener('mouseleave', () => { 
      state.dragging = false; 
      state.dragItem = null; 
    });
  
    // Touch events for mobile
    canvas.addEventListener('touchstart', (evt) => {
      handleTouchStart(evt, state, canvas, cardImage);
    }, { passive: false });
  
    canvas.addEventListener('touchmove', (evt) => {
      handleTouchMove(evt, state, canvas, cardImage, redrawCanvas);
    }, { passive: false });
  
    canvas.addEventListener('touchend', (evt) => { 
      evt.preventDefault(); 
      state.dragging = false; 
      state.dragItem = null; 
    }, { passive: false });
  
    canvas.addEventListener('touchcancel', (evt) => { 
      evt.preventDefault(); 
      state.dragging = false; 
      state.dragItem = null; 
    }, { passive: false });
  
    // Set up file drop
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
      console.log("File drop event triggered");
      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        loadFile(files[0]);
      }
    });
  
    // Set up clipboard paste
    document.addEventListener('paste', (evt) => {
      console.log("Paste event triggered");
      const items = evt.clipboardData.items;
      for (let item of items) {
        console.log("Clipboard item type:", item.type);
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          loadFile(file);
          break;
        }
      }
    });
  
    // Company tabs functionality
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
  
    // Image load event
    cardImage.onload = () => {
      console.log("Image loaded successfully:", cardImage.width, "x", cardImage.height);
      
      // Hide instructions
      instructions.style.display = 'none';
      
      // Make sure canvas is properly sized 
      resizeCanvas();
      
      // Calculate initial scale to fit image in canvas
      const scale = Math.min(canvas.width / cardImage.width, canvas.height / cardImage.height) * 0.9;
      state.scale = scale;
      
      // Set initial border positions
      state.borders.outerTop = cardImage.height * CONSTANTS.DEFAULT_OUTER_TOP_RATIO;
      state.borders.outerBottom = cardImage.height * CONSTANTS.DEFAULT_OUTER_BOTTOM_RATIO;
      state.borders.outerLeft = cardImage.width * CONSTANTS.DEFAULT_OUTER_LEFT_RATIO;
      state.borders.outerRight = cardImage.width * CONSTANTS.DEFAULT_OUTER_RIGHT_RATIO;
      state.borders.innerTop = cardImage.height * CONSTANTS.DEFAULT_INNER_TOP_RATIO;
      state.borders.innerBottom = cardImage.height * CONSTANTS.DEFAULT_INNER_BOTTOM_RATIO;
      state.borders.innerLeft = cardImage.width * CONSTANTS.DEFAULT_INNER_LEFT_RATIO;
      state.borders.innerRight = cardImage.width * CONSTANTS.DEFAULT_INNER_RIGHT_RATIO;
      
      // Draw the canvas
      redrawCanvas();
    };
    
    // Function to resize canvas to match container
    function resizeCanvas() {
      const container = document.getElementById('canvasContainer');
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      console.log("Canvas resized to:", canvas.width, "x", canvas.height);
      redrawCanvas();
    }
    
    // Resize canvas when window size changes
    window.addEventListener('resize', resizeCanvas);
    
    // Initial canvas sizing
    resizeCanvas();
    
    console.log("Card centering tool initialized");
  });