function AI(grid) {
	var biggest = getBiggest(grid);
	var secondBiggest = getSecondBiggest(grid, biggest);

	if (grid.cellAvailable({ x: 0, y: grid.size - 1 })) {
		for (var row = grid.size - 2; row >= 0; row--) {
			// try {
			if (grid.cellOccupied({ x: 0, y: row })) {
				if (grid.cellContent({ x: 0, y: row }).value == biggest || grid.cellContent({ x: 0, y: row }).value == secondBiggest)
					return 2;
				else
					break;
			}
			// } catch(err) {  }
		}
		for (var col = 1; col < grid.size; col++) {
			if (grid.cellOccupied({ x: col, y: grid.size - 1 })) {
				// try {
				if (grid.cellContent({ x: col, y: grid.size - 1 }).value == biggest || grid.cellContent({ x: col, y: grid.size - 1 }).value == secondBiggest)
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
	for (var col = 0; col < grid.size; col++) {
		bottomRowFull = bottomRowFull && grid.cellOccupied({ x: col, y: grid.size - 1 });
	}
	var secondBottomRowFull = true;
	for (var col = 0; col < grid.size; col++) {
		secondBottomRowFull = bottomRowFull && grid.cellOccupied({ x: col, y: grid.size - 2 });
	}
	
	if(grid.cellContent({x: 0, y:grid.size-1}) == grid.cellContent({x: 1, y:grid.size-1}) || grid.cellContent({x: 1, y:grid.size-1}) == grid.cellContent({x: 2, y:grid.size-1})) {
		if(canMoveLeft(grid)) {
			return 3;
		}
	}
	
	// ....
	// ....
	// X...
	// xXxx
	if (biggest >= 64 && bottomRowFull && !secondBottomRowFull && grid.cellContent({ x: 0, y: 2 }) == grid.cellContent({ x: 1, y: 3 })) {
		if (canMoveRight(grid)) {
			return 1;
		}
	}
	
	// ....
	// ....
	// .X..
	// xxXx
	if (biggest >= 64 && bottomRowFull && !secondBottomRowFull && grid.cellContent({ x: 1, y: 2 }) == grid.cellContent({ x: 2, y: 3 })) {
		if (canMoveRight(grid)) {
			return 1;
		}
	}

	if (biggest > 8) {
		if ([2, 4].indexOf(grid.cellContent({ x: 0, y: grid.size - 1 })) != -1) {
			if (canMoveDown(grid)) {
				return 2;
			}
		}
		if ([2, 4].indexOf(grid.cellContent({ x: 1, y: grid.size - 1 })) != -1) {
			if (canMoveRight(grid)) {
				return 1;
			}
			if (canMoveLeft(grid)) {
				return 3;
			}
		}
		if ([2, 4].indexOf(grid.cellContent({ x: 0, y: grid.size - 2 })) != -1) {
			if (canMoveDown(grid)) {
				return 2;
			}
		}
	}
	if(biggest > 128) {
		if ([2, 4].indexOf(grid.cellContent({ x: 2, y: grid.size - 1 })) != -1) {
			if (canMoveRight(grid)) {
				return 1;
			}
			if (canMoveLeft(grid)) {
				return 3;
			}
		}
	}
	if(biggest > 256) {
		if ([2, 4].indexOf(grid.cellContent({ x: 3, y: grid.size - 1 })) != -1) {
			if (canMoveRight(grid)) {
				return 1;
			}
			if (canMoveLeft(grid)) {
				return 3;
			}
		}
	}
	
	if(grid.cellAvailable({x: 0, y: grid.size-2})) {
		if(canMoveLeft(grid)) {
			return 3;
		}
	}
	

	var biggestPoses = posesByValue(grid, biggest);
	var secondBiggestPoses = posesByValue(grid, secondBiggest);
	if (biggestPoses.length >= 2) {
		if (secondBiggestPoses.length > 2) {

		} else {
			if (biggestPoses[0].x != biggestPoses[1].x) {
				if (canMoveLeft(grid)) {
					return 3;
				}
				if (canMoveRight(grid)) {
					return 1;
				}
			}
			if (biggestPoses[0].y != biggestPoses[1].y) {
				if (canMoveDown(grid)) {
					return 2;
				}
			}
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