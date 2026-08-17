import GearSVG from './GearSVG';
import './gearStyles.css';

// Decorative mechanical gear assembly for the hero's empty right illustration
// space. Purely presentational: rotation is CSS-only (see gearStyles.css),
// no JS drives the gears, and the wrapper never intercepts pointer events.
export default function GearAssembly() {
  return (
    <div className="iis-gear-wrapper" aria-hidden="true">
      <GearSVG
        variant="bg"
        spin="iis-spin-ccw"
        size="21rem"
        style={{ position: 'absolute', inset: 0, margin: 'auto', zIndex: 0 }}
        cutout={14}
      />
      <div className="iis-gear-stack">
        <GearSVG
          variant="l"
          spin="iis-spin-cw"
          size="8rem"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
          cutout={12}
        />
        <GearSVG
          variant="m"
          spin="iis-spin-ccw"
          size="6rem"
          style={{ position: 'absolute', top: '-1rem', right: '-1rem', zIndex: 10 }}
          cutout={10}
        />
        <GearSVG
          variant="s"
          spin="iis-spin-ccw"
          size="5rem"
          style={{ position: 'absolute', bottom: '-0.5rem', right: '-0.5rem', zIndex: 10 }}
          cutout={9}
        />
        <GearSVG
          variant="xs"
          spin="iis-spin-ccw"
          size="4rem"
          style={{ position: 'absolute', top: '-0.5rem', left: '-0.5rem', zIndex: 10 }}
          cutout={8}
        />
      </div>
    </div>
  );
}
