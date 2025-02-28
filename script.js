document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("codeArea");
    const lineNumbers = document.getElementById("lineNumbers");

    // Función para actualizar los números de línea
    function updateLineNumbers() {
        const lines = textarea.value.split("\n").length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("<br>");
    }

    // Sincronizar scroll del textarea con los números de línea
    textarea.addEventListener("scroll", () => {
        lineNumbers.style.top = `-${textarea.scrollTop}px`; // Mueve los números de línea al hacer scroll
    });

    lineNumbers.addEventListener("scroll", () => {
        textarea.scrollTop = lineNumbers.scrollTop; // Sincroniza el scroll de los números con el textarea
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
});