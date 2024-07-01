import 'cypress-file-upload';
//Натискання на кнопку
Cypress.Commands.add('clickButton', (id, name) => {
    cy.get(`${id}`)
    .should('be.visible')
    .contains(`${name}`)
    .click()
  })

//Прикріплення сертифікату  
Cypress.Commands.add('drop', { prevSubject: 'element' }, (subject, filePath) => {
    cy.fixture(filePath, 'binary')
      .then(Cypress.Blob.binaryStringToBlob)
      .then((blob) => {
        const dataTransfer = new DataTransfer()
        const file = new File([blob], filePath)
        dataTransfer.items.add(file)
  
        cy.wrap(subject)
          .trigger('drop', { dataTransfer })
      })
  })
//Drop сертифікату
Cypress.Commands.add('addCertificate', (fileName) => {
    cy.get('.ng-isolate-scope') 
    .drop(`${fileName}`)
  })
//Перевіряємо інформації про сертифікат
  Cypress.Commands.add('checkCertificateData',() => {
    cy.contains(/SubjectCN/i).should('be.visible')
    cy.contains(/IssuerCN/i).should('be.visible')
    cy.contains(/ValidFrom/i).should('be.visible')
    cy.contains(/ValidTill/i).should('be.visible')
    cy.get('td.ng-binding').should('have.length', 4).each(($element) => {
      cy.wrap($element).should('not.be.empty')
    })
  })


// Додаємо сертифікат та перевіряємо кількість сертифікатів
Cypress.Commands.add('addNextCertificate', (name) => {
  cy.get('.list-group').then($list => {
    const initialCount = $list.find('a').length;
    cy.get('.btn-secondary').should('not.be.visible')
    cy.clickButton('.btn-primary','Добавить').should('not.be.visible')
    cy.get('.btn-secondary').should('be.visible')
    cy.contains(/SubjectCN/i).should('not.be.exist')
    cy.contains(/IssuerCN/i).should('not.be.exist')
    cy.contains(/ValidFrom/i).should('not.be.exist')
    cy.contains(/ValidTill/i).should('not.be.exist')
    cy.addCertificate(`${name}`)
    cy.get('.list-group').find('a').should('have.length', initialCount + 1)
})
})

// Перевіряємо, що при натиску на назву сертифікати він стає активним
Cypress.Commands.add('checkActiveCertificate', () => {
cy.get('.list-group-item').first().as('firstItem')
cy.get('@firstItem').should('not.have.class', 'active')
cy.get('@firstItem').click()
cy.get('@firstItem').should('have.class', 'active')
cy.get('@firstItem').first().then(($firstLink) => {
  const firstLinkText = $firstLink.text().trim()
  cy.get('td.ng-binding').should('contain.text', firstLinkText);
})
})