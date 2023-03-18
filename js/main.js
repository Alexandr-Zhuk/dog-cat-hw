const area = document.querySelector('.area');
const dogHouse = document.querySelector('.dog-house');
const header = document.querySelector('.header');
const dogs = area.querySelectorAll('.dog');
let areaWidth = area.clientWidth;
let areaHeight = area.clientHeight;
let dogHouseWidth = dogHouse.clientWidth;
let dogHouseHeight = dogHouse.clientHeight;

const coordinates = {};


const houseCoordinates = {
    house: [200, 300],
};

//функция рандомного числа
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

//функция рендеринга собак на поле
const renderPositions = () => {
    let qty = Object.keys(coordinates).length;
    for(let i = 0; i < qty; i++){
        dogs[i].style.left = coordinates[i][0][0] + 'px';
        dogs[i].style.top = coordinates[i][0][1] + 'px';
    }
    
}

//заполняем объект с координатами рандомными числами для стартовых позиций
const randomStartPositions = () =>{
    for(let i = 0; i < dogs.length; i++){   
        let coorX = getRandomInt(areaWidth - dogs[i].clientWidth);
        let coorY = getRandomInt(areaHeight - dogs[i].clientHeight);
        coordinates[i] = 
            [
                [coorX, coorY],
                [coorX + dogs[i].clientWidth, coorY],
                [coorX, coorY + dogs[i].clientHeight],
                [coorX + dogs[i].clientWidth, coorY + dogs[i].clientHeight]
            ];
    }
    renderPositions();
}

randomStartPositions();

const checkDogsIncident = (id) => {
    for(let i = 0; i < Object.keys(coordinates).length; i++){
        if(id === i){
            continue;
        }

        for(let a = 0; a < coordinates[i].length; a++){
            if(
                coordinates[id][a][0] > coordinates[i][0][0]
                && coordinates[id][a][0] < coordinates[i][1][0]
                && coordinates[id][a][1] > coordinates[i][0][1]
                && coordinates[id][a][1] < coordinates[i][2][1]
            ){
                renderPositions();     
                let coorX = getRandomInt(areaWidth - dogs[id].clientWidth);
                let coorY = getRandomInt(areaHeight - dogs[id].clientHeight);
                coordinates[id] = 
                    [
                        [coorX, coorY],
                        [coorX + dogs[i].clientWidth, coorY],
                        [coorX, coorY + dogs[i].clientHeight],
                        [coorX + dogs[i].clientWidth, coorY + dogs[i].clientHeight]
                    ];
                break;
            }
        }
    }
}

area.addEventListener('click', (e) => {
    let someAnimal = e.target.closest('div');
    
    if(someAnimal.classList.contains('dog')){
        
        let id = someAnimal.dataset.id;
    
        if(e.target.clientWidth/2 > e.offsetX && e.target.clientHeight/2 > e.offsetY){
            for(let i = 0; i < coordinates[id].length; i++){
                coordinates[id][i][0] += e.target.clientWidth;
                coordinates[id][i][1] += e.target.clientHeight;
            }
            
            
        }else if(e.target.clientWidth/2 > e.offsetX && e.target.clientHeight/2 < e.offsetY){
            for(let i = 0; i < coordinates[id].length; i++){
                coordinates[id][i][0] += e.target.clientWidth;
                coordinates[id][i][1] -= e.target.clientHeight;
            }
            
        }else if(e.target.clientWidth/2 < e.offsetX && e.target.clientHeight/2 > e.offsetY){
            for(let i = 0; i < coordinates[id].length; i++){
                coordinates[id][i][0] -= e.target.clientWidth;
                coordinates[id][i][1] += e.target.clientHeight;
            }  
        }else{
            for(let i = 0; i < coordinates[id].length; i++){
                coordinates[id][i][0] -= e.target.clientWidth;
                coordinates[id][i][1] -= e.target.clientHeight;
            }  
        }

        if(coordinates[id][0][0] <= 0){
            coordinates[id][0][0] = 0;
        }
        if(parseInt(coordinates[id][0][1]) <= 0){
            coordinates[id][0][1] = 0;
        }
        if(coordinates[id][0][0] >= areaWidth - e.target.clientWidth){
            coordinates[id][0][0] = areaWidth - e.target.clientWidth;
        }
        if(coordinates[id][0][1] >= areaHeight - e.target.clientHeight){
            coordinates[id][0][1] = areaHeight - e.target.clientHeight;
        }
        
        let test = houseCoordinates.house[0] + dogHouseWidth;
        let tost = houseCoordinates.house[1] + dogHouseHeight; 
        
        
        
        //проверяем заходит в хату собака или нет
        for(let i = 0; i < coordinates[id].length; i++){
            
            if(coordinates[id][i][0] > houseCoordinates.house[0] 
                && coordinates[id][i][0] < test
                && coordinates[id][i][1] > houseCoordinates.house[1]
                && coordinates[id][i][1] < tost){
                    coordinates[id][0][0] = houseCoordinates.house[0] + 25;
                    coordinates[id][0][1] = houseCoordinates.house[1] + 25;
                    
                    header.innerHTML += `Собайло ${id} в хаті!`;
                    break;
                }else{
                    header.innerHTML = '';
                }
        }
        checkDogsIncident(id);
        renderPositions();
    }
})


