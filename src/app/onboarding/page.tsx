"use client";

import { useState } from "react";

interface OnboardingFormData {
  nombre: string;
  documento: string;
  correo: string;
  recaptcha: string;
}

interface FormErrors {
  nombre?: string;
  documento?: string;
  correo?: string;
  recaptcha?: string;
}

export default function OnboardingPage() {
  const [formData, setFormData] = useState<OnboardingFormData>({
    nombre: "",
    documento: "",
    correo: "",
    recaptcha: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [codigoSolicitud, setCodigoSolicitud] = useState<string>("");
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  // Simular verificación de reCAPTCHA
  const simularRecaptcha = (): string => {
  
    const isSuccess = Math.random() > 0.3;
    return isSuccess ? "OK" : "ERROR";
  };


  const validarRecaptchaToken = (token: string): boolean => {
    return token === "OK";
  };

  // Generar UUID simulado
  const generarUUID = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Validar formulario
  const validacionForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo puede contener letras";
    }

    // Validar documento
    if (!formData.documento.trim()) {
      newErrors.documento = "El documento es requerido";
    } else if (!/^\d+$/.test(formData.documento)) {
      newErrors.documento = "El documento solo puede contener números";
    } else if (formData.documento.length < 6 || formData.documento.length > 15) {
      newErrors.documento = "El documento debe tener entre 6 y 15 dígitos";
    }

    // Validar correo
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingresa un correo válido";
    }

    // Validar reCAPTCHA
    if (!recaptchaChecked) {
      newErrors.recaptcha = "Debes confirmar que no eres un robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleInputChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validacionForm()) return;

    setIsSubmitting(true);

    // Simular token de reCAPTCHA
    const recaptchaToken = simularRecaptcha();

    try {
      // Simular envío al servidor
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validar token de reCAPTCHA
      if (!validarRecaptchaToken(recaptchaToken)) {
        setErrors({
          recaptcha: "Error de verificación reCAPTCHA. Por favor, intenta nuevamente.",
        });
        setIsSubmitting(false);
        return;
      }

      // Generar código de solicitud UUID
      const uuid = generarUUID();
      setCodigoSolicitud(uuid);

      // Actualizar formData con el token
      const dataToSubmit = {
        ...formData,
        recaptcha: recaptchaToken,
        codigoSolicitud: uuid,
      };

      console.log("Datos enviados:", dataToSubmit);

      // Mostrar éxito
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Error al enviar:", error);
      setErrors({ nombre: "Hubo un error al enviar el formulario" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario
  const handleReset = () => {
    setFormData({
      nombre: "",
      documento: "",
      correo: "",
      recaptcha: "",
    });
    setErrors({});
    setSubmitSuccess(false);
    setRecaptchaChecked(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Registro de Intención de aperturaa
          </h1>
          <p className="text-gray-600">
            Completa el formulario para registrar tu intención de apertura
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {submitSuccess ? (
            // Mensaje de exito
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Registro Exitoso!
              </h3>
              <p className="text-gray-600 mb-4">
                Tu intención de apertura ha sido registrada correctamente.
              </p>

              {/* Código de solicitud UUID */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Código de solicitud:</p>
                <p className="text-lg font-mono font-bold text-blue-700 break-all">
                  {codigoSolicitud}
                </p>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Guarda este código para dar seguimiento a tu solicitud.
              </p>

              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setCodigoSolicitud("");
                  setRecaptchaChecked(false);
                  setFormData({
                    nombre: "",
                    documento: "",
                    correo: "",
                    recaptcha: "",
                  });
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Registrar otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre Completo *
                </label>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Ej: Juan Pérez García"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                    errors.nombre ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>

              {/* Documento */}
              <div>
                <label
                  htmlFor="documento"
                  className="block text-sm font-medium text-gray-700 mb-2 "
                >
                  Número de Documento *
                </label>
                <input
                  id="documento"
                  type="text"
                  value={formData.documento}
                  onChange={(e) => handleInputChange("documento", e.target.value)}
                  placeholder="Ej: 1234567890"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                    errors.documento ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.documento && (
                  <p className="mt-1 text-sm text-red-600">{errors.documento}</p>
                )}
              </div>

              {/* Correo */}
              <div>
                <label
                  htmlFor="correo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Correo Electrónico *
                </label>
                <input
                  id="correo"
                  type="email"
                  value={formData.correo}
                  onChange={(e) => handleInputChange("correo", e.target.value)}
                  placeholder="Ej: correo@ejemplo.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black ${
                    errors.correo ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.correo && (
                  <p className="mt-1 text-sm text-red-600">{errors.correo}</p>
                )}
              </div>

              {/* reCAPTCHA simulado (campo oculto) */}
              <input
                type="hidden"
                name="recaptcha"
                value={formData.recaptcha}
              />

              {/* Indicador visual de reCAPTCHA interactivo */}
              <div>
                <div
                  className={`bg-gray-50 border rounded-lg p-4 cursor-pointer transition-colors hover:bg-gray-100 ${
                    errors.recaptcha ? "border-red-500" : "border-gray-200"
                  }`}
                  onClick={() => {
                    setRecaptchaChecked(!recaptchaChecked);
                    if (errors.recaptcha) {
                      setErrors((prev) => ({ ...prev, recaptcha: undefined }));
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0">
                      <div className={`h-6 w-6 border-2 rounded bg-white flex items-center justify-center transition-colors ${
                        recaptchaChecked ? "border-green-500 bg-green-50" : "border-gray-300"
                      }`}>
                        {recaptchaChecked && (
                          <svg
                            className="h-4 w-4 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">No soy un robot</p>
                    </div>
                    <div className="shrink-0">
                      <div className="text-xs text-gray-400">
                        <div>reCAPTCHA</div>
                        <div className="text-right">simulado</div>
                      </div>
                    </div>
                  </div>
                </div>
                {errors.recaptcha && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-red-600 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <p className="text-sm text-red-600 font-medium">
                        {errors.recaptcha}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
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
                      Enviando...
                    </span>
                  ) : (
                    "Registrar Intención"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Limpiar
                </button>
              </div>

              {/* Información adicional */}
              <p className="text-xs text-gray-500 text-center">
                * Campos requeridos
              </p>
            </form>
          )}
        </div>    
      </div>
    </div>
  );
}
