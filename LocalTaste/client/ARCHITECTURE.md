# 📚 GUÍA DE LA ARQUITECTURA - LocalTaste Client

Esta guía te ayudará a entender la estructura del proyecto y cómo navegarlo eficientemente.

## 🏗️ Estructura General del Proyecto

```
client/src/
├── app/                    # Páginas de Next.js (App Router)
├── components/             # Componentes React
│   ├── auth/              # Componentes de autenticación
│   ├── layout/            # Componentes de diseño (Header, Footer, etc.)
│   └── ui/                # Componentes de UI reutilizables
├── constants/             # Constantes globales de la aplicación
├── hooks/                 # Hooks personalizados de React
├── lib/                   # Utilidades y funciones auxiliares
├── data/                  # Datos mock/JSON
└── styles/                # Estilos globales

```

---

## 📁 Guía de Carpetas y Archivos

### 1. 📂 `constants/index.js`

**Propósito:** Centralizar todas las constantes de la aplicación

**Contenido:**

- `PAGINATION`: Configuración de elementos por página
- `PRODUCT_SORT_OPTIONS`: Opciones de ordenamiento para productos
- `PRODUCER_SORT_OPTIONS`: Opciones de ordenamiento para productores
- `PRODUCT_CATEGORIES`: Mapeo de categorías a tipos
- `BUSINESS_CATEGORIES`: Categorías de negocio para productores
- `VALIDATION`: Reglas de validación de formularios
- `DEBOUNCE_DELAY`: Tiempos de debounce
- `PRICE_CONFIG`: Configuración de precios y moneda

**Cuándo usar:**

- Al añadir nuevas opciones de filtrado/ordenamiento
- Al configurar paginación
- Al añadir validaciones

**Ejemplo:**

```javascript
import { PAGINATION, PRODUCT_SORT_OPTIONS } from '@/constants';

const itemsPerPage = PAGINATION.PRODUCTS_PER_PAGE; // 12
```

---

### 2. 📂 `lib/utils.js`

**Propósito:** Funciones auxiliares reutilizables

**Categorías de funciones:**

#### Formateo

- `formatPrice(price, decimals)` - Formatea precios con €
- `formatDistance(distance)` - Formatea distancias en km
- `truncateText(text, maxLength)` - Trunca texto con "..."
- `formatNumber(num)` - Formatea números con separadores de miles

#### Cálculos

- `calculateDiscount(original, current)` - Calcula % de descuento
- `calculateRelevanceScore(product)` - Puntuación de relevancia
- `calculateRangePercentage(value, min, max)` - % para sliders
- `clamp(value, min, max)` - Limita valor entre min/max
- `getPriceRange(products)` - Obtiene rango de precios

#### Validación

- `isValidEmail(email)` - Valida formato de email
- `validatePassword(password, minLength)` - Valida contraseña
- `passwordsMatch(pass1, pass2)` - Compara contraseñas

#### Filtrado

- `filterBySearch(products, term)` - Filtra por búsqueda de texto
- `filterByCategory(products, categories)` - Filtra por categorías
- `filterByPriceRange(products, range)` - Filtra por precio
- `filterByDistance(producers, maxDistance)` - Filtra por distancia
- `filterByRating(producers, minRating)` - Filtra por rating

#### Utilidades

- `slugify(text)` - Genera slugs URL-friendly
- `cn(...classes)` - Combina clases CSS condicionalmente
- `debounce(func, wait)` - Aplica debounce a funciones

**Cuándo usar:**

- Para cualquier operación de formateo de datos
- Al validar inputs de usuario
- Al filtrar colecciones de datos
- Para cálculos comunes

---

### 3. 📂 `lib/sortFunctions.js`

**Propósito:** Funciones de ordenamiento para productos y productores

**Contenido:**

#### Para Productos (`productSortFunctions`)

- `mejor-valorados` - Por estrellas (mayor a menor)
- `recien-cosechado` - Por frescura
- `ofertas` - Por descuento
- `popularidad` - Por likes
- `precio-asc` - Precio ascendente
- `precio-desc` - Precio descendente
- `alfabetico` - A-Z
- `relevancia` - Por puntuación calculada

#### Para Productores (`producerSortFunctions`)

- `mejor-valorados` - Por estrellas
- `mas-cercanos` - Por distancia ascendente
- `mas-lejanos` - Por distancia descendente
- `popularidad` - Por likes
- `nuevos` - Por ID descendente
- `alfabetico` - A-Z

**Helper:**

- `getSortFunction(type, sortOption)` - Obtiene función de sort

**Cuándo usar:**

