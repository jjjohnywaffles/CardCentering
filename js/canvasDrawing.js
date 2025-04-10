/**
 * Initialize border positions on an image
 * @param {HTMLImageElement} cardImage - The card image
 * @param {Object} borders - The borders object to update
 */
function initializeBordersFromImage(cardImage, borders) {
    borders.outerTop = cardImage.height * CONSTANTS.DEFAULT_OUTER_TOP_RATIO;
    borders.outerBottom = cardImage.height * CONSTANTS.DEFAULT_OUTER_BOTTOM_RATIO;
    borders.outerLeft = cardImage.width * CONSTANTS.DEFAULT_OUTER_LEFT_RATIO;
    borders.outerRight = cardImage.width * CONSTANTS.DEFAULT_OUTER_RIGHT_RATIO;
    borders.innerTop = cardImage.height * CONSTANTS.DEFAULT_INNER_TOP_RATIO;
    borders.innerBottom = cardImage.height * CONSTANTS.DEFAULT_INNER_BOTTOM_RATIO;
    borders.innerLeft = cardImage.width * CONSTANTS.DEFAULT_INNER_LEFT_RATIO;
    borders.innerRight = cardImage.width * CONSTANTS.DEFAULT_INNER_RIGHT_RATIO;
  }
  
  /**
   * Draw the canvas with the current state
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context
   * @param {HTMLImageElement} cardImage - The card image
   * @param {Object} state - The application state
   */
  function drawCanvas(canvas, ctx, cardImage, state) {
    // Clear the canvas with dark background
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // If no image is loaded, exit early
    if (!cardImage.complete || cardImage.naturalWidth === 0) {
      return;
    }
    
    const { cardX, cardY, cardWidthScaled, cardHeightScaled } = getCardBox(cardImage, canvas, state.scale);
    const { borders } = state;
  
    // Draw the rotated image
    ctx.save();
    const centerX = cardX + cardWidthScaled/2;
    const centerY = cardY + cardHeightScaled/2;
    ctx.translate(centerX, centerY);
    ctx.rotate(state.rad);
    ctx.drawImage(cardImage,
      -cardImage.width * state.scale / 2,
      -cardImage.height * state.scale / 2,
      cardImage.width * state.scale,
      cardImage.height * state.scale);
    ctx.restore();
  
    // Draw the card border - make it more visible
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2c5282";
    ctx.strokeRect(cardX, cardY, cardWidthScaled, cardHeightScaled);
  
    // Draw outer borders with increased width
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#3182ce";
    
    // Horizontal outer borders
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + borders.outerTop * state.scale);
    ctx.lineTo(cardX + cardWidthScaled, cardY + borders.outerTop * state.scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + borders.outerBottom * state.scale);
    ctx.lineTo(cardX + cardWidthScaled, cardY + borders.outerBottom * state.scale);
    ctx.stroke();
    
    // Vertical outer borders
    ctx.beginPath();
    ctx.moveTo(cardX + borders.outerLeft * state.scale, cardY);
    ctx.lineTo(cardX + borders.outerLeft * state.scale, cardY + cardHeightScaled);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cardX + borders.outerRight * state.scale, cardY);
    ctx.lineTo(cardX + borders.outerRight * state.scale, cardY + cardHeightScaled);
    ctx.stroke();
  
    // Inner borders
    ctx.strokeStyle = "#ecc94b";
    
    // Horizontal inner borders
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + borders.innerTop * state.scale);
    ctx.lineTo(cardX + cardWidthScaled, cardY + borders.innerTop * state.scale);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cardX, cardY + borders.innerBottom * state.scale);
    ctx.lineTo(cardX + cardWidthScaled, cardY + borders.innerBottom * state.scale);
    ctx.stroke();
    
    // Vertical inner borders
    ctx.beginPath();
    ctx.moveTo(cardX + borders.innerLeft * state.scale, cardY);
    ctx.lineTo(cardX + borders.innerLeft * state.scale, cardY + cardHeightScaled);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(cardX + borders.innerRight * state.scale, cardY);
    ctx.lineTo(cardX + borders.innerRight * state.scale, cardY + cardHeightScaled);
    ctx.stroke();
  
    // Draw the draggable tabs
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#2c5282";
    ctx.lineWidth = 1;
    const tabSize = CONSTANTS.TAB_SIZE;
    
    // Top outer tab
    ctx.beginPath();
    ctx.rect(cardX + (cardImage.width/2 - tabSize/2 - 10) * state.scale, cardY + (borders.outerTop - tabSize/2) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Bottom outer tab
    ctx.beginPath();
    ctx.rect(cardX + (cardImage.width/2 - tabSize/2 - 10) * state.scale, cardY + (borders.outerBottom - tabSize/2) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Top inner tab
    ctx.beginPath();
    ctx.rect(cardX + (cardImage.width/2 - tabSize/2 + 10) * state.scale, cardY + (borders.innerTop - tabSize/2) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Bottom inner tab
    ctx.beginPath();
    ctx.rect(cardX + (cardImage.width/2 - tabSize/2 + 10) * state.scale, cardY + (borders.innerBottom - tabSize/2) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Left outer tab
    ctx.beginPath();
    ctx.rect(cardX + (borders.outerLeft - tabSize/2) * state.scale, cardY + (cardImage.height/2 - tabSize/2 - 10) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Right outer tab
    ctx.beginPath();
    ctx.rect(cardX + (borders.outerRight - tabSize/2) * state.scale, cardY + (cardImage.height/2 - tabSize/2 - 10) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Left inner tab
    ctx.beginPath();
    ctx.rect(cardX + (borders.innerLeft - tabSize/2) * state.scale, cardY + (cardImage.height/2 - tabSize/2 + 10) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
    
    // Right inner tab
    ctx.beginPath();
    ctx.rect(cardX + (borders.innerRight - tabSize/2) * state.scale, cardY + (cardImage.height/2 - tabSize/2 + 10) * state.scale, tabSize * state.scale, tabSize * state.scale);
    ctx.fill();
    ctx.stroke();
  
    // Calculate centering percentages
    const centeringPercentages = calculateCenteringPercentages(borders);
    const { verticalPercent, horizontalPercent } = centeringPercentages;
    
    // Update the info display
    document.getElementById('verticalInfo').textContent = 
      verticalPercent.toFixed(1) + "% top / " + (100 - verticalPercent).toFixed(1) + "% bottom";
    document.getElementById('horizontalInfo').textContent = 
      horizontalPercent.toFixed(1) + "% left / " + (100 - horizontalPercent).toFixed(1) + "% right";
    
    // Calculate and display grades
    const grades = calculateGrades(verticalPercent, horizontalPercent);
    
    // Update PSA grade
    const psaGradeElement = document.getElementById('psaGrade');
    psaGradeElement.textContent = grades.psa.text;
    psaGradeElement.className = "grade-value " + grades.psa.class;
    
    // Update BGS grade
    const bgsGradeElement = document.getElementById('bgsGrade');
    bgsGradeElement.textContent = grades.bgs.text;
    bgsGradeElement.className = "grade-value " + grades.bgs.class;
  }