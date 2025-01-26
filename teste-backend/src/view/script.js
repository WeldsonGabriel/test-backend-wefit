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

  try {
    const response = await axios.post(API_URL, data);
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
