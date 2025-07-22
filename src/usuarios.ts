const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
  document.body.classList.add('dark');
}

const container = document.getElementById('lista-inscricoes')!;

async function carregarInscricoes() {
  try {
    const res = await fetch('http://localhost:3000/inscricoes');
    const inscricoes = await res.json();

    if (!Array.isArray(inscricoes) || inscricoes.length === 0) {
      container.innerHTML = `<div class="mensagem-vazia">Nenhuma inscrição foi encontrada.</div>`;
      return;
    }

    const html = `
      <div class="tabela-container">
        <table class="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Gênero</th>
              <th>Oficina</th>
              <th>Necessidades Especiais</th>
            </tr>
          </thead>
          <tbody>
            ${inscricoes.map((i: any) => `
              <tr>
                <td>${i.nome}</td>
                <td>${i.email}</td>
                <td>${i.sexo}</td>
                <td>${i.curso}</td>
                <td>${i.descricao?.trim() || 'Nenhuma'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = `<div class="erro">Erro ao carregar inscrições. Tente novamente mais tarde.</div>`;
    console.error('Erro ao buscar inscrições:', error);
  }
}

carregarInscricoes();
