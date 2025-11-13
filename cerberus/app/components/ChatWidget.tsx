"use client";

import { useEffect, useRef, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ from: 'bot'|'user', text: string }>>([
    { from: 'bot', text: "Ciao! Sono l'assistente di Cerberus — piacere di conoscerti! Come ti chiami?" },
  ]);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0); // 0:name,1:email,2:problem,3:done
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(open) scrollToBottom();
  }, [messages, open]);

  function scrollToBottom(){
    try{ messagesEndRef.current?.scrollIntoView({behavior:'smooth'}); }catch(e){}
  }

  function pushUser(text: string){
    setMessages(m => [...m, { from: 'user', text }]);
  }

  function pushBot(text: string){
    // slight delay to simulate thinking/typing
    const botDelay = 700; // milliseconds
    setTimeout(()=> setMessages(m => [...m, { from: 'bot', text }]), botDelay);
  }

  function isValidEmail(email: string){
    // simple check: contains @ and a dot after @, not at the edges
    const at = email.indexOf('@');
    if(at <= 0) return false;
    const dot = email.indexOf('.', at + 2);
    if(dot <= at + 1) return false;
    if(dot === email.length - 1) return false;
    return true;
  }

  function handleSend(e?: any){
    e?.preventDefault();
    const value = input.trim();
    if(!value) return;
    pushUser(value);
    setInput('');
    if(step === 0){
      // received name
      setUserName(value);
      pushBot(`Ottimo, ${value}! Posso avere la tua email così possiamo ricontattarti?`);
      setStep(1);
    } else if(step === 1){
      // validate email
      if(!isValidEmail(value)){
        pushBot('Non sembra una email valida — puoi ricontrollarla e reinserirla, per favore?');
        // stay on same step
        return;
      }
      setUserEmail(value);
      pushBot(`${userName ? userName + ',' : ''} grazie! Puoi descrivere brevemente il problema o la richiesta?`);
      setStep(2);
    } else if(step === 2){
      // problem description received
      pushBot(`${userName ? userName + ',' : ''} ho preso nota. Vuoi che invii la richiesta adesso in modo che ti rispondiamo via email?`);
      setStep(3);
    } else if(step === 3){
      pushBot(`${userName ? userName + '! ' : ''}Perfetto — ho inviato la richiesta. Ti risponderemo via email il prima possibile.`);
      setStep(4);
      // longer delay before auto-close to let user read confirmation
      setTimeout(()=> setOpen(false), 3500);
    }
  }

  return (
    <div className="chat-widget" aria-live="polite">
      <div className={`chat-window ${open ? 'open' : ''}`} role="dialog" aria-label="Chat di supporto Cerberus">
        <div className="chat-header">
          <div>
            <strong>Cerberus Chat</strong>
            <div className="chat-sub">Ti aiutiamo con la conformità</div>
          </div>
          <button className="chat-close" onClick={()=> setOpen(false)} aria-label="Chiudi chat">✕</button>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message ${m.from}`}>
              <div className="chat-bubble">{m.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {step === 3 ? (
          <div className="chat-input-row" style={{display:'flex',gap:8,padding:8,background:'var(--surface)'}}>
            <button
              type="button"
              className="chat-send"
              onClick={() => {
                // user confirms sending
                pushUser('Sì');
                pushBot(`${userName ? userName + '! ' : ''}Perfetto — ho inviato la richiesta. Ti risponderemo via email il prima possibile.`);
                setStep(4);
                setTimeout(()=> setOpen(false), 3500);
              }}
              style={{flex:1,background:'var(--brand-700)',color:'var(--btn-text)',borderRadius:8,border:0,padding:'10px'}}
            >Sì, invia</button>

            <button
              type="button"
              className="chat-send"
              onClick={() => {
                // user wants to edit
                pushUser('No');
                pushBot('Va bene — dimmi pure cosa vuoi modificare.');
                setStep(2); // go back to problem description
              }}
              style={{flex:1,background:'transparent',color:'var(--fg)',borderRadius:8,border:'1px solid var(--card-border)',padding:'10px'}}
            >No, modifica</button>
          </div>
        ) : (
          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              aria-label="Messaggio"
              value={input}
              onChange={e=> setInput(e.target.value)}
              placeholder={ step < 3 ? (step === 0 ? 'Inserisci il tuo nome...' : step === 1 ? 'Inserisci la tua email...' : 'Descrivi il tuo problema...') : 'Invia per confermare' }
            />
            <button type="submit" className="chat-send">➤</button>
          </form>
        )}
      </div>

      <button className="chat-toggle" onClick={()=> setOpen(o=>!o)} aria-label="Apri chat">
        <span className="chat-toggle-icon">💬</span>
      </button>
    </div>
  );
}
