function Wall() {

    var poleGry = [

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    var container = new THREE.Object3D()
    var StrategiaMesh = new THREE.MeshBasicMaterial({
        color: 0xbaffc9,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 1,
        map: new THREE.TextureLoader().load("img/kwadrat.png"),
    });
    var planegeo = new THREE.BoxGeometry(100, 100, 30);
    var edges = new THREE.EdgesGeometry(planegeo);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    container.add(line)
    var x = 350;
    var z = 350;
    var y = 100;
    for (var i = 0; i < poleGry.length; i++) {
        for (var j = 0; j < poleGry.length; j++) {

            var strat = new THREE.Mesh(planegeo, StrategiaMesh)
            strat.name = "ID:" + i + "-" + j
            container.add(strat);
            container.add(line)
            line.position.x = x;
            line.position.y = y;
            strat.position.x = x;
            strat.position.y = y;
            x += 100;
        }
        x = 350;
        y += 100;

    }
    this.getWallCont = function () {
        return container;
    }


    this.getWallMesh = function () {
        return cube;
    }
}