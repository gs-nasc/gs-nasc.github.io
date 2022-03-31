/** 
 * Developed by: gs-nasc(gsnaxsi@gmail.com)
 * License: MIT
 * Version: 1.0.0
 * Description: A simple terminal for my portfolio.
 */
 (() => {
    const terminal = {
        element: document.getElementById('terminal'),
        command: document.getElementById("command"),
        currentText: document.getElementById("currentText"),
        lines: document.getElementById("terminalLines"),
        dock: document.getElementById("terminaldock"),
        body: document.getElementById("terminalbody"),
        path: "gsnasc@website: ~/ ",
        init: function () {
            terminal.drag.init();
            terminal.events.setup();
        },
        history: [],
        historyIndex: -1,
        run: {
            exec: (command) => {
                if (command.length > 0) {
                    terminal.history.push(command);
                    terminal.currentText.removeAttribute("id");
                    if (terminal.run.commands.hasOwnProperty(command.toLowerCase())) {
                        terminal.run.commands[command.toLowerCase()].run();
                    } else {
                        terminal.run.commands.unknown.run();
                    }

                    const line = document.createElement("li");
                    const text = document.createElement("span");
                    text.id = "currentText";
                    line.textContent = terminal.path;
                    line.appendChild(text);
                    terminal.lines.appendChild(line);
                    terminal.currentText = text;

                    terminal.body.scrollTop = terminal.body.scrollHeight;
                }
            },
            commands: {
                help: {
                    run: () => {
                        const nbsp = (qty) => {
                            let nb = "";
                            for (let i = 0; i < qty; i++) {
                                nb += "&nbsp;";
                            }
                            return nb;
                        }
                        terminal.run.write("=", "rgba(255,255,255,0)");
                        terminal.run.write(`HELP${nbsp(27)}display this help`, "#dedede");
                        terminal.run.write(`ABOUT${nbsp(23)}display about me`, "#dedede");
                        terminal.run.write(`TECHS${nbsp(23)}display the techs i use`, "#dedede");
                        terminal.run.write(`EXPERIENCE${nbsp(11)}display my experience`, "#dedede");
                        terminal.run.write(`PROJECTS${nbsp(15)}display my projects`, "#dedede");
                        terminal.run.write(`CONTACT${nbsp(17)}display my contact information`, "#dedede");
                        terminal.run.write(`CLEAR${nbsp(23)}clear terminal`, "#dedede");
                        terminal.run.write("=", "rgba(255,255,255,0)");
                    }
                },
                unknown: {
                    run: () => {
                        terminal.run.write("Unknown command, to view all commands type <b>help</b>", "#dedede");
                    }
                },
                clear: {
                    run: () => {
                        terminal.lines.innerHTML = "";
                    }
                },
                cls: {
                    run: () => {
                        terminal.run.commands.clear.run();
                    }
                },
                about: {
                    run: () => {
                        terminal.run.write("=", "rgba(255,255,255,0)");
                        terminal.run.write(`Hello my name is Gabriel Nascimento, I'm a Full-Stack Web and Mobile developer.<br>I am currently working in a E-Commerce and ERP development company and i accepting freelances (sites, API's, among others), if I need something just get in touch.`, "#dedede");
                        terminal.run.write("=", "rgba(255,255,255,0)");
                    }
                },
                experience: {
                    run: () => {
                        terminal.run.write("=", "rgba(255,255,255,0)");
                        terminal.run.write(`I have a technical degree in Systems Analysis and Development.`, "#dedede");
                        terminal.run.write(`I'm pursuing a bachelor's degree in Software Engineering.`, "#dedede");
                        terminal.run.write(`I have worked in several projects and I have developed several applications using different technologies.`, "#dedede");
                        terminal.run.write("=", "rgba(255,255,255,0)");
                    }
                },
                techs: {
                    run: () => {
                        const nbsp = (qty) => {
                            let nb = "";
                            for (let i = 0; i < qty; i++) {
                                nb += "&nbsp;";
                            }
                            return nb;
                        }
                        terminal.run.write("=", "rgba(255,255,255,0)");
                        terminal.run.write(`I use the following technologies:`, "#dedede");
                        terminal.run.write(`HTML5${nbsp(15)}[🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟] 10/10`, "#dedede");
                        terminal.run.write(`CSS3${nbsp(19)}[🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟] 10/10`, "#dedede");
                        terminal.run.write(`Javascript${nbsp(8)}[🌟🌟🌟🌟🌟🌟🌟🌟🌟${nbsp(7)}] 9/10`, "#dedede");
                        terminal.run.write(`PHP${nbsp(20)}[🌟🌟🌟🌟🌟🌟🌟🌟${nbsp(14)}] 8/10`, "#dedede");
                        terminal.run.write(`Angular.js${nbsp(8)}[🌟🌟🌟🌟🌟🌟🌟🌟${nbsp(14)}] 8/10`, "#dedede");
                        terminal.run.write(`Node.js${nbsp(13)}[🌟🌟🌟🌟🌟🌟🌟${nbsp(21)}] 7/10`, "#dedede");
                        terminal.run.write(`React${nbsp(17)}[🌟🌟🌟🌟🌟🌟${nbsp(28)}] 6/10`, "#dedede");
                        terminal.run.write(`React Native${nbsp(3)}[🌟🌟🌟🌟🌟🌟${nbsp(28)}] 6/10`, "#dedede");
                        terminal.run.write(`Git${nbsp(23)}[🌟🌟🌟🌟🌟${nbsp(35)}] 5/10`, "#dedede");
                        terminal.run.write("=", "rgba(255,255,255,0)");
                    }
                },
                projects: {
                    run: () => {
                        terminal.run.write("=", "rgba(255,255,255,0)");
                        terminal.run.write(`Interative projects coming soon.`, "#dedede");
                        terminal.run.write(`Another projects: <a href="https://github.com/gs-nasc" target="_blank">click here</a>.`, "#dedede");
                        terminal.run.write("=", "rgba(255,255,255,0)");
                    }
                },
                contact: {
                    run: () => {
                        const nbsp = (qty) => {
                            let nb = "";
                            for (let i = 0; i < qty; i++) {
                                nb += "&nbsp;";
                            }
                            return nb;
                        }
                        terminal.run.write("=", "rgba(255,255,255,0)");
                        terminal.run.write(`Instagram:${nbsp(3)}<a href="https://www.instagram.com/gs_nasc/" target="_blank">@gs_nasc</a>`, "#dedede");
                        terminal.run.write(`Github:${nbsp(9)}<a href="https://github.com/gs-nasc" target="_blank">gs-nasc</a>`, "#dedede");
                        terminal.run.write(`Email:${nbsp(11)}<a href="mailto:gsnaxsi@gmail.com" target="_blank">gsnaxsi@gmail.com</a>`, "#dedede");
                        terminal.run.write(`LinkedIn:${nbsp(5)}<a href="https://www.linkedin.com/in/gabriel-nascimento-807104162/" target="_blank">Gabriel Nascimento</a>`, "#dedede");
                        terminal.run.write("=", "rgba(255,255,255,0)");
                    }
                }
            },
            write: (text, color) => {
                const line = document.createElement("li");
                line.innerHTML = text;
                if (color != null && color != undefined) line.style.color = color;
                terminal.lines.appendChild(line);
            }
        },
        events: {
            setup: () => {
                terminal.body.addEventListener('click', terminal.events.body.click.run);

                terminal.command.addEventListener('keypress', terminal.events.command.write.run);
                terminal.command.addEventListener('keyup', terminal.events.command.write.run);
                terminal.command.addEventListener('input', terminal.events.command.write.run);
                terminal.command.addEventListener('change', terminal.events.command.write.run);
            },
            command: {
                write: {
                    run: (e) => {
                        this.command.focus();
                        this.command.setSelectionRange(this.command.value.length, this.command.value.length);
                        if (e.keyCode === 13) {
                            if (terminal.command.value.length > 0) {
                                terminal.historyIndex = -1;
                                terminal.run.exec(terminal.command.value);
                                e.target.value = '';
                            }
                        } else if (e.keyCode === 38) {
                            if (terminal.history.length > 0) {
                                terminal.historyIndex = (terminal.historyIndex === -1) ? terminal.history.length - 1 : ((terminal.historyIndex -1) < 0) ? terminal.history.length - 1 : terminal.historyIndex - 1;
                                terminal.command.value = terminal.history[(terminal.historyIndex === -1) ? terminal.history.length - 1 : terminal.historyIndex];
                                terminal.currentText.textContent = terminal.command.value;
                            }
                        } else {
                            terminal.historyIndex = -1;
                            this.currentText.innerText = `${e.target.value}`;
                        }
                    }
                }
            },
            body: {
                click: {
                    run: (e) => {
                        this.command.focus();
                        this.command.setSelectionRange(this.command.value.length, this.command.value.length);
                    }
                }
            }
        },
        drag: {
            pos1: 0,
            pos2: 0,
            pos3: 0,
            pos4: 0,
            init: () => {
                terminal.dock.addEventListener("mousedown", terminal.drag.start);
            },
            start: (e) => {
                e = e || window.event;
                e.preventDefault();

                terminal.drag.pos3 = e.clientX;
                terminal.drag.pos4 = e.clientY;

                document.addEventListener("mouseup", terminal.drag.end);
                document.addEventListener("mousemove", terminal.drag.move);
            },
            move: (e) => {
                e = e || window.event;
                e.preventDefault();

                terminal.drag.pos1 = terminal.drag.pos3 - e.clientX;
                terminal.drag.pos2 = terminal.drag.pos4 - e.clientY;
                terminal.drag.pos3 = e.clientX;
                terminal.drag.pos4 = e.clientY;

                terminal.element.style.top = (terminal.element.offsetTop - terminal.drag.pos2) + "px";
                terminal.element.style.left = (terminal.element.offsetLeft - terminal.drag.pos1) + "px";
            },
            end: (e) => {
                document.removeEventListener("mouseup", terminal.drag.end);
                document.removeEventListener("mousemove", terminal.drag.move);
            }
        },
    }

    terminal.init();
})();