- Al implementar nuevas opciones de ordenamiento
- Al crear páginas con listados ordenables

**Ejemplo:**

```javascript
import { productSortFunctions } from '@/lib/sortFunctions';

const sorted = [...products].sort(productSortFunctions['precio-asc']);
```

---

## 🎣 Hooks Personalizados

### 4. 📂 `hooks/useFilters.js`

**Propósito:** Hook genérico para filtrado de datos

**Parámetros:**

- `data` - Array de datos a filtrar
- `options` - Configuración:
  - `enableSearch` - Habilitar búsqueda
  - `enableCategory` - Habilitar filtro por categoría
  - `enablePriceRange` - Habilitar filtro por precio
  - `customFilters` - Filtros personalizados

**Retorna:**

```javascript
{
  filteredData,              // Datos filtrados
  searchTerm,                // Término de búsqueda actual
  selectedCategories,        // Categorías seleccionadas
  priceRange,                // Rango de precios
  hasActiveFilters,          // Boolean: hay filtros activos
  handleSearchChange,        // Handler para búsqueda
  handleCategoryChange,      // Handler para categorías
  handlePriceRangeChange,    // Handler para precio
  handleCustomFilterChange,  // Handler para filtros custom
  resetFilters               // Resetear todos los filtros
}
```

**Ejemplo:**

```javascript
const { filteredData, handleSearchChange } = useFilters(products, {
  enableSearch: true,
  enableCategory: true,
  customFilters: {
    producer: (items, term) => items.filter(i => i.producer.includes(term))
  }
});
```

---

### 5. 📂 `hooks/useSort.js`

**Propósito:** Hook genérico para ordenamiento de datos

**Parámetros:**

- `data` - Array de datos a ordenar
- `sortFunctions` - Objeto con funciones de ordenamiento
- `defaultSort` - Opción por defecto

**Retorna:**

```javascript
{
  sortOption,       // Opción actual
  sortedData,       // Datos ordenados
  handleSortChange, // Handler para cambiar ordenamiento
  resetSort         // Resetear a opción por defecto
}
```

**Ejemplo:**

```javascript
import { productSortFunctions } from '@/lib/sortFunctions';

const { sortedData, handleSortChange } = useSort(
  filteredProducts,
  productSortFunctions,
  'relevancia'
);
```

---

### 6. 📂 `hooks/usePaginationWithURL.js`

**Propósito:** Paginación con sincronización de URL

**Parámetros:**

- `items` - Array de items a paginar
- `itemsPerPage` - Items por página
- `options`:
  - `scrollToTop` - Hacer scroll al cambiar página
  - `scrollBehavior` - 'smooth' o 'auto'
  - `paramName` - Nombre del parámetro en URL

**Retorna:**

```javascript
{
  currentPage,      // Página actual
  totalPages,       // Total de páginas
  totalItems,       // Total de items
  paginatedItems,   // Items de la página actual
  handlePageChange, // Handler para cambiar página
  goToFirstPage,    // Ir a primera página
  goToLastPage,     // Ir a última página
  goToNextPage,     // Página siguiente
  goToPrevPage,     // Página anterior
  hasNextPage,      // Boolean: existe siguiente
  hasPrevPage       // Boolean: existe anterior
}
```

**Ejemplo:**

```javascript
const { paginatedItems, currentPage, handlePageChange } = usePaginationWithURL(
  sortedProducts,
  12,
  { scrollToTop: true }
);
```

---

### 7. 📂 `hooks/useCategoryFilter.js`

**Propósito:** Filtrado específico por categorías

**Parámetros:**

- `categoryMapping` - Mapeo de categorías a tipos
- `productsData` - Array de productos
- `onCategoryChange` - Callback al cambiar

**Retorna:**

```javascript
{
  selectedCategories,    // Categorías seleccionadas
  handleCategoryToggle,  // Toggle de una categoría
  handleClearAll,        // Limpiar todas
  getCategoryCount       // Contar productos en categoría
}
```

---

### 8. 📂 `hooks/usePriceRange.js`

**Propósito:** Manejo de filtro de rango de precios

**Parámetros:**

- `productsData` - Array de productos

**Retorna:**

```javascript
{
  minPrice,                  // Precio mínimo actual
  maxPrice,                  // Precio máximo actual
  minInputValue,             // Valor del input mínimo
  maxInputValue,             // Valor del input máximo
  priceRange,                // Rango disponible { min, max }
  handleMinPriceChange,      // Handler input mínimo
  handleMaxPriceChange,      // Handler input máximo
  handleMinPriceBlur,        // Handler blur input mínimo
  handleMaxPriceBlur,        // Handler blur input máximo
  handleRangeSliderChange,   // Handler sliders
  resetPriceRange,           // Resetear rango
  updatePriceRange           // Actualizar rango
}
```

