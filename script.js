let pedido = [];
let total = 0.00;

function addPlato(name, price) {
    const plato = { name, price };
    pedido.push(plato);
    total += price;
    actualizarPedido();
}

function removePlato(index) {
    total -= pedido[index].price;
    pedido.splice(index, 1);
    actualizarPedido();
}

function actualizarPedido() {
    const pedidoList = document.getElementById('pedido-list');
    pedidoList.innerHTML = '';
    pedido.forEach((plato, index) => {
        const li = document.createElement('li');
        li.textContent = `${plato.name} - s/.${plato.price.toFixed(2)}`;
        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.onclick = () => removePlato(index);
        li.appendChild(button);
        pedidoList.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}
