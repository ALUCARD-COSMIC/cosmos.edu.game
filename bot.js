
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const sendButton = document.getElementById("sendButton");

// Connect your Cloudflare AI backend here later.
const API_URL = "";

function addMessage(text, sender) {
    const message = document.createElement("div");

    message.className = `message ${sender}`;
    message.textContent = text;

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = userInput.value.trim();

    if (!question || question.length > 1000) return;

    addMessage(question, "user");

    userInput.value = "";
    sendButton.disabled = true;
    sendButton.textContent = "Thinking...";

    // Temporary response until real AI is connected.
    if (!API_URL) {
        addMessage(
            "Your message reached EduBot! 🤖 My AI engine is not connected yet. Stay tuned!",
            "bot"
        );

        sendButton.disabled = false;
        sendButton.textContent = "Send ➤";
        userInput.focus();
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question
            })
        });

        if (!response.ok) {
            throw new Error("AI service unavailable");
        }

        const data = await response.json();

        addMessage(
            data.reply || "I couldn't generate a reply.",
            "bot"
        );

    } catch (error) {
        addMessage(
            "Sorry! I couldn't connect right now. Please try again.",
            "bot"
        );

        console.error(error);

    } finally {
        sendButton.disabled = false;
        sendButton.textContent = "Send ➤";
        userInput.focus();
    }
});
