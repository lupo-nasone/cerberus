import type { ReactNode } from 'react';

type ServiceCardProps = {
  title: string;
  desc: string;
  icon?: ReactNode;
  image?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function ServiceCard({ title, desc, icon, image, ctaLabel, ctaHref = "/contatti" }: ServiceCardProps) {
  return (
    <article className="service-card">
      {/* If image provided, use it as a visual cover with a dark overlay and title on top */}
      {image ? (
        <>
          <div className="service-media" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay">
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
          {ctaLabel && (
            <div className="service-card-footer">
              <a href={ctaHref} className="service-card-link">
                {ctaLabel}
              </a>
            </div>
          )}
        </>
      ) : (
        <div className="content">
          <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
            <div className="icon">{icon ?? '✓'}</div>
            <div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
          {ctaLabel && (
            <div className="service-card-footer">
              <a href={ctaHref} className="service-card-link">
                {ctaLabel}
              </a>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
