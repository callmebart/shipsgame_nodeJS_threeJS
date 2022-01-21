function Statek(){
    

    var container = new THREE.Object3D()
        var loader = new THREE.ObjectLoader();
        loader.load(
            'img/pirate.json',
            function (object) {
                container.add(object)
            }
        )
this.statek = function(){
    return container
}
    }