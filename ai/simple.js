function canMoveDown(grid) {
	var retrn = false;
	grid.eachCell(function(x, y, content) {
		if (y < 3) {
			if(grid.cellOccupied({x:x, y:y})) {
				if(!grid.cellOccupied({x:x, y:y+1})) {
					retrn = true;
				}
				if(content == grid.cellContent({x:x, y:y+1})) {
					retrn = true;
				}
			}
		}
	});
	
	return retrn;
}

function canMoveLeft(grid) {
	var retrn = false;
	grid.eachCell(function(x, y, content) {
		if (x > 0) {
			if(grid.cellOccupied({x:x, y:y})) {
				if(!grid.cellOccupied({x:x-1, y:y})) {
					retrn = true
				}
				if(content == grid.cellContent({x:x-1, y:y})) {
					retrn = true;
				}
			}
		}
	});
	
	return retrn;
}

function canMoveRight(grid) {
	var retrn = false;
	grid.eachCell(function(x, y, content) {
		if (x < 3) {
			if(grid.cellOccupied({x:x, y:y})) {
				if(!grid.cellOccupied({x:x+1, y:y})) {
					retrn = true;
				}
				if(content == grid.cellContent({x:x+1, y:y})) {
					retrn = true;
				}
			}
		}
	});
	
	return retrn;
}

function AI(grid) {
	console.log(grid);
	if (canMoveDown(grid)) {
		console.log("DOWN");
		return 2;
	} else if (canMoveLeft(grid)) {
		console.log("LEFT");
		return 3;
	} else if (canMoveRight(grid)) {
		console.log("RIGHT");
		return 1;
	}

	console.log("UP");
	return 0;
}