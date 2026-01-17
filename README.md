# 🏦 Sistema de Gestión de Cuentas de Ahorro

Proyecto de demostración de Next.js 15 con App Router que implementa un sistema de consulta y gestión de cuentas de ahorro con renderizado del lado del servidor (SSR).

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web que permite visualizar, filtrar y gestionar cuentas de ahorro bancarias. Incluye funcionalidades como:

- **Dashboard principal** con estadísticas agregadas (saldo total, cuentas activas, tasa promedio)
- **Listado de cuentas** con información detallada de cada cuenta
- **Sistema de filtros avanzado** con búsqueda en tiempo real y debounce
- **Filtrado por nombre/número de cuenta** y por tipo de cuenta
- **Renderizado del lado del servidor (SSR)** para mejor SEO y performance inicial

## 🎯 ¿Por qué estamos usando SSR?

Este proyecto utiliza **Server-Side Rendering (SSR)** como método de renderizado por las siguientes razones:

### 1. **SEO Optimizado**
- Los motores de búsqueda reciben HTML completamente renderizado
- Mejor indexación de contenido dinámico (cuentas, balances, estadísticas)
- Meta tags dinámicos basados en datos reales

### 2. **Datos Siempre Actualizados**
- Cada petición obtiene los datos más recientes del servidor
- No hay problema de caché obsoleto
- Los filtros se procesan en el servidor con datos frescos

### 3. **Performance Inicial Mejorada**
- El usuario ve contenido inmediatamente (First Contentful Paint)
- No hay pantallas de carga mientras se obtienen datos
- Menor trabajo en el cliente (especialmente en dispositivos móviles)

### 4. **Filtros en la URL (Shareable State)**
- Los parámetros de búsqueda están en la URL (`?search=Juan&tipo=savings`)
- Los usuarios pueden compartir links con filtros aplicados
- Funcionalidad de navegador (atrás/adelante) mantiene el estado
- Los filtros funcionan incluso sin JavaScript habilitado

### 5. **Seguridad**
- Los datos sensibles se procesan en el servidor
- No se expone lógica de negocio en el cliente
- Menor superficie de ataque

### 6. **Componentes Híbridos**
- Componente servidor (`page.tsx`): Procesa datos y filtros
- Componente cliente (`FilterSection.tsx`): Maneja interactividad con debounce
- Lo mejor de ambos mundos: SSR + Client interactivity

## 🏗️ Arquitectura

```
/src/app/products/page.tsx          → Server Component (SSR)
/components/FilterSection.tsx       → Client Component (Interactividad)
/components/AcoountCard.tsx         → Presentacional
/components/data/cuentas-ahorro.json → Datos mock
```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or

