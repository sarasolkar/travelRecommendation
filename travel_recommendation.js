const btnSearch = document.getElementById('searchBtn')
const heading = document.getElementById('mainheading')
const resultDiv = document.getElementById('results')
const book = document.getElementById('book');

function searchDestination(){
    const input = document.getElementById('searchBarInput');
    resultDiv.innerHTML='';
    const description = document.getElementById("description");
    document.querySelector(".info").style.display = "none";
    const headingres = document.createElement("div")
    headingres.classList.add("resultheading")
    headingres.innerHTML="<h2>Search Results<h2>";
    fetch("travel_recommendation_api.json")
    .then(response=>response.json())
    .then(data=>{
        const word = input.value.toLowerCase();
        let destination  =[];
        if(word ==="beach" || word === "beaches"){
            destination = data.beaches;
        }
        else if(word === "temples" || word === "temple"){
            destination = data.temples;
        }
        else if(word === "country" || word === "countries"){
            data.countries.forEach(country => {
                destination.push(...country.cities);
            });
        }
        else{
            const country = data.countries.find(item=>item.name.toLowerCase()===word)
            if(country){
                destination = country.cities;
            }
            else{
                alert('Not Found')
            }
        }
        resultDiv.appendChild(headingres);
        destination.forEach(place=>{
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML=`
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            `;

            resultDiv.appendChild(card);
        })

    });

}
btnSearch.addEventListener('click',searchDestination)

const resetBtn = document.getElementById("resetBtn");

function resetSearch() {
    document.getElementById("searchBarInput").value = "";
    resultDiv.innerHTML = "";
    document.querySelector(".info").style.display = "block";
}

resetBtn.addEventListener("click", resetSearch);