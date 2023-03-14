const apiUrl = 'http://localhost:3000/';
const from = document.getElementById('from');

async function addData(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newData = await res.json();

  return newData;
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  console.log('Agregando datos a la base de datos');

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    nombre: formData.get('nombre'),
    categoria: formData.get('categoria'),
    precio: parseFloat(formData.get('precio')),
    descripcion: formData.get('descripcion'),
    imagen: formData.get('imagen'),
    estrellas: parseInt(formData.get('estrellas')),
  };

  console.log(data);

  const newData = await addData(apiUrl, data);

  console.log('Agregando datos a la base de datos');
  console.log('Resultado:', newData);

  await form.reset();
  alert('Se agrego un nuevo producto a la tienda');
});
