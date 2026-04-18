// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Inicializar Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

// Tipo para el body del request
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parsear el body
    const body: ContactForm = await request.json();
    const { name, email, subject, message } = body;

    // ============================================
    // 1. VALIDACIÓN DE CAMPOS
    // ============================================

    // Campos requeridos
    if (!name || !email || !message) {
      console.error("Validación fallida: Campos requeridos faltantes");
      return NextResponse.json(
        {
          success: false,
          error: "Nombre, email y mensaje son requeridos",
        },
        { status: 400 },
      );
    }

    // Validar longitud del nombre
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre debe tener entre 2 y 100 caracteres",
        },
        { status: 400 },
      );
    }

    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Validación fallida: Email inválido", email);
      return NextResponse.json(
        {
          success: false,
          error: "El email proporcionado no es válido",
        },
        { status: 400 },
      );
    }

    // Validar longitud del mensaje
    if (message.trim().length < 10 || message.trim().length > 2000) {
      return NextResponse.json(
        {
          success: false,
          error: "El mensaje debe tener entre 10 y 2000 caracteres",
        },
        { status: 400 },
      );
    }

    console.log("✅ Validaciones completadas correctamente");

    // ============================================
    // 2. ENVIAR EMAIL CON RESEND
    // ============================================

    let emailSent = false;
    let emailMessageId = null;

    try {
      const { data, error } = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>", // Cambiar cuando verifiques tu dominio
        to: ["gustavo_galdeano@yahoo.com.ar"],
        replyTo: email,
        subject: subject
          ? `🚀 ${subject} - Portfolio Gustavo Galdeano`
          : `🚀 Nuevo mensaje de ${name} - Portfolio`,
        html: `
          <!DOCTYPE html>
          <html lang="es">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                  line-height: 1.6; 
                  color: #333; 
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background: white;
                  border-radius: 10px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .header { 
                  background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%); 
                  padding: 40px 30px; 
                  text-align: center;
                }
                .header h1 { 
                  color: white; 
                  font-size: 28px; 
                  margin-bottom: 10px;
                  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                }
                .header p {
                  color: rgba(255,255,255,0.9);
                  font-size: 14px;
                }
                .content { 
                  padding: 30px; 
                }
                .field { 
                  margin-bottom: 25px; 
                }
                .label { 
                  font-weight: bold; 
                  color: #06b6d4; 
                  display: block; 
                  margin-bottom: 8px;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .value { 
                  background: #f8fafc; 
                  padding: 15px; 
                  border-radius: 8px;
                  border-left: 4px solid #06b6d4;
                  font-size: 15px;
                  line-height: 1.5;
                }
                .message-box {
                  background: linear-gradient(to right, #f8fafc, #f1f5f9);
                  padding: 20px;
                  border-radius: 8px;
                  border-left: 4px solid #8b5cf6;
                }
                .footer { 
                  margin-top: 30px; 
                  padding-top: 20px; 
                  border-top: 2px solid #e2e8f0; 
                  font-size: 12px; 
                  color: #64748b;
                  text-align: center;
                }
                .footer a {
                  color: #06b6d4;
                  text-decoration: none;
                }
                .badge {
                  display: inline-block;
                  background: #06b6d4;
                  color: white;
                  padding: 4px 12px;
                  border-radius: 20px;
                  font-size: 12px;
                  margin-top: 10px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🚀 Nuevo Mensaje del Portfolio</h1>
                  <p>galdeano.dev</p>
                  <span class="badge">Portfolio Contact Form</span>
                </div>
                
                <div class="content">
                  <div class="field">
                    <span class="label">👤 Nombre Completo</span>
                    <div class="value">${escapeHtml(name)}</div>
                  </div>
                  
                  <div class="field">
                    <span class="label">📧 Email de Contacto</span>
                    <div class="value">
                      <a href="mailto:${escapeHtml(email)}" style="color: #06b6d4;">
                        ${escapeHtml(email)}
                      </a>
                    </div>
                  </div>
                  
                  ${
                    subject
                      ? `
                  <div class="field">
                    <span class="label">📝 Asunto</span>
                    <div class="value">${escapeHtml(subject)}</div>
                  </div>
                  `
                      : ""
                  }
                  
                  <div class="field">
                    <span class="label">💬 Mensaje</span>
                    <div class="message-box">
                      ${formatMessage(message)}
                    </div>
                  </div>
                  
                  <div class="footer">
                    <p><strong>Este mensaje fue enviado desde el portfolio espacial de Gustavo Galdeano</strong></p>
                    <p style="margin-top: 10px;">
                      🌐 <a href="https://galdeano.dev" target="_blank">galdeano.dev</a> | 
                      💼 <a href="https://linkedin.com/in/gustavo-galdeano" target="_blank">LinkedIn</a> | 
                      🐙 <a href="https://github.com/GFGaldeano" target="_blank">GitHub</a>
                    </p>
                    <p style="margin-top: 15px; font-size: 11px; color: #94a3b8;">
                      Fecha de envío: ${new Date().toLocaleString("es-AR", {
                        timeZone: "America/Argentina/Buenos_Aires",
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error("❌ Error enviando email con Resend:", error);
        // No fallamos el request completo, solo logueamos el error
      } else {
        emailSent = true;
        emailMessageId = data?.id;
        console.log(
          "✅ Email enviado exitosamente. Message ID:",
          emailMessageId,
        );
      }
    } catch (emailError) {
      console.error("❌ Excepción enviando email:", emailError);
      // Continuamos con la base de datos aunque falle el email
    }

    // ============================================
    // 3. GUARDAR EN SUPABASE
    // ============================================

    let savedToDatabase = false;
    let databaseMessageId = null;

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert({
          name: name.trim(),
          email: email.trim(),
          subject: subject ? subject.trim() : null,
          message: message.trim(),
          is_read: false,
        })
        .select("id")
        .single();

      if (error) {
        console.error("❌ Error guardando en Supabase:", error);
      } else {
        savedToDatabase = true;
        databaseMessageId = data?.id;
        console.log("✅ Mensaje guardado en Supabase. ID:", databaseMessageId);
      }
    } catch (dbError) {
      console.error("❌ Excepción guardando en Supabase:", dbError);
    }

    // ============================================
    // 4. RESPUESTA AL CLIENTE
    // ============================================

    // Determinar el estado de la operación
    if (!emailSent && !savedToDatabase) {
      // Ambos fallaron - error crítico
      console.error("❌ CRÍTICO: Tanto email como database fallaron");
      return NextResponse.json(
        {
          success: false,
          error:
            "Error al procesar tu mensaje. Por favor intenta nuevamente más tarde.",
          details: "Servicios de email y base de datos no disponibles",
        },
        { status: 500 },
      );
    }

    // Éxito parcial o total
    return NextResponse.json(
      {
        success: true,
        message: "Mensaje enviado correctamente",
        data: {
          emailSent,
          emailMessageId,
          savedToDatabase,
          databaseMessageId,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ Error general en API contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    );
  }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Escapa caracteres HTML para prevenir XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Formatea el mensaje manteniendo saltos de línea
 */
function formatMessage(message: string): string {
  return message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}
