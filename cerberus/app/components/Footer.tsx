export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container foot-wrap">
        <div>
          <div style={{fontWeight:700,fontSize:18}}>Cerberus</div>
          <p>Soluzioni per la conformità e la sicurezza aziendale.</p>
        </div>

        <div>
          <h5 style={{margin:0,fontWeight:600}}>Links</h5>
          <ul style={{marginTop:8,color:'var(--muted)'}}>
            <li>Servizi</li>
            <li>Blog</li>
            <li>Contatti</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
