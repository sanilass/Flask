const imagemElement = document.getElementById('imagemrespiratorio');
const imagemElement1 = document.getElementById('imagemdigestorio');
const spreadsheetId = '15-XNA9c0Hy3o7uFSjW_pGPPZ2ljtoWLhAPe8Vex3884';
const apiKey = 'AIzaSyBqQDNeQCrFwMzKo-D80PKSMbOpd_GxeU4';
const sheetsURL = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:E100?key=${apiKey}`;
let currentRow = 1;
let data;

function fetchDataAndShowImage() {
  fetch(sheetsURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData);
      if (jsonData && jsonData.values) {
        data = jsonData.values;
        showImagemSis();
      } else {
        throw new Error('Os dados da planilha não estão no formato esperado.');
      }
    })
    .catch(error => console.error('Erro ao buscar dados da planilha:', error.message));
}

function showImagemSis() {
  if (data && data[currentRow] && data[currentRow][0] && data[currentRow][1]) {
    imagemElement.src = data[currentRow][0];
    imagemElement1.src = data[currentRow][1];
  } else {
    console.error('Dados ou linha específica não encontrados.');
  }
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
