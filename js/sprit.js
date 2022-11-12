let front = 1;
let back = 1;
let left = 1;
let right = 1;
let positionX = 0;
let positionY = 0;
const BACK = 40;
const FRONT = 38;
const LEFT = 37;
const RIGHT = 39;
const speed = 5;
let mapIndex = 1;
let perso = document.getElementById('perso');
let map = document.getElementById('map');
let resultMap = document.getElementById('resultMap');


function createMap(mapper, index, mode) {
	if(mode === "start") {
		positionX = mapper[index].start[0];
		positionY = mapper[index].start[1];
	} else {
		positionX = mapper[index].end[0];
		positionY = mapper[index].end[1];
	}
	
	perso.style.top = positionY+"px";
	perso.style.left = positionX+"px";

	let html = "<table>";

	for(let i = 0; i < mapper[index].map.length; i++ )
	{
		html +="<tr>";
		for( let j = 0; j < mapper[index].map[i].length; j++)
		{
			switch(mapper[index].map[i][j])
			{
				case 0:
					html += "<td class='grass'>";
					break
				case 1:
					html += "<td class='water'>";
					break;
				case 2:
					html += "<td class='rock'>";
					break;
				case 3:
					html += "<td class='block'>";
					break;
				case 4:
				case 5:
					html += "<td class='out'>";
					break;

			}
		}
		html += "</tr>";
	}
	html += "</table>";
	resultMap.innerHTML = html;
}

function movePerso(event) {
	switch(event.keyCode) {
		case BACK: 
			perso.className = "";
			back++;
			if(back > 9) {
				back = 1;
			}
			perso.classList.add('positionFace-'+back);
			if(isValidatePosition(positionX, positionY, mapper, BACK)) {
				console.log("ça passe back")
				positionY += speed;

				perso.style.top = positionY+"px";
			}
			
		break;


		case FRONT: 
			perso.className = "";
			front++;
			if(front > 9) {
				front = 1;
			}
			perso.classList.add('positionBack-'+front);
			
			if(isValidatePosition(positionX, positionY, mapper, FRONT)) {
								console.log("ça passe front")
				positionY -= speed;
				perso.style.top = positionY+"px";
			}
			
		break

		case LEFT: 
			perso.className = "";
			left++;
			if(left > 9) {
				left = 1;
			}
			perso.classList.add('positionLeft-'+left);
			
			if(isValidatePosition(positionX, positionY, mapper, LEFT)) {
				positionX -= speed;
				perso.style.left = positionX+"px";
			}
			
		break

		case RIGHT: 
			perso.className = "";
			right++;
			if(right > 9) {
				right = 1;
			}
			perso.classList.add('positionRight-'+right);
			
			if(isValidatePosition(positionX, positionY, mapper, RIGHT)) {
				positionX += speed;
				perso.style.left = positionX+"px";
			}
			
		break
	}
	
}

function isValidatePosition(positionX, positionY, mapper, mode) {

	let indexI =0
	let indexY = 0

	if(mode === BACK) {
		indexI = parseInt((positionY + 40) / 60);
		indexY =  parseInt((positionX + 30) / 60);
	} else if(mode === FRONT) {
		indexI = parseInt((positionY + 0) / 60);
		indexY =  parseInt((positionX + 30) / 60);
	} else if(mode === LEFT) {
		indexI = parseInt((positionY + 30) / 60);
		indexY =  parseInt((positionX + 20) / 60);
	} else if (mode === RIGHT) {
		indexI = parseInt((positionY + 30) / 60); 
		indexY =  parseInt((positionX + 40) / 60); 
	}


	 let type = mapper[mapIndex].map[indexI][indexY];
	 console.log('type : ', type);

	 if(type === 5) {
	 	mapIndex ++;
	 	if(mapIndex >= mapper.length) {
	 		mapIndex=0;
	 	}
	 	createMap(mapper, mapIndex, 'start');
	 } else if (type === 4) {
	 	mapIndex --;
	 	if(mapIndex < 0) {
	 		mapIndex=mapper.length - 1;
	 	}
	 	createMap(mapper, mapIndex, 'end');
	 }else  if(type === 0 ) {
	 	return true;
	 } else {
	 	return false
	 }
	
}


createMap(mapper, mapIndex, 'start');
document.addEventListener('keydown', movePerso)