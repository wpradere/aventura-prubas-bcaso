"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface FilterSectionProps {
  accountTypes: string[];
  currentSearch: string;
  currentTipo: string;
}

export default function FilterSection({
  accountTypes,
  currentSearch,
  currentTipo,
}: FilterSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [tipoFilter, setTipoFilter] = useState(currentTipo);

  // Debounce 
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters(searchInput, tipoFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, tipoFilter]);

  //sirve para modificar o gestionar URL para la busqueda
  const updateFilters = (search: string, tipo: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    if (tipo && tipo !== "todos") {
      params.set("tipo", tipo);
    } else {
      params.delete("tipo");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setTipoFilter("todos");
  };

  const hasActiveFilters = searchInput || tipoFilter !== "todos";

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">        
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Buscar por nombre o número de cuenta
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Ej: Juan Pérez o 1001..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isPending && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Filtro por cuenta*/}
        <div>
          <label
            htmlFor="tipo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tipo de cuenta
          </label>
          <select
            id="tipo"
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="todos">Todos los tipos</option>
            {accountTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>      
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {searchInput && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Búsqueda: "{searchInput}"
                <button
                  onClick={() => setSearchInput("")}
                  className="ml-2 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {tipoFilter !== "todos" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Tipo: {tipoFilter.charAt(0).toUpperCase() + tipoFilter.slice(1)}
                <button
                  onClick={() => setTipoFilter("todos")}
                  className="ml-2 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
