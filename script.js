let pedidos = {};
let total = {};

// Función para agregar un ítem a la mesa
function addItem(tableId, name, price) {
    if (!pedidos[tableId]) {
        pedidos[tableId] = [];
        total[tableId] = 0.00;
    }
    
    const item = { name, price };
    pedidos[tableId].push(item);
    total[tableId] += price;
    actualizarPedido(tableId);
}

// Función para eliminar un ítem de la mesa
function removeItem(tableId, index) {
    if (pedidos[tableId] && pedidos[tableId][index]) {
        total[tableId] -= pedidos[tableId][index].price;
        pedidos[tableId].splice(index, 1);
        actualizarPedido(tableId);
    }
}

// Función para limpiar el pedido de la mesa
function clearOrder(tableId) {
    pedidos[tableId] = [];
    total[tableId] = 0.00;
    actualizarPedido(tableId);
}

// Función para actualizar la visualización del pedido
function actualizarPedido(tableId) {
    const pedidoList = document.getElementById(`pedido-list-${tableId}`);
    const totalElement = document.getElementById(`total-${tableId}`);
    
    if (!pedidoList || !totalElement) return;

    pedidoList.innerHTML = '';
    if (pedidos[tableId]) {
        pedidos[tableId].forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - S/${item.price.toFixed(2)}`;
            const button = document.createElement('button');
            button.textContent = 'Eliminar';
            button.onclick = () => removeItem(tableId, index);
            li.appendChild(button);
            pedidoList.appendChild(li);
        });
    }
    totalElement.textContent = total[tableId].toFixed(2);
}

// Función para abrir una pestaña del menú
function openTab(tabName, tableId) {
    const tabContents = document.querySelectorAll(`#${tableId} .tab-content`);
    const tabButtons = document.querySelectorAll(`#${tableId} .tab-button`);

    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.querySelector(`#${tableId} #${tabName}`).classList.add('active');
    document.querySelector(`#${tableId} .tab-button[onclick="openTab('${tabName}', '${tableId}')"]`).classList.add('active');
}

// Función para abrir/cerrar la interfaz de una mesa
function openTable(tableId) {
    const tableContents = document.querySelectorAll('.table-content');
    const tableButtons = document.querySelectorAll('.table');
    
    tableContents.forEach(content => {
        if (content.id === tableId) {
            content.classList.toggle('active');
        } else {
            content.classList.remove('active');
        }
    });

    tableButtons.forEach(button => {
        if (button.textContent.includes(tableId.replace('table', ''))) {
            button.classList.toggle('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Asignar funciones al ámbito global si se usa type="module"
window.addItem = addItem;
window.removeItem = removeItem;
window.clearOrder = clearOrder;
window.openTab = openTab;
window.openTable = openTable;

// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

// Configuración de Firebase
const firebaseConfig = {
   apiKey: "AIzaSyAw5BAsmfQAqHO0HGksTHlFb4UdJGfLNOg",
   authDomain: "restaurante-breslyn.firebaseapp.com",
   databaseURL: "https://restaurante-breslyn-default-rtdb.firebaseio.com",
   projectId: "restaurante-breslyn",
   storageBucket: "restaurante-breslyn.appspot.com",
   messagingSenderId: "144567784782",
   appId: "1:144567784782:web:06aaac32a71877f96d3a1f",
   measurementId: "G-CJXH38E1F3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar la primera mesa como activa al cargar la página
document.addEventListener('DOMContentLoaded', () => openTable('table1'));
