    var gridx = 10,gridy = 10;




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


    function showGrid(ispc) {
            var y, x1;
            for (y = 0; y < gridy; ++y) {
                for (x = 0; x < gridx; ++x) {
                    if (ispc)
                        document.write('<a href="javascript:gridClick(' + y + ',' + x + ');"><img name="pc' + y + '_' + x + '" src="batt100.gif" width=40 height=40></a>');
                    else
                        document.write('<a href="javascript:gridClick(' + y + ',' + x + ');"><img name="pc' + y + '_' + x + '" src="batt100.gif" width=40 height=40></a>');
                }
                document.write('<br>');
            }
        }
