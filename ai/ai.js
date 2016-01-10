var net;
var high = 0;
var initCountdown = 16;
var countdown = initCountdown;

var promptVal = prompt("mem?");

var tempmem = (promptVal)?
    null :
    [{
        input:
            [0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0],
        output: [
            // UP, RIGHT, DOWN, LEFT
            0, 0, 0, 0
        ]
    }
];

var mem;
try {
    mem = JSON.parse(promptVal);
} catch(e) {
    mem = [];
}

retrain();

function retrain() {
    if(tempmem != null) {
        mem.push(tempmem);
        if(mem.length == 3) {
            mem.splice(0, 1);
        }
    }
    net = new brain.NeuralNetwork();
    for(var i=0; i<mem.length; i++) {
        net.train(mem[i]);
    }
}

function AI(grid) {
    if(countdown == 0) {
        countdown = initCountdown;
        document.getElementById("mem").innerText = JSON.stringify(mem);
    }
	var rankList = toList(grid);
	var currentBiggest = getBiggest(grid);
	var rankTable = [currentBiggest];
	while (currentBiggest > 2) {
        currentBiggest /= 2;
		rankTable.push(currentBiggest);
	}
	grid.eachCell(function (x, y, cell) {
		var value = null;
		if (cell != null) {
			value = cell.value;
		    rankList[x + y * grid.size] = rankTable.indexOf(value)+1;
		} else {
            rankList[x + y * grid.size] = Math.log2(getBiggest(grid));
        }
	});
	var results = net.run(rankList);
	if(!canMoveUp(grid)) {
		results[0] = -1;
	}
	if(!canMoveRight(grid)) {
		results[1] = -1;
	}
	if(!canMoveDown(grid)) {
		results[2] = -1;
	}
	if(!canMoveLeft(grid)) {
		results[3] = -1;
	}
	var outList = [0,0,0,0];
	outList[greatestIndexOf(results)] = 1;
	tempmem.push({input: rankList, output: outList});
    countdown--;
	return greatestIndexOf(results);
}

function gameOver(score) {
	if(score > high * 0.75) {
		if(score > high) {
			high = score;
		}
		retrain();
	}
	tempmem = [];
}

function toList(grid) {
    var list = [];
    for (var row = 0; row < grid.size; row++) {
        list.push([]);
        for (var col = 0; col < grid.size; col++) {
			var cell = grid.cellContent({ x: col, y: row });
			if (cell != null) {
				list[row].push(cell.value);
			} else {
				list[row].push(null);
			}
        }
    }
    return list;
}

// Get the index of a list's greatest element
function greatestIndexOf(list) {
    var greatest = -Infinity;
    for (var i = 0; i < list.length; i++) {
        if (list[i] > greatest) {
            greatest = list[i];
        }
    }
    return list.indexOf(greatest);
}

function canMoveUp(grid) {
	var retrn = false;
	grid.eachCell(function (x, y, content) {
		if (y != 0) {
			try {
				if (grid.cellOccupied({ x: x, y: y })) {
					if (!grid.cellOccupied({ x: x, y: y - 1 })) {
						retrn = true;
					}
					if (content.value == grid.cellContent({ x: x, y: y - 1 }).value) {
						retrn = true;
					}
				}
			} catch (err) { }
		}
	});

	return retrn;
}

function canMoveDown(grid) {
	var retrn = false;
	grid.eachCell(function (x, y, content) {
		if (y != grid.size - 1) {
			try {
				if (grid.cellOccupied({ x: x, y: y })) {
					if (!grid.cellOccupied({ x: x, y: y + 1 })) {
						retrn = true;
					}
					if (content.value == grid.cellContent({ x: x, y: y + 1 }).value) {
						retrn = true;
					}
				}
			} catch (err) { }
		}
	});

	return retrn;
}

function canMoveLeft(grid) {
	var retrn = false;
	grid.eachCell(function (x, y, content) {
		if (x != 0) {
			try {
				if (grid.cellOccupied({ x: x, y: y })) {
					if (!grid.cellOccupied({ x: x - 1, y: y })) {
						retrn = true
					}
					if (content.value == grid.cellContent({ x: x - 1, y: y }).value) {
						retrn = true;
					}
				}
			} catch (err) { }
		}
	});

	return retrn;
}

function canMoveRight(grid) {
	var retrn = false;
	grid.eachCell(function (x, y, content) {
		if (x != grid.size - 1) {
			try {
				if (grid.cellOccupied({ x: x, y: y })) {
					if (!grid.cellOccupied({ x: x + 1, y: y })) {
						retrn = true;
					}
					if (content.value == grid.cellContent({ x: x + 1, y: y }).value) {
						retrn = true;
					}
				}
			} catch (err) { }
		}
	});

	return retrn;
}


function getBiggest(grid) {
	var biggest = null;
	grid.eachCell(function (x, y, content) {
		try {
			if (content.value > biggest)
				biggest = content.value;
		} catch (err) { }
	});

	return biggest;
}

// function getNextBiggest(grid, lastBiggest) {
// 	var biggest = null;
// 	grid.eachCell(function (x, y, content) {
// 		try {
// 			if (content.value > biggest && content.value < lastBiggest) {
// 				biggest = content.value;
// 			}
// 		} catch (err) { }
// 	});

// 	return biggest;
// }