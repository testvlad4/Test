describe('Тест Додавання сертифікату', () =>{
    it('Додавання сертифікату і перемикання між ними', () => {
        cy.visit('/')
        //Вхід на сайт
        cy.clickButton('#promptToRun > div > button','Run this project')
        //Прикріпляємо сертифікат
        cy.addNextCertificate('cert.cer')
        // Перевіряємо дані сертифікату
        cy.checkCertificateData()
        //Прикріпляємо другий сертифікат
        cy.addNextCertificate('cert2.cer')
        // Перевіряємо дані сертифікату
        cy.checkCertificateData()
        //Прикріпляємо третій сертифікат
        cy.addNextCertificate('czo_2017.cer')
        // Перевіряємо дані сертифікату
        cy.checkCertificateData()
        // Перевіряємо перемикання    
        cy.checkActiveCertificate()
    });
})

//Даний е2е тест написаний без урахування того, що дана реалізація продукту має зауваження відповідно до ТЗ.