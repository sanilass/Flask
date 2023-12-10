const term = document.querySelector('.term');
const classifiers = document.querySelector('.classifiers')
const definition = document.querySelector('.definition');
const checkButton = document.querySelector('.check');
const nextButton = document.querySelector('.next');
const imagemElement = document.getElementById('imagemExibida');
const imageQuestion = document.querySelector('.image-question'); // Substituído de imageContainer para imageQuestion
const imagemElement1 = document.getElementById('imagemExibida1');
const imageAswer = document.querySelector('.image-aswer'); // Substituído de imageContainer para imageQuestion

// Substitua 'YOUR_SPREADSHEET_ID' pelo ID da sua planilha.
const spreadsheetId = '1mACFkwwgtmQpTvC51Qw9UAW1Va9dmAzUD7rBi-QJAu8';

// Substitua 'YOUR_API_KEY' pela sua chave de API.
const apiKey = 'AIzaSyBqQDNeQCrFwMzKo-D80PKSMbOpd_GxeU4';

// URL da API do Google Sheets
const sheetsURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:D100?key=${apiKey}`;

let currentRow = 1; // Índice da linha atual
let data; // Adicionei esta linha para declarar a variável 'data'

function showImageQuestion() {
  // Verifica se há uma URL de imagem na linha atual
  const hasImage = data[currentRow] && data[currentRow].length > 0 && data[currentRow][2];

  // Atualiza a visibilidade da div image-question com base na presença da imagem
  if (hasImage) {
    imageQuestion.style.display = 'block';
    imagemElement.src = data[currentRow][2];
  } else {
    imageQuestion.style.display = 'none';
  }
}

function showImageAswer() {
  // Verifica se há uma URL de imagem na linha atual
  const hasImageAswer = data[currentRow] && data[currentRow].length > 0 && data[currentRow][3];

  // Atualiza a visibilidade da div image-aswer com base na presença da imagem
  if (hasImageAswer) {
    imageAswer.style.display = 'block';
    imagemElement1.src = data[currentRow][3];
  } else {
    imageAswer.style.display = 'none';
  }
}
function showTerm() {
  // Verifica se há um termo na linha atual
  const hasTerm = data[currentRow] && data[currentRow].length >= 1 && data[currentRow][0];

  // Atualiza a visibilidade do termo com base na presença de dados
  if (hasTerm) {
    term.style.display = 'block';
    term.innerHTML = `<h3>${data[currentRow][0]}</h3>`;
  } else {
    term.style.display = 'none';
  }
}

function getNextFlashcard() {
  fetch(sheetsURL)
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData.values; // Defina data aqui

      // Verifica se há mais linhas a serem exibidas
      if (currentRow < data.length && data[currentRow].length >= 2) {
        showTerm(); // Adiciona a chamada da função para mostrar o termo

        definition.innerHTML = `<h3>${data[currentRow][1]}</h3>`;
        definition.style.display = 'none';
        classifiers.style.display = 'none';
        nextButton.style.display = 'none';
        imageAswer.style.display = 'none';

        showImageQuestion(); // Adiciona a chamada da função para mostrar a imagem da pergunta

        // Agora, vamos mostrar a imagem da resposta apenas quando o botão Check for clicado
      } else {
        console.error('Erro: Todas as linhas da planilha foram exibidas ou dados insuficientes.');
      }
    })
    .catch(error => console.error('Erro ao carregar dados:', error));
}

checkButton.addEventListener('click', function() {
  showImageAswer(); // Adiciona a chamada da função para mostrar a imagem da resposta
  imageAswer.style.display = 'block'; // Certifique-se de que a imagem da resposta esteja visível aqui

  definition.style.display = 'block';
  classifiers.style.display = 'block';
  nextButton.style.display = 'inline-block';
});

nextButton.addEventListener('click', function() {
  // Incrementa o índice da linha atual para a próxima vez
  currentRow++;

  getNextFlashcard();
});

// Carregue o primeiro flashcard ao iniciar
getNextFlashcard();
