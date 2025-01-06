document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#albumForm form");
  const cardsAlbum = document.getElementById("cardsAlbuns");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const clearButton = document.getElementById("clear-form");
  const LOCAL_STORAGE_KEY = "albums";

  const MOCK_ALBUMS = [
    {
      id: "1",
      nomeAlbum: "Born to Die",
      nomeCantor: "Lana Del Rey",
      preco: "R$ 39,90",
      tipo: "Álbum",
      peso: "120g",
      altura: "14cm",
      largura: "14cm",
      custo: "R$ 20,00",
      lucro: "R$ 19,90",
      estoque: "5",
      imagem: "assets/media/lana_born_to_die.jpeg",
    },
    {
      id: "2",
      nomeAlbum: "Chromatica",
      nomeCantor: "Lady Gaga",
      preco: "R$ 49,90",
      tipo: "Álbum",
      peso: "140g",
      altura: "14cm",
      largura: "14cm",
      custo: "R$ 25,00",
      lucro: "R$ 24,90",
      estoque: "7",
      imagem: "../assets/media/chromatica.jpeg",
    },
    {
      id: "3",
      nomeAlbum: "Like a Prayer",
      nomeCantor: "Madonna",
      preco: "R$ 59,90",
      tipo: "Álbum",
      peso: "150g",
      altura: "15cm",
      largura: "15cm",
      custo: "R$ 30,00",
      lucro: "R$ 29,90",
      estoque: "8",
      imagem: "../assets/media/like_prayer.webp",
    },
    {
      id: "4",
      nomeAlbum: "Dangerous Woman",
      nomeCantor: "Ariana Grande",
      preco: "R$ 39,90",
      tipo: "Álbum",
      peso: "130g",
      altura: "14cm",
      largura: "14cm",
      custo: "R$ 20,00",
      lucro: "R$ 19,90",
      estoque: "6",
      imagem: "../assets/media/dangerous.jpeg",
    },
    {
      id: "5",
      nomeAlbum: "Wiped Out!",
      nomeCantor: "The Neighbourhood",
      preco: "R$ 44,90",
      tipo: "Álbum",
      peso: "140g",
      altura: "14cm",
      largura: "14cm",
      custo: "R$ 22,00",
      lucro: "R$ 22,90",
      estoque: "10",
      imagem: "../assets/media/wiped_out.png",
    },
    {
      id: "6",
      nomeAlbum: "Ultraviolence",
      nomeCantor: "Lana Del Rey",
      preco: "R$ 45,90",
      tipo: "Álbum",
      peso: "140g",
      altura: "14cm",
      largura: "14cm",
      custo: "R$ 23,00",
      lucro: "R$ 22,90",
      estoque: "4",
      imagem: "../assets/media/ultraviolence.jpeg",
    },
    {
      id: "7",
      nomeAlbum: "Sweetener",
      nomeCantor: "Ariana Grande",
      preco: "R$ 49,90",
      tipo: "Álbum",
      peso: "140g",
      altura: "14cm",
      largura: "14cm",
      custo: "R$ 25,00",
      lucro: "R$ 24,90",
      estoque: "9",
      imagem: "../assets/media/sweetener.jpeg",
    },
    {
      id: "8",
      nomeAlbum: "Born This Way",
      nomeCantor: "Lady Gaga",
      preco: "R$ 54,90",
      tipo: "Álbum",
      peso: "150g",
      altura: "15cm",
      largura: "15cm",
      custo: "R$ 27,00",
      lucro: "R$ 27,90",
      estoque: "5",
      imagem: "../assets/media/bornthisway.jpeg",
    },
  ];

  function loadCardsFromStorage() {
    let albums = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

    MOCK_ALBUMS.forEach((mock) => {
      if (!albums.some((album) => album.id === mock.id)) {
        albums.push(mock);
      }
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albums));
    albums.forEach(addAlbumToCards);
  }

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

    assignCardEvents(card);
  }

  function assignCardEvents(card) {
    const editButton = card.querySelector(".editar");
    const deleteButton = card.querySelector(".delete");

    editButton.addEventListener("click", function () {
      const cardId = card.dataset.id;

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

      form.dataset.editing = cardId;
      form.querySelector("button[type='submit']").textContent = "Salvar Alterações";
    });

    deleteButton.addEventListener("click", function () {
      if (confirm("Tem certeza que deseja apagar o item?")) {
        card.remove();
        saveCardsToStorage();
      }
    });
  }

  // Validação de campos obrigatórios
  function validateFields() {
    const fields = [
      document.getElementById("album").value.trim(),
      document.getElementById("cantor").value.trim(),
      document.getElementById("valor").value.trim(),
      document.getElementById("tipo").value.trim(),
      document.getElementById("peso").value.trim(),
    ];

    const filledFields = fields.filter((field) => field !== "").length;
    return filledFields >= 5;
  }

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
        form.reset();
        document.getElementById("preview").src = "https://via.placeholder.com/150";
      }
    } else {
      if (!validateFields()) {
        alert("Por favor, preencha pelo menos 5 campos antes de adicionar.");
        return;
      }

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

      form.reset();
      document.getElementById("preview").src = "https://via.placeholder.com/150";
    }
  });

  clearButton.addEventListener("click", function () {
    form.reset();
    document.getElementById("preview").src = "https://via.placeholder.com/150";
  });

  searchButton.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const albumName = card.querySelector(".info strong").textContent.toLowerCase();
      const artistName = card.querySelector(".info span:nth-of-type(1)").textContent.toLowerCase();

      if (albumName.includes(query) || artistName.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    if (!query) {
      cards.forEach((card) => (card.style.display = "block"));
    }
  });

  searchInput.addEventListener("input", function () {
    if (searchInput.value.trim() === "") {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => (card.style.display = "block"));
    }
  });

  loadCardsFromStorage();
});
