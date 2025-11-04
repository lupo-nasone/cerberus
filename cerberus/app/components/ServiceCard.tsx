import type { ReactNode } from 'react';

export default function ServiceCard({ title, desc, icon, image }: { title: string; desc: string; icon?: ReactNode; image?: string }) {
  return (
    <article className="service-card">
      {/* optional image slot: if `image` is provided it will be used as a cover */}
      {image ? <div className="service-media" style={{ backgroundImage: `url(${image})` }} /> : null}

      <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
        <div className="icon">{icon ?? '✓'}</div>
        <div>
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>
    </article>
  );
}
