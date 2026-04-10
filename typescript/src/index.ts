// ============================================================
// TP 03 — Programación Funcional con TypeScript
// Paradigmas y Lenguajes de Programación 2026 — UNTDF/IDEI
// ============================================================
//
// RESTRICCIONES DE ESTILO FUNCIONAL:
// ✗ No usar `let` ni `var`
// ✗ No usar `for`, `while`, `do...while`
// ✗ No mutar arrays recibidos (.push, .pop, .splice, .sort in-place)
// ✗ No mutar objetos recibidos (obj.campo = valor)
// ✓ Usar solo `const`
// ✓ Usar map, filter, reduce, flatMap, recursión
// ✓ Producir NUEVAS colecciones, no modificar las recibidas
// ============================================================

// ─── GRUPO 1: Funciones Puras ─────────────────────────────────────────────

/**
 * TS-01: Calcula el precio final aplicando un impuesto.
 * FUNCIÓN PURA: mismo input → mismo output, cero efectos colaterales.
 * @param base   precio antes de impuesto (número positivo)
 * @param tasa   impuesto en porcentaje (ej: 21 para 21%)
 * @returns base * (1 + tasa/100), redondeado a 2 decimales
 *
 * Ejemplo: calcularConImpuesto(100, 21) === 121.00
 *          calcularConImpuesto(99.99, 10) === 109.99
 */
export function calcularConImpuesto(base: number, tasa: number): number {
  return Math.round(base * (1 + tasa / 100) * 100) / 100;
}

/**
 * TS-02: Agrupa números en pares e impares.
 * PURA — no muta el array original.
 * @returns { pares: number[], impares: number[] }
 *
 * Ejemplo: agruparPorParidad([1,2,3,4,5]) → { pares:[2,4], impares:[1,3,5] }
 *          agruparPorParidad([-2, -1, 0]) → { pares:[-2, 0], impares:[-1] }
 */
export function agruparPorParidad(nums: number[]): {
  pares: number[];
  impares: number[];
} {
  const pares= nums.filter(n => n % 2 === 0);
  const impares= nums.filter(n => n% 2 !== 0 );
  return {pares, impares};
}

/**
 * TS-03: Fibonacci puro y recursivo.
 * SIN variables mutables. SIN loops.
 * fibonacci(0) = 0
 * fibonacci(1) = 1
 * fibonacci(n) = fibonacci(n-1) + fibonacci(n-2)
 *
 * Ejemplo: fibonacci(10) === 55
 */
export function fibonacci(n: number): number {
  if (n===0){
    return 0;
  }else if (n===1){
    return 1;
  } else{
  return (fibonacci(n-1)+fibonacci(n-2));
  }
}

/**
 * TS-04: Valida una contraseña según tres reglas. PURA, sin I/O ni estado global.
 * Reglas:
 *   1. Mínimo 8 caracteres
 *   2. Al menos una letra MAYÚSCULA
 *   3. Al menos un dígito (0-9)
 *
 * @returns { valida: boolean, errores: string[] }
 *   Si una regla no se cumple, agregar mensaje descriptivo al array errores.
 *   Si es válida, errores debe ser [].
 *
 * Ejemplo: validarContrasena("Abc1234X") → { valida: true, errores: [] }
 *          validarContrasena("abc") → { valida: false, errores: ["Debe tener al menos 8 caracteres", "Debe contener al menos una letra mayúscula", "Debe contener al menos un dígito"] }
 */
export function validarContrasena(pass: string): {
  valida: boolean;
  errores: string[];
} {
  const e1=  pass.length <8 ? [("muy corta (menos de 8 caracteres")]: [];
  const e2=  !/[A-Z]/.test(pass) ? [("sin mayúsculas")]: [];
  const e3=  !/\d/.test(pass) ?  [("sin dígitos")]: [];

  const errores = ([]as string[]).concat(e1,e2,e3);

  return {
    valida: errores.length ===0,
    errores: errores
  };
}

/**
 * TS-05: Construye el nombre completo formateado. PURA, sin estado.
 * Si `titulo` está presente: "<titulo> <nombre> <apellido>"
 * Si no hay título:          "<nombre> <apellido>"
 *
 * Ejemplo: componerNombre("Alan", "Turing", "Dr.") === "Dr. Alan Turing"
 *          componerNombre("Grace", "Hopper")         === "Grace Hopper"
 */
export function componerNombre(
  nombre: string,
  apellido: string,
  titulo?: string
): string {
  return titulo 
    ? `${titulo} ${nombre} ${apellido}` 
    : `${nombre} ${apellido}`;
}
/*const nombre_completo: String = ""
  if (titulo){
    return nombre_completo.concat(titulo," ",nombre," ",apellido)
  } else{
    return nombre_completo.concat(nombre," ",apellido)
  };Esta solución no cumplía por usar el String */ 


