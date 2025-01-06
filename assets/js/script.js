document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#albumForm form");
  const cardsAlbum = document.getElementById("cardsAlbuns");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const LOCAL_STORAGE_KEY = "albums";

  // Dados Mock (álbuns iniciais)
  const MOCK_ALBUMS = [
    // Dados de exemplo...
  ];

  // Carregar os cards salvos ou mocks
  function loadCardsFromStorage() {
    let albums = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    // Adiciona apenas os mocks que não estão no localStorage
    MOCK_ALBUMS.forEach((mock) => {
      if (!albums.some((album) => album.id === mock.id)) {
        albums.push(mock);
      }
    });

    // Salva os dados atualizados no localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albums));

    // Renderiza os cards na interface
    albums.forEach(addAlbumToCards);
  }

  // Salvar os cards no localStorage
  function saveCardsToStorage() {
    const cards = Array.from(cardsAlbum.querySelectorAll(".card"));
    const albums = cards.map((card) => ({
      id: card.dataset.id,
      nomeAlbum: card.querySelector(".info strong").textContent,
      nomeCantor: card.querySelector(".info span:nth-of-type(1)").textContent,
      preco: card.querySelector(".info span:nth-of-type(2)").textContent,
      tipo: card.querySelector(".details p:nth-of-type(1)").textContent.replace("Tipo: ", ""),
      peso: card.querySelector(".details p:nth-of-type(2)").textContent.replace("Peso: ", ""),
      altura: card.querySelector(".details p:nth-of-type(3)").textContent.replace("Altura: ", ""),
      largura: card.querySelector(".details p:nth-of-type(4)").textContent.replace("Largura: ", ""),
      custo: card.querySelector(".details p:nth-of-type(5)").textContent.replace("Custo: ", ""),
      lucro: card.querySelector(".details p:nth-of-type(6)").textContent.replace("Lucro: ", ""),
      estoque: card.querySelector(".details p:nth-of-type(7)").textContent.replace("Estoque: ", ""),
      imagem: card.querySelector("img").src,
    }));

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albums));
  }

  // Função para adicionar um álbum ao DOM
  function addAlbumToCards(album) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = album.id || Date.now();

    card.innerHTML = `
      <img src="${album.imagem || "https://via.placeholder.com/150"}" alt="Imagem do CD" class="cd-image">
      <div class="info">
        <strong>${album.nomeAlbum || "Sem título"}</strong>
        <span>${album.nomeCantor || "Desconhecido"}</span>
        <span>${album.preco || "R$ 0,00"}</span>
      </div>
      <div class="details">
        <p><strong>Tipo:</strong> ${album.tipo || "Não especificado"}</p>
        <p><strong>Peso:</strong> ${album.peso || "0g"}</p>
        <p><strong>Altura:</strong> ${album.altura || "0cm"}</p>
        <p><strong>Largura:</strong> ${album.largura || "0cm"}</p>
        <p><strong>Custo:</strong> ${album.custo || "R$ 0,00"}</p>
        <p><strong>Lucro:</strong> ${album.lucro || "R$ 0,00"}</p>
        <p><strong>Estoque:</strong> ${album.estoque || "0"}</p>
      </div>
      <button class="editar">Editar</button>
      <button class="delete">🗑️</button>
    `;

    const cardsContainer = cardsAlbum.querySelector(".cards-container");
    if (cardsContainer) {
      cardsContainer.appendChild(card);
    }

    // Reassocia eventos aos novos botões
    assignCardEvents(card);
  }

  // Função para associar eventos a um card específico
  function assignCardEvents(card) {
    const editButton = card.querySelector(".editar");
    const deleteButton = card.querySelector(".delete");

    editButton.addEventListener("click", function () {
      const cardId = card.dataset.id;

      // Preenche os campos do formulário com os dados do card
      document.getElementById("album").value = card.querySelector(".info strong").textContent || "";
      document.getElementById("cantor").value = card.querySelector(".info span:nth-of-type(1)").textContent || "";
      document.getElementById("valor").value = card.querySelector(".info span:nth-of-type(2)").textContent || "";
      document.getElementById("tipo").value = card.querySelector(".details p:nth-of-type(1)").textContent.replace("Tipo: ", "") || "";
      document.getElementById("peso").value = card.querySelector(".details p:nth-of-type(2)").textContent.replace("Peso: ", "") || "";
      document.getElementById("altura").value = card.querySelector(".details p:nth-of-type(3)").textContent.replace("Altura: ", "") || "";
      document.getElementById("largura").value = card.querySelector(".details p:nth-of-type(4)").textContent.replace("Largura: ", "") || "";
      document.getElementById("custo").value = card.querySelector(".details p:nth-of-type(5)").textContent.replace("Custo: ", "") || "";
      document.getElementById("lucro").value = card.querySelector(".details p:nth-of-type(6)").textContent.replace("Lucro: ", "") || "";
      document.getElementById("estoque").value = card.querySelector(".details p:nth-of-type(7)").textContent.replace("Estoque: ", "") || "";
      document.getElementById("preview").src = card.querySelector("img").src;

      // Define o modo de edição
      form.dataset.editing = cardId;
      form.querySelector("button[type='submit']").textContent = "Salvar Alterações";
    });

    deleteButton.addEventListener("click", function () {
      card.remove();
      saveCardsToStorage();
    });
  }

  // Evento de submissão do formulário
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isEditing = form.dataset.editing;
    if (isEditing) {
      const card = document.querySelector(`.card[data-id="${isEditing}"]`);
      if (card) {
        card.querySelector(".info strong").textContent = document.getElementById("album").value || "Sem título";
        card.querySelector(".info span:nth-of-type(1)").textContent = document.getElementById("cantor").value || "Desconhecido";
        card.querySelector(".info span:nth-of-type(2)").textContent = document.getElementById("valor").value || "R$ 0,00";
        card.querySelector(".details p:nth-of-type(1)").textContent = `Tipo: ${document.getElementById("tipo").value || "Não especificado"}`;
        card.querySelector(".details p:nth-of-type(2)").textContent = `Peso: ${document.getElementById("peso").value || "0g"}`;
        card.querySelector(".details p:nth-of-type(3)").textContent = `Altura: ${document.getElementById("altura").value || "0cm"}`;
        card.querySelector(".details p:nth-of-type(4)").textContent = `Largura: ${document.getElementById("largura").value || "0cm"}`;
        card.querySelector(".details p:nth-of-type(5)").textContent = `Custo: ${document.getElementById("custo").value || "R$ 0,00"}`;
        card.querySelector(".details p:nth-of-type(6)").textContent = `Lucro: ${document.getElementById("lucro").value || "R$ 0,00"}`;
        card.querySelector(".details p:nth-of-type(7)").textContent = `Estoque: ${document.getElementById("estoque").value || "0"}`;
        card.querySelector("img").src = document.getElementById("preview").src;

        saveCardsToStorage();

        delete form.dataset.editing;
        form.querySelector("button[type='submit']").textContent = "Adicionar";
      }
    } else {
      const newAlbum = {
        id: Date.now().toString(),
        nomeAlbum: document.getElementById("album").value,
        nomeCantor: document.getElementById("cantor").value,
        preco: document.getElementById("valor").value,
        tipo: document.getElementById("tipo").value,
        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        largura: document.getElementById("largura").value,
        custo: document.getElementById("custo").value,
        lucro: document.getElementById("lucro").value,
        estoque: document.getElementById("estoque").value,
        imagem: document.getElementById("preview").src,
      };

      addAlbumToCards(newAlbum);
      saveCardsToStorage();
    }

    form.reset();
    document.getElementById("preview").src = "https://via.placeholder.com/150";
  });

  // Carregar os mocks e dados salvos
  loadCardsFromStorage();
});
