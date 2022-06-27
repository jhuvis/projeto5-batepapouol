

var nome = prompt("Digite seu nome:");
const obj = 
    {
    name: nome,
    }

let p;
var req = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', obj);
req.then(tratarSucesso);
req.catch(tratarError);



function tratarError(erro)
{
    if(erro.status === 400)
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

function tratarSucesso()
{
    setInterval("request();", 5000);
    setInterval("tempoMsg();", 3000);
    //setTimeout ("carregarMsg();", 3001);  
    
}

function renderiza(resposta)
{
    p = resposta.data;
}

function tempoMsg()
{
    const promessa = axios.get(
        "https://mock-api.driven.com.br/api/v6/uol/messages"
      );
      promessa.then(carregarMsg);   
}

function erroM(erro)
{
    alert(erro);
}

function carregarMsg(resposta)
{
    p = resposta.data;
    const mostra = document.querySelector("ul");
    
    for (let i = p.length - 1; i < p.length; i++)
    {
        if(p[i].type === "status")
        {
            mostra.innerHTML += `
          <li>
              <div class="${p[i].type}">
                <span class="tempo">${p[i].time} </span><b> ${p[i].from} </b><span> ${p[i].text}</span>
              </div>
          </li>`;
        } 
        
        if(p[i].type === "message")
        {
            mostra.innerHTML += `
          <li>
              <div class="${p[i].type}">
                <span class="tempo">${p[i].time} </span><b> ${p[i].from} </b> para <b> ${p[i].to} </b><span> ${p[i].text}</span>
              </div>
          </li>`;
                      
        }
    }
        mostra.scrollIntoView();
        
}

function enviarMsg()
{
    const pega = document.querySelector(".texto").value;
    const msg = {
        from: nome,
        to: "Todos",
        text: pega,
        type: "message" 
    }

    const requisicao = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);

    requisicao.catch(erroM);

}