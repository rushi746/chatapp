
document.getElementById("messageForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = localStorage.getItem("username");
    const message = document.getElementById("message").value;
    if (message.trim() !== "") {
        const data = { username, message };
       
        console.log(data);
        document.getElementById("message").value = "";
    }
});

function displayMessage(username, message) {
    const messagesDiv = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.innerText = `${username}: ${message}`;
    messagesDiv.appendChild(messageElement);
}

