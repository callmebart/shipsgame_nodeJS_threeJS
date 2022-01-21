function Ship() {
    var container = new THREE.Object3D()
    var loader = new THREE.ObjectLoader();
    loader.load(
        'img/pirate.json',
        function (object) {
            container.add(object)
            container.scale.set(30,30,30);
            container.position.y=30
            container.color=0xffffba
        }
    )
    this.getShipCont = function () {
        return container;
    }
}