
var ship = [[[1, 5], [1, 2, 5], [1, 2, 3, 5], [1, 2, 3, 4, 5]], [[6, 10], [6, 7, 10], [6, 7, 8, 10], [6, 7, 8, 9, 10]]];

        var dead = [[[201, 205], [201, 202, 205], [201, 202, 203, 205], [201, 202, 203, 204, 205]], [[206, 210], [206, 207, 210], [206, 207, 208, 210], [206, 207, 208, 209,                            210]]];

        var shiptypes = [["Миноносец", 2, 4], ["Фрегат", 3, 4], ["Крейсер", 4, 2], ["Линкор", 5, 1]];

        var gridx = 10,
            gridy = 10;
        var player = [],
            computer = [],
            playersships = [],
            computersships = [];
        var playerlives = 0,
            computerlives = 0,
            playflag = true,
            statusmsg = "";

        var preloaded = [];


        function setupBoardSize(){
 }

        function imagePreload() {
            var i, ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 101, 102, 103, 201, 202, 203, 204, 205, 206];
            window.status = "Preloading images...please wait";
            for (i = 0; i < ids.length; ++i) {
                var img = new Image,
                    name = "batt" + ids[i] + ".gif";
                img.src = name;
                preloaded[i] = img;
            }
            window.status = "";
        }

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


        function setImage(y, x, id, ispc) {
        if (ispc) {
                computer[y][x][0] = id;
                document.images["pc" + y + "_" + x].src = "batt" + id + ".gif";
            } else {
                player[y][x][0] = id;
                document.images["ply" + y + "_" + x].src = "batt" + id + ".gif";
            }
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

        function gridClick(y, x) {
            if (playflag) {
                if (computer[y][x][0] < 100) {
                    setImage(y, x, 103, true);
                    var shipno = computer[y][x][1];
                    if (--computersships[shipno][1] == 0) {
                        sinkShip(computer, shipno, true);
                        alert("Вы потопили мой " + shiptypes[computersships[shipno][0]][0] + "!");
                        updateStatus();
                        if (--computerlives == 0) {
                            alert("Вы выйграли! Нажмите кнопку \"Обновить\"\n" +
                                "yoдля начала новой игры.");
                            playflag = false;
                        }
                    }
                    if (playflag) computerMove();
                } else if (computer[y][x][0] == 100) {
                    setImage(y, x, 102, true);
                    computerMove();
                }
            }
        }

        function computerMove() {
            var x, y, pass;
            var sx, sy;
            var selected = false;

            for (pass = 0; pass < 2; ++pass) {
                for (y = 0; y < gridy && !selected; ++y) {
                    for (x = 0; x < gridx && !selected; ++x) {
                        if (player[y][x][0] == 103) {
                            sx = x;
                            sy = y;
                            var nup = (y > 0 && player[y - 1][x][0] <= 100);
                            var ndn = (y < gridy - 1 && player[y + 1][x][0] <= 100);
                            var nlt = (x > 0 && player[y][x - 1][0] <= 100);
                            var nrt = (x < gridx - 1 && player[y][x + 1][0] <= 100);
                            if (pass == 0) {
                                var yup = (y > 0 && player[y - 1][x][0] == 103);
                                var ydn = (y < gridy - 1 && player[y + 1][x][0] == 103);
                                var ylt = (x > 0 && player[y][x - 1][0] == 103);
                                var yrt = (x < gridx - 1 && player[y][x + 1][0] == 103);
                                if (nlt && yrt) {
                                    sx = x - 1;
                                    selected = true;
                                } else if (nrt && ylt) {
                                    sx = x + 1;
                                    selected = true;
                                } else if (nup && ydn) {
                                    sy = y - 1;
                                    selected = true;
                                } else if (ndn && yup) {
                                    sy = y + 1;
                                    selected = true;
                                }
                            } else {
                                if (nlt) {
                                    sx = x - 1;
                                    selected = true;
                                } else if (nrt) {
                                    sx = x + 1;
                                    selected = true;
                                } else if (nup) {
                                    sy = y - 1;
                                    selected = true;
                                } else if (ndn) {
                                    sy = y + 1;
                                    selected = true;
                                }
                            }
                        }
                    }
                }
            }
            if (!selected) {
                do {
                    sy = Math.floor(Math.random() * gridy);
                    sx = Math.floor(Math.random() * gridx / 2) * 2 + sy % 2;
                } while (player[sy][sx][0] > 100);
            }
            if (player[sy][sx][0] < 100) {
                setImage(sy, sx, 103, false);
                var shipno = player[sy][sx][1];
                if (--playersships[shipno][1] == 0) {
                    sinkShip(player, shipno, false);
                    alert("Я потопил Ваш " + shiptypes[playersships[shipno][0]][0] + "!");
                    if (--playerlives == 0) {
                        knowYourEnemy();
                        alert("Я выйграл! Нажмите кнопку \"Обновить\"\n" +
                            "для начала новой игры.");
                        playflag = false;
                    }
                }
            } else {
                setImage(sy, sx, 102, false);
            }
        }

        function sinkShip(grid, shipno, ispc) {
            var y, x;
            for (y = 0; y < gridx; ++y) {
                for (x = 0; x < gridx; ++x) {
                    if (grid[y][x][1] == shipno)
                        if (ispc) setImage(y, x, computer[y][x][2], true);
                        else setImage(y, x, player[y][x][2], false);
                }
            }
        }

        function knowYourEnemy() {
            var y, x;
            for (y = 0; y < gridx; ++y) {
                for (x = 0; x < gridx; ++x) {
                    if (computer[y][x][0] == 103)
                        setImage(y, x, computer[y][x][2], true);
                    else if (computer[y][x][0] < 100)
                        setImage(y, x, computer[y][x][0], true);
                }
            }
        }

        function updateStatus() {
            var f = false,
                i, s = "Computer has ";
            for (i = 0; i < computersships.length; ++i) {
                if (computersships[i][1] > 0) {
                    if (f) s = s + ", ";
                    else f = true;
                    s = s + shiptypes[computersships[i][0]][0];
                }
            }
            if (!f) s = s + "больше ничего не осталось. Спасибо!!";
            statusmsg = s;
            window.status = statusmsg;
        }

        function setStatus() {
            window.status = statusmsg;
        }
        imagePreload();
        player = setupPlayer(false);
        computer = setupPlayer(true);
        document.write("<center><table><tr><td align=center><p class='heading'>Enemy Ships</p></td>" +
            "<td align=center><p class='heading'>My Ships</p></td></tr><tr><td>");
        showGrid(true);
        document.write("</td><td>");
        showGrid(false);
        document.write("</td></tr>");
        updateStatus();
        setInterval("setStatus();", 500);
