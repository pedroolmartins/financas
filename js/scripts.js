if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch((err) => console.log('Erro ao registrar Service Worker:', err));
}

const proxy = 'https://proxy.corsfix.com/?'
const appUrl = 'https://script.google.com/macros/s/AKfycbzLdNxdyQqU2bazO9Ls9pC0IaiMzxNFJDcpmsCf8YoZnx4bmoTJroZ-kNx33plVIfcXxA/exec'
const alerts = ['missing_fields', 'success', 'error']

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit_form')
    const form = document.getElementById('dados')
    const inputValor = document.getElementById("valor")
    const responseIconBg = document.getElementById("response_icon_bg")
    const responseIcon = document.getElementById("response_icon")

    categoryOptions()

    // remove danger class on input change
    form.addEventListener('input', (event) => {
        if (event.target.tagName == 'SELECT') {
            document.getElementById(event.target.id).parentElement.classList.remove('is-danger')
        } else {
            document.getElementById(event.target.id).classList.remove('is-danger')
        }

        if (form.querySelectorAll('.is-danger').length == 0) hideAlerts()
    })


    //formata input valor
    inputValor.addEventListener("input", (e) => {
        let value = e.target.value
        value = value.replace(/[^0-9.,]/g, "")
        value = value.replace(",", ".")
        const parts = value.split(".")
        if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("")
        }
        e.target.value = value;
    })
    inputValor.addEventListener("blur", (e) => {
        let value = e.target.value
        const floatValue = parseFloat(value)
        if (!isNaN(floatValue)) {
            e.target.value = floatValue.toFixed(2).replace(".", ",")
        } else {
            e.target.value = ""
        }
    })


    // submit form
    button.addEventListener('click', async (event) => {
        event.preventDefault()
        const data = new FormData(form)
        const obj = Object.fromEntries(data.entries())
        const requiredFields = ['despesa', 'valor', 'data_pg', 'categoria', 'tipo']
        const missingFields = []
        hideAlerts()

        // console.log(obj)
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
            showAlert('missing_fields', 'Preencha todos os campos obrigatórios.')
            return
        } else {
            //nenhum campo obrigatório vazio, confirma dados inseridos
            if (!confirm('Confirme os dados inseridos:\nDespesa: ' + obj.despesa + '\nValor: ' + obj.valor + '\nData: ' + formatDate(obj.data_pg) + '\nCategoria: ' + obj.categoria + '\nTipo: ' + obj.tipo + '\nObservações: ' + obj.obs)) {
                return
            }
        }

        button.classList.add('is-loading')

        await fetch(appUrl, {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(data.entries())),
        })
            .then(response => response.json())
            .then((data) => {
                showAlert('success', data.message)
                console.log('Resposta do servidor:', data)
                if (data.success) {
                    form.reset()
                }
            })
            .catch((error) => {
                showAlert('error', error.message)
                console.error('Erro:', error)
            })
        button.classList.remove('is-loading')
    })
})

const showAlert = (alert, message) => {
    const divResponse = document.getElementById("response")
    const target = document.getElementById(`form_alert_${alert}`)

    alerts.forEach((item) => {
        if (item != alert) {
            document.getElementById(`form_alert_${item}`).classList.add('is-hidden')
        }
        target.classList.remove('is-hidden')
    })

    if (alert == 'success') {
        setTimeout(() => {
            divResponse.classList.add('is-hidden')
            target.classList.add('is-hidden')
        }, 5000)
    }

    divResponse.innerHTML = (message)
    divResponse.style.whiteSpace = "pre-wrap"
}

const hideAlerts = () => {
    const divResponse = document.getElementById("response")
    alerts.forEach((item) => {
        document.getElementById(`form_alert_${item}`).classList.add('is-hidden')
    })
    divResponse.innerHTML = ''
    return
}

const categoryOptions = () => {
    const optionsArray = [
        'Alimentação',
        'Caixinha FIES',
        'Combustível',
        'Compras',
        'Créditos',
        'Empresa',
        'Estudos',
        'Gastos Pessoais',
        'Lanches/Lazer',
        'Lara',
        'Moradia',
        'Padaria',
        'Investimentos',
        'Saúde',
        'Telefonia',
        'Transporte',
        'Veículo',
        'Cachorro',
        'Gastos diversos',
        'Farmácia',
    ]
    optionsArray.sort((a, b) => a.localeCompare(b))
    const selectElement = document.getElementById("categoria")
    // Preencher o select com opções
    optionsArray.forEach(optionText => {
        const optionElement = document.createElement("option");
        optionElement.value = optionText.toLowerCase().replace(" ", "_").replace("/", "_")
        optionElement.textContent = optionText
        selectElement.appendChild(optionElement)
    });
}

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
}