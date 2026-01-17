interface CuentasAhorros {
  id: string;
  accountNumber: string;
  holderName: string;
  balance: number;
  interestRate: number;
  openDate: string;
  accountType: string;
  status: "active" | "inactive";
  currency: string;
}

function formatCurrency(amount: number, currency: string = "COP"): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function AccountCard({ cuentas }: { cuentas: CuentasAhorros }) {
  const statusColor =
    cuentas.status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";

  const typeColor = cuentas.accountType.includes("VIP")
    ? "bg-purple-100 text-purple-800"
    : cuentas.accountType.includes("Premium")
      ? "bg-blue-100 text-blue-800"
      : "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {cuentas.holderName}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{cuentas.accountNumber}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {cuentas.status === "active" ? "Activa" : "Inactiva"}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Saldo:</span>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(cuentas.balance, cuentas.currency)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tasa de interés:</span>
          <span className="text-lg font-semibold text-green-600">
            {cuentas.interestRate}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fecha de apertura:</span>
          <span className="text-gray-800">
            {new Date(cuentas.openDate).toLocaleDateString("es-CO")}
          </span>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${typeColor}`}
          >
            {cuentas.accountType}
          </span>
        </div>
      </div>
    </div>
  );
}
