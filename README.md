# 🏦 Sistema de Gestión Bancaria

Proyecto de demostración de Next.js 15 con App Router que implementa un sistema bancario completo con múltiples módulos: gestión de cuentas de ahorro, simulador de rentabilidad y registro de clientes.

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web bancaria que incluye los siguientes módulos:

### 📊 Módulo Products (Cuentas de Ahorro)
- **Dashboard principal** con estadísticas agregadas (saldo total, cuentas activas, tasa promedio)
- **Listado de cuentas** con información detallada de cada cuenta
- **Sistema de filtros avanzado** con búsqueda en tiempo real y debounce
- **Filtrado por nombre/número de cuenta** y por tipo de cuenta
- **Renderizado del lado del servidor (SSR)** para mejor SEO y performance inicial

### 💰 Módulo Simulator (Simulador de Rentabilidad)
- **Calculadora de interés compuesto** con aportes mensuales
- **Validación completa** de montos, plazos y tasas de interés
- **Desglose mensual** detallado mostrando evolución del ahorro
- **Resultados en tiempo real**: monto final, total invertido e intereses generados
- **Fórmula de interés compuesto**: VF = P × (1 + r)^n + A × [((1 + r)^n - 1) / r]

### 📝 Módulo Onboarding (Registro de Intención)
- **Formulario de registro** para nuevos clientes
- **Validación de campos**: nombre, documento y correo electrónico
- **Simulación de reCAPTCHA** para protección contra bots
- **Generación de UUID** como código de solicitud único
- **Estados de formulario**: cargando, éxito y errores

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
src/app/
├── page.tsx                        → Home (página principal)
├── products/page.tsx               → Server Component (SSR) - Cuentas de Ahorro
├── simulator/page.tsx              → Simulador de Rentabilidad
└── onboarding/page.tsx             → Client Component - Registro de Intención

components/
├── FilterSection.tsx               → Client Component (Filtros con debounce)
├── AcoountCard.tsx                 → Presentacional (Tarjeta de cuenta)
├── SimulatorForm.tsx               → Client Component (Formulario de simulación)
├── nav.tsx                         → Navegación principal
└── data/
    └── cuentas-ahorro.json         → Datos mock de cuentas
```

## 🧭 Navegación

La aplicación cuenta con una barra de navegación sticky que permite acceder a:

| Ruta | Módulo | Descripción |
|------|--------|-------------|
| `/` | Home | Página principal |
| `/products` | Products | Gestión de cuentas de ahorro |
| `/simulator` | Simulador | Calculadora de rentabilidad |
| `/onboarding` | Onboarding | Registro de intención de apertura |

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or

