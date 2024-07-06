document.addEventListener('DOMContentLoaded', function() {
    const navBarIcon = document.querySelector(".Nav-bar-icon");
    const navBarR = document.querySelector(".Nav-bar");
    const viewportWidth = window.innerWidth;

    if (navBarIcon && navBarR) {
        navBarIcon.style.position = "fixed";
        navBarIcon.style.right = "0";
        navBarIcon.onclick = responsive;

        function responsive() {
            if (navBarR.style.display === "flex") {
                navBarR.style.display = "none";
            } else {
                navBarR.style.display = "flex";
                navBarR.style.opacity = "1";
                navBarR.style.width = "90%";
                navBarR.style.color = "#e6f3ff";
            }
        }
    }
});
