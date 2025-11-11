"use client";

import { useEffect, useRef } from "react";

export default function MapClient({ lat = 43.8703889, lng = 11.1181111, zoom = 15 }: { lat?: number; lng?: number; zoom?: number }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    // Ensure Leaflet CSS is loaded
    if (!document.querySelector('link[data-leaflet]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.setAttribute('data-leaflet', '1');
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS if not present
    function loadScript(src: string) {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).L) return resolve();
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject());
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject();
        document.body.appendChild(s);
      });
    }

    (async () => {
      try {
        await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');
        if (!mounted) return;
        const L = (window as any).L;
        leafletRef.current = L;

        // tile providers
        const LIGHT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const DARK = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

        const map = L.map(mapRef.current, { zoomControl: true }).setView([lat, lng], zoom);

        let currentLayer: any = null;
        function setLayer(theme: string) {
          const url = theme === 'dark' ? DARK : LIGHT;
          if (currentLayer) map.removeLayer(currentLayer);
          currentLayer = L.tileLayer(url, { maxZoom: 19 }).addTo(map);
        }

        // initial theme
        const docTheme = document.documentElement.getAttribute('data-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        setLayer(docTheme);

        const marker = L.marker([lat, lng]).addTo(map).bindPopup('Cerberus - Sede');

        // observe theme changes by watching attribute on documentElement
        const obs = new MutationObserver(() => {
          const t = document.documentElement.getAttribute('data-theme') || 'light';
          setLayer(t);
        });
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        // store map and cleanup
        (map as any)._cerberusCleanup = () => {
          obs.disconnect();
          map.remove();
        };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load Leaflet', err);
      }
    })();

    return () => {
      mounted = false;
      try {
        const L = leafletRef.current;
        if (mapRef.current) {
          // try to call cleanup if available
          const mapInstance = (mapRef.current as any)._leaflet_map || null;
          if (mapInstance && (mapInstance as any)._cerberusCleanup) (mapInstance as any)._cerberusCleanup();
        }
      } catch (e) {
        // ignore
      }
    };
  }, [lat, lng, zoom]);

  return <div ref={mapRef} style={{ width: '100%', height: 320, borderRadius: 8, overflow: 'hidden' }} />;
}
