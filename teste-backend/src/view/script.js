document.getElementById('form').addEventListener('submit', async function (event) {
  event.preventDefault();
  console.log('Form submission triggered');
  const errorMessage = document.getElementById('error-message');
  errorMessage.innerHTML = '';
  errorMessage.classList.remove('hidden');

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Validation checks
  let hasError = false;
  if (!data.nome) {
    alert('O campo Nome é obrigatório.');
    hasError = true;
  }
  if (!data.email) {
    alert('O campo Email é obrigatório.');
    hasError = true;
  }
  if (data.email !== data.confirmarEmail) {
    alert('O Email e a Confirmação de Email não correspondem.');
    hasError = true;
  }
  if (!data.termos) {
    alert('Você deve aceitar os termos para continuar.');
    hasError = true;
  }
  if (data.tipoPessoa === 'fisica' && !data.cpf) {
    alert('O campo CPF é obrigatório para Pessoa Física.');
    hasError = true;
  }
  if (data.tipoPessoa === 'juridica' && (!data.cnpj || !data.responsibleCpf)) {
    alert('Os campos CNPJ e CPF do Responsável são obrigatórios para Pessoa Jurídica.');
    hasError = true;
  }

  if (hasError) {
    console.log('Validation errors occurred.');
    return;
  }

  // Structure the JSON body based on the selected person type
  const jsonBody = {
    name: data.nome,
    email: data.email,
    confirmEmail: data.confirmarEmail,
    phone: data.phone,
    type: data.tipoPessoa === 'fisica' ? 'INDIVIDUAL' : 'COMPANY',
    termsAccepted: data.termos === 'on',
    addresses: [
      {
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode
      }
    ]
  };

  if (data.tipoPessoa === 'fisica') {
    jsonBody.cpf = data.cpf;
  } else if (data.tipoPessoa === 'juridica') {
    jsonBody.cnpj = data.cnpj;
    jsonBody.responsibleCpf = data.responsibleCpf;
  }

  // Log the JSON body being sent
  console.log('Sending JSON body:', JSON.stringify(jsonBody));

  try {
    const response = await axios.post('http://localhost:3000/api/cadastro', jsonBody);
    if (response.status === 200) {
      alert('Cadastro realizado com sucesso!');
      this.reset();
      errorMessage.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error response:', error);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = error.response.data.errors;
      errors.forEach(err => {
        const errorItem = document.createElement('div');
        errorItem.textContent = err.message;
        errorMessage.appendChild(errorItem);
      });
    } else {
      alert('Erro ao enviar o formulário. Tente novamente mais tarde.');
    }
  }
});

document.querySelectorAll('input[name="tipoPessoa"]').forEach((input) => {
  input.addEventListener('change', function () {
    if (this.value === 'fisica') {
      document.getElementById('cpf-group').style.display = 'block';
      document.getElementById('cnpj-group').style.display = 'none';
      document.getElementById('responsible-cpf-group').style.display = 'none';
    } else if (this.value === 'juridica') {
      document.getElementById('cpf-group').style.display = 'none';
      document.getElementById('cnpj-group').style.display = 'block';
      document.getElementById('responsible-cpf-group').style.display = 'block';
    }
  });
});

// Initialize form with "Pessoa Física" selected
document.getElementById('fisica').checked = true;
document.getElementById('cpf-group').style.display = 'block';
document.getElementById('cnpj-group').style.display = 'none';
document.getElementById('responsible-cpf-group').style.display = 'none';

document.getElementById('postalCode').addEventListener('blur', async function () {
  const cep = this.value.replace(/\D/g, '');
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.ok) {
        const data = await response.json();
        if (!data.erro) {
          document.getElementById('street').value = data.logradouro;
          document.getElementById('neighborhood').value = data.bairro;
          document.getElementById('city').value = data.localidade;
          document.getElementById('state').value = data.uf;
        } else {
          alert('CEP não encontrado.');
        }
      } else {
        alert('Erro ao buscar CEP.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor de CEP.');
    }
  } else {
    alert('CEP inválido.');
  }
});

function applyMask(input, maskFunction) {
  input.addEventListener('input', function () {
    this.value = maskFunction(this.value);
  });
}

function cpfMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function cnpjMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

applyMask(document.getElementById('cpf'), cpfMask);
applyMask(document.getElementById('cnpj'), cnpjMask);
applyMask(document.getElementById('responsibleCpf'), cpfMask);

// Convert input values to uppercase except for email fields
document.querySelectorAll('input[type="text"]').forEach((input) => {
  if (input.id !== 'email' && input.id !== 'confirmarEmail') {
    input.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
    });
  }
});
