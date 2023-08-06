document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = document.querySelector(".toggle-button");
    let darkThemeCheck = localStorage.getItem('dark-theme');

    if (darkThemeCheck === null) {
        localStorage.setItem("dark-theme", "off");
    }
    else {
        if (darkThemeCheck === "on") {
            themeSwitcher.checked = true;
            document.body.classList.toggle('dark-theme');
        }
    }

    themeSwitcher.addEventListener("click", changeTheme);
    function changeTheme() {
        document.body.classList.toggle('dark-theme');
        if (darkThemeCheck === "on") {
            localStorage.setItem("dark-theme", "off");
            darkThemeCheck = "off"
        }
        else { 
            localStorage.setItem("dark-theme", "on");
            darkThemeCheck = "on"
        }
    }

});