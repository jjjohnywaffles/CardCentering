// Utility functions

/**
 * Calculates the card's bounding box based on the current scale
 * @param {HTMLImageElement} cardImage - The card image
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {Number} scale - The current scale factor
 * @returns {Object} - Card box dimensions and position
 */
function getCardBox(cardImage, canvas, scale) {
    // Calculate scaled dimensions
    const cardWidthScaled = cardImage.width * scale;
    const cardHeightScaled = cardImage.height * scale;
    
    // Center the card in the canvas
    const cardX = (canvas.width - cardWidthScaled) / 2;
    const cardY = (canvas.height - cardHeightScaled) / 2;
    
    return { cardX, cardY, cardWidthScaled, cardHeightScaled };
  }
  
  /**
   * Checks if a point is inside a rectangle
   * @param {Object} pos - The point position {x, y}
   * @param {Object} rect - The rectangle {x, y, width, height}
   * @returns {Boolean} - True if point is in rectangle
   */
  function isInRect(pos, rect) {
    return pos.x >= rect.x && pos.x <= rect.x + rect.width &&
           pos.y >= rect.y && pos.y <= rect.y + rect.height;
  }
  
  /**
   * Gets canvas coordinates from a mouse event
   * @param {MouseEvent} evt - The mouse event
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @returns {Object} - {x, y} coordinates relative to canvas
   */
  function getCanvasCoords(evt, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY
    };
  }
  
  /**
   * Gets mouse position in card coordinates (accounting for scale)
   * @param {MouseEvent} evt - The mouse event
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {Object} cardBox - The card box information
   * @param {Number} scale - The current scale factor
   * @returns {Object} - {x, y} coordinates relative to the card
   */
  function getMousePosInCardCoords(evt, canvas, cardBox, scale) {
    const pos = getCanvasCoords(evt, canvas);
    return { 
      x: (pos.x - cardBox.cardX) / scale, 
      y: (pos.y - cardBox.cardY) / scale 
    };
  }
  
  /**
   * Gets touch position in card coordinates
   * @param {TouchEvent} evt - The touch event
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {Object} cardBox - The card box information
   * @param {Number} scale - The current scale factor
   * @returns {Object} - {x, y} coordinates relative to the card
   */
  function getTouchPosInCardCoords(evt, canvas, cardBox, scale) {
    evt.preventDefault();
    const touch = evt.touches[0] || evt.changedTouches[0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const pos = {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    };
    return { 
      x: (pos.x - cardBox.cardX) / scale,
      y: (pos.y - cardBox.cardY) / scale 
    };
  }