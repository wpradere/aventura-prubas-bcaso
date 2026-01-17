import React from "react";
import cuentasAhorro from "@/components/data/cuentas-ahorro.json";
import AccountCard from "@/components/AcoountCard";
import FilterSection from "@/components/FilterSection";

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

export default async function CuentasAhorroPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tipo?: string }>;
}) {
  const params = await searchParams;
  await new Promise((resolve) => setTimeout(resolve, 100));
  const todasCuentas = cuentasAhorro.accounts as CuentasAhorros[];

  let accounts = todasCuentas;

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    accounts = accounts.filter(
      (acc) =>
        acc.holderName.toLowerCase().includes(searchLower) ||
        acc.accountNumber.includes(searchLower),
    );
  }

  if (params.tipo && params.tipo !== "todos") {
    accounts = accounts.filter((acc) => acc.accountType === params.tipo);
  }

  // const cuentas = cuentasAhorro.accounts;
  const renderTime = new Date().toLocaleString("es-CO");

  const totalBalance = todasCuentas.reduce((sum, acc) => sum + acc.balance, 0);
  const activeAccounts = todasCuentas.filter(
    (acc) => acc.status === "active",
  ).length;
  const averageInterestRate = (
    todasCuentas.reduce((sum, acc) => sum + acc.interestRate, 0) /
    todasCuentas.length
  ).toFixed(2);

  const accountTypes = Array.from(
    new Set(todasCuentas.map((acc) => acc.accountType)),
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Cuentas de Ahorro
          </h1>
          <p className="text-gray-600">
            Gestión y consulta de cuentas de ahorro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              Saldo Total
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(totalBalance)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              Cuentas Activas
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {activeAccounts} / {todasCuentas.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              Tasa Promedio
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {averageInterestRate}%
            </p>
          </div>
        </div>

        {/* Filtros */}
        <FilterSection
          accountTypes={accountTypes}
          currentSearch={params.search || ""}
          currentTipo={params.tipo || "todos"}
        />

        {/* Listado de cuentas */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Listado de Cuentas ({accounts.length})
        </h2>

        {accounts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No se encontraron cuentas con los filtros aplicados</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map((cuenta) => (
              <AccountCard key={cuenta.id} cuentas={cuenta} />
            ))}
          </div>
        )}

        {/* Información SSR */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>✅ SSR Activo:</strong> Esta página se renderizó en el
            servidor.
            <br />
            <strong>Hora de renderizado:</strong> {renderTime}
          </p>
          <p className="text-xs text-green-700 mt-2">
            Recarga la página y verás que la hora cambia (se renderiza de nuevo
            en el servidor)
          </p>
        </div>
      </div>
    </div>
  );
}
