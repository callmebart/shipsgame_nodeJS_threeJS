
/*
    klasa Game
*/

function Game() {

    /*
        zmienna prywatna widoczna tylko w tym pliku / klasie
    */

    /*
        zmienna publiczna, dostępna z innych klas, nie używać
    */

    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej klasie
    */
    var camera;




    var scene = new THREE.Scene();

    //// selectt
    var camx = 0;
    var camy = 300;
    var camz = -2000;
    /////
    camera = new THREE.PerspectiveCamera(
        45, // kąt patrzenia kamery (FOV - field of view)
        4 / 3, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
    );
    var clickedVect; // wektor określający punkt kliknięcia
    var directionVect; // wektor określający kierunek ruchu playera
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2()
    var renderer = new THREE.WebGLRenderer();


    renderer.setClearColor(0xfff0ff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#root").append(renderer.domElement);
    camera.position.set(camx, camy, camz)


    var plansza = new Plansza();
    scene.add(plansza.getPLCont());

    var container = new THREE.Object3D()
    var CameraMesh = new THREE.MeshBasicMaterial({
        color: 0xffb3ba,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 1
    });
    var cameraGeo = new THREE.BoxGeometry(100, 100, 100);
    var SetShipCam = new THREE.Mesh(cameraGeo, CameraMesh)
    var PlayCam = new THREE.Mesh(cameraGeo, CameraMesh)
    scene.add(PlayCam);
    scene.add(SetShipCam);
    SetShipCam.position.set(800, -100, 800)
    PlayCam.position.set(800, 600, 200)
    var ships = []
    //sciany do zaznaczania pol
    $(document).mousedown(function (event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            var obj = intersects[0].object
            if (obj.material.color.g == 0.8823529411764706) {
                var ship = new Ship();
                ship.getShipCont().position.set(obj.position.x, obj.position.y, obj.position.z)
                if (ships.length < 8) {
                    scene.add(ship.getShipCont())
                    ships.push(obj.name)
                    net.SetCords(obj.name)
                }
                if (ships.length == 8) {
                    ui.setBtnReady();
                    ui.setStrzalka();
                }
            }
            if (obj.material.color.g == 1) {
                net.CheckCords(obj.name)
            }
        }
    })

    var light = new THREE.PointLight(0xff6600);
    light.name = "light"
    // mesh.castShadow = true

    light.castShadow = true
    light.intensity = 1
    light.distance = 3000
    light.penumbra =1;

    light.position.set(800, 700, 2900);
    light.angle = 1

    scene.add(light);

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();


    this.returnShips = function () {
        return ships;
    }

    this.SetShipView = function () {
        camera.position.set(800, 3000, 1000);
        camera.lookAt(SetShipCam.position)
    }
    this.SetPlayView = function () {
        camera.position.set(800, 700, 2900);
        camera.lookAt(PlayCam.position)
    }
}