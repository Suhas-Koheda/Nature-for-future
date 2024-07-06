document.addEventListener('DOMContentLoaded', function() {
    const navBarIcon = document.querySelector(".Nav-bar-icon");
    const navBarR = document.querySelector(".Nav-bar");

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
    const animationElement = document.querySelector('.Animation');

    if (animationElement) {
        const texts = [
            'Environmental Sustainability',
            'And are based Upon',
            'Sustainable Development Goals 7 and 13',
            'Environmental Sustainability'
        ];
        animationElement.style.color="#FF5722";
        let index = 0;

        function changeText() {
            animationElement.textContent = texts[index];
            index = (index + 1) % texts.length;
        }

        changeText();
        setInterval(changeText, 2000); // Change text every 5 seconds
    }
});