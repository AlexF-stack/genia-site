import { NextResponse } from "next/server";
import { Resend } from "resend";

type RegistrationPayload = {
  fullName?: string;
  phone?: string;
  email?: string;
  profile?: string;
  goal?: string;
  message?: string;
  trackingCode?: string;
};

const whatsappNumber = process.env.GENIA_WHATSAPP_NUMBER ?? "2290159037159";
const webhookUrl = process.env.GENIA_REGISTRATION_WEBHOOK_URL;
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function buildWhatsappUrl(payload: RegistrationPayload) {
  const lines = [
    "Bonjour GenIA, je souhaite m'inscrire.",
    `Nom complet: ${payload.fullName ?? "-"}`,
    `Telephone: ${payload.phone ?? "-"}`,
    `Email: ${payload.email ?? "-"}`,
    `Profil: ${payload.profile ?? "-"}`,
    `Objectif: ${payload.goal ?? "-"}`,
    `Code de suivi: ${payload.trackingCode ?? "-"}`,
    `Message: ${payload.message ?? "-"}`,
  ];

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as RegistrationPayload;

  if (!payload.fullName || !payload.phone || !payload.profile || !payload.goal) {
    return NextResponse.json(
      {
        ok: false,
        message: "Les champs nom, telephone, profil et objectif sont obligatoires.",
      },
      { status: 400 }
    );
  }

  // 1. Webhook logic (Legacy or specific CRM)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "genia-site", createdAt: new Date().toISOString() }),
      });
    } catch (e) {
      console.error("Webhook failed", e);
    }
  }

  // 2. Email logic via Resend
  let emailSent = false;
  if (resend) {
    try {
      await resend.emails.send({
        from: "GenIA Registration <onboarding@resend.dev>",
        to: ["votre-email@domaine.com"], // À configurer
        subject: `Nouvelle inscription : ${payload.fullName}`,
        html: `
          <h1>Nouvelle demande d'inscription</h1>
          <p><strong>Nom :</strong> ${payload.fullName}</p>
          <p><strong>Tel :</strong> ${payload.phone}</p>
          <p><strong>Email :</strong> ${payload.email}</p>
          <p><strong>Profil :</strong> ${payload.profile}</p>
          <p><strong>Objectif :</strong> ${payload.goal}</p>
          <p><strong>Code de suivi :</strong> ${payload.trackingCode}</p>
          <p><strong>Message :</strong> ${payload.message}</p>
        `,
      });
      emailSent = true;
    } catch (e) {
      console.error("Resend failed", e);
    }
  }

  return NextResponse.json({
    ok: true,
    mode: resend ? "email" : "whatsapp",
    whatsappUrl: buildWhatsappUrl(payload),
    message: emailSent 
      ? "Votre demande a été enregistrée. Nous vous recontactons très vite !"
      : "Votre demande est prête. Finalisez l'envoi sur WhatsApp.",
  });
}
