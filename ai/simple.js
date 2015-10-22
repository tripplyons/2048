function canMoveDown(grid) {
	var retrn = false;
	grid.eachCell(function(x, y, content) {
		if (y != grid.size-1) {
			try {
				if(grid.cellOccupied({x:x, y:y})) {
					if(!grid.cellOccupied({x:x, y:y+1})) {
						retrn = true;
					}
					if(content.value == grid.cellContent({x:x, y:y+1}).value) {
						retrn = true;
					}
				}
			} catch(err) {  }
		}
	});
	
	return retrn;
}

function canMoveLeft(grid) {
	var retrn = false;
	grid.eachCell(function(x, y, content) {
		if (x != 0) {
			try {
				if(grid.cellOccupied({x:x, y:y})) {
					if(!grid.cellOccupied({x:x-1, y:y})) {
						retrn = true
					}
					if(content.value == grid.cellContent({x:x-1, y:y}).value) {
						retrn = true;
					}
				}
			} catch(err) {  }
		}
	});
	
	return retrn;
}

function canMoveRight(grid) {
	var retrn = false;
	grid.eachCell(function(x, y, content) {
		if (x != grid.size-1) {
			try {
				if(grid.cellOccupied({x:x, y:y})) {
					if(!grid.cellOccupied({x:x+1, y:y})) {
						retrn = true;
					}
					if(content.value == grid.cellContent({x:x+1, y:y}).value) {
						retrn = true;
					}
				}
			} catch(err) {  }
		}
	});
	
	return retrn;
}

function AI(grid) {
	console.log(grid);
	var bottomRowFull = true;
	for(var col=0; col<grid.size; col++) {
		bottomRowFull = bottomRowFull && grid.cellOccupied({x:col, y:grid.size-1});
	}
	var leftColFull = true;
	for(var row=0; row<grid.size; row++) {
		leftColFull = leftColFull && grid.cellOccupied({x:0, y:row});
	}
	
	if(!bottomRowFull) {
		if (canMoveRight(grid)) {
			return 1;
		} else if (canMoveLeft(grid)) {
			return 3;
		} else if (canMoveDown(grid)) {
			return 2;
		}
	}
	
	if (canMoveDown(grid)) {
		return 2;
	} else if (canMoveLeft(grid)) {
		return 3;
	} else if (canMoveRight(grid)) {
		return 1;
	}
	
	return 0;
}