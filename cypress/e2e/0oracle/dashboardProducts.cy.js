describe('Login Page', () => {
    let $dataTable = new Array();

  beforeEach(() => {
    // Make login page before each test
    cy.visit('https://apex.oracle.com/pls/apex/r/danmende/qa-application/home')
    // Enter valid credentials and click login
    //should login with valid credentials
    cy.get('#P9999_USERNAME').type(Cypress.env('qa_usr'))
    cy.get('#P9999_PASSWORD').type(Cypress.env('qa_psw'))
    cy.get('#B12601466532783624621').click()
    cy.wait(2000)
    cy.url().should('contain', 'https://apex.oracle.com/pls/apex/r/danmende/qa-application/home?');
    cy.get('#R12602633341339750555_ig').should('be.visible');
  })

  // Save values in chart in memory
  it.only('load table into memory', () => {
    // Initialize the array
    const $dataTable = [];
  
    cy.get("table > tbody > tr td").each(($el1, index1) => {
      // Calculate the row index based on the current cell index
      const rowIndex = Math.floor(index1 / 5);
  
      // Initialize the object for each row
      if (!$dataTable[rowIndex]) {
        $dataTable[rowIndex] = {};
      }
  
      // Determine the property based on the cell index
      if (index1 % 5 === 1) {
        $dataTable[rowIndex].Order = $el1.text();
      } else if (index1 % 5 === 2) {
        $dataTable[rowIndex].ProductName = $el1.text();
      } else if (index1 % 5 === 3) {
        $dataTable[rowIndex].Quantity = $el1.text();
      } else if (index1 % 5 === 4) {
        $dataTable[rowIndex].Customer = $el1.text();
      }
    });
  
    // Log the extracted data
    cy.log($dataTable);
  });
  

  // Access table and change the quantity of order 10 to 20. Verify table data is updated and chart is updated
  it('update quantity', () => {
    cy.get("table > tbody > tr").contains('td:nth-child(3)', '10').should('be.visible');
    cy.get("table > tbody > tr td:nth-child(3)").each(($el, index, $list) => {
        var texto = $el.text()
        if (texto.includes("10")) {
            cy.get("table > tbody > tr td:nth-child(5)").eq(index).dblclick().type("20{enter}")
            cy.get("table > tbody > tr td:nth-child(5)").eq(index).then(function(qtd){
                var qtdup = qtd.text()
                expect(qtdup).to.equal("20")
            })
        }
    })
  })

  // Access table and change the location of order 10 to Deli. Verify table data is updated and chart is updated.
  it('update location', () => {
    cy.get("table > tbody > tr").contains('td:nth-child(3)', '10').should('be.visible');
    cy.get("table > tbody > tr td:nth-child(3)").each(($el, index, $list) => {
      var texto = $el.text()
      if (texto.includes("10")) {
            cy.get("table > tbody > tr td:nth-child(6)").eq(index).dblclick().type("Deli")
            cy.get('.a-PopupLOV-searchBar > .a-Button').click()
            cy.wait(5000)
            cy.get('.a-IconList-item').click()
            cy.get('#B12602635547059750577').click()
            cy.get("table > tbody > tr td:nth-child(6)").eq(index).then(function(cst){
              var cstup = cst.text()
              expect(cstup).to.equal('Deli')
            })
        }
    })
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
  // Your custom handling for uncaught exceptions
  // For example, you can log the error or take specific actions based on the error type.
  // You can also prevent Cypress from failing the test by returning false here.

  // For demonstration purposes, let's log the error to the console.
  console.error('Uncaught Exception:', err.message);

  // Returning false here prevents Cypress from failing the test due to the uncaught exception.
  return false;
  });

});