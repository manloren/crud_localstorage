$(document).ready(function () {

    // Mostrar datos al cargar la página
    displayData();

    // Guardar o actualizar un producto al hacer clic en el botón guardar
    $('#save-button').click(function () {
        crearOActualizarProducto();
    })

    // Función para crear o actualizar un producto
    function crearOActualizarProducto() {
        let inputName = $('#input-name').val();
        let inputPrice = $('#input-price').val();
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let index = $('#input-name').data('index');

        if (index === undefined) {

            // Crear un nuevo producto
            products.push({
                name: inputName,
                price: inputPrice
            })
        }
        else {
            // Actualizar un producto existente
            products[index] = {
                name: inputName,
                price: inputPrice
            }
            $('#input-name').removeData('index');
        }
        localStorage.setItem('products', JSON.stringify(products));
        displayData();
        $('#input-name').val('');
        $('#input-price').val('');
    }

    // Función para leer y mostrar los productos
    function displayData() {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        let displayList = $('#display-data');
        displayList.empty();

        if (products.length === 0) {
            displayList.append('<li> No hay productos registrados </li>')
        } else {
            $.each(products, function (index, product) {
                let listItem = $('<li>').text(product.name + ' - $' + product.price);
                let deleteButton = $('<button class="btn btn-danger">').text('Eliminar').click(function () {
                    deleteProduct(index);
                });
                let editButton = $('<button class="btn btn-warning">').text('Editar').click(function () {
                    editProduct(index, product);
                });
                listItem.append(deleteButton).append(editButton);
                displayList.append(listItem);
            })
        }
    }

    // Funcion para eliminar un producto
    function deleteProduct(index) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayData();
    }

    // Función para editar un producto
    function editProduct(index, product) {
        $('#input-name').val(product.name);
        $('#input-price').val(product.price);
        $('#input-name').data('index', index);
    }
})