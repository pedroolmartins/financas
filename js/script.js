
const proxy = 'https://proxy.corsfix.com/?'
const appUrl = 'https://script.google.com/macros/s/AKfycbzLdNxdyQqU2bazO9Ls9pC0IaiMzxNFJDcpmsCf8YoZnx4bmoTJroZ-kNx33plVIfcXxA/exec'

document.addEventListener('DOMContentLoaded', () => {
    var button = document.getElementById('submit_form')

    button.addEventListener('click', () => {
        const data = {
            nome: 'João Silva',
            email: 'joao@example.com',
            mensagem: 'Olá, isso é um teste!'
        };

        fetch(appUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            // cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            mode: 'no-cors'
        })
            .then(response => response.text())
            .then((data) => {
                const divResultado = document.getElementById("resultado")
                // Insere o JSON formatado como string na div
                divResultado.innerHTML = JSON.stringify(data, null, 2);

                // (Opcional) Estiliza o texto se quiser que apareça formatado
                divResultado.style.whiteSpace = "pre-wrap";
                console.log('Resposta do servidor:', data)
            })
            .catch((error) => {
                const divResultado = document.getElementById("resultado")
                // Insere o JSON formatado como string na div
                divResultado.innerHTML = JSON.stringify(error, null, 2);

                // (Opcional) Estiliza o texto se quiser que apareça formatado
                divResultado.style.whiteSpace = "pre-wrap";
                console.log('Resposta do servidor:', error)
                console.error('Erro:', error)
            })
    })
})