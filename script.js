document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("codeArea");
    const lineNumbers = document.getElementById("lineNumbers");
    const windowElement = document.querySelector(".window");
    const minimizeButton = document.querySelector(".button.minimize");
    const maximizeButton = document.querySelector(".button.maximize");
    const content = document.querySelector(".content");

    let isMaximized = false;
    let isMinimized = false;
    let lastSize = { width: "600px", height: "400px" };

    // Función para actualizar los números de línea
    function updateLineNumbers() {
        const lines = textarea.value.split("\n").length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("<br>");
    }

    // Sincronizar scroll del textarea con los números de línea
    textarea.addEventListener("scroll", () => {
        lineNumbers.style.top = `-${textarea.scrollTop}px`;
    });

    lineNumbers.addEventListener("scroll", () => {
        textarea.scrollTop = lineNumbers.scrollTop;
    });

    // Permitir tabulación en el textarea
    textarea.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            updateLineNumbers();
        }
    });

    // Detectar cambios en el texto y actualizar líneas
    textarea.addEventListener("input", updateLineNumbers);

    // Inicializar los números de línea
    updateLineNumbers();

    // Evento para minimizar (reduce el tamaño de la ventana)
    minimizeButton.addEventListener("click", function () {
        if (!isMinimized) {
            lastSize = { width: windowElement.style.width, height: windowElement.style.height };
            windowElement.style.width = "300px";  // Se reduce el ancho
            windowElement.style.height = "40px";  // Solo la barra de título
            content.style.display = "none";  // Se oculta el contenido
            isMinimized = true;
            isMaximized = false;
        }
    });

    // Evento para maximizar
    maximizeButton.addEventListener("click", function () {
        if (isMinimized) {
            // Restaurar el tamaño anterior
            windowElement.style.width = lastSize.width;
            windowElement.style.height = lastSize.height;
            content.style.display = "flex";
            isMinimized = false;
        } else if (isMaximized) {
            // Restaurar al tamaño original
            windowElement.style.width = lastSize.width;
            windowElement.style.height = lastSize.height;
            windowElement.style.position = "relative";
            windowElement.style.top = "unset";
            windowElement.style.left = "unset";
            isMaximized = false;
        } else {
            // Se guarda el tamaño antes de maximizar
            lastSize = { width: windowElement.style.width, height: windowElement.style.height };
            windowElement.style.width = "100vw";
            windowElement.style.height = "100vh";
            windowElement.style.position = "absolute";
            windowElement.style.top = "0";
            windowElement.style.left = "0";
            isMaximized = true;
        }
    });

});