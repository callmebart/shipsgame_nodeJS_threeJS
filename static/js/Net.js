
/*
    obsługa komunikację Ajax - serwer
*/

function Net() {
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */

    var player;
    this.LoginUser = function (username) {
        $.ajax({
            url: "http://localhost:3000",
            data: { user_name: username, type: "dodaj", },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                $("#PlayBtn").prop("disabled", false);
                //css oczekiwanie na gracza
                var waiting = $('<div class="loader">');
                var oczekiwanie = $('<p class="oczekiwanie">');

                // to ma wrocic info o zalogowaniu albo o bledzie  
                //    console.log(data)

                //wbity na krzywy ryj
                if (data == "FULL") {
                    console.log("pelen")
                    alert("Nie grasz")
                }
                //pierwszy gracz
                if (data == "FIRST") {
                    player = "player1";
                    console.log(player);
                    oczekiwanie.text("Czekam na drugiego gracza..");
                    $(document.body).append(waiting);
                    $(document.body).append(oczekiwanie);

                    $("#root").css("display", "none");
                    game.SetShipView();
                    checking = setInterval(function () {
                        check();
                        console.log("waiting")
                    }, 500);

                }
                //drugi gracz
                if (data == "SECOND") {
                    player = "player2";
                    console.log(player)
                    $("#MainMenu").css("display", "none");
                    game.SetShipView();
                    $("#ReadyBtn").css("display", "block");
                    alert(" Zaczynamy wojne!");

                }



                //tu wypisz sumę w div-ie na stronie
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    //=====================================================
    var check = function () {
        $.ajax({
            data: { type: "check" },
            type: "POST",
            success: function (data) {
                if (data == "2") {
                    console.log("Wszedł drugi gracz");
                    clearInterval(checking);
                    //znikanie wszywstkiego
                    $("#root").css("display", "block");
                    $("#ReadyBtn").css("display", "block");
                    $("#wait").css("display", "none")
                    $(".oczekiwanie").css("display", "none");
                    $(".loader").css("display", "none");
                    $("#MainMenu").css("display", "none");
                    //ustawienie pozycji kamery
                    game.SetShipView();
                   
                    alert("Zaczynamy wojne! ");
                }

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    //=====================================================
    this.SetCords = function(name){
        $.ajax({
            data: { type: "SetCords", player: player, cords: name },
            type: "POST",
            success: function (data) {
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
        //=====================================================
    //Sprawdzanie name w tablicy
    var result;
    this.CheckCords = function (name) {
        $.ajax({
            data: { type: "CheckCords", player: player, cords: name },
            type: "POST",
            success: function (data) {
                alert(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    this.returnData = function () {
        return result;
    }
}
