function setupPlayer(ispc) {
            var y, x;
            grid = [];
            for (y = 0; y < gridx; y++) {
                grid[y] = [];
                for (x = 0; x < gridx; x++)
                    grid[y][x] = [100, -1, 0];
            }

            var shipno = 0;
            var s;
            for (s = shiptypes.length - 1; s >= 0; --s) {
                var i;
                for (i = 0; i < shiptypes[s][2]; ++i) {
                    var d = Math.floor(Math.random() * 2);
                    var len = shiptypes[s][1],
                        lx = gridx,
                        ly = gridy,
                        dx = 0,
                        dy = 0;
                    if (d == 0) {
                        lx = gridx - len;
                        dx = 1;
                    } else {
                        ly = gridy - len;
                        dy = 1;
                    }
                    var x, y, ok;
                    do {
                        y = Math.floor(Math.random() * ly);
                        x = Math.floor(Math.random() * lx);
                        var j, cx = x,
                            cy = y;
                        ok = true;
                        for (j = 0; j < len; ++j) {
                            if (grid[cy][cx][0] < 100) {
                                ok = false;
                                break;
                            }
                            cx += dx;
                            cy += dy;
                        }
                    } while (!ok);
                    var j, cx = x,
                        cy = y;
                    for (j = 0; j < len; ++j) {
                        grid[cy][cx][0] = ship[d][s][j];
                        grid[cy][cx][1] = shipno;
                        grid[cy][cx][2] = dead[d][s][j];
                        cx += dx;
                        cy += dy;
                    }
                    if (ispc) {
                        computersships[shipno] = [s, shiptypes[s][1]];
                        computerlives++;
                    } else {
                        playersships[shipno] = [s, shiptypes[s][1]];
                        playerlives++;
                    }
                    shipno++;
                }
            }
            return grid;
        }

        function showGrid(ispc) {
            var y, x1;
            for (y = 0; y < gridy; ++y) {
                for (x = 0; x < gridx; ++x) {
                    if (ispc)
                        document.write('<a href="javascript:gridClick(' + y + ',' + x + ');"><img name="pc' + y + '_' + x + '" src="batt100.gif" width=40 height=40></a>');
                    else
                        document.write('<a href="javascript:void(0);"><img name="ply' + y + '_' + x + '" src="batt' + player[y][x][0] + '.gif" width=40 height=40></a>');
                }
                document.write('<br>');
            }
        }
