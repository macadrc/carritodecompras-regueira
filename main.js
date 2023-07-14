
const productosJSON = '[{"nombre": "royal", "precio": 20}, {"nombre": "harina", "precio": 50}, {"nombre": "azúcar", "precio": 70}, {"nombre": "huevos", "precio": 100}]';

const productos = JSON.parse(productosJSON);


let carrito = [];

const seleccionElemento = document.getElementById('seleccion');
const productosDisponiblesElemento = document.getElementById('productos-disponibles');
const carritoElemento = document.getElementById('carrito');
const totalElemento = document.getElementById('total');

// Lista de productos disponibles
productosDisponiblesElemento.textContent = 'Productos disponibles:';
for (var i = 0; i < productos.length; i++) {
  const producto = productos[i];
  const productoElemento = document.createElement('div');
  productoElemento.textContent = `${producto.nombre} - $${producto.precio}`;
  productosDisponiblesElemento.appendChild(productoElemento);
}

// Agregar productos al carrito
function agregarAlCarrito() {
  var productIndex = parseInt(document.getElementById('input-producto').value);
  var unidades = parseInt(document.getElementById('input-unidades').value);

  if (productIndex >= 0 && productIndex < productos.length) {
    var productoSeleccionado = productos[productIndex];
    carrito.push({ producto: productoSeleccionado.nombre, unidades, precio: productoSeleccionado.precio });

    // Mostrar el carrito actualizado
    carritoElemento.textContent = 'Productos en el carrito:';
    for (var i = 0; i < carrito.length; i++) {
      const item = carrito[i];
      const itemElemento = document.createElement('div');
      itemElemento.textContent = `${item.producto} - $${item.precio}`;
      carritoElemento.appendChild(itemElemento);
    }

    // Calcular y mostrar el total a pagar
    const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
    totalElemento.textContent = `Total a pagar: $${total}`;
  } else {
    alert("No contamos con ese producto en este momento");
  }
}

// Función para finalizar la compra
function finalizarCompra() {
  // Mostrar los detalles de la compra
  carrito.forEach((carritoFinal) => {
    console.log(`Producto: ${carritoFinal.producto}, Unidades: ${carritoFinal.unidades}, Total a pagar: ${carritoFinal.unidades * carritoFinal.precio}`);
  });

  // Limpiar el carrito y los campos de entrada
  carrito = [];
  carritoElemento.textContent = 'Productos en el carrito:';
  totalElemento.textContent = 'Total a pagar:';

  // Mostrar mensaje de agradecimiento
  alert("Gracias por elegirnos");
}

// Agregar controladores de eventos a los botones
document.getElementById('btn-agregar').addEventListener('click', agregarAlCarrito);
document.getElementById('btn-finalizar').addEventListener('click', finalizarCompra);

// Obtener la selección del usuario
let seleccion = prompt("Bienvenido, ¿desea seleccionar los productos de su preferencia?");
while (seleccion !== "si" && seleccion !== "no") {
  seleccion = prompt("Bienvenido, ¿desea seleccionar los productos de su preferencia?");
}

// Actualizar el elemento de selección en el DOM
seleccionElemento.textContent = `Selección: ${seleccion}`;

if (seleccion === "no") {
  finalizarCompra();
}
