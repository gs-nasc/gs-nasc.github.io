import * as THREE from './libs/three.module.js';

const Page = {
    init: () => { 
        Page.events.register();
        Page.three.init();
    },
    events: {
        register: () => {
            document.addEventListener("mousemove", Page.cursor.move);
            document.querySelectorAll(".hoverable").forEach(elm => Page.cursor.hoverables(elm));
            window.addEventListener("click", Page.events.changePageButton);
            window.addEventListener("wheel", Page.scroll.scroll);
            document.addEventListener("DOMContentLoaded", Page.events.bodyLoaded);
            document.addEventListener("resize", console.log);
        },
        /**
         * 
         * @param { MouseEvent } ev 
         */
        changePageButton: (ev) => {
            const target = ev.target;
            if(target == null) return;
            const page = target.getAttribute("data-page");
            if(page == null) return;
            Page.scroll.changeWrapper(page);
            Page.scroll.change3dEffect(page);
        },
        bodyLoaded: () => {
            const body = document.querySelector("body");
            const header = body.querySelector("header");

            body.style.setProperty("--header-size", header.clientHeight + "px");
        }
    },
    cursor: {
        cursorElm: document.querySelector(".cursor"),
        cursorSmallElm: document.querySelector(".cursor .cursor-small"),
        cursorBigElm: document.querySelector(".cursor .cursor-big"),
        /**
         * 
         * @param {Element} elm 
         */
        hoverables: (elm) => {
            elm.addEventListener("mouseenter", Page.cursor.hover);
            elm.addEventListener("mouseleave", Page.cursor.hover);
        },
        /**
         * 
         * @param {MouseEvent} ev 
         */
        move: (ev) => {
            const cursorSmall = Page.cursor.cursorSmallElm;
            const cursorBig = Page.cursor.cursorBigElm;
            const x = ev.pageX;
            const y = ev.pageY;

            gsap.to(cursorSmall, {x, y, duration: .1});
            gsap.to(cursorBig, {
                x,
                y,
                duration: .5
            }).timeScale(2);
        },
        /**
         * 
         * @param {MouseEvent} ev 
         */
        hover: (ev) => {
            const cursorBig = Page.cursor.cursorBigElm;
            const scale = (ev.type == "mouseenter") ? 2 : 1;

            gsap.to(cursorBig, {scale, duration: .2});
        }
    },
    three: {
        nextZ: 21,
        init: () => {
            const wrapper = document.querySelector(".wrapper");
            const scene = new THREE.Scene();
            scene.background = new THREE.Color("#0c0c0c");
            const camera = new THREE.PerspectiveCamera(75, wrapper.clientWidth / wrapper.clientHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
            document.body.appendChild(renderer.domElement);

            const geometry = new THREE.TorusKnotGeometry( 4, 1.2, 300, 20, 2, 5 ); 
            const whiteTexture = new THREE.MeshBasicMaterial({ color: "#272727", wireframe: true });

            const torus = new THREE.Mesh(geometry, whiteTexture);
            scene.add(torus);

            camera.position.z = 50;
            torus.rotation.x = 0;
            torus.rotation.y = 0;

            const animate = () => {
            requestAnimationFrame(animate);

                torus.rotation.x += 0.002;
                torus.rotation.y += 0.002;

                const pos = camera.position.clone();
                pos.z = Page.three.nextZ;
                camera.position.lerp(pos, 0.02);

                camera.aspect = window.innerWidth / window.innerHeight;

                // Atualizar tamanho da câmera
                camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
                camera.updateProjectionMatrix();

                // Atualizar tamanho do renderizador
                renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);

                renderer.render(scene, camera);
            };
            animate();
        }
    },
    scroll: {
        /**
         * 
         * @param {WheelEvent} ev 
         */
        scroll: (ev) => {
            const isNext = ev.deltaY > 0;
            const currentWrapper = document.querySelector(".wrapper.show");
            const currentWrapperOrder = Number(currentWrapper.getAttribute("data-order"));
            const wrapperCount = document.querySelectorAll(".wrapper").length;
            if(isNaN(currentWrapperOrder)) return;
            let nextWrapper = currentWrapperOrder + ((isNext) ? +1 : -1); 
            nextWrapper = (nextWrapper <= 0) ? 1 : (nextWrapper >= wrapperCount) ? wrapperCount : nextWrapper;
            Page.scroll.changeWrapper(nextWrapper);
            Page.scroll.change3dEffect(nextWrapper);
        },
        /**
         * 
         * @param {Number} page 
         */
        changeWrapper: (page) => {
            const currentWrapper = document.querySelector(".wrapper.show");
            const nextWrapper = document.querySelector(`.wrapper[data-order="${page}"]`);

            const currentButton = document.querySelector(`.sidemenu li[data-page="${currentWrapper.getAttribute("data-order")}"]`);
            const nextButton = document.querySelector(`.sidemenu li[data-page="${page}"]`);

            currentWrapper.classList.remove("show");
            currentWrapper.classList.add("hide");
            currentButton.classList.remove("active");
            
            nextWrapper.classList.add("show");
            nextWrapper.classList.remove("hide");
            nextButton.classList.add("active");
        },
        /**
         * 
         * @param {Number} page 
         */
        change3dEffect: (page) => {
            const wrapperCount = document.querySelectorAll(".wrapper").length;
            Page.three.nextZ = 12 + (((page - wrapperCount - 1) *-1)*3);
        }
    },
}

Page.init();