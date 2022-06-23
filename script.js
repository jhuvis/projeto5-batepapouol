

var nome = prompt("Digite seu nome:");
const obj = 
    {
    name: nome,
    }

var req = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', obj);
req.then(tratarSucesso);
req.catch(tratarError);

var p = new Object();

function tratarError(erro)
{
    if(erro.response.status == 400)
    {
        obj.name = prompt("Digite outro nome, esse ja esta em uso:");
        req = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', obj);
        req.then(tratarSucesso);
        req.catch(tratarError);
    }
    else
    {
        alert(erro);
    }
}

function request()
{
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', obj);
}

function tratarSucesso(r)
{
    const statusCode = r.status;
    setInterval("request();", 5000);
    setInterval("tempoMsg();", 1000);
}

function tempoMsg()
{
    p = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');  
    p.then(carregarMsg);
    p.catch(erroM);
    
}

function erroM(erro)
{
    alert(erro);
}

function carregarMsg(msg)
{
    const mostra = document.querySelector("ul");
    var mostraMsg = "";

        if(msg.data[msg.data.length - 1].type === "status")
        {
        mostraMsg += `
          <li>
              <div class="${msg.data[msg.data.length - 1].type}">
                <span class="tempo">${msg.data[msg.data.length - 1].time} </span><b> ${msg.data[msg.data.length - 1].from} </b><span> ${msg.data[msg.data.length - 1].text}</span>
              </div>
          </li>`;

        } 
        if(msg.data[msg.data.length - 1].type === "message")
        {
        mostraMsg += `
          <li>
              <div class="${msg.data[msg.data.length - 1].type}">
                <span class="tempo">${msg.data[msg.data.length - 1].time} </span><b> ${msg.data[msg.data.length - 1].from} </b> para <b> ${msg.data[msg.data.length - 1].to} </b><span> ${msg.data[msg.data.length - 1].text}</span>
              </div>
          </li>`;
                      
        }

        mostra.innerHTML += mostraMsg;
        mostra.scrollIntoView();
        
}