const express = require('express');
const path = require('path');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = 3000;

// Enable CORS for a specific origin
app.use(cors({
  origin: 'http://localhost:5500/src/view/' // Substitua pelo endereço do seu front-end
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
    if (!formData.nome || !formData.email || !formData.confirmarEmail) {
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
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
  console.log(`Server is running on http://localhost:${PORT}`);
});
