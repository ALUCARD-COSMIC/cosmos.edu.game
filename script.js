
// EduPlay Arena

document.addEventListener("DOMContentLoaded", () => {
    console.log("EduPlay Arena is ready!");

    // Welcome message
    const welcome = document.querySelector("#welcomeMessage");

    if (welcome) {
        welcome.textContent = "Ready to Learn and Play? 🚀";
    }

    // Game card buttons
    document.querySelectorAll(".game-link").forEach(button => {
        button.addEventListener("click", () => {
            console.log("Game selected!");
        });
    });
});
