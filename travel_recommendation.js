const btnSearch = document.getElementById('searchBtn')
const heading = document.getElementById('mainheading')
const resultDiv = document.getElementById('results')
const book = document.getElementById('book');

function searchDestination(){
    const input = document.getElementById('searchBarInput');
    heading.textContent = 'Search Results'
    resultDiv.innerHTML='';
    const description = document.getElementById("description");
    description.style.display = "none";
    book.style.display = "none";
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
        else{
            const country = data.countries.find(item=>item.name.toLowerCase()===word)
            if(country){
                destination = country.cities;
            }
            else{
                alert('Not Found')
            }
        }
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

