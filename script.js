const carrinho = {};
const opcoes = {};
const precos = {
  xtudo: 13.00,
  xcalabresa: 12.00,
  xfrango: 15.00,
  cachorroquente: 17.00,
  CachorroQuenteCoreano: 13.00,
  EspetoCoreano: 12.00,
  BatataMaluca: 15.00,
  BatataRecheada: 12.00,
  EspetinhoQueijo: 14.00,
  PaoDeAlho: 27.00,
  Sanduiche: 12.00,
  Pudim: 10.00,
  Bolinho: 30.00,

  acai: 12.00,
  choconinho: 10.00,
  moussemaracuja: 10.00,
  pavedemaracuja: 11.00,
  bombodeuva: 3.00,
  ferreirorocher: 4.00,
  chocolatecombrigadeiro: 12.00,
  mousseferrero: 12.00,
  moussedechocolate: 9.00,
  cuzcuz: 9.00,
  pavedelimao: 12.00,

  sucomanga: 12.00,
  sucoabacaxi: 12.00,
  coca350: 7.00,
  guaravita: 3.50,
  guarana2l: 10.00,
  coca2l: 12.00
};

const imagens = {
  xtudo: "xtudo.jpeg",
  xcalabresa: "xcalabresa.jpeg",
  xfrango: "xfrango.jpeg",
  cachorroquente: "cachorro_quente.jpeg",
  CachorroQuenteCoreano: "Cachorro_Coreano.jpeg",
  EspetoCoreano: "espeto_coreano.jpeg",
  BatataMaluca: "batata_maluca.jpeg",
  BatataRecheada: "Batata_Recheada.jpeg",
  EspetinhoQueijo: "Espetinho_Queijo.jpeg",
  PaoDeAlho: "PaodeAlho.jpeg",
  Sanduiche: "Sanduiche.jpeg",
  Bolinho: "Bolinho.jpeg",

  acai: "acai.jpeg",
  choconinho: "choconinho.jpeg",
  moussemaracuja: "moussemaracuja.jpeg",
  pavedemaracuja: "pavedemaracuja.jpeg",
  bombodeuva: "bombodeuva.jpeg",
  ferreirorocher: "ferreirorocher.jpeg",
  chocolatecombrigadeiro: "chocolatecombrigadeiro.jpeg",
  mousseferrero: "mousseferrero.jpeg",
  moussedechocolate: "moussedechocolate.jpeg",
  cuzcuz: "cuzcuz.jpeg",
  pavedelimao: "pavedelimao.jpeg",

  sucomanga: "sucomanga.jpeg",
  sucoabacaxi: "sucoabacaxi.jpeg",
  coca350: "coca350.jpeg",
  guaravita: "guaravita.jpeg",
  guarana2l: "guarana2l.jpeg",
  coca2l: "coca2l.jpeg"
};
/* SPLASH */
window.onload = () => {
  setTimeout(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.style.display = "none";
  }, 1200);
    posicionarListaNoTopo();
};

/* + / - (APENAS VISUAL) */
function alterarQtd(produto, valor) {
  const el = document.getElementById(`qtd-${produto}`);
  let qtd = parseInt(el.textContent) + valor;
  if (qtd < 0) qtd = 0;
  el.textContent = qtd;
}

/* ADICIONAR AO CARRINHO */
function adicionarCarrinho(produto) {

  let chaveProduto = produto;
  let preco = precos[produto];

  if (produto === "cachorroquente") {
    const tipo = document.getElementById("tipo-cachorroquente");
    const texto = tipo.options[tipo.selectedIndex].text;
    preco = parseFloat(tipo.value);
    chaveProduto = produto + "-" + texto;
  }

  if (produto === "BatataMaluca") {
    const tipo = document.getElementById("tipo-BatataMaluca");
    const texto = tipo.options[tipo.selectedIndex].text;
    preco = parseFloat(tipo.value);
    chaveProduto = produto + "-" + texto;
  }

  precos[chaveProduto] = preco;

  if (carrinho[chaveProduto]) {
    carrinho[chaveProduto] += 1;
  } else {
    carrinho[chaveProduto] = 1;
  }

  atualizarCarrinho();
}
/* ATUALIZA RESUMO */
function atualizarCarrinho() {
      posicionarListaNoTopo();
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  let subtotal = 0;

  for (let item in carrinho) {
    const qtd = carrinho[item];
    const preco = precos[item];
    const totalItem = qtd * preco;
    subtotal += totalItem;

    lista.innerHTML += `
  <div class="item">
    <img src="${imagens[item.split("-")[0]]}">
    <span>${item.replace("-", " - ")} x${qtd}</span>
    <strong>R$ ${totalItem.toFixed(2)}</strong>
    <button onclick="removerItem('${item}')">❌</button>
  </div>
`;
  }

const retirar = document.getElementById("retirarLocal")?.checked;

let entrega = 0;

if (!retirar && subtotal > 0 && subtotal < 20) {
  entrega = 7;
}

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("entrega").textContent = entrega.toFixed(2);
  document.getElementById("total").textContent = (subtotal + entrega).toFixed(2);
}

/* RETIRAR NO LOCAL */
function toggleEndereco() {
  const retirar = document.getElementById("retirarLocal").checked;
  document.getElementById("endereco").disabled = retirar;

  atualizarCarrinho(); // recalcula frete
}

/* LIMPAR */
function limparCarrinho() {
  for (let item in carrinho) delete carrinho[item];
  document.querySelectorAll('[id^="qtd-"]').forEach(el => el.textContent = 0);
  atualizarCarrinho();
}

/* FINALIZAR PEDIDO */
function finalizarPedido() {

  if (Object.keys(carrinho).length === 0) {
    alert("Adicione itens ao pedido!");
    return;
  }

  const nome = document.getElementById("nome").value;
  const endereco = document.getElementById("endereco").value;
  const pagamento = document.getElementById("pagamento").value;
  const troco = document.getElementById("troco").value;
  const observacao = document.getElementById("observacao").value;
  const retirar = document.getElementById("retirarLocal").checked;

  const subtotal = document.getElementById("subtotal").textContent;
  const entrega = document.getElementById("entrega").textContent;
  const total = document.getElementById("total").textContent;

  let msg = "🍬 Pedido - Monety Doces 🍬\n\n";
  msg += "Itens do Pedido:\n";

  for (let item in carrinho) {
    msg += "- " + item.replace("-", " - ") + " x" + carrinho[item] + "\n";
  }

  msg += "\nNome: " + nome + "\n";

  if (retirar) {
    msg += "Retirada: No local\n";
  } else {
    msg += "Endereço: " + endereco + "\n";
  }

  msg += "Pagamento: " + pagamento + "\n";

  if (pagamento === "Dinheiro" && troco !== "") {
    msg += "Troco para: " + troco + "\n";
  }

  if (observacao !== "") {
    msg += "Observação: " + observacao + "\n";
  }

  msg += "\nSubtotal: R$ " + subtotal;
  msg += "\nEntrega: R$ " + entrega;
  msg += "\nTotal: R$ " + total;

  const url = "https://wa.me/5521965781487?text=" + encodeURIComponent(msg);

  window.open(url, "_blank");
}

function posicionarListaNoTopo() {
  const checkout = document.querySelector(".checkout");
  const subtitulo = checkout.querySelector(".subtitulo");
  const lista = document.getElementById("lista");

  if (checkout && subtitulo && lista) {
    checkout.insertBefore(lista, subtitulo.nextSibling);
  }
}
function removerItem(item){
  delete carrinho[item];
  atualizarCarrinho();
}