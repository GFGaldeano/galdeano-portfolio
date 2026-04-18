// src/components/sections/SpacePort.jsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Send,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../lib/translations";

export default function SpacePort() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { language } = useLanguage();
  const t = translations[language].contact;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // src/components/sections/SpacePort.jsx
  // Actualiza la función handleSubmit:

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: t.successMessage,
        });

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Error al enviar");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: `❌ Error: ${error.message || "Error al enviar el mensaje"}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="min-h-screen py-20 bg-gradient-to-b from-gray-900/50 to-black"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t.title}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">
              {t.formTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cyan-300 mb-2">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder={t.namePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-cyan-300 mb-2">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder={t.emailPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-cyan-300 mb-2">
                  {t.subjectLabel}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder={t.subjectPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-cyan-300 mb-2">
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  placeholder={t.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    {t.sendButton}
                  </>
                )}
              </button>
            </form>

            {submitStatus && (
              <motion.div
                className={`mt-6 p-4 rounded-lg border ${
                  submitStatus.type === "success"
                    ? "bg-green-900/20 border-green-500/50 text-green-300"
                    : "bg-red-900/20 border-red-500/50 text-red-300"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {submitStatus.message}
              </motion.div>
            )}
          </div>

          {/* Contact Information Panel */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-white">GG</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Gustavo Galdeano
                  </h3>
                  <p className="text-cyan-300">
                    CTO & Fundador @ Dragon Pyramid
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-cyan-400 mr-3" size={20} />
                  <span className="text-gray-300">
                    gustavo_galdeano@yahoo.com.ar
                  </span>
                </div>

                <div className="flex items-center">
                  <Phone className="text-cyan-400 mr-3" size={20} />
                  <span className="text-gray-300">+54 9 381 547 6502</span>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-cyan-400 mr-3" size={20} />
                  <span className="text-gray-300">
                    Argentina (Remote Friendly)
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connections */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t.socialConnections}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://github.com/GFGaldeano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <Github
                    className="text-gray-400 group-hover:text-white mr-2"
                    size={24}
                  />
                  <span className="text-gray-300 group-hover:text-white">
                    {t.github}
                  </span>
                </a>

                <a
                  href="https://linkedin.com/in/gustavo-galdeano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors group"
                >
                  <Linkedin
                    className="text-blue-400 group-hover:text-white mr-2"
                    size={24}
                  />
                  <span className="text-blue-300 group-hover:text-white">
                    {t.linkedin}
                  </span>
                </a>

                <a
                  href="mailto:gustavo_galdeano@yahoo.com.ar"
                  className="flex items-center justify-center p-4 bg-red-900/30 hover:bg-red-800/50 rounded-lg transition-colors group"
                >
                  <Mail
                    className="text-red-400 group-hover:text-white mr-2"
                    size={24}
                  />
                  <span className="text-red-300 group-hover:text-white">
                    {t.email}
                  </span>
                </a>

                <a
                  href="https://www.dragonpyramid.com.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-green-900/30 hover:bg-green-800/50 rounded-lg transition-colors group"
                >
                  <Globe
                    className="text-green-400 group-hover:text-white mr-2"
                    size={24}
                  />
                  <span className="text-green-300 group-hover:text-white">
                    {t.web}
                  </span>
                </a>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-400 font-medium">
                  {t.available}
                </span>
              </div>
              <p className="text-gray-300 mt-2 text-sm">{t.availableText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
