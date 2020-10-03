function renderDoc() {
	console.log(length);
	console.log(items);
	displayItemCount(length);
    renderTable(length);
}

function renderTable(tablelength) {
	let tBody = "<tbody>";
	for (let i = 0; i < tablelength; i++) {
		tBody += `<tr><th scope="row">${i + 1}</th>`;
		tBody += `<td style="width:20%"><img class="img-fluid" style="width:90%" src="${items[i].image}" alt="Product image"></td>`;
		tBody += `<td><div class="h3">${items[i].name}</div><small class="text-muted">${items[i].description}</small></td>`;
		tBody += `<td>$${(parseFloat(items[i].price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>`;
		tBody += `<td><button class="btn ml-auto" onclick="deleteItem(${i})"><i class="gg-trash" style="color:red"></i></button></td></tr>`;
	}
	tBody += `<tr><th scope="row">Total</th><td></td><td></td><td>$${sum()}</td><td></td></tr>`
	tBody += "</tbody>";

	document.getElementsByClassName("table")[0].innerHTML = tBody;
}

function sum() {
	let prices = [];
	items.filter((item) => {
		prices.push(parseFloat(item.price));
	});
	
	let sum = prices.reduce((result, item) => {
  		return result + item;
	}, 0);

	sum = sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
	return sum;
}

function deleteItem(i) {
	items.splice(i, 1);
	updateSession();
	let tempLength = parseInt(document.getElementById("length").innerHTML) - 1;
	displayItemCount(tempLength);
	renderTable(tempLength);

}

function displayItemCount(length) {
	if (length != 1) {
		document.getElementById("length").innerHTML = `${length} items`;
	} else {
		document.getElementById("length").innerHTML = `${length} item`;
	}
	
}

function updateSession() {
	objJson = JSON.stringify(items);
	 $.ajax({
		url: 'main.php',
		type: 'post',
		data: { item: objJson, action: 'save_items' },
		success: function(response) {
			console.log(`Items: ${response}`);
		}
	})
}