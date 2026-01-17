"use client";

import { useState } from "react";

interface FormData {
  montoInicial: string;
  aporteMensual: string;
  meses: string;
  tasaInteres: string;
}

interface FormErrors {
  montoInicial?: string;
  aporteMensual?: string;
  meses?: string;
  tasaInteres?: string;
}

interface SimulationResult {
  montoTotal: number;
  totalInvertido: number;
  interesesGenerados: number;
  desgloseMensual: {
    mes: number;
    saldo: number;
    interesesMes: number;
    aporteMes: number;
  }[];
}

export default function SimulatorForm() {
  const [formData, setFormData] = useState<FormData>({
    montoInicial: "",
    aporteMensual: "",
    meses: "",
    tasaInteres: "5", 
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [result, setResult] = useState<SimulationResult | null>(null);

  // Formato de moneda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formatea numero 
  const formatNumberInput = (value: string): string => {
    const num = value.replace(/[^\d]/g, "");
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Validaciones 
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar monto inicial
    const montoInicial = parseFloat(formData.montoInicial.replace(/,/g, ""));
    if (!formData.montoInicial) {
      newErrors.montoInicial = "El monto inicial es requerido";
    } else if (isNaN(montoInicial) || montoInicial < 0) {
      newErrors.montoInicial = "Ingresa un monto válido";
    } else if (montoInicial < 10000) {
      newErrors.montoInicial = "El monto mínimo es $10,000 COP";
    } else if (montoInicial > 1000000000) {
      newErrors.montoInicial = "El monto máximo es $1,000,000,000 COP";
    }

    // Validar aporte mensual
    const aporteMensual = parseFloat(formData.aporteMensual.replace(/,/g, ""));
    if (!formData.aporteMensual) {
      newErrors.aporteMensual = "El aporte mensual es requerido";
    } else if (isNaN(aporteMensual) || aporteMensual < 0) {
      newErrors.aporteMensual = "Ingresa un monto válido";
    } else if (aporteMensual > 100000000) {
      newErrors.aporteMensual = "El aporte máximo es $100,000,000 COP";
    }

    // Validar meses
    const meses = parseInt(formData.meses);
    if (!formData.meses) {
      newErrors.meses = "El plazo es requerido";
    } else if (isNaN(meses) || meses < 1) {
      newErrors.meses = "Ingresa un plazo válido";
    } else if (meses > 600) {
      newErrors.meses = "El plazo máximo es 600 meses (50 años)";
    }

    // Validar tasa de interés
    const tasaInteres = parseFloat(formData.tasaInteres);
    if (!formData.tasaInteres) {
      newErrors.tasaInteres = "La tasa de interés es requerida";
    } else if (isNaN(tasaInteres) || tasaInteres < 0) {
      newErrors.tasaInteres = "Ingresa una tasa válida";
    } else if (tasaInteres > 50) {
      newErrors.tasaInteres = "La tasa máxima es 50% anual";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Cálculo de interés compuesto
  const calculateInterest = (): void => {
    if (!validateForm()) return;

    const P = parseFloat(formData.montoInicial.replace(/,/g, "")); // Monto inicial
    const A = parseFloat(formData.aporteMensual.replace(/,/g, "")); // Aporte mensual
    const n = parseInt(formData.meses); // Número de meses
    const tasaAnual = parseFloat(formData.tasaInteres) / 100; // Tasa anual en decimal
    const r = tasaAnual / 12; // Tasa mensual

    // Desglose mensual
    const desgloseMensual: SimulationResult["desgloseMensual"] = [];
    let saldoActual = P;

    for (let mes = 1; mes <= n; mes++) {
      // Calcular interés del mes sobre el saldo actual
      const interesesMes = saldoActual * r;

      // Sumar interés y aporte al saldo
      saldoActual = saldoActual + interesesMes + A;

      desgloseMensual.push({
        mes,
        saldo: saldoActual,
        interesesMes,
        aporteMes: A,
      });
    }

    const montoTotal = saldoActual;
    const totalInvertido = P + A * n;
    const interesesGenerados = montoTotal - totalInvertido;

    setResult({
      montoTotal,
      totalInvertido,
      interesesGenerados,
      desgloseMensual,
    });
  };

  // Manejar cambios en inputs
  const handleInputChange = (field: keyof FormData, value: string) => {
    let formattedValue = value;

    if (field === "montoInicial" || field === "aporteMensual") {
      formattedValue = formatNumberInput(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Resetear formulario
  const handleReset = () => {
    setFormData({
      montoInicial: "",
      aporteMensual: "",
      meses: "",
      tasaInteres: "5",
    });
    setErrors({});
    setResult(null);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Formulario */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Datos de la Simulación
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateInterest();
          }}
          className="space-y-6"
        >
          {/* Monto Inicial */}
          <div>
            <label
              htmlFor="montoInicial"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Monto Inicial (COP)
            </label>
            <input
              id="montoInicial"
              type="text"
              value={formData.montoInicial}
              onChange={(e) => handleInputChange("montoInicial", e.target.value)}
              placeholder="Ej: 1,000,000"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.montoInicial ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.montoInicial && (
              <p className="mt-1 text-sm text-red-600">{errors.montoInicial}</p>
            )}
          </div>

          {/* Aporte Mensual */}
          <div>
            <label
              htmlFor="aporteMensual"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Aporte Mensual (COP)
            </label>
            <input
              id="aporteMensual"
              type="text"
              value={formData.aporteMensual}
              onChange={(e) => handleInputChange("aporteMensual", e.target.value)}
              placeholder="Ej: 100,000"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.aporteMensual ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.aporteMensual && (
              <p className="mt-1 text-sm text-red-600">{errors.aporteMensual}</p>
            )}
          </div>

          {/* Plazo en Meses */}
          <div>
            <label
              htmlFor="meses"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Plazo (meses)
            </label>
            <input
              id="meses"
              type="number"
              value={formData.meses}
              onChange={(e) => handleInputChange("meses", e.target.value)}
              placeholder="Ej: 12"
              min="1"
              max="600"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.meses ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.meses && (
              <p className="mt-1 text-sm text-red-600">{errors.meses}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {formData.meses && !isNaN(parseInt(formData.meses))
                ? `${Math.floor(parseInt(formData.meses) / 12)} años y ${parseInt(formData.meses) % 12} meses`
                : ""}
            </p>
          </div>

          {/* Tasa de Interés */}
          <div>
            <label
              htmlFor="tasaInteres"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tasa de Interés Anual (%)
            </label>
            <input
              id="tasaInteres"
              type="number"
              value={formData.tasaInteres}
              onChange={(e) => handleInputChange("tasaInteres", e.target.value)}
              placeholder="Ej: 5"
              step="0.1"
              min="0"
              max="50"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.tasaInteres ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.tasaInteres && (
              <p className="mt-1 text-sm text-red-600">{errors.tasaInteres}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Calcular Rentabilidad
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Resultados */}
      <div>
        {result ? (
          <div className="space-y-6">
            {/* Resumen */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Resultados de la Simulación
              </h2>

              <div className="space-y-4">
                {/* Monto Total */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-1">Monto Total Final</p>
                  <p className="text-4xl font-bold text-green-600">
                    {formatCurrency(result.montoTotal)}
                  </p>
                </div>

                {/* Total Invertido */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Total Invertido</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatCurrency(result.totalInvertido)}
                    </span>
                  </div>
                </div>

                {/* Intereses Generados */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Intereses Generados</span>
                    <span className="text-xl font-bold text-purple-600">
                      {formatCurrency(result.interesesGenerados)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-purple-700">
                    Ganancia: {((result.interesesGenerados / result.totalInvertido) * 100).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Desglose Mensual */}
            <div className="bg-white rounded-lg shadow-lg p-8 max-h-96 overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Desglose Mensual
              </h3>
              <div className="space-y-2">
                {result.desgloseMensual.map((mes) => (
                  <div
                    key={mes.mes}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-900">Mes {mes.mes}</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(mes.saldo)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Intereses: {formatCurrency(mes.interesesMes)}</span>
                      <span>Aporte: {formatCurrency(mes.aporteMes)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-lg font-medium">Completa el formulario</p>
              <p className="text-sm mt-2">
                Ingresa los datos para calcular tu rentabilidad
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
