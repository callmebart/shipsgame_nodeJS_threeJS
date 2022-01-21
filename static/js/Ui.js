function Ui() {
    $("#loggg").fadeOut();
    $("#LogInBtn").on("click", function () {
        $("#loggg").fadeIn("slow")
        $("#PlayBtn").prop("disabled", false);
    })
    if ($("#login").val() !== " ") {
        $("#PlayBtn").on("click", function () {
            console.log("aaa")
            var username = $("#login").val();
            net.LoginUser(username);
        })
    }
    $("#ReadyBtn").on("click", function () {
        game.SetPlayView();
    })
    this.setBtnReady = function () {
        $("#ReadyBtn").css("background-color", "#ff6775")
        $("#ReadyBtn").prop("disabled", false);
    }
    this.setStrzalka = function(){
 
        setInterval(function(){ $("#strzalka1").fadeIn();
                    $("#strzalka1").fadeOut();
                    }, 300);
                
        }
}