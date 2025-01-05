const form = document.getElementById("albumForm");
const cardsAlbum = document.getElementById("cardsAlbuns");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomeAlbum = document.getElementById("album").value;
  const nomeCantor = document.getElementById("cantor").value;
  const preco = document.getElementById("valor").value;
  const tipo = document.getElementById("tipo").value;
  const peso = document.getElementById("peso").value;
  const dime = document.getElementById("dimensoes").value;
  const custo = document.getElementById("custo").value;
  const lucro = document.getElementById("lucro").value;
  const estoque = document.getElementById("estoque").value;
  const imagem = document.getElementById("imagem").value;

  if (
    !nomeAlbum ||
    !nomeCantor ||
    !preco ||
    !tipo ||
    !peso ||
    !dime ||
    !custo ||
    !lucro ||
    !estoque ||
    
  ) {
    alert("Por favor, preencha todos os campos obrigatórios!");
    return;
  }

  addAlbumToCards(
    nomeAlbum,
    nomeCantor,
    preco,
    tipo,
    peso,
    dime,
    lucro,
    estoque,
    imagem
  );

  form.reset();
});

const addAlbumToCards = (
  nomeAlbum,
  nomeCantor,
  preco,
  tipo,
  peso,
  dime,
  lucro,
  estoque,
  imagem
) => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
                        <img src="https://via.placeholder.com/150" alt="Imagem do CD" class="cd-image">
                        <div class="info">
                            <strong>Nome do CD</strong>
                            <span>Cantor</span>
                            <span>R$ 29,90</span>
                        </div>
                        <div class="details">
                            <p><strong>Tipo:</strong> Álbum</p>
                            <p><strong>Peso:</strong> 120g</p>
                            <p><strong>Dimensão:</strong> 14cm x 14cm</p>
                            <p><strong>Custo:</strong> R$ 15,00</p>
                            <p><strong>Lucro:</strong> R$ 14,90</p>
                            <p><strong>Estoque:</strong> 10 unidades</p>
                        </div>
                        <button class="editar">Editar</button>
                        <button class="delete">🗑️</button>


`;

  cardsAlbum.appendChild("card");
};

cardsAlbum.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const card = event.target.closest(".card");
    cardsAlbum.removeChild(card);
  }
});
