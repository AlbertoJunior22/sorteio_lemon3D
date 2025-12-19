const fs = require('fs'); // Módulo para trabalhar com arquivos no Node.js

// Caminho do arquivo de entrada
const inputFile = 'entrada.txt';

// Caminho do arquivo de saída
const outputFile = 'saida.json';

// Função principal para processar o arquivo
function processFile() {
  // Lê o arquivo de entrada
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    // Divide o conteúdo em linhas
    const lines = data.split('\n').filter(line => line.trim() !== ''); // Remove linhas vazias

    // Processa cada linha e transforma em um objeto JSON
    const result = lines.map(line => {
      const idMatch = line.match(/^(\d+)\./); // Captura o número antes do ponto
      const nomeMatch = line.match(/\d+\.\s(.+?):/); // Captura o nome entre ". " e ":"
      const marcacoesMatch = line.match(/:\s(.+)/); // Captura todo o texto após ": "

      if (idMatch && nomeMatch && marcacoesMatch) {
        return {
          id: parseInt(idMatch[1], 10), // Converte o ID para número
          nome: nomeMatch[1].trim(), // Nome (sem espaços extras)
          marcacoes: marcacoesMatch[1].split(' ').map(item => item.trim()) // Array de marcações
        };
      }

      console.warn('Linha ignorada devido ao formato incorreto:', line);
      return null;
    }).filter(item => item !== null); // Remove objetos inválidos

    // Converte o resultado para JSON
    const jsonData = JSON.stringify(result, null, 2);

    // Escreve o resultado no arquivo de saída
    fs.writeFile(outputFile, jsonData, 'utf8', writeErr => {
      if (writeErr) {
        console.error('Erro ao escrever o arquivo de saída:', writeErr);
        return;
      }
      console.log(`Arquivo JSON gerado com sucesso (${outputFile}).`);
    });
  });
}

// Executa a função principal
processFile();