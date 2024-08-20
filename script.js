let pedidos = {};
let total = {};

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

function removeItem(tableId, index) {
    if (pedidos[tableId] && pedidos[tableId][index]) {
        total[tableId] -= pedidos[tableId][index].price;
        pedidos[tableId].splice(index, 1);
        actualizarPedido(tableId);
    }
}

function clearOrder(tableId) {
    pedidos[tableId] = [];
    total[tableId] = 0.00;
    actualizarPedido(tableId);
}

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

const firebaseConfig = {
    apiKey: "AIzaSyAw5BAsmfQAqHO0HGksTHlFb4UdJGfLNOg",
    authDomain: "restaurante-breslyn.firebaseapp.com",
    projectId: "restaurante-breslyn",
    storageBucket: "restaurante-breslyn.appspot.com",
    messagingSenderId: "144567784782",
    appId: "1:144567784782:web:06aaac32a71877f96d3a1f",
    measurementId: "G-CJXH38E1F3"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  
// Inicializar la primera mesa como activa
document.addEventListener('DOMContentLoaded', () => openTable('table1'));
