// JavaScript: Conectando la interfaz de usuario con Magic Loops

// Función para mostrar mensajes de alerta
function showAlert(message, type = 'success') {
    const alertEl = document.querySelector('.custom-alert');
    alertEl.querySelector('.alert-message').textContent = message;
    alertEl.classList.remove('alert-success', 'alert-error');
    alertEl.classList.add(type === 'success' ? 'alert-success' : 'alert-error', 'show');
    setTimeout(() => {
        alertEl.classList.remove('show');
    }, 3000);
}

// Envío del formulario de pedido personalizado - llamando al bucle PersonalizationAPI
document.getElementById('customOrderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Mostrar el spinner de carga
    document.querySelector('.loading-spinner').style.display = 'flex';

    const nombre = document.getElementById('name').value;
    const correo = document.getElementById('email').value;
    const personaje = document.getElementById('character').value;
    const color = document.getElementById('colors').value || "#f4a261"; // color predeterminado si está vacío
    const detalles = document.getElementById('details').value;

    // Construir la carga útil mapeando a PersonalizationAPI ejemplo: "color" y "personaje"
    const payload = { color, personaje };

    try {
        const response = await fetch('https://magicloops.dev/api/loop/3234607f-0a3e-414c-9160-b2718d1fab71/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const responseJson = await response.json();
        // Opcionalmente, manejar lógica adicional después de la respuesta
        showAlert('¡Pedido personalizado recibido! ' + responseJson.confirmation);
        document.getElementById('customOrderForm').reset();
    } catch (error) {
        showAlert('No se pudo enviar el pedido personalizado.', 'error');
    } finally {
        document.querySelector('.loading-spinner').style.display = 'none';
    }
});

// Envío del formulario de contacto - llamando al bucle ContactFormAPI
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Mostrar el spinner de carga
    document.querySelector('.loading-spinner').style.display = 'flex';

    const nombre = document.getElementById('contactName').value;
    const correo = document.getElementById('contactEmail').value;
    const asunto = document.getElementById('contactSubject').value;
    const mensaje = document.getElementById('contactMessage').value;
    // Concatenar asunto y mensaje para formar un texto completo
    const mensajeCompleto = asunto + " - " + mensaje;

    // Construir la carga útil para ContactFormAPI
    const payload = { nombre, correo, mensaje: mensajeCompleto };

    try {
        const response = await fetch('https://magicloops.dev/api/loop/8aa2ed4c-6461-48ec-bc1e-d03d0bbef2de/run', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const responseJson = await response.json();
        // Opcionalmente, manejar lógica adicional después de la respuesta
        showAlert('¡Mensaje enviado! ' + responseJson.confirmation);
        document.getElementById('contactForm').reset();
    } catch (error) {
        showAlert('No se pudo enviar el mensaje.', 'error');
    } finally {
        document.querySelector('.loading-spinner').style.display = 'none';
    }
});

// Inicialización de animaciones AOS
AOS.init();
