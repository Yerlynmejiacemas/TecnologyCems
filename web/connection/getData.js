const apiUrl = 'http://localhost:3000/';

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

async function init() {
  const data = await getData(apiUrl);

  const listaDeProductos = document.getElementById('listaDeProductos');
  const cantidadDeProductos = document.getElementById('products-qty');
  let resultadoHTML = '';

  console.log('Obteniendo datos de la base de datos');
  console.log(data);

  data.forEach(producto => {
    const template = /*html*/ `
    <article
      class="product"
      data-id="${producto.id}"
      data-name="${producto.nombre}"
      data-category="${producto.categoria}"
      data-price="${producto.precio}"
      data-image="${producto.imagen}"
      data-review="${producto.estrellas}"
    >
      <div class="product-img-container in-line">
        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
          class="product-img"
        />
      </div>

      <div class="product-content in-stack">
        <h2 class="product-name">
          ${producto.nombre}
        </h2>
        <p class="product-price" aria-label="Precio en pesos argentinos:">$${producto.precio}</p>
        <div class="review filters-review" aria-label="Puntaje 5">
          <i class="fas fa-star" aria-hidden="true"></i>
          <i class="fas fa-star" aria-hidden="true"></i>
          <i class="fas fa-star" aria-hidden="true"></i>
          <i class="far fa-star" aria-hidden="true"></i>
          <i class="far fa-star" aria-hidden="true"></i>
        </div>
        <div>
          <button type="button" class="button button-simple-solid button-add-to-cart" id="${producto.id}">Comprar</button>
        </div>
      </div>
      <div class="product-description is-hidden">
        ${producto.descripcion}
      </div>
    </article>
    `;

    resultadoHTML += template;
  });

  cantidadDeProductos.innerHTML = `Mostrando ${data.length} producto(s) de ${data.length}`;
  if (data.length > 0) {
    listaDeProductos.innerHTML = resultadoHTML;
  } else {
    listaDeProductos.innerHTML = 'No hay productos disponibles! Vuelve más tarde.';
  }
}

init().then(() => {
  console.log('Carga de datos finalizada');
});
