import { serviceAderezos } from "./service.js";

const carritoContainer = document.querySelector("[data_carrito]");
const formulario = document.querySelector("[data_form]");

function createProduct({ name, price, img, id }) {
    const product = document.createElement("div");
    product.classList.add("product"); 

    product.innerHTML = `
        <div class="product_image">
            <div class="product_image_container">
                <img src="${img}" alt="Imagen de ${name}">
            </div>
        </div>
        <div class="product_info">
            <p>${name}</p>
            <div class="product_price">
                <p>$ ${price}</p>
                <button class="button_delete" data_id="${id}">
                    <img src="../assets/eliminar.png" alt="Botón para eliminar ${name}">
                </button>
            </div>
        </div>
    `;

    const deleteButton = product.querySelector('.button_delete');
    deleteButton.addEventListener('click', async () => {
        try {
            await serviceAderezos.deleteAderezos(id);
            product.remove();
        } catch (err) {
            console.error('Error elimando producto:', err);
        }
    });

    return product;
}

const render = async () => {
    try {
        const productList = await serviceAderezos.listAderezos();
        productList.forEach(product => {
            carritoContainer.appendChild(createProduct(product));
        });
    } catch (error) {
        console.error('Error cargando producto:', error);
    }
};

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("[data_name]").value;
    const price = document.querySelector("[data_price]").value;
    const img = document.querySelector("[data_image]").value;

    try {
        const newProduct = await serviceAderezos.createAderezos(name, price, img);
        carritoContainer.appendChild(createProduct(newProduct));
    } catch (err) {
        console.error('Error creando producto:', err);
    }
});

render();
