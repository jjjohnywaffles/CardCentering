# Card Centering Tool

A web-based tool for measuring the centering of trading cards to assess potential center grading scores from major grading companies.

## Overview

The Card Centering Tool allows collectors and card enthusiasts to upload images of their trading cards and measure the centering with precision. The tool overlays adjustable border lines on the card image, calculates centering percentages, and provides potential grading assessments based on industry standards.

## Features

- **Image Upload**: Upload card images via file selection, drag-and-drop, or clipboard paste (Ctrl+V)
- **Adjustable Borders**: Manually position inner and outer border lines to match card edges and design borders
- **Real-time Measurements**: Instantly view centering percentages for both vertical and horizontal axes
- **Grading Assessment**: See potential centering grades from PSA, BGS, CGC, and TAG
- **Rotation Control**: Slightly rotate the image to correct alignment issues

## How to Use

1. **Upload Your Card**: Click the "Upload Card Image" button, drag and drop an image onto the canvas, or use Ctrl+V to paste from clipboard
2. **Adjust Borders**: 
   - Drag the blue outer border lines to match the edges of the card
   - Drag the yellow inner border lines to match the design edges (print area)
3. **View Measurements**: See your centering percentages update in real-time below the image
4. **Check Grading Assessments**: Review potential grading scores based on the measured centering
5. **Fine-tune with Zoom**: Use zoom controls or mouse wheel to zoom in for more precise adjustments
6. **Correct Alignment**: Use the rotation slider if your card image is slightly rotated

## Grading Reference

The tool includes centering requirements for major grading companies:

- **PSA** (Professional Sports Authenticator)
- **BGS** (Beckett Grading Services)
- **CGC** (Certified Guaranty Company)
- **TAG** (Trading Card Authentication & Grading)

Click on each company's tab to view their specific centering requirements.

## Technical Details

The Card Centering Tool is built with vanilla JavaScript, HTML5 Canvas, and CSS. It runs entirely in the browser with no server dependencies.

### Project Structure
```
card-centering-tool/
│
├── index.html        # Main HTML file
├── styles.css        # CSS styles
├── js/               # JavaScript files directory
│   ├── app.js               # Main application logic
│   ├── borderHandler.js     # Manages border positioning and dragging functionality
│   ├── canvasDrawing.js     # Controls canvas rendering and drawing operations
│   ├── gradingCalculator.js # Calculates centering percentages and grading assessments
│   ├── utils.js             # Utility functions for coordinate calculations and transformations
│   └── constants.js         # Defines application constants and configuration values
│  
└── img/              # Images directory
    ├── psa-logo-dark.png
    ├── bgs-logo-dark.png
    ├── cgc-logo-dark.png
    └── tag-logo-dark.png
```
### Browser Compatibility

The tool works best in modern browsers:
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Installation

1. Clone the repository or download the ZIP file
2. Extract files to your desired location
3. Open `index.html` in your web browser, or
4. Serve the files using a simple web server for best results

No dependencies or build process required.

## Future Improvements

- Save measurements and card images
- Support for batch processing multiple cards
- Additional grading company standards
- Automatic border detection using computer vision

## License

This project is available under the MIT License. See the LICENSE file for details.

## Acknowledgements

Created by [Your Name] for the card collecting community.