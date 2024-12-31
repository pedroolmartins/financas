
const proxy = 'https://proxy.corsfix.com/?'
const appUrl = 'https://script.google.com/macros/s/AKfycbzLdNxdyQqU2bazO9Ls9pC0IaiMzxNFJDcpmsCf8YoZnx4bmoTJroZ-kNx33plVIfcXxA/exec'

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit_form')
    const divResultado = document.getElementById("resultado")

    const form = document.getElementById('dados')

    form.addEventListener('input', (event) => {
        if (event.target.tagName == 'SELECT') {
            document.getElementById(event.target.id).parentElement.classList.remove('is-danger')
        } else {
            document.getElementById(event.target.id).classList.remove('is-danger')
        }
    })


    button.addEventListener('click', async (event) => {
        event.preventDefault()
        button.classList.add('is-loading')
        const data = new FormData(form)
        const obj = Object.fromEntries(data.entries())
        const requiredFields = ['despesa', 'valor', 'data_pg', 'categoria']
        const missingFields = []

        console.log(obj)

        Object.keys(obj).forEach(key => {
            if (!obj[key].length && requiredFields.includes(key)) {
                missingFields.push(key)
            }
        })

        if (missingFields.length) {
            button.classList.remove('is-loading')
            // console.log(missingFields)
            missingFields.forEach(key => {
                if (document.getElementById(key).tagName == 'SELECT') {
                    document.getElementById(key).parentElement.classList.add('is-danger')
                } else {
                    document.getElementById(key).classList.add('is-danger')
                }
            })
            divResultado.innerHTML = 'Preencha todos os campos.'
            return
        }

        await fetch(appUrl, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(data.entries())),
        })
            .then(response => response.json())
            .then((data) => {
                divResultado.innerHTML = data.message
                console.log('Resposta do servidor:', data)
                if (data.success) {
                    form.reset()
                }
            })
            .catch((error) => {
                divResultado.innerHTML = error.message
                console.error('Erro:', error)
            })
        divResultado.style.whiteSpace = "pre-wrap"
        button.classList.remove('is-loading')
    })
})