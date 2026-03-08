const indisponiveis = [
  //"coca350",
  //"xtudo",
  //"xcalabresa",
  //"xfrango",
  //"cachorroquente",
  //"CachorroQuenteCoreano",
  //"EspetoCoreano",
  //"BatataMaluca",
  //"BatataRecheada",
  //"EspetinhoQueijo",
  //"PaoDeAlho",
  //"Sanduiche",
  //"Pudim",
  //"Bolinho",
  //"acai",
  //"choconinho",
  //"moussemaracuja",
  //"pavedemaracuja",
  //"bombodeuva",
  //"ferreirorocher",
  //"chocolatecombrigadeiro",
  //"mousseferrero",
  //"moussedechocolate",
  //"cuzcuz",
  //"pavedelimao",
  //"sucomanga",
  //"sucoabacaxi",
  //"guaravita",
  //"coca15l",
  //"guarana15l"
];
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
  guarana15l: 10.00,
  coca15l: 12.00
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
  guarana15l: "guarana2l.jpeg",
  coca15l: "coca2l.jpeg"
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
  controlarBarraPedido();
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
  controlarBarraPedido();
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

  const url = "https://wa.me/5521969057549?text=" + encodeURIComponent(msg);

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

/* ============================= */
/* FUNÇÕES VISUAIS TIPO IFOOD   */
/* ============================= */

/* TOAST */
function mostrarToast(msg){
  let toast = document.getElementById("toast-add");

  if(!toast){
    toast = document.createElement("div");
    toast.id = "toast-add";
    toast.style.position = "fixed";
    toast.style.bottom = "90px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#222";
    toast.style.color = "#fff";
    toast.style.padding = "10px 18px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "0.3s";
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = "1";

  setTimeout(()=>{
    toast.style.opacity = "0";
  },1500);
}

/* BARRA FLUTUANTE */
function criarBarraPedido(){

  if(document.getElementById("barraPedido")) return;

  const barra = document.createElement("div");
  barra.id = "barraPedido";

  barra.style.position = "fixed";
  barra.style.bottom = "0";
  barra.style.left = "0";
  barra.style.width = "100%";
  barra.style.background = "#ff3c00";
  barra.style.color = "#fff";
  barra.style.display = "flex";
  barra.style.justifyContent = "space-between";
  barra.style.alignItems = "center";
  barra.style.padding = "14px 20px";
  barra.style.fontWeight = "bold";
  barra.style.zIndex = "9999";
  barra.style.boxShadow = "0 -2px 10px rgba(0,0,0,0.2)";

  barra.innerHTML = `
    <span id="barraTotal">Total R$ 0.00</span>
    <button id="verPedidoBtn"
      style="
      background:#fff;
      color:#ff3c00;
      border:none;
      padding:8px 16px;
      border-radius:6px;
      font-weight:bold;
      cursor:pointer;
      ">
      Ver pedido
    </button>
  `;

  document.body.appendChild(barra);

  document.getElementById("verPedidoBtn").onclick = ()=>{
    document.querySelector(".checkout")
      .scrollIntoView({behavior:"smooth"});
  };
}

/* ATUALIZA TOTAL NA BARRA */
function atualizarBarraTotal(){
  const total = document.getElementById("total").textContent;
  const el = document.getElementById("barraTotal");
  if(el){
    el.textContent = "Ver pedido • R$ " + total;
  }
}

/* INTERCEPTAR ADIÇÃO AO CARRINHO */
const adicionarOriginal = adicionarCarrinho;

adicionarCarrinho = function(produto){

  adicionarOriginal(produto);

  mostrarToast("Item adicionado ao pedido");

  criarBarraPedido();

  setTimeout(()=>{
    atualizarBarraTotal();
  },50);
};

/* ATUALIZA TOTAL SEMPRE */
const atualizarOriginal = atualizarCarrinho;

atualizarCarrinho = function(){

  atualizarOriginal();

  atualizarBarraTotal();
};
function controlarBarraPedido(){
  const barra = document.getElementById("barraPedido");

  if(!barra) return;

  if(Object.keys(carrinho).length === 0){
    barra.style.display = "none";
  }else{
    barra.style.display = "flex";
  }
}
function verificarDisponibilidade(){

  indisponiveis.forEach(produto => {

    const btn = document.querySelector(`button[onclick="adicionarCarrinho('${produto}')"]`);

    if(btn){
      btn.disabled = true;
      btn.innerText = "Indisponível";
      btn.style.background = "#999";
      btn.style.cursor = "not-allowed";
    }

  });

}

window.addEventListener("load", verificarDisponibilidade);

function verificarHorarioFuncionamento(){

  const agora = new Date();

  const dia = agora.getDay(); 
  const hora = agora.getHours();
  const minuto = agora.getMinutes();

  const horaAtual = hora + minuto/60;

  let aberto = false;

  // Domingo
  if(dia === 0){
    if(horaAtual >= 10 && horaAtual < 23) aberto = true;
  }

  // Segunda a Sexta
  if(dia >= 1 && dia <= 5){
    if(horaAtual >= 17 && horaAtual < 22) aberto = true;
  }

  // Sábado
  if(dia === 6){
    if(horaAtual >= 12 && horaAtual < 23) aberto = true;
  }

  if(!aberto){

    document.querySelectorAll(".btn-add").forEach(btn => {

      btn.disabled = true;
      btn.innerText = "Fechado";
      btn.style.background = "#999";
      btn.style.cursor = "not-allowed";

    });

  }

}

window.addEventListener("load", verificarHorarioFuncionamento);