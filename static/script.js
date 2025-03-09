function sendQuestion() {
    let userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");

    // Append user message
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

    // Clear input field
    document.getElementById("user-input").value = "";

    fetch("/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: userInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            chatBox.innerHTML += `<p><strong>Error:</strong> ${data.error}</p>`;
        } else {
            // Append AI response
            chatBox.innerHTML += `<p><strong>AI:</strong> ${data.explanation}</p>`;

            // Append video dynamically
            if (data.video) {
                chatBox.innerHTML += `
                    <video controls>
                        <source src="${data.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            } else {
                chatBox.innerHTML += `<p><strong>Error:</strong> Video generation failed.</p>`;
            }
        }
        
        // Auto-scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><strong>Error:</strong> Something went wrong. Please try again.</p>`;
    });
}