// ─── GRUPO 2: Inmutabilidad ───────────────────────────────────────────────

/**
 * TS-06: Agrega un elemento al FINAL de un array SIN mutarlo.
 * NO usar .push(). Retornar NUEVO array.
 *
 * Ejemplo: agregarElemento([1,2,3], 4) → [1,2,3,4]
 *          El array original NO debe cambiar.
 */
export function agregarElemento<T>(arr: readonly T[], elemento: T): T[] {
  const agregado = [...arr,elemento];
  return agregado;
}

/**
 * TS-07: Elimina el elemento en `indice` SIN mutar el array original.
 * NO usar .splice(). Retornar NUEVO array.
 * Si el índice está fuera de rango (< 0 o >= arr.length), retornar copia del array sin cambios.
 *
 * Ejemplo: eliminarPorIndice([10,20,30,40], 1) → [10,30,40]
 *          eliminarPorIndice([10,20,30], 99)   → [10,20,30]
 */
export function eliminarPorIndice<T>(arr: readonly T[], indice: number): T[] {
  if (indice < 0 || indice >= arr.length) {
    return [...arr]; //Se retorna copia porque por función pura no se puede retornar el mismo
  }
  else{
    return arr.filter((_, i) => i !== indice);//Con filter se pueden pasar dos elementos, el elemento en sí (no importa ahora, y el indice, que si interesa)
  } //En el nuevo arreglo son todos los que NO concuerdan con el indice
}

/**
 * TS-08: Actualiza el precio de un producto SIN mutar el objeto original.
 * Retornar NUEVO objeto con el precio actualizado.
 *
 * Ejemplo:
 *   const prod = { nombre: "Libro", precio: 100, stock: 5 }
 *   actualizarPrecio(prod, 120) → { nombre: "Libro", precio: 120, stock: 5 }
 *   prod.precio === 100  // no debe cambiar
 */
export function actualizarPrecio(
  producto: { nombre: string; precio: number; [key: string]: unknown },
  nuevoPrecio: number
): { nombre: string; precio: number; [key: string]: unknown } {
  /*const nuevo_producto = producto.map(precio => nuevoPrecio);
  return nuevo_producto; No se puede mapear objetos, solo arreglos */
  return {...producto, precio: nuevoPrecio}; //Se usa spread y se pisa el valor
}

/**
 * TS-09: Retorna el array ordenado ASCENDENTEMENTE sin mutar el original.
 * ADVERTENCIA: Array.prototype.sort() muta in-place — no se puede usar directamente.
 * Pista: crear copia antes de ordenar.
 *
 * Ejemplo: ordenarSinMutar([3,1,4,1,5,9,2,6]) → [1,1,2,3,4,5,6,9]
 *          El array original NO debe cambiar.
 */
export function ordenarSinMutar(nums: readonly number[]): number[] {
    return [...nums].sort((a, b) => a - b); //hago un spread creando un nuevo arreglo y lo ordeno
}

/**
 * TS-10: Aplica un descuento porcentual a todos los productos.
 * NO mutar el array ni los objetos originales.
 * Retornar NUEVO array con NUEVOS objetos con precio descontado.
 * Precio descontado redondeado a 2 decimales.
 *
 * Ejemplo:
 *   aplicarDescuentoRegistros([{nombre:"A", precio:100}, {nombre:"B", precio:200}], 10)
 *   → [{nombre:"A", precio:90}, {nombre:"B", precio:180}]
 */
export function aplicarDescuentoRegistros(
  productos: readonly { nombre: string; precio: number }[],
  porcentaje: number
): { nombre: string; precio: number }[] {
  return productos.map((producto) => ({ //mapeo el arreglo aplicnadole el nuevo precio con descuento
    ...producto,
    precio: Math.round(producto.precio * (1 - porcentaje / 100) * 100) / 100,
  }));
}

// ─── GRUPO 3: map / filter / reduce ───────────────────────────────────────

/**
 * TS-11: Convierte todos los strings a MAYÚSCULAS.
 * Usar SOLO `map`. SIN loops.
 *
 * Ejemplo: soloMayusculas(["hola", "mundo"]) → ["HOLA", "MUNDO"]
 */
export function soloMayusculas(nombres: string[]): string[] {
  return nombres.map((nombre) => nombre.toUpperCase())
}

/**
 * TS-12: Filtra productos con precio <= precioMax.
 * Usar SOLO `filter`. SIN loops.
 *
 * Ejemplo:
 *   productosBaratos([{nombre:"A",precio:50},{nombre:"B",precio:150}], 100)
 *   → [{nombre:"A",precio:50}]
 */
export function productosBaratos(
  productos: { nombre: string; precio: number }[],
  precioMax: number
): { nombre: string; precio: number }[] {
  return productos.filter((producto) => producto.precio <= precioMax) ;
}

