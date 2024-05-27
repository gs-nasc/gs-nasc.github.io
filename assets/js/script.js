Math.clamp = function(number, min, max) {
    return Math.max(min, Math.min(number,max));
}

const Page = {
    carouselLimit: 0,
    init: () => { 
        Page.events.register();
        Page.three.init();
    },
    events: {
        register: () => {
            document.addEventListener("mousemove", Page.cursor.move);
            document.querySelectorAll(".hoverable").forEach(elm => Page.cursor.hoverables(elm));
            document.addEventListener("DOMContentLoaded", Page.events.bodyLoaded);
            window.addEventListener("resize", ev => console.log(ev));
        },
        /**
         * 
         * @param { MouseEvent } ev 
         */
        bodyLoaded: () => {
            const corner = document.querySelector(".corners>div.tr");
            const cornerRect = corner.getBoundingClientRect();
            const cornerX = cornerRect.left + window.scrollX;


            const carouselEnd = document.querySelector("li#carousel-end");
            const carouselEndRect = carouselEnd.getBoundingClientRect();
            const carouselEndX = carouselEndRect.left + window.scrollX;

            const limit = cornerX - carouselEndX - cornerRect.width - carouselEndRect.width;

            Page.carouselLimit = limit;

            setTimeout(() => {
                const loadingTitle = document.querySelector("div.loading span.title");
                const loadingSubTitle = document.querySelector("div.loading span.website");
                const page = document.querySelector("div.page");

                gsap.to(loadingTitle, {
                    opacity: 0,
                    duration: 0.4
                });
                gsap.to(loadingSubTitle, {
                    opacity: 0,
                    duration: 0.4,
                    delay: 0.2
                });


                gsap.to(page, {
                    visibility: 'visible',
                    opacity: 1,
                    duration: 0.4,
                    delay: 0.5
                })
            }, 1000)
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

            const container = document.querySelector("div.container"); 
            const containerRect = container.getBoundingClientRect();

            const containerLeft = containerRect.left + window.scrollX;
            const containerRight = containerRect.right - window.scrollX;
            
            const transform = Math.floor(Page.carouselLimit / 100 * (((Math.clamp(Math.floor(x-containerLeft), 0, Math.floor(containerRight - containerLeft)) / (containerRight - containerLeft)) * 100)));

            const carousel = document.querySelector(".projects>ul");

            gsap.to(carousel, {
                transform: `translateX(calc(${transform}px))`
            });

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
            const scale = (ev.type == "mouseenter") ? "60px" : "30px";
            const margin = (ev.type == "mouseenter") ? "-30px" : "-15px";
            gsap.to(cursorBig, {width: scale, height: scale, top: margin, left: margin, duration: .2});

            const cursorSmall = Page.cursor.cursorSmallElm;

            const cursorArrow = cursorSmall.querySelector("svg.arrow");
            const cursorCross = cursorSmall.querySelector("svg.cross");

            const arrowOpacity = (ev.type == "mouseenter") ? 1 : 0;
            const crossOpacity = (ev.type == "mouseenter") ? 0 : 1;

            const arrowRotation = (ev.type == "mouseenter" ? 0 : 135);
            const crossRotation = (ev.type == "mouseenter" ? 135 : 45);

            gsap.to(cursorArrow, {
                opacity: arrowOpacity,
                transform: `rotate(${arrowRotation}deg)`,
                duration: .2
            });

            gsap.to(cursorCross, {
                opacity: crossOpacity,
                transform: `rotate(${crossRotation}deg)`,
                duration: .2
            });
        }
    },
    three: {
        renderer: undefined,
        scene: undefined,
        camera: undefined,
        material: undefined,
        onResize: () => {
            let container = document.querySelector('.viewport');
            const {
                offsetWidth: width,
                offsetHeight: height
            } = container;
            Page.three.camera.aspect = width / height;
            Page.three.camera.updateProjectionMatrix();
            Page.three.renderer.setSize(width, height);
        },
        init: () => {
            let container = document.querySelector('.viewport');
            Page.three.scene = new THREE.Scene();
            const {
                offsetWidth: width,
                offsetHeight: height
            } = container;
            Page.three.camera = new THREE.PerspectiveCamera(45, width / height, 1, 100);
            Page.three.camera.position.z = 30;
            Page.three.renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            Page.three.renderer.setSize(width, height);
            Page.three.renderer.setClearColor(0x000000, 0);
            container.appendChild(Page.three.renderer.domElement);
            window.addEventListener('resize', Page.three.onResize);
            const geometry = new THREE.PlaneGeometry(50, 30, 100, 100);
            Page.three.material = new THREE.ShaderMaterial({
                side: THREE.DoubleSide,
                transparent: true,
                uniforms: {
                    time: {
                        type: 'f',
                        value: 0.2
                    },
                    speed: {
                        type: 'f',
                        value: 0.0009
                    },
                    waveDefinition: {
                        type: 'f',
                        value: 5.4
                    },
                    waveAmplitude: {
                        type: 'f',
                        value: 0.14
                    },
                    topoDefinition: {
                        type: 'f',
                        value: 20
                    },
                    topoColor: {
                        type: 'c',
                        value: new THREE.Color(25 / 255, 25 / 255, 25 / 255)
                    }
                },
                vertexShader: `
      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec2 mod289(vec2 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }

      vec3 permute(vec3 x) {
        return mod289(((x*34.0)+1.0)*x);
      }

      float snoise(vec2 v)
      {
        const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
            -0.577350269189626,  // -1.0 + 2.0 * C.x
            0.024390243902439); // 1.0 / 41.0
        // First corner
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);

        // Other corners
        vec2 i1;
        //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
        //i1.y = 1.0 - i1.x;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        // x0 = x0 - 0.0 + 0.0 * C.xx ;
        // x1 = x0 - i1 + 1.0 * C.xx ;
        // x2 = x0 - 1.0 + 2.0 * C.xx ;
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;

        // Permutations
        i = mod289(i); // Avoid truncation effects in permutation
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));

        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;

        // Gradients: 41 points uniformly over a line, mapped onto a diamond.
        // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;

        // Normalise gradients implicitly by scaling m
        // Approximation of: m *= inversesqrt( a0*a0 + h*h );
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

        // Compute final noise value at P
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      uniform float time;
      uniform float waveDefinition;
      uniform float waveAmplitude;

      varying vec3 vPosition;

      void main(void) {
        float newZ = snoise(uv) + snoise((uv * waveDefinition) + time);
        newZ *= waveAmplitude;

        vec3 newPosition = vec3(position.xy, position.z + newZ);
        vPosition = newPosition;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
                fragmentShader: `
      float map(float value, float inMin, float inMax, float outMin, float outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
      }

      #extension GL_OES_standard_derivatives : enable

      uniform float waveAmplitude;
      uniform float topoDefinition;
      uniform vec3 topoColor;

      varying vec3 vPosition;

      void main(void) {
        float coord = vPosition.z * topoDefinition;
        float line = abs(fract(coord - 0.1) - 0.5) / fwidth(coord);
        line /= 1.1;

        gl_FragColor = vec4(topoColor, 1.0 - line);
      }
    `
            });
            const mesh = new THREE.Mesh(geometry, Page.three.material);
            Page.three.scene.add(mesh);
            Page.three.draw();
        },
        draw: () => {
            Page.three.renderer.render(Page.three.scene, Page.three.camera);
            requestAnimationFrame(Page.three.draw);
            Page.three.material.uniforms.time.value += Page.three.material.uniforms.speed.value;
        }
    },
}

Page.init();