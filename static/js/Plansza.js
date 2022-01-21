function Plansza(){
    var poleGry = [

        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
        [0, 0, 0, 0, 0, 0, 0, 0,0,0],
    ];
    var container = new THREE.Object3D()
    var wodaMesh = new THREE.MeshBasicMaterial({
        color: 0xbae1ff,
        side: THREE.DoubleSide,
        wireframe: false,
        transparent: true,
        opacity: 1,
        map: new THREE.TextureLoader().load("img/woda.jpg"),
    });


    var planegeo = new THREE.BoxGeometry(100, 100, 30);


    var x = 350;
    var z = 350;
    var y = 50;
    for (var i = 0; i < poleGry.length; i++) {
        for (var j = 0; j < poleGry.length; j++) {
      
                var woda = new THREE.Mesh(planegeo, wodaMesh)
                woda.name="ID:"+i+"-"+j
                woda.rotateX(Math.PI/2)
                container.add(woda);
                woda.position.x = x;
                woda.position.z = z;
                x += 100;

            
          
        }
        x = 350;
        z += 100;
        
    }   
    var wall = new Wall()
    wall.getWallCont().position.set(0, 1100, 280)
    container.add(wall.getWallCont());
    wall.getWallCont().rotateX(Math.PI);
    this.getPLCont = function(){
        return container;
    }
    this.getPLMesh = function(){
        return woda;
    }
}