"use client";

import React, { useState } from "react";

export function RegistrationForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    age: "",
    phone: "",
    college: "",
    niveau: "Aucune — débutant complet",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prenom || !formData.nom || !formData.age || !formData.phone) {
      alert("Merci de remplir tous les champs obligatoires.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `${formData.prenom} ${formData.nom}`,
          phone: formData.phone,
          profile: `Âge: ${formData.age}, Collège: ${formData.college}`,
          goal: formData.niveau,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus("success");
        if (data.mode === "whatsapp" && data.whatsappUrl) {
          window.open(data.whatsappUrl, "_blank");
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white/4 border border-purple2/20 rounded-[24px] p-9 text-center animate-[fadeUp_0.6s_ease_both]">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-display text-2xl font-extrabold text-purple2 mb-3">Demande envoyée !</h3>
        <p className="text-white/50 leading-relaxed">
          Merci ! Nous allons te recontacter sur WhatsApp sous 48h pour confirmer ta place.<br /><br />
          <strong className="text-purple2">Ou appelle-nous directement :<br />(+229) 01 59 03 71 59</strong>
        </p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-purple2 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/4 border border-purple2/20 rounded-[24px] p-9 shadow-2xl shadow-purple/15 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple2/50 to-transparent" />
      
      <div className="mb-8">
        <h3 className="font-display text-2xl font-extrabold mb-2">Demande d'inscription</h3>
        <p className="text-sm text-white/40 leading-relaxed">
          Remplis ce formulaire et on te recontacte sous 48h · Aucun engagement avant confirmation
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/70 ml-1">Prénom de l'élève *</label>
            <input
              type="text"
              placeholder="Ex : Kofi"
              required
              className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all"
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/70 ml-1">Âge *</label>
            <select
              required
              className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all appearance-none"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            >
              <option value="" className="bg-dark3">Choisir...</option>
              <option value="11 ans (6ème)" className="bg-dark3">11 ans (6ème)</option>
              <option value="12 ans (6ème/5ème)" className="bg-dark3">12 ans (6ème/5ème)</option>
              <option value="13 ans (5ème/4ème)" className="bg-dark3">13 ans (5ème/4ème)</option>
              <option value="14 ans (4ème/3ème)" className="bg-dark3">14 ans (4ème/3ème)</option>
              <option value="15 ans (3ème)" className="bg-dark3">15 ans (3ème)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/70 ml-1">Nom de famille *</label>
          <input
            type="text"
            placeholder="Nom de l'élève"
            required
            className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/70 ml-1">Téléphone / WhatsApp du parent *</label>
          <input
            type="tel"
            placeholder="+229 XX XX XX XX"
            required
            className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/70 ml-1">Collège fréquenté</label>
          <input
            type="text"
            placeholder="Nom du collège"
            className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all"
            value={formData.college}
            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/70 ml-1">Expérience en informatique ?</label>
          <select
            className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all appearance-none"
            value={formData.niveau}
            onChange={(e) => setFormData({ ...formData, niveau: e.target.value })}
          >
            <option value="Aucune — débutant complet" className="bg-dark3">Aucune — débutant complet</option>
            <option value="Quelques bases (Scratch, bureautique)" className="bg-dark3">Quelques bases (Scratch, bureautique)</option>
            <option value="J'ai déjà fait un peu de code" className="bg-dark3">J'ai déjà fait un peu de code</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-white/70 ml-1">Message ou question (optionnel)</label>
          <textarea
            placeholder="Une question sur la formation ?"
            rows={3}
            className="w-full bg-white/5 border border-purple2/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple2 focus:bg-purple2/5 transition-all resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gradient-to-br from-purple to-purple2 text-white py-4 rounded-full font-display font-bold text-base shadow-xl shadow-purple2/40 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande d'inscription ✨"}
        </button>

        <p className="text-center text-[11px] text-white/30 pt-2">
          📞 Tu peux aussi nous appeler directement au (+229) 01 59 03 71 59
        </p>
      </form>
    </div>
  );
}
