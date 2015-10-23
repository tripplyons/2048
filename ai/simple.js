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

function AI(grid) {
	var biggest = getBiggest(grid);
	
	if(grid.cellAvailable(0, grid.size-1)) {
		for(var row=grid.size-2; row >= 0; row--) {
			// try {
			if(grid.cellOccupied(0, row)) {
				if(grid.cellContent(0, row).value == biggest)
					return 2;
				else
					break;
			}
			// } catch(err) {  }
		}
		for(var col=1; col < grid.size; col++) {
			if(grid.cellOccupied(0, row)) {
				// try {
				if(grid.cellContent(0, row).value == biggest)
					return 3;
				else
					break;
				// } catch(err) {  }
			}
		}
	}
	
	var bottomRowFull = true;
	for(var col=0; col<grid.size; col++) {
		bottomRowFull = bottomRowFull && grid.cellOccupied({x:col, y:grid.size-1});
	}
	
	var biggestPoses = posesByValue(grid, biggest);
	if(biggestPoses.length >= 2) {
		if(biggestPoses[0].x != biggestPoses[1].x) {
			if(canMoveLeft(grid))
				return 3;
		} else {
			if(canMoveDown(grid))
				return 2;
		}
	}
	var secondBiggest = getSecondBiggest(grid, biggest); 
	var secondBiggestPoses = posesByValue(grid, secondBiggest);
	if(secondBiggestPoses.length >= 2) {
		if(secondBiggestPoses[0].x != secondBiggestPoses[1].x) {
			if(canMoveLeft(grid))
				return 3;
		} else {
			if(canMoveDown(grid))
				return 2;
		}
	}
	
	if (canMoveDown(grid))
		return 2;
	else if (canMoveLeft(grid))
		return 3;
	else if (canMoveRight(grid))
		return 1;
	
	return 0;
}