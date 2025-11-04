
fetch('http://localhost:3000/contactos') // Realiza la petición a la URL
  .then(response => {
    returnresponse.text();
    })        // Obtiene una promesa de que obtendrá el texto
    
   .then(data => {
    const datos = JSON.parse(data);

    document.getElementById('contactos').innerHTML = datos[0].empresa;
   });               // Muestra el texto en la consola


let url = 'http://localhost:3000/contactos/2';
  let data = {
    nombre: 'Alejandro',
    apellidos: 'Sanchez',
};


  fetch(url, {
    method: 'PUT', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    res.json()
  })  
  
  .catch(error => console.error('Error:', error))
  .then(
    response => console.log('Success:', response)
);