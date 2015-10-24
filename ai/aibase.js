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

function getBiggest(grid) {
	var biggest = 0;
	grid.eachCell(function(x, y, content) {
		try {
			if(content.value > biggest)
				biggest = content.value;
		} catch(err) {  }
	});
	
	return biggest;
}

function getSecondBiggest(grid, biggest) {
	var secondBiggest = 0;
	grid.eachCell(function(x, y, content) {
		try {
			if(content.value > secondBiggest && content.value != biggest)
				secondBiggest = content.value;
		} catch(err) {  }
	});
	
	return secondBiggest;
}

function posesByValue(grid, val) {
	var poses=[];
	grid.eachCell(function(x, y, content) {
		try {
			if(content.value == val)
				poses.push({x:x, y:y});
		} catch(err) {  }
	});
	return poses;
}

