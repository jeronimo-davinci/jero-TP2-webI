let arbolSketch = function(p) {
    let angulo = 0;
    let arboles = [];
    
    p.setup = function() {
        let contenedor = document.getElementById('canvas-arbol');
        let w = contenedor ? contenedor.offsetWidth : p.windowWidth;
        let h = contenedor ? contenedor.offsetHeight : p.windowHeight;
        
        let canvas = p.createCanvas(w, h, p.WEBGL);
        canvas.parent('canvas-arbol');

        arboles.push({x: -300, z: 200, escala: 1.2, velocidad: 0.003});
        arboles.push({x: 300, z: 100, escala: 0.9, velocidad: 0.004});
        arboles.push({x: -150, z: -100, escala: 1, velocidad: 0.0035});
        arboles.push({x: 200, z: -150, escala: 0.85, velocidad: 0.0045});
        arboles.push({x: 0, z: 50, escala: 1.1, velocidad: 0.00325});
    };
    
    p.draw = function() {
        p.background(232, 245, 233);

        p.ambientLight(150);

        let luzX = p.sin(angulo * 2) * 0.5;
        let luzY = p.cos(angulo * 2) * 0.5;
        p.directionalLight(255, 255, 255, luzX, luzY, -1);

        p.pointLight(200, 255, 200, p.sin(angulo) * 400, -300, p.cos(angulo) * 400);
        p.pointLight(150, 200, 150, p.cos(angulo * 1.5) * -400, -300, p.sin(angulo * 1.5) * 400);
        
        angulo += 0.003;

        for (let i = 0; i < arboles.length; i++) {
            let arbol = arboles[i];
            p.push();
            p.translate(arbol.x, 0, arbol.z);

            p.rotateY(angulo * arbol.velocidad * 10);

            let balanceo = p.sin(angulo * 2 + i) * 0.05;
            p.rotateZ(balanceo);
            
            p.scale(arbol.escala);
            dibujarArbol(p, angulo + i);
            p.pop();
        }
    };
    
    function dibujarArbol(p, fase) {
        p.push();
        p.translate(0, 80, 0);
        p.fill(101, 67, 33);
        p.specularMaterial(101, 67, 33);
        p.shininess(10);
        p.cylinder(25, 250, 12);
        p.pop();

        for (let i = 0; i < 4; i++) {
            let anguloRama = (p.TWO_PI / 4) * i + fase * 0.5;
            p.push();
            p.translate(p.cos(anguloRama) * 30, 20, p.sin(anguloRama) * 30);
            p.rotateZ(p.PI / 6);
            p.fill(85, 60, 30);
            p.box(15, 80, 15);
            p.pop();
        }

        let pulsacion1 = 100 + p.sin(fase * 2) * 5;
        p.push();
        p.translate(0, -50, 0);
        p.fill(46, 125, 50);
        p.specularMaterial(46, 125, 50);
        p.shininess(20);
        p.sphere(pulsacion1, 12, 12);
        p.pop();

        for (let i = 0; i < 8; i++) {
            let ang = (p.TWO_PI / 8) * i + fase;
            p.push();
            p.translate(p.cos(ang) * 90, -50, p.sin(ang) * 90);
            p.rotateY(fase * 2);
            p.fill(60, 150, 60);
            p.box(20);
            p.pop();
        }

        let pulsacion2 = 85 + p.sin(fase * 2 + 1) * 4;
        p.push();
        p.translate(0, -110, 0);
        p.fill(52, 140, 56);
        p.specularMaterial(52, 140, 56);
        p.shininess(20);
        p.sphere(pulsacion2, 12, 12);
        p.pop();

        for (let i = 0; i < 6; i++) {
            let ang = (p.TWO_PI / 6) * i + p.PI / 6 + fase * 0.8;
            p.push();
            p.translate(p.cos(ang) * 75, -110, p.sin(ang) * 75);
            p.rotateY(fase * 2);
            p.fill(70, 160, 70);
            p.box(18);
            p.pop();
        }

        let pulsacion3 = 70 + p.sin(fase * 2 + 2) * 3;
        p.push();
        p.translate(0, -165, 0);
        p.fill(67, 160, 71);
        p.specularMaterial(67, 160, 71);
        p.shininess(20);
        p.sphere(pulsacion3, 12, 12);
        p.pop();

        for (let i = 0; i < 5; i++) {
            let ang = (p.TWO_PI / 5) * i + fase * 0.6;
            p.push();
            p.translate(p.cos(ang) * 60, -165, p.sin(ang) * 60);
            p.rotateY(fase * 2);
            p.fill(80, 180, 80);
            p.box(16);
            p.pop();
        }

        p.push();
        p.translate(0, -210, 0);
        p.rotateY(fase * 3);
        p.fill(102, 187, 106);
        p.specularMaterial(102, 187, 106);
        p.shininess(30);
        p.cone(35, 70, 12);
        p.pop();

        p.push();
        p.translate(0, -245, 0);
        let brilloEstrella = 200 + p.sin(fase * 4) * 55;
        p.fill(255, brilloEstrella, 59);
        p.emissiveMaterial(255, brilloEstrella, 59);
        p.rotateY(fase * 5);
        p.sphere(12);
        p.pop();
    }
    
    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
};

new p5(arbolSketch);
