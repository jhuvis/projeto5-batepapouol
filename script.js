const msg = [
    {
        from: "João",
        to: "Todos",
        text: "entra na sala...",
        type: "status",
        time: "08:01:17"
    },
    {
        from: "João",
        to: "Todos",
        text: "Bom dia",
        type: "message",
        time: "08:02:50"
    },
];

const nome =  prompt("Digite seu nome:");
const req = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', {nome});
req.then(tratarSucesso);
req.catch(tratarError);

function tratarError(erro)
{
    if(erro.response.status === 400)
    {
        nome =  prompt("Digite outro nome, esse ja esta em uso:");
        req = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', {nome});
        req.then(tratarSucesso);
        req.catch(tratarError);
    }
    else
    {
        alert(erro);
    }
}

function tratarSucesso(Resposta)
{
    carregarMsg();
}

function carregarMsg()
{
    document.querySelector("ul").innerHTML = "";
    for (let i = 0; i < msg.length; i++) 
    {
        if(msg[i].type === "status")
        {
        const mostraMsg = `
          <li>
              <div class="${msg[i].type}">
                <span class="tempo">${msg[i].time} </span><b> ${msg[i].from} </b><span> ${msg[i].text}</span>
              </div>
          </li>`;

        document.querySelector("ul").innerHTML += mostraMsg;
        } 
        if(msg[i].type === "message")
        {
        const mostraMsg = `
          <li>
              <div class="${msg[i].type}">
                <span class="tempo">${msg[i].time} </span><b> ${msg[i].from} </b> para <b> ${msg[i].to} </b><span> ${msg[i].text}</span>
              </div>
          </li>`;
          
        document.querySelector("ul").innerHTML += mostraMsg;
        }
      }
}