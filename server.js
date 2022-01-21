

var http = require("http");
var qs = require("querystring");
var fs = require("fs");

var server = http.createServer(function (request, response) {
    // console.log(request.method) // zauważ ze przesyłane po kliknieciu butona dane, będą typu POST
    console.log("żądany przez przeglądarkę adres: " + request.url)

    switch (request.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            console.log("Get")
            fs.readFile("static/index.html", function (error, data) {
                if (request.url === "/") {
                    fs.readFile("static/index.html", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write(data);
                        response.end();

                    })
                } else if (request.url === "/libs/jquery-3.3.1.js") {
                    fs.readFile("static/libs/jquery-3.3.1.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/libs/OrbitControls.js") {
                    fs.readFile("static/libs/OrbitControls.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/libs/three.js") {
                    fs.readFile("static/libs/three.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/css/style.css") {
                    fs.readFile("static/css/style.css", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'text/css' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/js/Game.js") {
                    fs.readFile("static/js/Game.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Main.js") {
                    fs.readFile("static/js/Main.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Net.js") {
                    fs.readFile("static/js/Net.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Ui.js") {
                    fs.readFile("static/js/Ui.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Wall.js") {
                    fs.readFile("static/js/Wall.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/img/woda.jpg") {
                    fs.readFile("static/img/woda.jpg", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/img/kwadrat.png") {
                    fs.readFile("static/img/kwadrat.png", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/js/Plansza.js") {
                    fs.readFile("static/js/Plansza.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Ship.js") {
                    fs.readFile("static/js/Ship.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/img/pirate.json") {
                    fs.readFile("static/img/pirate.json", function (error, data) {
                        response.writeHead(200, { 'Content-Type': ' application/json' });
                        response.write(data);
                        response.end();
                    })
                }else if (request.url === "/img/strzalka.png") {
                    fs.readFile("static/img/strzalka.png", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }
            });
            break;
        case "POST":

            servResponse(request, response)

            break;

    }

});

var tab_users = [];
var user1tab = []
var user2tab = []

var trafione1 = [];
var trafione2 = []; 
function include(array,n) {
    var count = 0;
    var index = 0;
    do {
        index = array.indexOf(n, index) + 1;
        if (index == 0) {
            break;
        }
        else {
            count++;
        }
    } while (index < array.length);
    return count;
}
function servResponse(request, response) {
    var allData = "";
    request.on("data", function (data) {
        allData += data;
    })
    //Sprawdzenie ilu jest użytkowników
    request.on("end", function (data) {
        var finish = qs.parse(allData)
        //=====================================================
        if (finish.type == "SetCords") {
            if (finish.player == "player1") {
                user1tab.push(finish.cords)
                response.end("Dodano")
            }
            if (finish.player == "player2") {
                user2tab.push(finish.cords)
                response.end("Dodano")
            }
        }
        //=====================================================
        if (finish.type == "CheckCords") {
            if (finish.player == "player1") {
                if(include(user2tab,finish.cords)==1){
                    response.end("trafiony")
                    console.log(user2tab.length)
                    trafione1.push(1)
                    console.log(trafione1.length)
                    if(trafione1.length == 8){
                        response.end("Wygrałeś koniec gry !!!")
                        
                    }
                }
                if(include(user2tab,finish.cords)==0){
                    response.end("pudło")
                }
            }
            if (finish.player == "player2") {
                if(include(user1tab,finish.cords)==1){
                    response.end("trafiony")
                    console.log(user1tab.length)
                    trafione2.push(1)
                    console.log(trafione2.length)
                    if(trafione2.length == 8){
                        response.end("Wygrałeś koniec gry !!!")
                    }
                }
                if(include(user1tab,finish.cords)==0){
                    response.end("pudło")
                }
            }
        }
        //=====================================================
        if (finish.type == "check") {
            var lgth = tab_users.length.toString();
            response.end(lgth) ;
        }
        if (finish.type == "dodaj") {

            if (tab_users.length == 2) {
                console.log("2 uzytkownikow");
                response.end("FULL") ;
            }
            if (tab_users.length == 1) {
                tab_users.push(finish.user_name);
                response.end("SECOND")
            }


            if (tab_users.length == 0) {
                tab_users.push(finish.user_name);
                response.end("FIRST")
            }
        }
        //=====================================================
    })
}

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});

