// Constants used throughout the application
const CONSTANTS = {
    // Canvas and rendering constants
    TOLERANCE: 20, // hit tolerance (in natural card coordinates)
    TAB_SIZE: 15,  // size of draggable tab
  
    // Default border positions (will be calculated based on image dimensions)
    DEFAULT_OUTER_TOP_RATIO: 0.05,
    DEFAULT_OUTER_BOTTOM_RATIO: 0.95,
    DEFAULT_OUTER_LEFT_RATIO: 0.05,
    DEFAULT_OUTER_RIGHT_RATIO: 0.95,
    DEFAULT_INNER_TOP_RATIO: 0.15,
    DEFAULT_INNER_BOTTOM_RATIO: 0.85,
    DEFAULT_INNER_LEFT_RATIO: 0.15,
    DEFAULT_INNER_RIGHT_RATIO: 0.85,
  
    // Grading thresholds
    PSA_THRESHOLDS: {
      GEM_MINT: 5,  // 55/45 or better (5% deviation from center)
      MINT: 10,     // 60/40 or better (10% deviation from center)
      NM_MT: 15,    // 65/35 or better (15% deviation from center)
      NEAR_MINT: 20 // 70/30 or better (20% deviation from center)
    },
    
    BGS_THRESHOLDS: {
      PRISTINE: 2.5,  // 50/50 both axes (2.5% deviation from center)
      GEM_MINT: 5,    // 55/45 or better (5% deviation from center)
      MINT: 10,       // 60/40 to 65/35 (10% deviation from center)
      NM_MT_PLUS: 15, // 65/35 to 70/30 (15% deviation from center)
      NM_MT: 20       // 70/30 to 75/25 (20% deviation from center)
    }
  };