let florSketch = function(p) {
    let rotacionX = 0;
    let rotacionY = 0;
    let targetRotacionX = 0;
    let targetRotacionY = 0;
    let escalaFlor = 1;
    let targetEscala = 1;
    let petalosAngulo = 0;
    let mouseEnCanvas = false;
    let brilloPetalos = 0;
    
    p.setup = function() {
        let canvas = p.createCanvas(600, 500, p.WEBGL);
        canvas.parent('canvas-flor');
        
        canvas.mouseOver(() => mouseEnCanvas = true);
        canvas.mouseOut(() => mouseEnCanvas = false);
    };
    
    p.draw = function() {
        p.background(20, 30, 15);

        p.ambientLight(120);

        if (mouseEnCanvas) {
            let luzX = p.map(p.mouseX, 0, p.width, -200, 200);
            let luzY = p.map(p.mouseY, 0, p.height, -200, 200);
            p.pointLight(255, 200, 255, luzX, luzY, 200);
        }
        
        p.directionalLight(255, 255, 255, 0, 0, -1);
        p.pointLight(255, 220, 220, 0, -200, 100);

        if (mouseEnCanvas && p.mouseX > 0 && p.mouseX < p.width && 
            p.mouseY > 0 && p.mouseY < p.height) {
            targetRotacionX = p.map(p.mouseY, 0, p.height, -p.PI/3, p.PI/3);
            targetRotacionY = p.map(p.mouseX, 0, p.width, -p.PI/2, p.PI/2);
            targetEscala = 1.2;
            brilloPetalos = p.map(p.mouseX, 0, p.width, 0, 50);
        } else {
            targetRotacionX = 0;
            targetRotacionY = 0;
            targetEscala = 1;
            brilloPetalos = 0;
        }

        rotacionX = p.lerp(rotacionX, targetRotacionX, 0.1);
        rotacionY = p.lerp(rotacionY, targetRotacionY, 0.1);
        escalaFlor = p.lerp(escalaFlor, targetEscala, 0.08);

        petalosAngulo += 0.01;

        p.rotateX(rotacionX);
        p.rotateY(rotacionY);
        p.scale(escalaFlor);

        p.push();
        p.translate(0, 100, 0);
        p.fill(50, 150, 50);
        p.specularMaterial(50, 150, 50);
        p.shininess(15);
        p.cylinder(8, 250);
        p.pop();

        let pulsacionCentro = 35 + p.sin(petalosAngulo * 3) * 3;
        p.push();
        p.translate(0, -40, 0);
        p.fill(255, 215, 0);
        p.specularMaterial(255, 215, 0);
        p.shininess(30);
        p.sphere(pulsacionCentro);

        for (let i = 0; i < 8; i++) {
            let ang = (p.TWO_PI / 8) * i + petalosAngulo * 2;
            p.push();
            p.translate(p.cos(ang) * 15, 0, p.sin(ang) * 15);
            p.fill(255, 200, 0);
            p.sphere(5);
            p.pop();
        }
        p.pop();

        dibujarPetalos(p, brilloPetalos);

        dibujarHojas(p);

        if (mouseEnCanvas) {
            dibujarParticulas(p);
        }
    };
    
    function dibujarPetalos(p, brillo) {
        let numPetalos = 8;
        let radio = 70;
        
        for (let i = 0; i < numPetalos; i++) {
            let angulo = (p.TWO_PI / numPetalos) * i + petalosAngulo;
            let x = p.cos(angulo) * radio;
            let z = p.sin(angulo) * radio;

            let yOffset = p.sin(petalosAngulo * 2 + i) * 5;
            
            p.push();
            p.translate(x, -40 + yOffset, z);

            p.rotateY(angulo);
            p.rotateX(p.sin(petalosAngulo + i) * 0.3);

            if (i % 2 === 0) {
                p.fill(255, 182 + brillo, 193 + brillo);
                p.specularMaterial(255, 182 + brillo, 193 + brillo);
            } else {
                p.fill(255, 228 + brillo/2, 225 + brillo/2);
                p.specularMaterial(255, 228 + brillo/2, 225 + brillo/2);
            }
            
            p.shininess(25);

            let escalaPetalo = mouseEnCanvas ? 1.1 : 1;
            p.scale(escalaPetalo);
            p.sphere(30);
            p.pop();
        }
    }
    
    function dibujarHojas(p) {
        p.push();
        p.translate(-30, 50, 0);
        p.rotateZ(p.PI / 4 + p.sin(petalosAngulo) * 0.1);
        p.fill(34, 139, 34);
        p.specularMaterial(34, 139, 34);
        p.shininess(20);
        p.box(80, 5, 40);
        p.pop();

        p.push();
        p.translate(30, 80, 0);
        p.rotateZ(-p.PI / 4 + p.cos(petalosAngulo) * 0.1);
        p.fill(46, 160, 46);
        p.specularMaterial(46, 160, 46);
        p.shininess(20);
        p.box(80, 5, 40);
        p.pop();

        p.push();
        p.translate(0, 120, -20);
        p.rotateX(p.PI / 6 + p.sin(petalosAngulo * 1.5) * 0.08);
        p.fill(60, 179, 60);
        p.specularMaterial(60, 179, 60);
        p.shininess(20);
        p.box(60, 5, 35);
        p.pop();
        
        p.push();
        p.translate(15, 150, 10);
        p.rotateZ(-p.PI / 6);
        p.fill(50, 170, 50);
        p.box(50, 3, 25);
        p.pop();
        
        p.push();
        p.translate(-15, 180, -10);
        p.rotateZ(p.PI / 6);
        p.fill(40, 160, 40);
        p.box(45, 3, 22);
        p.pop();
    }
    
    function dibujarParticulas(p) {
        let numParticulas = 12;
        
        for (let i = 0; i < numParticulas; i++) {
            let ang = (p.TWO_PI / numParticulas) * i + petalosAngulo * 3;
            let radio = 150 + p.sin(petalosAngulo * 2 + i) * 30;
            let altura = p.sin(petalosAngulo * 2 + i * 0.5) * 100;
            
            p.push();
            p.translate(
                p.cos(ang) * radio,
                altura,
                p.sin(ang) * radio
            );
            
            p.noStroke();
            let brillo = 200 + p.sin(petalosAngulo * 4 + i) * 55;
            p.fill(brillo, brillo, 255, 200);
            p.sphere(4);
            p.pop();
        }
    }
    
    p.windowResized = function() {
        let contenedor = document.getElementById('canvas-flor');
        if (contenedor) {
            let w = contenedor.offsetWidth;
            let h = 500;
            p.resizeCanvas(w, h);
        }
    };
};

new p5(florSketch);
