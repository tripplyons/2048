function tileAt(x, y) {
	try {
		return document.getElementsByClassName("tile-position-" + (x + 1) + "-" + (y + 1))[0].firstChild.innerHTML;
	} catch (err) { }
	return "";
	// return tiles.children[y].children[x].innerHTML; 
	// return $("#grid:nth-child("+y+"):nth-child("+x+")").innerHTML;
}

function tilesFromGrid() {
	return [[tileAt(0, 0), tileAt(1, 0), tileAt(2, 0), tileAt(3, 0)],
		[tileAt(0, 1), tileAt(1, 1), tileAt(2, 1), tileAt(3, 1)],
		[tileAt(0, 2), tileAt(1, 2), tileAt(2, 2), tileAt(3, 2)],
		[tileAt(0, 3), tileAt(1, 3), tileAt(2, 3), tileAt(3, 3)]];
}

function canMoveDown(tiles) {
	for (var row = 0; row < 3; row++) {
		for (var col = 0; col < 4; col++) {
			if (tiles[row][col] != "" && (tiles[row + 1][col] == "" || tiles[row + 1][col] === tiles[row][col])) {
				return true;
			}
		}
	}

	return false;
}

function canMoveLeft(tiles) {
	for (var row = 0; row < 4; row++) {
		for (var col = 1; col < 4; col++) {
			if (tiles[row][col] != "" && (tiles[row][col - 1] == "" || tiles[row][col - 1] === tiles[row][col])) {
				return true;
			}
		}
	}

	return false;
}

function canMoveRight(tiles) {
	for (var row = 0; row < 4; row++) {
		for (var col = 0; col < 3; col++) {
			if (tiles[row][col] != "" && (tiles[row][col + 1] == "" || tiles[row][col + 1] === tiles[row][col])) {
				return true;
			}
		}
	}

	return false;
}

function AI(grid) {
	console.log(grid);
	debugger;
	var tiles = tilesFromGrid(grid); 
	if (canMoveDown(tiles)) {
		console.log("DOWN");
		return 2;
	} else if (canMoveLeft(tiles)) {
		console.log("LEFT");
		return 3;
	} else if (canMoveRight(tiles)) {
		console.log("RIGHT");
		return 1;
	}

	// console.log("UP");
	return 0;
}