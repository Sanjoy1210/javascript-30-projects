(function (window) {
  const body = document.body;
  const types = document.querySelectorAll(".type");
  let toastType = "success";
  const delay = document.getElementById("delay");
  let delayTime = 5000;

  const positions = [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];

  const toasts = {
    success: {
      icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg>`,
      title: "Successfully toasted",
    },
    error: {
      icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>`,
      title: "Oops, something went wrong",
    },
    warn: {
      icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21.171 15.398l-5.912-9.854c-.776-1.293-1.963-2.033-3.259-2.033s-2.483.74-3.259 2.031l-5.912 9.856c-.786 1.309-.872 2.705-.235 3.83.636 1.126 1.878 1.772 3.406 1.772h12c1.528 0 2.77-.646 3.406-1.771.637-1.125.551-2.521-.235-3.831zm-9.171 2.151c-.854 0-1.55-.695-1.55-1.549 0-.855.695-1.551 1.55-1.551s1.55.696 1.55 1.551c0 .854-.696 1.549-1.55 1.549zm1.633-7.424c-.011.031-1.401 3.468-1.401 3.468-.038.094-.13.156-.231.156s-.193-.062-.231-.156l-1.391-3.438c-.09-.233-.129-.443-.129-.655 0-.965.785-1.75 1.75-1.75s1.75.785 1.75 1.75c0 .212-.039.422-.117.625z"></path></svg>`,
      title: "Hey you, stop here",
    },
    loading: {
      icon: `<span class="loader"></span>`,
      title: "Loading...",
    },
    info: {
      icon: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>`,
      title: "Infooooooooo"
    }
  }

  // toast template
  class Toast {
    /**
     * @param {Element} element
     */
    constructor(element, {position}) {
      this.position = position || "top-center";

      this.element = document.querySelector(element);
      this.toastContainer = document.createElement("div");
      this.toastContainer.classList.add("toast__container", `toast__container--${this.position}`);
      
      body.appendChild(this.toastContainer);
      this.element.addEventListener("click", this.show.bind(this));
    }

    show() {
      const toast = document.createElement("div");
      toast.classList.add("toast");
      this.toastContainer.appendChild(toast);
      this.hide(toast);

      toast.innerHTML = `
        <span class="toast__icon toast__icon--${toastType}">
          ${toasts[toastType].icon}
        </span>
        <span>${toasts[toastType].title}</span>
      `;

    }

    hide(toast) {
      setTimeout(() => {
        this.toastContainer.removeChild(toast);
      }, delayTime);
    }
  }

  positions.forEach((position) => {
    new Toast(`#${position}`, {
      position,
    });
  });

  types.forEach((type) => type.addEventListener("change", function () {
    toastType = type.value;
  }));

  delay.addEventListener("change", function () {
    delayTime = delay.value;
  });

  document.querySelector(".btn__container").addEventListener("click", function (e) {
    document.querySelector(".active").classList.remove("active");
    document.getElementById(e.target.id).classList.add("active");
  });
}(window));
