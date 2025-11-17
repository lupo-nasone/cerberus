import type { ReactNode } from 'react';

export default function ServiceCard({ title, desc, icon, image }: { title: string; desc: string; icon?: ReactNode; image?: string }) {
  return (
    <article className="service-card">
      {/* If image provided, use it as a visual cover with a dark overlay and title on top */}
      {image ? (
        <div className="service-media" style={{ backgroundImage: `url(${image})` }}>
          <div className="overlay">
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        </div>
      ) : (
        <div className="content">
          <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
            <div className="icon">{icon ?? '✓'}</div>
            <div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* keep a small content area when image exists to host actions later */}
      {image && (
        <div className="content">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{color:'var(--muted)'}}>{/* optional small text */}</div>
            <a href="/contatti" className="btn btn-primary">Scopri</a>
          </div>
        </div>
      )}
    </article>
  );
}