---

### 9. 📂 `hooks/useFormInput.js`

**Propósito:** Manejo de estado de formularios

**Parámetros:**

- `initialValues` - Valores iniciales del formulario

**Retorna:**

```javascript
[values, handleChange, reset, setValues]
```

**Ejemplo:**

```javascript
const [formData, handleInputChange, resetForm] = useFormInput({
  email: '',
  password: ''
});

<input 
  name="email" 
  value={formData.email} 
  onChange={handleInputChange} 
/>
```

---

### 10. 📂 `hooks/usePasswordToggle.js`

**Propósito:** Toggle visibilidad de contraseña

**Retorna:**

```javascript
[showPassword, togglePassword, setShowPassword]
```

**Ejemplo:**

```javascript
const [showPassword, togglePassword] = usePasswordToggle();

<input type={showPassword ? "text" : "password"} />
<button onClick={togglePassword}>Ver</button>
```

---

### 11. 📂 `hooks/useDebounce.js`

**Propósito:** Aplicar debounce a funciones

**Parámetros:**

- `callback` - Función a ejecutar
- `delay` - Tiempo de espera en ms

**Retorna:**
Función con debounce aplicado

**Ejemplo:**

```javascript
const debouncedSearch = useDebounce((term) => {
  fetchResults(term);
}, 500);

<input onChange={(e) => debouncedSearch(e.target.value)} />
```

---

## 🎨 Componentes UI

### 12. 📂 `components/ui/InfoAndSorting.jsx`

**Props:**

- `filteredItems` - Items visibles en página actual
- `totalItems` - Total después de filtrar
- `onSortChange` - Callback al cambiar ordenamiento
- `type` - 'products' o 'producers'

**Función:**
Muestra información de resultados y selector de ordenamiento

---

### 13. 📂 `components/ui/Pagination.jsx`

**Props:**

- `totalItems` - Total de items
- `itemsPerPage` - Items por página
- `currentPage` - Página actual
- `onPageChange` - Callback al cambiar página
- `maxVisiblePages` - Máx. páginas visibles (default: 5)

**Función:**
Control de paginación con botones anterior/siguiente y números de página

---

## 🔄 Flujo de Datos en Páginas

### Ejemplo: Página de Productos

```
Datos Raw (JSON)
     ↓
useFilters (filtrado)
     ↓
useSort (ordenamiento)
     ↓
usePaginationWithURL (paginación)
     ↓
Render de items paginados
```

### Código típico

```javascript
// 1. Filtrar
const { filteredData } = useFilters(productsData, options);

// 2. Ordenar
const { sortedData } = useSort(filteredData, sortFunctions);

// 3. Paginar
const { paginatedItems } = usePaginationWithURL(sortedData, itemsPerPage);

// 4. Renderizar
paginatedItems.map(item => <ItemCard key={item.id} item={item} />)
```

---

## 🎯 Buenas Prácticas

### Al añadir nuevas funcionalidades

1. **Constantes primero**
   - ¿Hay valores hardcodeados? → `constants/index.js`

2. **Utilidades reutilizables**
   - ¿La función se usará en múltiples lugares? → `lib/utils.js`

3. **Hooks personalizados**
   - ¿La lógica se repite? → Crea un hook en `hooks/`

4. **Componentes UI**
   - ¿Es reutilizable? → `components/ui/`
   - ¿Es específico de una página? → `components/layout/`

5. **Documentación**
   - Siempre añade comentarios JSDoc
   - Documenta parámetros y retornos
   - Añade ejemplos de uso

---

## 🐛 Debugging

### Hook no actualiza

- Verifica dependencias de `useMemo`, `useCallback`, `useEffect`
- Revisa que los arrays/objetos no se recreen en cada render

### Filtros no funcionan

- Verifica que el flujo sea: Filtrar → Ordenar → Paginar
- Comprueba que los handlers se pasen correctamente

### Paginación desincronizada

- Resetea a página 1 al cambiar filtros/orden
- Verifica parámetro de URL

---

## 📚 Recursos Adicionales

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Hooks](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🆘 Contacto y Soporte

Para dudas o sugerencias sobre la arquitectura, consulta:

1. Los comentarios en el código
2. Este archivo README
3. Los ejemplos en cada hook/utilidad

---

**Última actualización:** Febrero 2026  
**Versión:** 1.0.0