/**
 * TS-13: Suma todos los números.
 * Usar SOLO `reduce`. SIN loops. SIN acumulador externo (`let`).
 * Array vacío → 0.
 *
 * Ejemplo: sumaTotal([1,2,3,4,5]) === 15
 */
export function sumaTotal(nums: number[]): number {
  return nums.reduce((acumulador, nums) =>acumulador+ nums, 0);
}

/**
 * TS-14: Cuenta las ocurrencias de cada palabra en el texto.
 * Usar split() + reduce(). SIN loops.
 * Ignorar strings vacíos al separar.
 *
 * Ejemplo: contarPalabras("hola mundo hola") → { hola: 2, mundo: 1 }
 *          contarPalabras("") → {}
 */
export function contarPalabras(texto: string): Record<string, number> {
  return texto.split(" ").reduce((acc, palabra) => {
    if (palabra === "") {
      return acc;
    }
    return {
      ...acc,
      [palabra]: (acc[palabra] ?? 0) + 1,
    };
  }, {} as Record<string, number>);
}

/**
 * TS-15: Pipeline en una sola expresión encadenada:
 *   1. Filtrar números MAYORES al umbral
 *   2. Elevar al cuadrado
 *   3. Sumar todo
 * SIN loops. SIN let. SIN variables intermedias — una sola cadena .filter().map().reduce().
 *
 * Ejemplo: sumaFiltradosAlCuadrado([1,2,3,4,5], 2) === 4²+5² === 16+25 === 41
 *          sumaFiltradosAlCuadrado([1,2,3], 10) === 0  (ninguno supera umbral)
 */
export function sumaFiltradosAlCuadrado(nums: number[], umbral: number): number {
  return nums
    .filter((n) => n > umbral)
    .map((n) => n * n)
    .reduce((acc, n) => acc + n, 0);
} //pipeline en ts se hace a lo que queres hacerle y luego . cada funcion

/**
 * TS-16: Promedio de notas de estudiantes aprobados (nota >= 6).
 * SIN loops. Pipeline funcional.
 * Si no hay aprobados, retornar 0.
 *
 * Ejemplo:
 *   promedioAprobados([{nombre:"Ana",nota:8},{nombre:"Beto",nota:4},{nombre:"Carla",nota:6}])
 *   === (8+6)/2 === 7
 */

export function promedioAprobados(
  estudiantes: { nombre: string; nota: number }[]
): number {
  const aprobados = estudiantes.filter((estudiante) => estudiante.nota >= 6); //creo la constante a filtrada
  return aprobados.length === 0
    ? 0
    : aprobados.reduce((acc, estudiante) => acc + estudiante.nota, 0) /
        aprobados.length; //aplico el reduce entero y luego aplico la division de aprobados
}


/**
 * TS-17: Aplana un array de arrays en un solo array usando flatMap.
 * [[1,2],[3,4],[5]] → [1,2,3,4,5]
 * SIN loops. SIN reduce manual de aplanamiento.
 */
export function aplanarLista<T>(listas: T[][]): T[] {
  return listas.flatMap((lista)=> lista );//le paso una lista devuelve una lista
}

/**
 * TS-18: Suma los montos de transacciones de tipo 'credito' con monto > 100.
 * Pipeline funcional completo. SIN loops.
 *
 * Ejemplo:
 *   totalVentasCredito([
 *     {monto: 200, tipo: 'credito'},
 *     {monto: 50,  tipo: 'credito'},
 *     {monto: 300, tipo: 'debito'},
 *     {monto: 150, tipo: 'credito'},
 *   ]) === 350  (solo 200 y 150: ambos credito y > 100)
 */
export function totalVentasCredito(
  transacciones: { monto: number; tipo: "credito" | "debito" }[]
): number {
  const creditos = transacciones.filter((transaccion) => transaccion.tipo === "credito");
  return creditos
    .filter((credito) => credito.monto > 100)
    .reduce((acc , credito) => credito.monto+acc , 0);
}

// ─── GRUPO 4: Composición y HOF ────────────────────────────────────────────

/**
 * TS-19: Composición de dos funciones.
 * compose(f, g)(x) === f(g(x))  — g se aplica PRIMERO, luego f.
 *
 * Ejemplo:
 *   const inc = (x: number) => x + 1;
 *   const doble = (x: number) => x * 2;
 *   compose(inc, doble)(3) === 7  // doble(3)=6, luego inc(6)=7
 */
export function compose<T>(f: (x: T) => T, g: (x: T) => T): (x: T) => T {
  return (x: T) => f(g(x)); //Literalmente le digo a ts que haa f(g(x))
}

