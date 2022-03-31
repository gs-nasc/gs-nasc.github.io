(() => {
    const terminal = {
        element: document.getElementById('terminal'),
        command: document.getElementById("command"),
        currentText: document.getElementById("currentText"),
        lines: document.getElementById("terminalLines"),
        init: function () {
            this.drag();
            this.setupEvents();
        },
        setupEvents: () => {
            document.getElementById("terminalbody").addEventListener('click', () => {
                this.command.focus();
                this.command.setSelectRange(this.command.value.length, this.command.value.length);
            });
            const write = (e) => {
                if (e.keyCode === 13) {
                    terminal.runCommand(e.target.value);
                    e.target.value = '';
                }else if(e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 16) {
                    this.command.focus();
                    this.command.setSelectionRange(this.command.value.length, this.command.value.length);
                }
                this.currentText.innerText = `${e.target.value}`;
            }
            this.command.addEventListener('keypress', write);
            this.command.addEventListener('keyup', write);
            this.command.addEventListener('input', write);
            this.command.addEventListener('change', write);
        },
        runCommand: (command) => {
            if(this.commands.hasOwnProperty(command)) this.commands[command]();
            else this.write(`${command} is not a valid command.`);
            this.currentText.removeAttribute('id');
            
        }, 
        drag: () => {
            let [pos1, pos2, pos3, pos4] = [0, 0, 0, 0];

            const dragMouseDown = (e) => {
                e = e || window.event;
                e.preventDefault();

                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            const elementDrag = (e) => {
                e = e || window.event;
                e.preventDefault();

                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;

                this.terminal.style.top = (this.terminal.offsetTop - pos2) + "px";
                this.terminal.style.left = (this.terminal.offsetLeft - pos1) + "px";
            }

            const closeDragElement = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }

            if (document.getElementById(`${this.terminal.id}dock`)) {
                document.getElementById(`${this.terminal.id}dock`).onmousedown = dragMouseDown;
            }
        },
        write: (text) => {
            this.lines.innerHTML += `<li>${text}</li>`;
        },
        commands: {
            help: () => {
                terminal.write("Available commands: help, clear, exit");
            }
        }
    }

    terminal.init();
})();