function AI(grid) {
	var biggest = getBiggest(grid);
	var secondBiggest = getSecondBiggest(grid, biggest);
	
	if(grid.cellAvailable({x:0, y:grid.size-1})) {
		for(var row=grid.size-2; row >= 0; row--) {
			// try {
			if(grid.cellOccupied({x:0, y:row})) {
				if(grid.cellContent({x:0, y:row}).value == biggest || grid.cellContent({x:0, y:row}).value == secondBiggest)
					return 2;
				else
					break;
			}
			// } catch(err) {  }
		}
		for(var col=1; col < grid.size; col++) {
			if(grid.cellOccupied({x:col, y:grid.size-1})) {
				// try {
				if(grid.cellContent({x:col, y:grid.size-1}).value == biggest || grid.cellContent({x:col, y:grid.size-1}).value == secondBiggest)
					return 3;
				else
					break;
				// } catch(err) {  }
			}
		}
		// if(canMoveLeft(grid)) {
		// 	return 3;
		// }
	}
	
	var bottomRowFull = true;
	for(var col=0; col<grid.size; col++) {
		bottomRowFull = bottomRowFull && grid.cellOccupied({x:col, y:grid.size-1});
	}
	
	var biggestPoses = posesByValue(grid, biggest);
	var secondBiggestPoses = posesByValue(grid, secondBiggest);
	if(biggestPoses.length >= 2) {
		if(secondBiggestPoses.length > 2) {
			
		} else {
			if(biggestPoses[0].x != biggestPoses[1].x) {
				if(canMoveLeft(grid))
					return 3;
				if(canMoveRight(grid))
					return 1;
			} else {
				if(canMoveDown(grid))
					return 2;
			}
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