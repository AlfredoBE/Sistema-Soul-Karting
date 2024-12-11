describe("Prueba de acceso al componente casual", () => {
  it("Cambiar nombre de cliente casual", () => {
    // Visitar la página de login
    cy.visit("http://localhost:3000");

    // Ingresar el nombre de usuario y contraseña (usamos las credenciales de admin)
    cy.get('input[name="username"]').type("admin");
    cy.get('input[name="password"]').type("admin");

    // Hacer clic en el botón de iniciar sesión
    cy.get('button[type="submit"]').click();

    cy.get('.swal2-confirm').click();
    // Verificar que la página de administración se ha cargado correctamente
    cy.contains("Casuales").should("be.visible");

    // Verificar que el componente está renderizando la lista de clientes
    cy.get(".box").should("have.length.greaterThan", 0); // Asegura que haya al menos un cliente

    // Verificar el contenido de un cliente (ejemplo)
    cy.get(".tarjeta").first().contains("Plan").should("be.visible");

    // Verificar que el botón "Modificar" esté presente dentro del contenedor con la clase 'casuales'
    cy.get('.casuales').find('button').contains("Modificar").should("be.visible").click();

    // Suponiendo que el formulario para editar el cliente se abre, buscar el campo del nombre dentro del contenedor con la clase 'casuales' y cambiarlo
    cy.get('.casuales').find('input[name="nombre"]').clear().type("juanito");

    // Hacer clic en el botón "Actualizar" dentro del contenedor con la clase 'casuales' para guardar los cambios
    cy.get('.casuales').find('button').contains("Actualizar").should("be.visible").click();

    cy.get('.swal2-confirm').click();

    // Verificar si la actualización se realizó correctamente, por ejemplo, verificar que el nombre haya cambiado en la lista
    cy.get(".tarjeta").first().contains("juanito").should("be.visible");

    cy.get('.casuales').find('button').contains("Iniciar").should("be.visible").click();

    // Esperar 10 segundos
    cy.wait(10000);

    cy.get('.swal2-confirm').click();


    cy.get('.casuales') // Selecciona los elementos con la clase .casuales
    .first() // Toma el primer elemento de la lista
    .find('.tarjeta') // Busca el elemento .tarjeta dentro de .casuales
    .should('have.css', 'background-color', 'rgb(138, 54, 54)') // Verifica que tenga un fondo rojo
    .parents('.casuales') // Regresa al contenedor .casuales
    .find('button') // Encuentra el botón dentro de .casuales
    .contains('Retirar') // Asegura que el botón contenga el texto "Retirar"
    .click(); // Hace clic en el botón "Retirar"


    cy.get('.casuales') // Selecciona los elementos con la clase .casuales
    .first() // Toma el primer elemento de la lista
    .find('.tarjeta') // Busca el elemento .tarjeta dentro de .casuales
    .should('not.have.css', 'background-color', 'rgb(138, 54, 54)') // Verifica que no tenga un fondo rojo  

})
});

  
  