// ============================================
// Three.js — Maquette 3D d'un bâtiment structurel
// Wireframe interactif avec rotation à la souris
// ============================================

(function() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0e0e10, 15, 35);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 9, 14);
    camera.lookAt(0, 3, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0e0e10, 1);
    canvas.appendChild(renderer.domElement);

    // Group qui contiendra tout le bâtiment (pour rotation globale)
    const building = new THREE.Group();
    scene.add(building);

    // ----- Couleurs / matériaux -----
    const colorAccent = 0xd97706;
    const colorWhite = 0xffffff;
    const colorMuted = 0x6b6b70;

    const matWire = new THREE.LineBasicMaterial({ color: colorWhite, transparent: true, opacity: 0.6 });
    const matAccent = new THREE.LineBasicMaterial({ color: colorAccent, linewidth: 2 });
    const matMuted = new THREE.LineBasicMaterial({ color: colorMuted, transparent: true, opacity: 0.35 });

    // ----- Paramètres du bâtiment -----
    const floors = 6;
    const floorHeight = 1;
    const widthX = 4;
    const widthZ = 3;
    const columnsX = 3; // nombre de poteaux le long de X
    const columnsZ = 3;

    // ----- Génération des dalles (planchers) -----
    for (let i = 0; i <= floors; i++) {
        const y = i * floorHeight;

        // Contour de chaque dalle
        const slabGeom = new THREE.BufferGeometry();
        const half = { x: widthX / 2, z: widthZ / 2 };
        const verts = new Float32Array([
            -half.x, y, -half.z,   half.x, y, -half.z,
             half.x, y, -half.z,   half.x, y,  half.z,
             half.x, y,  half.z,  -half.x, y,  half.z,
            -half.x, y,  half.z,  -half.x, y, -half.z
        ]);
        slabGeom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
        const slab = new THREE.LineSegments(slabGeom, i === 0 || i === floors ? matAccent : matWire);
        building.add(slab);

        // Grille intérieure de chaque dalle (poutres)
        for (let cx = 1; cx < columnsX; cx++) {
            const xPos = -half.x + (widthX / columnsX) * cx;
            const beamGeom = new THREE.BufferGeometry();
            beamGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
                xPos, y, -half.z,  xPos, y, half.z
            ]), 3));
            building.add(new THREE.LineSegments(beamGeom, matMuted));
        }
        for (let cz = 1; cz < columnsZ; cz++) {
            const zPos = -half.z + (widthZ / columnsZ) * cz;
            const beamGeom = new THREE.BufferGeometry();
            beamGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
                -half.x, y, zPos,  half.x, y, zPos
            ]), 3));
            building.add(new THREE.LineSegments(beamGeom, matMuted));
        }
    }

    // ----- Poteaux verticaux (colonnes) -----
    for (let cx = 0; cx <= columnsX; cx++) {
        for (let cz = 0; cz <= columnsZ; cz++) {
            const xPos = -widthX / 2 + (widthX / columnsX) * cx;
            const zPos = -widthZ / 2 + (widthZ / columnsZ) * cz;
            const colGeom = new THREE.BufferGeometry();
            colGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
                xPos, 0, zPos,  xPos, floors * floorHeight, zPos
            ]), 3));
            const isCorner = (cx === 0 || cx === columnsX) && (cz === 0 || cz === columnsZ);
            building.add(new THREE.LineSegments(colGeom, isCorner ? matAccent : matWire));
        }
    }

    // ----- Diagonales de contreventement (côté avant) -----
    for (let i = 0; i < floors; i++) {
        const y1 = i * floorHeight;
        const y2 = (i + 1) * floorHeight;
        const half = widthX / 2;
        const z = widthZ / 2;

        const diagGeom = new THREE.BufferGeometry();
        diagGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
            -half, y1, z,   half, y2, z,
             half, y1, z,  -half, y2, z
        ]), 3));
        building.add(new THREE.LineSegments(diagGeom, matAccent));
    }

    // ----- Sol (grille) -----
    const grid = new THREE.GridHelper(20, 20, 0x333339, 0x222226);
    grid.position.y = -0.01;
    scene.add(grid);

    // Centre le building autour de son origine verticale
    building.position.y = -floors * floorHeight / 2 + 1.5;

    // ----- Interaction souris (drag pour rotation) -----
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0.4;
    let rotX = -0.2;
    let autoRotate = true;

    const onPointerDown = (e) => {
        isDragging = true;
        autoRotate = false;
        prevX = e.clientX || (e.touches && e.touches[0].clientX);
        prevY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onPointerMove = (e) => {
        if (!isDragging) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        rotY += (x - prevX) * 0.01;
        rotX += (y - prevY) * 0.005;
        rotX = Math.max(-0.8, Math.min(0.3, rotX));
        prevX = x;
        prevY = y;
    };

    const onPointerUp = () => {
        isDragging = false;
    };

    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    canvas.addEventListener('touchmove', onPointerMove, { passive: true });
    canvas.addEventListener('touchend', onPointerUp);

    // ----- Animation -----
    function animate() {
        requestAnimationFrame(animate);

        if (autoRotate) rotY += 0.003;

        building.rotation.y = rotY;
        building.rotation.x = rotX;

        renderer.render(scene, camera);
    }

    animate();

    // ----- Resize -----
    function onResize() {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    }

    window.addEventListener('resize', onResize);
})();
