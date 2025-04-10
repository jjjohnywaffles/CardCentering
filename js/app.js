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
    const verticalInfo = document.getElementById('verticalInfo');
    const horizontalInfo = document.getElementById('horizontalInfo');
    const psaGrade = document.getElementById('psaGrade');
    const bgsGrade = document.getElementById('bgsGrade');
  
    // Application state
    const state = {
      rotationAngle: 0,          // degrees
      rad: 0,                    // radians
      scale: 1,                  // computed scale factor
      dragging: false,           // drag state
      dragItem: null,            // e.g., "outerTop", "innerLeft", etc.
      hasImage: false,           // flag to indicate if an image is loaded
      image: null,               // the actual image data
      borders: {                 // Border positions
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
  
    // Resize the canvas to fit its container
    function resizeCanvas() {
      const container = document.getElementById('canvasContainer');
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  
    // Initialize the canvas
    resizeCanvas();
  
    // Initial draw (empty state)
    drawCanvas();
  
    // Handle file input change
    fileInput.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        processFile(file);
      }
    });
  
    // Handle paste events
    document.addEventListener('paste', function(event) {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    });
  
    // Handle drag and drop
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
        processFile(files[0]);
      }
    });
  
    // Process the uploaded file
    function processFile(file) {
      const reader = new FileReader();
      
      reader.onload = function(event) {
        const img = new Image();
        
        img.onload = function() {
          // Store the image in state
          state.image = img;
          state.hasImage = true;
          
          // Hide instructions
          instructions.style.display = 'none';
          
          // Initialize borders based on image dimensions
          initializeBorders(img.width, img.height);
          
          // Calculate scale
          state.scale = calculateScale(img.width, img.height);
          
          // Draw the canvas
          drawCanvas();
          
          // Update measurements
          updateMeasurements();
        };
        
        img.onerror = function() {
          alert("Failed to load image. Please try another image.");
        };
        
        img.src = event.target.result;
      };
      
      reader.onerror = function() {
        alert("Error reading file. Please try again.");
      };
      
      reader.readAsDataURL(file);
    }
  
    // Initialize borders based on image dimensions
    function initializeBorders(width, height) {
      state.borders = {
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
  
    // Calculate scale to fit image in canvas
    function calculateScale(imageWidth, imageHeight) {
      // Increase the scale factor from 0.8 to 0.95 for larger images
      return Math.min(canvas.width / imageWidth, canvas.height / imageHeight) * 0.95;
    }
  
    // Draw the canvas with current state
    function drawCanvas() {
      // Clear the canvas with dark background
      ctx.fillStyle = "#1a202c";
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
      
      // Draw the rotated image
      ctx.save();
      const centerX = imgX + imgWidthScaled/2;
      const centerY = imgY + imgHeightScaled/2;
      ctx.translate(centerX, centerY);
      ctx.rotate(state.rad);
      ctx.drawImage(img, -imgWidthScaled/2, -imgHeightScaled/2, imgWidthScaled, imgHeightScaled);
      ctx.restore();
      
      // Draw outer borders with increased width
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#3182ce";
      
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
      ctx.strokeStyle = "#ecc94b";
      
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
      
      // Draw draggable tabs
      const tabSize = 15;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "#2c5282";
      ctx.lineWidth = 1;
      
      // Top outer tab
      ctx.beginPath();
      ctx.rect(imgX + (img.width/2 - tabSize/2 - 10) * scale, imgY + (borders.outerTop - tabSize/2) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Bottom outer tab
      ctx.beginPath();
      ctx.rect(imgX + (img.width/2 - tabSize/2 - 10) * scale, imgY + (borders.outerBottom - tabSize/2) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Top inner tab
      ctx.beginPath();
      ctx.rect(imgX + (img.width/2 - tabSize/2 + 10) * scale, imgY + (borders.innerTop - tabSize/2) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Bottom inner tab
      ctx.beginPath();
      ctx.rect(imgX + (img.width/2 - tabSize/2 + 10) * scale, imgY + (borders.innerBottom - tabSize/2) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Left outer tab
      ctx.beginPath();
      ctx.rect(imgX + (borders.outerLeft - tabSize/2) * scale, imgY + (img.height/2 - tabSize/2 - 10) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Right outer tab
      ctx.beginPath();
      ctx.rect(imgX + (borders.outerRight - tabSize/2) * scale, imgY + (img.height/2 - tabSize/2 - 10) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Left inner tab
      ctx.beginPath();
      ctx.rect(imgX + (borders.innerLeft - tabSize/2) * scale, imgY + (img.height/2 - tabSize/2 + 10) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
      
      // Right inner tab
      ctx.beginPath();
      ctx.rect(imgX + (borders.innerRight - tabSize/2) * scale, imgY + (img.height/2 - tabSize/2 + 10) * scale, tabSize * scale, tabSize * scale);
      ctx.fill();
      ctx.stroke();
    }
  
    // Update measurements and grades display
    function updateMeasurements() {
      if (!state.hasImage) return;
      
      const borders = state.borders;
      
      // Calculate centering percentages
      const verticalTopGap = borders.innerTop - borders.outerTop;
      const verticalBottomGap = borders.outerBottom - borders.innerBottom;
      const verticalTotal = verticalTopGap + verticalBottomGap;
      const verticalPercent = verticalTotal ? (verticalTopGap / verticalTotal) * 100 : 50;
      
      const horizontalLeftGap = borders.innerLeft - borders.outerLeft;
      const horizontalRightGap = borders.outerRight - borders.innerRight;
      const horizontalTotal = horizontalLeftGap + horizontalRightGap;
      const horizontalPercent = horizontalTotal ? (horizontalLeftGap / horizontalTotal) * 100 : 50;
      
      // Update the info display
      verticalInfo.textContent = verticalPercent.toFixed(1) + "% top / " + (100 - verticalPercent).toFixed(1) + "% bottom";
      horizontalInfo.textContent = horizontalPercent.toFixed(1) + "% left / " + (100 - horizontalPercent).toFixed(1) + "% right";
      
      // Calculate worst centering deviation
      const psaWorstCentering = Math.max(
        Math.abs(verticalPercent - 50),
        Math.abs(horizontalPercent - 50)
      );
      
      const bgsWorstCentering = psaWorstCentering; // Same calculation for both
      
      // Set PSA grade
      if (psaWorstCentering <= 5) {
        psaGrade.textContent = "Gem Mint (PSA 10)";
        psaGrade.className = "grade-value grade-excellent";
      } else if (psaWorstCentering <= 10) {
        psaGrade.textContent = "Mint (PSA 9)";
        psaGrade.className = "grade-value grade-good";
      } else if (psaWorstCentering <= 15) {
        psaGrade.textContent = "NM-MT (PSA 8)";
        psaGrade.className = "grade-value grade-good";
      } else if (psaWorstCentering <= 20) {
        psaGrade.textContent = "Near Mint (PSA 7)";
        psaGrade.className = "grade-value grade-fair";
      } else {
        psaGrade.textContent = "EX-NM or Lower";
        psaGrade.className = "grade-value grade-poor";
      }
      
      // Set BGS grade
      if (bgsWorstCentering <= 2.5) {
        bgsGrade.textContent = "Pristine (10)";
        bgsGrade.className = "grade-value grade-excellent";
      } else if (bgsWorstCentering <= 5) {
        bgsGrade.textContent = "Gem Mint (9.5)";
        bgsGrade.className = "grade-value grade-excellent";
      } else if (bgsWorstCentering <= 10) {
        bgsGrade.textContent = "Mint (9.0)";
        bgsGrade.className = "grade-value grade-good";
      } else if (bgsWorstCentering <= 15) {
        bgsGrade.textContent = "NM-MT+ (8.5)";
        bgsGrade.className = "grade-value grade-good";
      } else if (bgsWorstCentering <= 20) {
        bgsGrade.textContent = "NM-MT (8.0)";
        bgsGrade.className = "grade-value grade-fair";
      } else {
        bgsGrade.textContent = "NM or Lower";
        bgsGrade.className = "grade-value grade-poor";
      }
    }
  
    // Rotation slider event
    rotateSlider.addEventListener('input', function() {
      state.rotationAngle = parseFloat(this.value);
      angleValue.textContent = state.rotationAngle + "°";
      state.rad = state.rotationAngle * Math.PI / 180;
      drawCanvas();
    });
  
    // Reset button event
    resetButton.addEventListener('click', function() {
      // Reset rotation
      state.rotationAngle = 0;
      state.rad = 0;
      rotateSlider.value = 0;
      angleValue.textContent = "0°";
      
      if (state.hasImage && state.image) {
        // Reset borders to default positions
        initializeBorders(state.image.width, state.image.height);
        
        // Redraw and update measurements
        drawCanvas();
        updateMeasurements();
      }
    });
  
    // Mouse events for border dragging
    canvas.addEventListener('mousedown', function(evt) {
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
      const tolerance = 20; // hit tolerance
      
      // Check if we're clicking on a border
      if (Math.abs(imgCoordY - borders.outerTop) < tolerance) {
        state.dragItem = "outerTop";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordY - borders.outerBottom) < tolerance) {
        state.dragItem = "outerBottom";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordX - borders.outerLeft) < tolerance) {
        state.dragItem = "outerLeft";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordX - borders.outerRight) < tolerance) {
        state.dragItem = "outerRight";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordY - borders.innerTop) < tolerance) {
        state.dragItem = "innerTop";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordY - borders.innerBottom) < tolerance) {
        state.dragItem = "innerBottom";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordX - borders.innerLeft) < tolerance) {
        state.dragItem = "innerLeft";
        state.dragging = true;
      }
      else if (Math.abs(imgCoordX - borders.innerRight) < tolerance) {
        state.dragItem = "innerRight";
        state.dragging = true;
      }
    });
  
    canvas.addEventListener('mousemove', function(evt) {
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
      
      drawCanvas();
      updateMeasurements();
    });
  
    canvas.addEventListener('mouseup', function() {
      state.dragging = false;
      state.dragItem = null;
    });
  
    canvas.addEventListener('mouseleave', function() {
      state.dragging = false;
      state.dragItem = null;
    });
  
    // Handle window resize
    window.addEventListener('resize', function() {
      resizeCanvas();
      drawCanvas();
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
  });