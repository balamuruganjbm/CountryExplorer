var btn = document.querySelector("#submit");
var api = "https://restcountries.eu/rest/v2/name/";
if(btn){
    btn.addEventListener("click",()=>{
        let search = document.querySelector("#search").value;
        url=api+search;
        // fetch functions are written separately
            // for readabilty and reusability
        fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(getResult)
        .catch(displayError) 
    });
}

//Fetch Functions
function handleErrors(req){
    if(!req.ok){
        throw Error(req.status);  //Handling Errors
    }
    return req;
}

function parseJSON(res){
    return res.json();
}

function getResult(data){
    let results =document.querySelector(".results");
    let newElt="<div class='container'> ";
    data.forEach(element => {
        newElt+=`<div id=${element.alpha3Code} class="result" onclick="redirect(this.id)">
                <img id="rImg" src=${element.flag}>
                <h3>${element.name}</h3>
            </div>`;        
    });
    newElt+="</div>";
    results.innerHTML=newElt;
}

function displayError(err){
    alert(err+" oopss..!! something went wrong try some other keywords");
}
function redirect(country){
    window.location.href="country.html"+"?detail="+country;
}

// When particular country clicked
function getDetail(){
    country=window.location.search.split("=")[1];
    newApi="https://restcountries.eu/rest/v2/alpha/";
    let newUrl=newApi+country;
    fetch(newUrl)
    .then(handleErrors)
    .then(parseJSON)
    .then(getInfo)
    .catch(displayError)
}

//Fetch function for getting selected country info
function getInfo(data)
{
    cName=document.querySelector("#cName");
    info=document.querySelector(".info");
    image=document.querySelector(".image");
    cName.textContent=data.name+" ["+data.alpha3Code+"]";
    let description=`<div class='description'>
                    <table><tbody>   
                    <tr><td><b>Capital</b></td><td>${data.capital}</td></tr>
                    <tr><td><b>Region</b></td><td>${data.region}</td></tr>
                    <tr><td><b>Population</b></td><td>${data.population}</td></tr>
                    <tr><td><b>Currency </b></td><td>${data.currencies[0].name}</td></tr>
                    <tr><td><b>Time Zones</b></td><td>${data.timezones[0]}</td></tr>
                    <tr><td><b>Languages</b></td><td>
                    `
                    
        data.languages.forEach((elt)=>{
            description+=`${elt.name} ; `
        });
        description+=`</td></td>
                      </tbody></table> 
                      </div>`
    image.setAttribute("src",data.flag)
    info.innerHTML=description;
}