/**
 * TS-20: Pipe con N funciones. Las aplica de izquierda a derecha.
 * pipe(f, g, h)(x) === h(g(f(x)))
 *
 * Ejemplo:
 *   const proc = pipe(
 *     (x: number) => x + 1,    // 3→4
 *     (x: number) => x * 2,    // 4→8
 *     (x: number) => x - 1,    // 8→7
 *   );
 *   proc(3) === 7
 */
export function pipe<T>(...fns: Array<(x: T) => T>): (x: T) => T {
  return (x: T) => fns.reduce((acc, fn) => fn(acc), x);
}

/**
 * TS-21: Currying de función binaria.
 * curry2(fn)(a)(b) === fn(a, b)
 *
 * Ejemplo:
 *   const sumar = (a: number, b: number) => a + b;
 *   const sumarCurried = curry2(sumar);
 *   sumarCurried(3)(4) === 7
 *   sumarCurried(10)(5) === 15
 */
export function curry2<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => fn(a, b);
}

/**
 * TS-22: Aplicación parcial del primer argumento.
 * partial(fn, a)(b) === fn(a, b)
 *
 * Ejemplo:
 *   const multiplicar = (a: number, b: number) => a * b;
 *   const triplicar = partial(multiplicar, 3);
 *   triplicar(4) === 12
 *   triplicar(7) === 21
 */
export function partial<A, B, C>(fn: (a: A, b: B) => C, a: A): (b: B) => C {
  return (b: B) => fn(a, b);
}

// ─── GRUPO 5: Contraste Imperativo vs Funcional ────────────────────────────

/**
 * TS-23: Versión FUNCIONAL del siguiente código imperativo.
 *
 * Equivalente imperativo (NO usar esto — implementar en estilo funcional):
 *   let total = 0;
 *   let count = 0;
 *   for (let i = 0; i < ventas.length; i++) {
 *     if (ventas[i].monto > 100) {
 *       total += ventas[i].monto;
 *       count++;
 *     }
 *   }
 *   return { total, count, promedio: count > 0 ? total / count : 0 };
 *
 * Restricciones: SOLO `const`, `filter`, `reduce`. Cero `let`, cero loops.
 *
 * Ejemplo:
 *   procesarVentas([{monto:200,tipo:"online"},{monto:50,tipo:"local"},{monto:300,tipo:"online"}])
 *   → { total: 500, count: 2, promedio: 250 }
 */
export function procesarVentas(
  ventas: { monto: number; tipo: string }[]
): { total: number; count: number; promedio: number } {
  throw new Error("No implementado");
}

/**
 * TS-24: Estadísticas de un array numérico — estilo FUNCIONAL.
 * SIN loops. SIN let. SOLO const + map/filter/reduce/spread/Math.
 *
 * @returns { min, max, sum, promedio, mediana }
 *   mediana: elemento central si longitud impar;
 *            promedio de los dos centrales si longitud par.
 *   Array vacío → { min: 0, max: 0, sum: 0, promedio: 0, mediana: 0 }
 *
 * Ejemplo: estadisticasArray([3, 1, 4, 1, 5, 9, 2, 6])
 *   → { min: 1, max: 9, sum: 31, promedio: 3.875, mediana: 3.5 }
 *   (sorted: [1,1,2,3,4,5,6,9] → mediana = (3+4)/2 = 3.5)
 */
export function estadisticasArray(nums: number[]): {
  min: number;
  max: number;
  sum: number;
  promedio: number;
  mediana: number;
} {
  throw new Error("No implementado");
}

/**
 * TS-25: Pipeline funcional completo — transformación de datos.
 *
 * Dado un array de registros, aplicar el siguiente pipeline
 * SIN loops, SIN let, SIN mutación:
 *   1. Filtrar solo registros con `activo: true`
 *   2. Para cada uno, calcular el PROMEDIO de sus `ventas` (array de números)
 *   3. Ordenar por promedio DESCENDENTE (sin mutar el array)
 *   4. Retornar solo { nombre, promedio } con promedio redondeado a 2 decimales
 *
 * Si `ventas` está vacío, el promedio es 0.
 *
 * Ejemplo:
 *   transformarDatos([
 *     { nombre: "Ana",   ventas: [100, 200, 150], activo: true  },
 *     { nombre: "Beto",  ventas: [50],            activo: false },
 *     { nombre: "Carla", ventas: [300, 400],       activo: true  },
 *     { nombre: "Dana",  ventas: [],               activo: true  },
 *   ])
 *   → [
 *       { nombre: "Carla", promedio: 350   },
 *       { nombre: "Ana",   promedio: 150   },
 *       { nombre: "Dana",  promedio: 0     },
 *     ]
 */
export function transformarDatos(
  registros: { nombre: string; ventas: number[]; activo: boolean }[]
): { nombre: string; promedio: number }[] {
  throw new Error("No implementado");
}
