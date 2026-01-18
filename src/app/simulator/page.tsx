import SimulatorForm from "@/components/SimulatorForm";

export default function SimulatorPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Simulador de Rentabilidad
          </h1>
          <p className="text-gray-600 text-lg">
            Calcula cuánto puedes ahorrar con aportes mensuales e interés compuesto
          </p>
        </div>        
        <SimulatorForm />
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ¿Cómo calculamos tu rentabilidad?
          </h2>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fórmula de Interés Compuesto Mensual</h3>
              <p className="mb-2">Utilizamos la fórmula estándar de interés compuesto con aportes periódicos:</p>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                VF = P × (1 + r)^n + A × [((1 + r)^n - 1) / r]
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1">Donde:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>VF</strong> = Valor Final</li>
                  <li><strong>P</strong> = Monto inicial (principal)</li>
                  <li><strong>A</strong> = Aporte mensual</li>
                  <li><strong>r</strong> = Tasa de interés mensual (tasa anual / 12)</li>
                  <li><strong>n</strong> = Número de meses</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Componentes del cálculo:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Capital Inicial:</strong> Tu inversión crece con interés compuesto</li>
                  <li><strong>Aportes Mensuales:</strong> Cada aporte también genera intereses</li>
                  <li><strong>Interés Compuesto:</strong> Los intereses generan más intereses</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Nota:</strong> Los cálculos son estimaciones basadas en una tasa de interés fija.
                Los resultados reales pueden variar según las condiciones del mercado y las políticas del banco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
