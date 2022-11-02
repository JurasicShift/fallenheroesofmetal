(() => {
  "use strict";
  const forms = document.querySelectorAll(".validated-form");

  Array.from(forms).forEach((form) => {
   
    form.addEventListener(
      "submit",
      (event) => {
        const textArea = form.elements["article"];
        if(textArea) {
          const trimValue = textArea.value.trim();
            if(trimValue == "") {
                event.preventDefault();
                event.stopPropagation();
                textArea.value = trimValue;
            }
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
