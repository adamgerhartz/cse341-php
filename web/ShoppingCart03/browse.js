let arrayOfObjects = [];

function renderDoc() {
	renderNav();
	fetchObjects();
	renderItemList();
}

function renderNav() {
	$.ajax({ 
		url: 'main.php',
        data: {action: 'cart_length'},
        type: 'post',
        success: function(output) {
        	console.log(`The session has ${output} item(s) currently`);
        	if (parseInt(output) !== 0) {
        		checkButtonMargin(output);
        		document.getElementById("cart-length").innerHTML = output;
        		document.getElementById("cart-length").style.display = "block";
        	}
        }
	});
}

function renderItemList() {
	const rows = output.length / 3;
	const cols = 3;
	let count = 0;
	for (let ind = 0; ind < rows; ind++) {
		for (let i = 0; i < cols; i++) {
			if (count === 10) { count++; i=0; continue; } 
			document.getElementsByClassName("row")[ind].innerHTML += 
				`<div class="col">
			 		<img class="card-img-top" id="product-photo${count + 1}" src="..." alt="Product image" style="visibility:hidden">
					<div class="card-body">
						<h3 class="text-success" id="name${count + 1}"></h3>
				 		<p class="card-text" id="description${count + 1}"></p>
				 		<button class="btn btn-success" id="my-btn${count + 1}" style="visibility:hidden" onclick="addItem(output[${count}])">+</button>
				 		<div class="h5 float-right" id="price${count + 1}"></div>
					 </div>
				</div>`;
			
			if (count === 30) {
				return;
			}
			renderData(count);
			count++;
		}
	}
}


function renderData(count) {
	document.getElementById(`product-photo${count+1}`).style.visibility = "visible";
	document.getElementById(`my-btn${count + 1}`).style.visibility = "visible";
	document.getElementById(`product-photo${count+1}`).src = output[count].image;
	document.getElementById(`name${count+1}`).innerHTML = truncateString(output[count].name, 30);
	document.getElementById(`description${count+1}`).innerHTML = truncateString(output[count].description, 132);
	document.getElementById(`price${count+1}`).innerHTML = `$${
		(parseFloat(output[count].price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
	}`;
}



function addItem(obj) {
	saveInSession(obj);
	incrementNavNum();
}


function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}

function saveInSession(obj) {
	arrayOfObjects.push(obj);
	console.log(`Array; ${arrayOfObjects[0]}`)
	if (obj !== null) {
		let objJson = "[";
		for (let i = 0; i < arrayOfObjects.length; i++) {
			objJson += JSON.stringify(arrayOfObjects[i]);
			objJson += (i !== arrayOfObjects.length - 1 ? ',' : ']');
		}
		
		$.ajax({
			url: 'main.php',
			type: 'post',
			data: { item: objJson, action: 'save_items' },
			success: function(response) {
				console.log(`Items: ${response}`);
			}
		})
	}
}


function fetchObjects() {
	$.ajax({ 
		url: 'main.php',
        data: {action: 'cart_items'},
        type: 'post',
        success: function(output) {
        	// for (let i = 0; i < output.length; i++) {
        	// 	console.log(JSON.parse(output[i]));
        	// }
        	if (output != "") {
        		let tempArrObj = JSON.parse(output);
        		tempArrObj.forEach(obj => arrayOfObjects.push(obj));
        	}
        	
        }
	});
}

function incrementNavNum() {
	let num = parseInt(document.getElementById("cart-length").innerHTML);
	num += 1;
	checkButtonMargin(num);
	document.getElementById("cart-length").innerHTML = num;
	document.getElementById("cart-length").style.display = "block";
}

function checkButtonMargin(num) {
	if (num >= 100) {
		document.getElementById("cart-length").style.marginRight = "15px";
	} else if (num >= 10) {
		document.getElementById("cart-length").style.marginRight = "13px";
	}
}