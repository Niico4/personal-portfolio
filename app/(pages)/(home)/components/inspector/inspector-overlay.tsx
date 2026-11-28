import s from './inspector.module.css';

export function InspectorOverlay() {
  return (
    <div className={s.overlay} aria-hidden="true">
      <span className={s.axisX} />
      <span className={s.axisY} />
      <span className={s.selection} />
      <span className={s.offset}>Δy 1 px</span>
      <span className={s.confirmation} lang="en">
        Now it looks fine.
      </span>
    </div>
  );
}
