import type { ReactNode } from 'react';

export default function ServiceCard({ title, desc, icon }: { title: string; desc: string; icon?: ReactNode }) {
  return (
    <article className="service-card">
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
