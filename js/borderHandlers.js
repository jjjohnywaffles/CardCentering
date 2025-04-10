/**
 * Get the rectangle for a draggable tab
 * @param {String} border - The border name
 * @param {Object} borders - All border positions
 * @param {HTMLImageElement} cardImage - The card image
 * @returns {Object} - Tab rectangle {x, y, width, height}
 */
function getTabRect(border, borders, cardImage) {
    const { outerTop, outerBottom, outerLeft, outerRight, innerTop, innerBottom, innerLeft, innerRight } = borders;
    const tabSize = CONSTANTS.TAB_SIZE;
    
    switch(border) {
      case "outerTop":
        return { x: cardImage.width/2 - tabSize/2 - 10, y: outerTop - tabSize/2, width: tabSize, height: tabSize };
      case "outerBottom":
        return { x: cardImage.width/2 - tabSize/2 - 10, y: outerBottom - tabSize/2, width: tabSize, height: tabSize };
      case "innerTop":
        return { x: cardImage.width/2 - tabSize/2 + 10, y: innerTop - tabSize/2, width: tabSize, height: tabSize };
      case "innerBottom":
        return { x: cardImage.width/2 - tabSize/2 + 10, y: innerBottom - tabSize/2, width: tabSize, height: tabSize };
      case "outerLeft":
        return { x: outerLeft - tabSize/2, y: cardImage.height/2 - tabSize/2 - 10, width: tabSize, height: tabSize };
      case "outerRight":
        return { x: outerRight - tabSize/2, y: cardImage.height/2 - tabSize/2 - 10, width: tabSize, height: tabSize };
      case "innerLeft":
        return { x: innerLeft - tabSize/2, y: cardImage.height/2 - tabSize/2 + 10, width: tabSize, height: tabSize };
      case "innerRight":
        return { x: innerRight - tabSize/2, y: cardImage.height/2 - tabSize/2 + 10, width: tabSize, height: tabSize };
      default:
        return null;
    }
  }
  
  /**
   * Handle mouse down on the canvas (start dragging)
   * @param {MouseEvent} evt - The mouse event
   * @param {Object} state - The application state
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {HTMLImageElement} cardImage - The card image
   */
  function handleMouseDown(evt, state, canvas, cardImage) {
    if (!cardImage.complete) return;
    
    const cardBox = getCardBox(cardImage, canvas, state.scale);
    const pos = getMousePosInCardCoords(evt, canvas, cardBox, state.scale);
    const tolerance = CONSTANTS.TOLERANCE;
    
    // Check if we're clicking on a border or tab
    if (Math.abs(pos.y - state.borders.outerTop) < tolerance || isInRect(pos, getTabRect("outerTop", state.borders, cardImage))) { 
      state.dragItem = "outerTop"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.y - state.borders.outerBottom) < tolerance || isInRect(pos, getTabRect("outerBottom", state.borders, cardImage))) { 
      state.dragItem = "outerBottom"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.outerLeft) < tolerance || isInRect(pos, getTabRect("outerLeft", state.borders, cardImage))) { 
      state.dragItem = "outerLeft"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.outerRight) < tolerance || isInRect(pos, getTabRect("outerRight", state.borders, cardImage))) { 
      state.dragItem = "outerRight"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.y - state.borders.innerTop) < tolerance || isInRect(pos, getTabRect("innerTop", state.borders, cardImage))) { 
      state.dragItem = "innerTop"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.y - state.borders.innerBottom) < tolerance || isInRect(pos, getTabRect("innerBottom", state.borders, cardImage))) { 
      state.dragItem = "innerBottom"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.innerLeft) < tolerance || isInRect(pos, getTabRect("innerLeft", state.borders, cardImage))) { 
      state.dragItem = "innerLeft"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.innerRight) < tolerance || isInRect(pos, getTabRect("innerRight", state.borders, cardImage))) { 
      state.dragItem = "innerRight"; 
      state.dragging = true; 
    }
  }
  
  /**
   * Handle mouse move on the canvas (drag borders)
   * @param {MouseEvent} evt - The mouse event 
   * @param {Object} state - The application state
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {HTMLImageElement} cardImage - The card image
   * @param {Function} drawCanvas - Function to redraw the canvas
   */
  function handleMouseMove(evt, state, canvas, cardImage, drawCanvas) {
    if (!state.dragging) return;
    
    const cardBox = getCardBox(cardImage, canvas, state.scale);
    const pos = getMousePosInCardCoords(evt, canvas, cardBox, state.scale);
    
    // Update only the border that's being dragged
    switch(state.dragItem) {
      case "outerTop": 
        state.borders.outerTop = Math.min(pos.y, state.borders.innerTop); 
        break;
      case "innerTop": 
        state.borders.innerTop = Math.min(Math.max(pos.y, state.borders.outerTop), state.borders.innerBottom); 
        break;
      case "innerBottom": 
        state.borders.innerBottom = Math.max(Math.min(pos.y, state.borders.outerBottom), state.borders.innerTop); 
        break;
      case "outerBottom": 
        state.borders.outerBottom = Math.max(pos.y, state.borders.innerBottom); 
        break;
      case "outerLeft": 
        state.borders.outerLeft = Math.min(pos.x, state.borders.innerLeft); 
        break;
      case "innerLeft": 
        state.borders.innerLeft = Math.min(Math.max(pos.x, state.borders.outerLeft), state.borders.innerRight); 
        break;
      case "innerRight": 
        state.borders.innerRight = Math.max(Math.min(pos.x, state.borders.outerRight), state.borders.innerLeft); 
        break;
      case "outerRight": 
        state.borders.outerRight = Math.max(pos.x, state.borders.innerRight); 
        break;
    }
    
    drawCanvas();
  }
  
  /**
   * Handle touch start on the canvas (start dragging on mobile)
   * @param {TouchEvent} evt - The touch event
   * @param {Object} state - The application state
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {HTMLImageElement} cardImage - The card image
   */
  function handleTouchStart(evt, state, canvas, cardImage) {
    evt.preventDefault();
    if (!cardImage.complete) return;
    
    const cardBox = getCardBox(cardImage, canvas, state.scale);
    const pos = getTouchPosInCardCoords(evt, canvas, cardBox, state.scale);
    const tolerance = CONSTANTS.TOLERANCE;
    
    // Same checks as mouseDown
    if (Math.abs(pos.y - state.borders.outerTop) < tolerance || isInRect(pos, getTabRect("outerTop", state.borders, cardImage))) { 
      state.dragItem = "outerTop"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.y - state.borders.outerBottom) < tolerance || isInRect(pos, getTabRect("outerBottom", state.borders, cardImage))) { 
      state.dragItem = "outerBottom"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.outerLeft) < tolerance || isInRect(pos, getTabRect("outerLeft", state.borders, cardImage))) { 
      state.dragItem = "outerLeft"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.outerRight) < tolerance || isInRect(pos, getTabRect("outerRight", state.borders, cardImage))) { 
      state.dragItem = "outerRight"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.y - state.borders.innerTop) < tolerance || isInRect(pos, getTabRect("innerTop", state.borders, cardImage))) { 
      state.dragItem = "innerTop"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.y - state.borders.innerBottom) < tolerance || isInRect(pos, getTabRect("innerBottom", state.borders, cardImage))) { 
      state.dragItem = "innerBottom"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.innerLeft) < tolerance || isInRect(pos, getTabRect("innerLeft", state.borders, cardImage))) { 
      state.dragItem = "innerLeft"; 
      state.dragging = true; 
    }
    else if (Math.abs(pos.x - state.borders.innerRight) < tolerance || isInRect(pos, getTabRect("innerRight", state.borders, cardImage))) { 
      state.dragItem = "innerRight"; 
      state.dragging = true; 
    }
  }
  
  /**
   * Handle touch move on the canvas (drag borders on mobile)
   * @param {TouchEvent} evt - The touch event
   * @param {Object} state - The application state
   * @param {HTMLCanvasElement} canvas - The canvas element
   * @param {HTMLImageElement} cardImage - The card image
   * @param {Function} drawCanvas - Function to redraw the canvas
   */
  function handleTouchMove(evt, state, canvas, cardImage, drawCanvas) {
    evt.preventDefault();
    if (!state.dragging) return;
    
    const cardBox = getCardBox(cardImage, canvas, state.scale);
    const pos = getTouchPosInCardCoords(evt, canvas, cardBox, state.scale);
    
    // Same updates as mouseMove
    switch(state.dragItem) {
      case "outerTop": 
        state.borders.outerTop = Math.min(pos.y, state.borders.innerTop); 
        break;
      case "innerTop": 
        state.borders.innerTop = Math.min(Math.max(pos.y, state.borders.outerTop), state.borders.innerBottom); 
        break;
      case "innerBottom": 
        state.borders.innerBottom = Math.max(Math.min(pos.y, state.borders.outerBottom), state.borders.innerTop); 
        break;
      case "outerBottom": 
        state.borders.outerBottom = Math.max(pos.y, state.borders.innerBottom); 
        break;
      case "outerLeft": 
        state.borders.outerLeft = Math.min(pos.x, state.borders.innerLeft); 
        break;
      case "innerLeft": 
        state.borders.innerLeft = Math.min(Math.max(pos.x, state.borders.outerLeft), state.borders.innerRight); 
        break;
      case "innerRight": 
        state.borders.innerRight = Math.max(Math.min(pos.x, state.borders.outerRight), state.borders.innerLeft); 
        break;
      case "outerRight": 
        state.borders.outerRight = Math.max(pos.x, state.borders.innerRight); 
        break;
    }
    
    drawCanvas();
  }