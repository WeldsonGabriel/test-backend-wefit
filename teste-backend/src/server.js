const express = require('express');
const path = require('path');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = 3000;

// Enable CORS for a specific origin
app.use(cors({
  origin: 'http://127.0.0.1:5500/src/view/' // Substitua pelo endereço do seu front-end
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'view' directory
app.use(express.static(path.join(__dirname, 'view')));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Example route to handle form submission
app.post('/api/cadastro', (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data:', formData);

    // Validate the incoming data
    if (!formData.name || !formData.email || !formData.confirmEmail || !formData.termsAccepted || !formData.type) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    if (formData.email !== formData.confirmEmail) {
      return res.status(400).json({ message: 'Email e confirmação de email não correspondem.' });
    }

    if (formData.type === 'INDIVIDUAL' && !formData.cpf) {
      return res.status(400).json({ message: 'CPF é obrigatório para Pessoa Física.' });
    }

    if (formData.type === 'COMPANY' && (!formData.cnpj || !formData.responsibleCpf)) {
      return res.status(400).json({ message: 'CNPJ e CPF do responsável são obrigatórios para Pessoa Jurídica.' });
    }

    // Process the form data here
    res.status(200).json({ message: 'Formulário enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar o formulário:', error);
    res.status(500).json({ message: 'Erro ao enviar o formulário. Tente novamente mais tarde.' });
  }
});

// ...existing code...

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);});