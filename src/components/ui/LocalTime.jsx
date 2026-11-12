import { useEffect, useState } from 'react';

const fmt = (tz) =>
  new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', weekday: 'short' });

/** Mon–Fri, 9:00–18:00 local time */
const isOpen = (tz) => {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, weekday: 'short', hour: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const day = parts.find((p) => p.type === 'weekday')?.value;
  const hour = Number(parts.find((p) => p.type === 'hour')?.value);
  return !['Sat', 'Sun'].includes(day) && hour >= 9 && hour < 18;
};

/**
 * Live local time for an office. Renders nothing on the server / first paint
 * (avoids hydration mismatch), then updates every 30 seconds.
 */
export default function LocalTime({ tz }) {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  if (!now) return <span className="local-time" aria-hidden="true">&nbsp;</span>;
  const open = isOpen(tz);
  return (
    <span className="local-time">
      <span className={`local-time__dot ${open ? 'is-open' : ''}`} aria-hidden="true" />
      {fmt(tz).format(now)} · {open ? 'Office open' : 'Out of hours'}
    </span>
  );
}
