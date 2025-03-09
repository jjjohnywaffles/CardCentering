# Card Centering Tool
## by Jonathan Hu

## Overview
The Card Centering Tool is a web-based application designed to help you measure the centering of card images (e.g., trading cards, sports cards, etc.). It provides an interface to upload your card image and adjust measurement borders interactively. The tool includes:

- **Image Upload Options:** Upload by clicking the browse button, drag and drop, or paste an image from your clipboard.
- **Rotation Control:** A rotation slider (with 0.5° increments) lets you slightly rotate the image (from -15° to +15°) for optimal alignment, specifically if the image is slightly tilted.
- **Draggable Measurement Borders:** Eight movable borders:
  - **Outer Borders (Blue):** Represent the card’s outer measurement edges.
  - **Inner Borders (Neon Yellow):** Represent the card’s inner measurement edges.
- **Real-Time Centering Calculations:** Calculates and displays vertical and horizontal centering percentages based on the positions of the borders.
- **Mobile and Touch Support:** Works with both mouse and touch events.

## Features
- **Flexible Image Upload:**  
  - **Browse:** Click the file input button to select an image.
  - **Drag and Drop:** Drag your image file into the designated area.
  - **Paste:** Copy an image and paste it directly, e.g. through clipping tool.
- **Precise Rotation:**  
  - Adjust the image rotation using the slider.  
  - The slider rotates the image in 0.5° increments within a -15° to +15° range.
- **Interactive Draggable Borders:**  
  - Adjust the outer (blue) and inner (neon yellow) measurement lines by dragging.  
  - Draggable tabs with offsets make it easy to grab and move the borders.
- **Dynamic Centering Calculation:**  
  - The tool automatically calculates and displays the centering percentages below the image.

## How to Use
1. **Upload an Image:**  
   - Use the browse button, drag and drop an image into the canvas area, or paste an image from your clipboard.
   - The instructional overlay will disappear once an image is loaded.
2. **Adjust Rotation:**  
   - Use the rotation slider (fixed at a constant size) to rotate the image in 0.5° increments.
   - The current rotation value is displayed to the left of the slider.
3. **Measure Card Centering:**  
   - Drag the outer (blue) and inner (neon yellow) borders to align with the card's edges.
   - The centering percentages (vertical and horizontal) are updated in real time and displayed below the image.
4. **Mobile Interaction:**  
   - The tool supports touch events for easy use on mobile devices.


## Dependencies
This project is built using plain HTML, CSS, and JavaScript. It uses Google Fonts for enhanced typography, but no other external JavaScript libraries are required.

## License
This project is open-source. Feel free to modify.

## Contributing
Contributions and suggestions are welcome! Please submit issues or pull requests on GitHub.

---

Enjoy using the Card Centering Tool, and I hope it helps you in your card grading adventure!

