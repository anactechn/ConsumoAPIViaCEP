function consultarCEP() {
    const cep = document.getElementById('cepConsulta').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultadoCEP').innerHTML = `
                <p><strong>Endereço:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>
            `;
        })
        .catch(error => console.error('Erro ao consultar CEP:', error));
}

function buscarLogradouro() {
    const uf = document.getElementById('uf').value;
    const cidade = document.getElementById('cidade').value;
    const logradouro = document.getElementById('logradouro').value;
    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let resultadoHTML = '';
            data.forEach(endereco => {
                resultadoHTML += `
                    <p><strong>CEP:</strong> ${endereco.cep}</p>
                    <p><strong>Endereço:</strong> ${endereco.logradouro}</p>
                    <p><strong>Bairro:</strong> ${endereco.bairro}</p>
                    <p><strong>Cidade:</strong> ${endereco.localidade} - ${endereco.uf}</p>
                    <hr>
                `;
            });
            document.getElementById('resultadoLogradouro').innerHTML = resultadoHTML;
        })
        .catch(error => console.error('Erro ao buscar por logradouro:', error));
}

function calcularFrete() {
    const cepOrigem = document.getElementById('cepOrigem').value;
    const cepDestino = document.getElementById('cepDestino').value;
    const peso = parseInt(document.getElementById('peso').value, 10);
    
    // Verifica se os CEPs e o peso foram inseridos
    if (!cepOrigem || !cepDestino || isNaN(peso)) {
        document.getElementById('resultadoFrete').innerText = 'Por favor, preencha todos os campos corretamente.';
        return;
    }

    // Simulação de cálculo de frete baseado no peso
    let valorFrete = 0;
    if (peso <= 500) {
        valorFrete = 15.00;
    } else if (peso <= 1000) {
        valorFrete = 25.00;
    } else {
        valorFrete = 25.00 + ((peso - 1000) / 100) * 5;
    }

    // Exibe o resultado
    document.getElementById('resultadoFrete').innerHTML = `O valor do frete é: R$ ${valorFrete.toFixed(2)}`;
}