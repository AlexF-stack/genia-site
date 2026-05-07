"use client";

import React, { useEffect, useState } from "react";
import { RegistrationForm } from "@/components/registration-form";

export default function Home() {
  const [activeNav, setActiveNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActiveNav(window.scrollY > 20);
      
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#programme", label: "Programme" },
    { href: "#projets", label: "Projets" },
    { href: "#infos", label: "Infos" },
  ];

  return (
    <div className="relative min-h-screen bg-dark">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 md:px-12 transition-all duration-400 ${activeNav ? "bg-dark/90 backdrop-blur-2xl border-b border-purple2/20 py-3" : "bg-transparent"}`}>
        <div className="font-display text-2xl font-black bg-gradient-to-br from-purple2 to-cyan bg-clip-text text-transparent flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple2 shadow-[0_0_10px_#A855F7]" /> GenIA
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-mid hover:text-white transition-colors">{link.label}</a>
          ))}
          <a href="#inscription" className="bg-gradient-to-br from-purple to-purple2 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple2/40 hover:scale-105 transition-all">
            S'inscrire — 5 000 FCFA
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white z-[110]"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu Drawer */}
        <div className={`fixed inset-0 bg-dark/98 backdrop-blur-3xl z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-white hover:text-purple2 transition-colors">{link.label}</a>
          ))}
          <a href="#inscription" onClick={() => setMenuOpen(false)} className="bg-gradient-to-br from-purple to-purple2 text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-purple2/40">
            S'inscrire — 5 000 FCFA
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] animate-swirl opacity-20" style={{ background: "radial-gradient(circle at 20% 30%, rgba(168,85,247,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(6,182,212,0.3) 0%, transparent 40%)" }} />
          <div className="animate-trail absolute top-[20%] left-0 w-64 h-px bg-gradient-to-r from-transparent via-purple2 to-transparent opacity-20" style={{ "--trail-rotate": "15deg" } as any} />
          <div className="animate-trail absolute top-[60%] right-0 w-80 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-20" style={{ "--trail-rotate": "-25deg", animationDelay: "2s" } as any} />
        </div>

        <div className="relative z-10 max-w-3xl lg:text-left text-center">
          <div className="inline-flex items-center gap-2 border border-purple2/40 bg-purple2/10 text-purple2/90 px-4.5 py-1.5 rounded-full text-sm font-semibold mb-8 animate-[fadeUp_0.6s_ease_both]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple2 animate-pulse shadow-[0_0_8px_#A855F7]" />
            Du 29 Juin au 24 Juillet 2026
          </div>
          <h1 className="font-display text-[clamp(44px,6.5vw,76px)] font-black leading-[1] tracking-tight mb-6 animate-[fadeUp_0.6s_0.1s_ease_both] text-white">
            La génération<br />
            qui <span className="gradient-text">maîtrise l'IA</span>
          </h1>
          <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-lg mb-4 mx-auto lg:mx-0 animate-[fadeUp_0.6s_0.15s_ease_both]">
            <strong className="text-purple2">Thème :</strong> Toi + IA = La Nouvelle Génération de Créateurs — Musique · Art · Code · Jeu
          </p>
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-lg mb-10 mx-auto lg:mx-0 animate-[fadeUp_0.6s_0.2s_ease_both]">
            La 1ère formation IA pour collégiens au Bénin. Apprends à créer de vrais agents IA en 1 mois, sans expérience.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 animate-[fadeUp_0.6s_0.3s_ease_both]">
            <a href="#inscription" className="bg-gradient-to-br from-purple to-purple2 text-white px-8 py-4 rounded-full text-base font-bold shadow-2xl shadow-purple2/50 hover:-translate-y-0.5 active:scale-95 transition-all">
              Je m'inscris maintenant →
            </a>
            <a href="#programme" className="text-purple2 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Voir le programme ↓
            </a>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 pt-9 border-t border-purple2/20 animate-[fadeUp_0.6s_0.4s_ease_both]">
            <div><div className="font-display text-3xl font-black gradient-text">1 mois</div><div className="text-xs text-mid font-bold uppercase tracking-wider">de formation</div></div>
            <div><div className="font-display text-3xl font-black gradient-text">11-15</div><div className="text-xs text-mid font-bold uppercase tracking-wider">ans</div></div>
            <div><div className="font-display text-3xl font-black gradient-text">5 000</div><div className="text-xs text-mid font-bold uppercase tracking-wider">FCFA inscription</div></div>
            <div><div className="font-display text-3xl font-black gradient-text">25 000</div><div className="text-xs text-mid font-bold uppercase tracking-wider">FCFA prix total</div></div>
          </div>
        </div>

        <div className="relative mt-16 lg:mt-0 lg:ml-auto z-10 animate-[fadeLeft_0.8s_0.3s_ease_both]">
          <div className="glass-card w-[320px] sm:w-[360px] rounded-[24px] p-7 relative">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[42px] h-[42px] rounded-[14px] bg-gradient-to-br from-purple to-purple2 flex items-center justify-center text-xl shadow-lg shadow-purple/30">🤖</div>
              <div>
                <div className="font-display text-base font-bold text-white">Mon agent GenIA</div>
                <div className="text-[11px] text-cyan font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" /> En exécution
                </div>
              </div>
            </div>
            <div className="text-sm text-white/80 leading-relaxed p-4 bg-white/4 rounded-[16px] mb-4 border border-white/8">
              Je compose une musique sur le thème de Yénawa... 🎵<br />
              <strong className="text-white">→ Mélodie générée en 3 secondes ✨</strong>
            </div>
            <div className="flex flex-wrap gap-2">
              {["🎵 musique", "🎨 art", "💻 code", "🎮 jeux"].map(tag => (
                <span key={tag} className="text-[11px] px-3 py-1 rounded-full bg-purple2/15 text-purple2/90 border border-purple2/25 font-bold uppercase tracking-tight">{tag}</span>
              ))}
            </div>
            <div className="absolute -top-7 -right-5 glass-card px-4 py-3 rounded-[16px] text-xs font-bold text-purple2 animate-[float_3s_ease-in-out_infinite] border-purple2/30">🏆 Projet réel à la clé</div>
            <div className="absolute -bottom-5 -left-7 glass-card px-4 py-3 rounded-[16px] text-xs font-bold text-white animate-[float_3s_1.5s_ease-in-out_infinite] border-white/10">📍 Cité des Jeunes · Yénawa</div>
          </div>
        </div>
      </section>



      {/* Theme Band */}
      <div id="theme-band" className="relative py-16 px-6 md:px-12 bg-gradient-to-br from-purple/30 to-cyan/15 border-b border-purple2/20 flex flex-col md:flex-row items-center gap-8 overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(168,85,247,0.15),transparent)] pointer-events-none" />
        <div className="text-6xl shrink-0 animate-bounce">🧠</div>
        <div>
          <div className="text-xs font-black tracking-[0.2em] uppercase text-purple2 mb-2">Thème de la formation</div>
          <div className="font-display text-[clamp(24px,3vw,32px)] font-black leading-tight text-white">
            Toi + IA = La Nouvelle Génération de Créateurs<br />Musique · Art · Code · Jeu
          </div>
          <div className="text-sm text-white/60 mt-2 font-medium">Prenez de l'avance sur votre avenir. Construisez, ne subissez pas.</div>
        </div>
      </div>

      {/* Pourquoi Section */}
      <section id="pourquoi" className="bg-dark2 px-6 md:px-12 py-24">
        <div className="reveal max-w-4xl">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-purple2 mb-4">Pourquoi GenIA ?</div>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-black tracking-tight leading-[1] mb-6 text-white">
            L'IA arrive au Bénin.<br />Autant la maîtriser.
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">Pendant que d'autres subissent l'IA, toi tu vas apprendre à la piloter et à l'utiliser comme un outil de création sans limites.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-16 reveal">
          {[
            { ico: "🧠", title: "Comprendre vraiment", desc: "Pas juste utiliser ChatGPT. Comprendre comment l'IA fonctionne réellement — tokens, mémoire, attention et limites." },
            { ico: "🛠️", title: "Créer par toi-même", desc: "Chaque session produit un résultat tangible. En 1 mois tu repars avec ton propre projet IA fonctionnel." },
            { ico: "🚀", title: "Une longueur d'avance", desc: "Les métiers de demain seront tous impactés. Commencer maintenant, c'est s'offrir des années d'avance." }
          ].map((item) => (
            <div key={item.title} className="bg-white/3 border border-purple2/15 rounded-[24px] p-8 hover:bg-purple2/10 hover:-translate-y-1.5 hover:border-purple2/40 transition-all duration-300 group">
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform">{item.ico}</div>
              <h3 className="font-display text-xl font-black mb-3 text-white">{item.title}</h3>
              <p className="text-[14px] text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programme Section */}
      <section id="programme" className="bg-dark px-6 md:px-12 py-24">
        <div className="reveal">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-purple2 mb-4">Le programme — 4 semaines</div>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-black tracking-tight leading-[1] mb-6 text-white">
            4 semaines,<br />4 super-pouvoirs
          </h2>
          <p className="text-xl text-white/60 leading-relaxed max-w-xl">3 sessions de 3h par semaine. Toujours du concret, toujours de la pratique. <strong className="text-purple2">Ordinateur portable recommandé.</strong></p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 reveal">
          {[
            { wk: "1", title: "Comprendre l'IA", sub: "Les bases solides", items: ["Comment fonctionne vraiment l'IA", "Tokens, mémoire, limites", "Maîtriser le prompt engineering"], color: "purple2" },
            { wk: "2", title: "Construire avec l'IA", sub: "Passer créateur", items: ["Créer son premier chatbot", "Donner de la mémoire à l'IA", "Introduction aux agents IA"], color: "cyan" },
            { wk: "3", title: "Agents en action", sub: "La puissance créative", items: ["Agents avec outils réels", "Musique, art & jeux avec l'IA", "Agent autonome complet"], color: "pink" },
            { wk: "4", title: "Projet final", sub: "Ton œuvre", items: ["Conception & construction", "Demo live devant le groupe", "Certificat GenIA remis"], color: "amber-400" }
          ].map((item) => (
            <div key={item.wk} className={`bg-${item.color}/10 border border-white/5 rounded-[24px] p-7 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-${item.color} to-transparent opacity-5`} />
              <div className={`text-xs font-black tracking-widest uppercase text-${item.color} mb-4 opacity-70`}>Semaine {item.wk}</div>
              <h3 className="font-display text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-[13px] text-white/50 mb-6 font-medium">{item.sub}</p>
              <div className="space-y-3">
                {item.items.map((li) => (
                  <div key={li} className="text-[12px] text-white/70 flex gap-2 font-medium"><span className={`text-${item.color} font-black shrink-0`}>▸</span>{li}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projets Section */}
      <section id="projets" className="bg-dark2 px-6 md:px-12 py-24">
        <div className="reveal text-center lg:text-left">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-purple2 mb-4">Exemples de projets</div>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-black tracking-tight leading-[1] mb-6 text-white">
            Des créations réelles,<br />pas des exercices
          </h2>
          <p className="text-xl text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0">À la fin du mois, chaque participant présente son projet IA concret et fonctionnel.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16 reveal">
          {[
            { ico: "🎵", title: "Compositeur IA", desc: "Un agent qui génère de la musique à partir d'une ambiance ou d'un texte — ton style, ta mélodie." },
            { ico: "🎨", title: "Artiste IA", desc: "Un créateur d'images et d'illustrations — décris ta vision, l'IA la dessine en quelques secondes." },
            { ico: "🎮", title: "Jeu d'aventure IA", desc: "Un jeu dont l'IA est le moteur — elle génère l'histoire et les décors en temps réel." },
            { ico: "📚", title: "Assistant révisions", desc: "Un chatbot qui te pose des questions sur tes cours et t'explique tes erreurs avec patience." },
            { ico: "🕵️", title: "Détective de fake news", desc: "Un agent qui vérifie une information sur le web et te dit si elle est fiable." },
            { ico: "🤖", title: "Mon agent perso", desc: "Ton propre assistant IA avec les outils que tu as choisis pour simplifier ton quotidien." }
          ].map((proj) => (
            <div key={proj.title} className="bg-white/3 border border-purple2/10 rounded-[24px] p-8 hover:border-purple2/50 hover:bg-purple2/5 hover:-translate-y-1.5 transition-all duration-300">
              <div className="text-4xl mb-4">{proj.ico}</div>
              <h3 className="font-display text-lg font-bold mb-3 text-white">{proj.title}</h3>
              <p className="text-[14px] text-white/60 leading-relaxed">{proj.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Inscription Section */}
      <section id="inscription" className="bg-dark px-6 md:px-12 py-24 relative overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="reveal mb-16 text-center lg:text-left">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-purple2 mb-4">Inscription</div>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-black tracking-tight leading-[1] mb-6 text-white">
            Prends ta place<br />maintenant ✨
          </h2>
          <p className="text-xl text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0">Les places sont limitées. Remplis le formulaire et on te recontacte sous 48h.</p>
        </div>
        
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div className="space-y-4 reveal">
            {[
              { ico: "📞", lbl: "WhatsApp", val: "(+229) 01 59 03 71 59" },
              { ico: "📍", lbl: "Lieu", val: "Yénawa, Auditorium de la Cité des Jeunes", sub: "Immeuble vitré, rue clinique 'CELESTATH'" },
              { ico: "📅", lbl: "Période", val: "29 Juin — 24 Juillet 2026", sub: "Lundi, Mercredi, Vendredi" },
              { ico: "💰", lbl: "Tarifs", val: "Inscription : 5 000 FCFA", sub: "Formation : 25 000 FCFA", special: true }
            ].map((block) => (
              <div key={block.lbl} className={`flex items-center gap-5 rounded-[20px] p-6 border transition-all duration-300 ${block.special ? "bg-purple2/10 border-purple2/50 shadow-lg shadow-purple2/5" : "bg-white/3 border-white/5 hover:border-purple2/30"}`}>
                <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center text-2xl shrink-0 ${block.special ? "bg-purple2/30" : "bg-purple2/10"}`}>{block.ico}</div>
                <div>
                  <div className="text-[11px] font-bold text-mid uppercase tracking-widest mb-1">{block.lbl}</div>
                  <div className="font-display text-base font-bold text-white">{block.val}</div>
                  {block.sub && <div className={`text-[12px] mt-0.5 ${block.special ? "text-purple2 font-bold" : "text-white/70"}`}>{block.sub}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="reveal relative">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-dark px-6 md:px-12 py-24 border-t border-white/5">
        <div className="reveal text-center mb-16">
          <div className="text-xs font-bold tracking-[0.2em] uppercase text-purple2 mb-4">FAQ Rapide</div>
          <h2 className="font-display text-[clamp(32px,4.5vw,56px)] font-black tracking-tight leading-[1] text-white">
            Transparence des tarifs
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 reveal max-w-5xl mx-auto">
          {[
            { q: "Pourquoi deux tarifs ?", a: "Les 5 000 FCFA servent à l'inscription pour réserver officiellement ta place. Les 25 000 FCFA restants couvrent l'intégralité du mois de formation." },
            { q: "Y a-t-il des frais cachés ?", a: "Aucun. Le montant total de 30 000 FCFA couvre tout le programme de 4 semaines, le matériel numérique et ton certificat." },
            { q: "Ordinateur obligatoire ?", a: "C'est fortement recommandé pour pratiquer à la maison. Si tu n'en as pas, contacte-nous pour voir les solutions disponibles." },
            { q: "Comment payer ?", a: "Le paiement se fait par Mobile Money (MTN ou Moov). Les instructions te seront envoyées par WhatsApp après ton inscription." }
          ].map((item) => (
            <div key={item.q} className="bg-white/3 border border-purple2/10 rounded-[24px] p-8 hover:border-purple2/40 transition-all">
              <h3 className="font-display text-lg font-bold text-purple2 mb-3">{item.q}</h3>
              <p className="text-[14px] text-white/70 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 border-t border-white/5 px-6 md:px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="max-w-xs">
          <div className="font-display text-2xl font-black bg-gradient-to-br from-purple2 to-cyan bg-clip-text text-transparent mb-3">GenIA</div>
          <p className="text-sm text-white/30 leading-relaxed font-medium">Former la nouvelle génération de créateurs et bâtisseurs de l'Intelligence Artificielle au Bénin.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">{link.label}</a>
            ))}
          </div>
          <div className="text-sm text-mid font-bold">
            📞 (+229) 01 59 03 71 59<br />
            <span className="text-[11px] text-white/20 mt-1 block font-medium">© 2026 GenIA — Yénawa, Bénin</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
