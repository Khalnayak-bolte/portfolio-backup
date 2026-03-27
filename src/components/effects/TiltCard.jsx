/* TiltCard — simplified to a plain passthrough wrapper.
   The 3D tilt effect is already handled by CardFX using
   useMotionValue which is lighter and doesn't need a library. */

export default function TiltCard({ children }) {
  return (
    <div className="h-full">
      {children}
    </div>
  );
}
