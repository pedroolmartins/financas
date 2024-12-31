
const proxy = 'https://proxy.corsfix.com/?'
const appUrl = 'https://script.google.com/macros/s/AKfycbzbJrakblzQcFiHWRiNMvIWgOjPUSNBLnfVSVNmCBZu5Y98JAJrz007XfaNi1hUGVpyrw/exec'

document.addEventListener('DOMContentLoaded', () => {
    var button = document.getElementById('submit_form')

    const form = document.getElementById('dados')
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        button.classList.add('is-loading')
        const data = new FormData(form)
        // const data = {
        //     nome: 'João Silva',
        //     email: 'joao@example.com',
        //     mensagem: 'Olá, isso é um teste!'
        // };

        console.log( JSON.stringify(Object.fromEntries(data.entries())))
        await fetch(appUrl, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(data.entries())),
            // cache: "no-cache",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            // redirect: "follow",
            // mode: 'no-cors'
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

        button.classList.remove('is-loading')
    })
})