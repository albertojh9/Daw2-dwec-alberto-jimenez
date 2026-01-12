import * as http from "../../js/lib/http.mjs";

let todosLasPersonas = [];
let graficaEmpresas, graficaDistribucion, graficaAlfabetica;

$(document).ready(() => {
    $("#btVolver").on("click", () => window.location = "personas.html");
    $("#btCerrarSesion").on("click", () => cerrarSesion());
    cargarDatosYGenerarGraficas();
});

function cargarDatosYGenerarGraficas() {
    http.get(URL_PERSONAS + "?_limit=1000")
        .then(r => r.json())
        .then(personas => {
            todosLasPersonas = personas;
            calcularEstadisticas(personas);
            generarGraficaEmpresas(personas);
            generarGraficaDistribucion(personas);
            generarGraficaAlfabetica(personas);
        });
}

function calcularEstadisticas(personas) {
    $("#totalPersonas").text(personas.length);
    const conEmp = personas.filter(c => c.empresa && c.empresa.trim()).length;
    $("#conEmpresa").text(conEmp);
    $("#sinEmpresa").text(personas.length - conEmp);
    const empresasSet = new Set(personas.filter(c => c.empresa).map(c => c.empresa.trim().toLowerCase()));
    $("#empresasUnicas").text(empresasSet.size);
}

function generarGraficaEmpresas(personas) {
    const empresasMap = new Map();
    personas.forEach(c => {
        if (c.empresa && c.empresa.trim()) {
            const emp = c.empresa.trim();
            empresasMap.set(emp, (empresasMap.get(emp) || 0) + 1);
        }
    });
    
    const empresasArray = Array.from(empresasMap.entries()).sort((a,b) => b[1] - a[1]).slice(0, 5);
    const labels = empresasArray.map(i => i[0]);
    const datos = empresasArray.map(i => i[1]);
    
    const ctx = document.getElementById('graficaEmpresas').getContext('2d');
    if (graficaEmpresas) graficaEmpresas.destroy();
    
    graficaEmpresas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Número de Personas',
                data: datos,
                backgroundColor: ['rgba(54,162,235,0.6)', 'rgba(255,206,86,0.6)', 'rgba(75,192,192,0.6)', 'rgba(153,102,255,0.6)', 'rgba(255,159,64,0.6)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}

function generarGraficaDistribucion(personas) {
    const conEmp = personas.filter(c => c.empresa && c.empresa.trim()).length;
    const sinEmp = personas.length - conEmp;
    
    const ctx = document.getElementById('graficaDistribucion').getContext('2d');
    if (graficaDistribucion) graficaDistribucion.destroy();
    
    graficaDistribucion = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Con Empresa', 'Sin Empresa'],
            datasets: [{
                data: [conEmp, sinEmp],
                backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,159,64,0.6)']
            }]
        },
        options: { responsive: true }
    });
}

function generarGraficaAlfabetica(personas) {
    const letrasMap = new Map();
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(l => letrasMap.set(l, 0));
    
    personas.forEach(c => {
        if (c.nombre && c.nombre.length > 0) {
            const inicial = c.nombre.charAt(0).toUpperCase();
            if (letrasMap.has(inicial)) {
                letrasMap.set(inicial, letrasMap.get(inicial) + 1);
            }
        }
    });
    
    const labels = Array.from(letrasMap.keys());
    const datos = Array.from(letrasMap.values());
    
    const ctx = document.getElementById('graficaAlfabetica').getContext('2d');
    if (graficaAlfabetica) graficaAlfabetica.destroy();
    
    graficaAlfabetica = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Cantidad de Personas',
                data: datos,
                backgroundColor: 'rgba(54,162,235,0.2)',
                borderColor: 'rgba(54,162,235,1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true } }
        }
    });
}
