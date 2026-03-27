/* ============================================================
   VARIANTS.JS — Central animation library
   ============================================================ */

/* ---------- FADE UP (existing, refined) ---------- */
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- FADE DOWN ---------- */
export const fadeDown = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- FADE LEFT (slide in from left) ---------- */
export const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- FADE RIGHT (slide in from right) ---------- */
export const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- ZOOM IN ---------- */
export const zoomIn = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ---------- ZOOM OUT (starts big, shrinks in) ---------- */
export const zoomOut = {
  hidden: { opacity: 0, scale: 1.25 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- FLIP IN (Y axis) ---------- */
export const flipIn = {
  hidden: { opacity: 0, rotateY: 90, transformPerspective: 800 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- FLIP IN (X axis) ---------- */
export const flipInX = {
  hidden: { opacity: 0, rotateX: 90, transformPerspective: 800 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- BOUNCE IN ---------- */
export const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
};

/* ---------- ELASTIC POP ---------- */
export const elasticPop = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 12,
    },
  },
};

/* ---------- ROTATE IN ---------- */
export const rotateIn = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
  },
};

/* ---------- SKEW IN ---------- */
export const skewIn = {
  hidden: { opacity: 0, skewX: -15, x: -40 },
  visible: {
    opacity: 1,
    skewX: 0,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- BLUR IN ---------- */
export const blurIn = {
  hidden: { opacity: 0, filter: "blur(20px)", scale: 1.05 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- SLIDE UP FADE (subtle, for text lines) ---------- */
export const slideUpFade = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- STAGGER CONTAINER (existing, refined) ---------- */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

/* ---------- FAST STAGGER (for skill tags, small items) ---------- */
export const fastStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/* ---------- SLOW STAGGER (for large sections) ---------- */
export const slowStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

/* ---------- NAV ITEM (existing, refined) ---------- */
export const navItem = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300 },
  },
};

/* ---------- SECTION PARALLAX (existing, refined) ---------- */
export const sectionParallax = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ---------- FLOAT (infinite hover animation) ---------- */
export const float = {
  animate: {
    y: [0, -16, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ---------- PULSE GLOW (infinite scale pulse) ---------- */
export const pulseGlow = {
  animate: {
    scale: [1, 1.08, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/* ---------- SPIN (infinite rotation) ---------- */
export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/* ---------- WIGGLE (attention grabber) ---------- */
export const wiggle = {
  animate: {
    rotate: [0, -8, 8, -5, 5, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

/* ---------- TYPEWRITER STAGGER (for letter-by-letter) ---------- */
export const typewriterContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const typewriterChar = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* ---------- COUNTER (number count up helper) ---------- */
export const counterReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------- CARD HOVER (reusable whileHover for cards) ---------- */
export const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0px 4px 20px rgba(0,0,0,0.08)" },
  hover: {
    scale: 1.03,
    y: -8,
    boxShadow: "0px 20px 60px rgba(99,102,241,0.25)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

/* ---------- BUTTON HOVER ---------- */
export const buttonHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.07,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.94 },
};

/* ---------- DRAW LINE (for SVG strokes) ---------- */
export const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};
