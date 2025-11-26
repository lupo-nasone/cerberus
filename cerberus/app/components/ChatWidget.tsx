"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "../lib/LanguageProvider";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { t, lang } = useLocale();
  const [messages, setMessages] = useState<Array<{ from: 'bot'|'user', text: string, key?: string, repl?: Record<string,string> }>>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userProblem, setUserProblem] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0); // 0:name,1:email,2:problem,3:done
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(open) scrollToBottom();
  }, [messages, open]);

  // keep chat scrolled when virtual viewport (keyboard) appears on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const vv = (window as any).visualViewport;
    if (!vv) return;
    const onResize = () => {
      // small delay to let viewport settle
      setTimeout(() => scrollToBottom(), 50);
    };
    vv.addEventListener('resize', onResize);
    return () => vv.removeEventListener('resize', onResize);
  }, []);

  // push initial greeting when component mounts
  useEffect(() => {
    if(messages.length === 0){
      pushBotKey('chat.greeting');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when language changes, re-translate bot messages that were stored with a key
  useEffect(() => {
    setMessages(prev => prev.map(m => {
      if(m.from === 'bot' && m.key){
        return { ...m, text: `${m.repl?.name ? m.repl.name + (m.repl?.suffix ?? ', ') : ''}${String(t(m.key))}` };
      }
      return m;
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  function scrollToBottom(){
    try{ messagesEndRef.current?.scrollIntoView({behavior:'smooth'}); }catch(e){}
  }

  function pushUser(text: string){
    setMessages(m => [...m, { from: 'user', text }]);
  }

  function pushBotText(text: string){
    // slight delay to simulate thinking/typing
    const botDelay = 700; // milliseconds
    setTimeout(()=> setMessages(m => [...m, { from: 'bot', text }]), botDelay);
  }

  function pushBotKey(key: string, repl?: Record<string,string>){
    const botDelay = 700;
    const text = `${repl?.name ? repl.name + (repl.suffix ?? ', ') : ''}${String(t(key))}`;
    setTimeout(()=> setMessages(m => [...m, { from: 'bot', text, key, repl }]), botDelay);
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
      // greet by name then ask for email (store key so it re-translates)
      pushBotText(`${value}!`);
      pushBotKey('chat.askEmail');
      setStep(1);
    } else if(step === 1){
      // validate email
      if(!isValidEmail(value)){
        pushBotKey('chat.invalidEmail');
        // stay on same step
        return;
      }
      setUserEmail(value);
      pushBotKey('chat.askProblem', { name: userName ?? '' });
      setStep(2);
    } else if(step === 2){
      // problem description received
      setUserProblem(value);
      pushBotKey('chat.confirmSend', { name: userName ?? '' });
      setStep(3);
    } else if(step === 3){
      submitRequest();
    }
  }

  async function submitRequest(){
    if(sending) return;
    if(!userName || !userEmail || !userProblem){
      pushBotKey('chat.errorMissing');
      return;
    }
    setSending(true);
    pushBotKey('chat.sending');
    try{
      const response = await fetch('/api/contact',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ name:userName, email:userEmail, message:userProblem })
      });
      if(!response.ok){
        throw new Error('Request failed');
      }
      pushBotKey('chat.sent', { name: userName ?? '' });
      setStep(4);
      setTimeout(()=> setOpen(false), 3500);
    }catch(error){
      console.error('Chat submit error', error);
      pushBotKey('chat.errorSending');
      setStep(3);
    }finally{
      setSending(false);
    }
  }

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`} aria-live="polite">
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
                pushUser(t('chat.yes'));
                submitRequest();
              }}
              style={{flex:1,background:'var(--brand-700)',color:'var(--btn-text)',borderRadius:8,border:0,padding:'10px',opacity:sending?0.7:1}}
              disabled={sending}
              >{sending ? t('chat.sendingButton') : t('chat.yes')}</button>

            <button
              type="button"
              className="chat-send"
              onClick={() => {
                // user wants to edit
                pushUser(t('chat.no'));
                pushBotKey('chat.editPrompt');
                setUserProblem(null);
                setStep(2); // go back to problem description
              }}
              style={{flex:1,background:'transparent',color:'var(--fg)',borderRadius:8,border:'1px solid var(--card-border)',padding:'10px',opacity:sending?0.5:1}}
              disabled={sending}
            >{t('chat.no')}</button>
          </div>
        ) : (
          <form className="chat-input-row" onSubmit={handleSend}>
            <input
              ref={inputRef}
              aria-label="Messaggio"
              value={input}
              onChange={e=> setInput(e.target.value)}
              onFocus={() => setTimeout(() => scrollToBottom(), 120)}
              placeholder={ step < 3 ? (step === 0 ? 'Inserisci il tuo nome...' : step === 1 ? 'Inserisci la tua email...' : 'Descrivi il tuo problema...') : 'Invia per confermare' }
            />
            <button type="submit" className="chat-send">➤</button>
          </form>
        )}
      </div>

      <button className="chat-toggle" onClick={()=> setOpen(o=>!o)} aria-label="Apri chat">
        {/* use small avatar image if available */}
        <img src="/images/claudio4.png" alt="avatar" />
      </button>
    </div>
  );
}
