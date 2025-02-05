const ServerAdd = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  const styleElement = document.createElement("style");
  styleElement.textContent = `/* Chatbot container */
  #chatbot-container {
      font-family: "Roboto", Arial, sans-serif !important;
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #F4F7FA;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: #4A4A4A;
      max-width: 360px;
      min-width: 360px;
      z-index: 1000; /* Ensure chatbot is on top */
  }

  /* Chatbot header */
  #chatbot-header {
      background-color: black;
      color: white;
      padding: 10px 20px;
      border-radius: 10px 10px 0 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }

  #chatbot-title {
      font-size: 18px;
      font-weight: bold;
  }

  #chatbot-toggle {
      background-color: transparent;
      border: none;
      cursor: pointer;
  }

  #toggleicon {
      font-size: 20px;
      color: white;
  }

  /* Chatbot window */
  #chatbot-window {
      display: none;
      background-color: #F4F7FA;
      padding: 10px;
      overflow: hidden;
  }

  /* Chatbot content */
  #chatbot-content {
      height: 335px;
      overflow-y: auto;
      padding: 10px;
  }

  /* Chatbot input area */
  #chatbot-input {
      display: flex;
      align-items: center;
      padding: 5px;
      background-color: #e0e2ea;
      border-radius: 8px;
      margin: 10px;
  }

  #chatbot-text {
      flex: 1;
      padding: 5px 10px;
      border: none;
      border-radius: 6px;
      background-color: transparent;
      outline: none;
  }

  #chatbot-send {
      background-color: transparent;
      border: none;
      cursor: pointer;
      color: black;
      font-size: 24px;
      margin-left: 10px;
  }
  /* Chat options container */
.chat-options {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

/* Chat options buttons */
.chat-options button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
  /* User and bot message styling */
  .user-message,
  .bot-message {
      display: flex;
      margin: 8px 0;
  }

  .user-message {
      justify-content: flex-end;
  }

  .user-message div,
  .bot-message div {
      max-width: 70%;
      padding: 12px;
      border-radius: 10px;
      word-wrap: break-word;
  }

  .user-message div {
      background-color: #e9e9e9;
      color: #4A4A4A;
  }

  .bot-message div {
      background-color: white;
      color: #4A4A4A;
  }

  /* Icons */
  .user-message .fas,
  .bot-message .fas {
      font-size: 14px;
      margin: 0 5px;
      color: #4A4A4A;
  }

  .user-message .fa-user {
      color: black;
  }

  .bot-message .fa-robot {
      color: black;
  }

  /* Typing animation */
  .typing-animation {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 8px 0;
      padding: 10px;
  }

  .typing-animation .dot-container {
      display: flex;
      align-items: center;
  }

  .typing-animation .dot {
      height: 8px;
      width: 8px;
      background-color: black;
      border-radius: 50%;
      margin: 0 4px;
      opacity: 0;
      animation: showDot 1s infinite;
  }

  @keyframes showDot {
      0%, 100% { opacity: 0; transform: translateY(0); }
      25% { opacity: 1; transform: translateY(-2px); }
      50%, 75% { opacity: 1; transform: translateY(0); }
  }
  `;
  let formFilled = false;
  let currentQuestion = 0;
  const questions = [
    {
      prompt:
        "Hello! I'm Nexa, your career counselor. Shall we begin? (Yes/No)",
    },
    { prompt: "What's your Name?" },
    { prompt: "What's your age?" },
    { prompt: "What's your gender?" },
    {
      prompt:
        "Could you please tell me about your current educational level? (10th grade/school/O-levels or 12th grade/college)",
    },
    {
      prompt: "Great! Now, could you share the subjects you've been studying?",
    },
    {
      prompt:
        "How would you describe your family's financial background? (Lower-Middle, Middle Class, or Upper-Middle)",
    },
    { prompt: "Share your 3 strengths and 3 areas you'd like to improve?" },
    { prompt: "What do you want to be in 5 years from now?" },
    {
      prompt:
        "Is there anything else you'd like to share that could help us provide you with personalized advice? (Optional)",
    },
  ];
  const userData = {};

  document.head.appendChild(styleElement);
  const fontAwesomeLink = document.createElement("link");
  fontAwesomeLink.rel = "stylesheet";
  fontAwesomeLink.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
  document.head.appendChild(fontAwesomeLink);

  let formfilled = true;

  const chatbotContainer = document.createElement("div");
  chatbotContainer.id = "chatbot-container";
  chatbotContainer.innerHTML = `
        <div id="chatbot-content-container">
            <div id="chatbot-header">
                <span id="chatbot-title">Let's Chat</span>
                <button id="chatbot-toggle"><i id="toggleicon" class="fas fa-chevron-up"></i></button>
            </div>



            <div id="chatbot-window">
                <div id="chatbot-content">
                    <!-- Chatbot content goes here -->
                </div>
                <div id="chatbot-input">
                    <input type="text" id="chatbot-text" placeholder="Type your message">
                    <button id="chatbot-send"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>

    `;

  document.body.appendChild(chatbotContainer);
  // document.body.innerHTML = chatbotContainer;

  const chatbotFormContainer = document.getElementById(
    "chatbot-form-container"
  );

  const chatbotContentContainer = document.getElementById(
    "chatbot-content-container"
  );
  const chatbotHeader = document.getElementById("chatbot-header");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotInput = document.getElementById("chatbot-text");
  const chatbotContent = document.getElementById("chatbot-content");
  const chatbotformcontainer = document.getElementById(
    "chatbot-form-container"
  );

  const toggleicon = document.getElementById("toggleicon");

  // Initialize session storage if not already set
  if (!sessionStorage.getItem("formData")) {
    sessionStorage.setItem("formData", JSON.stringify({}));
  }

  if (!sessionStorage.getItem("chatHistory")) {
    sessionStorage.setItem(
      "chatHistory",
      JSON.stringify([
        {
          sender: "bot",
          message:
            "Welcome! I'm Nexa ,your career guide, here to assist you in making informed decisions about your future.",
        },
      ])
    );
  }

  // Load form data from session storage
  const formData = JSON.parse(sessionStorage.getItem("formData"));

  // Load chat history from session storage
  const chatHistory = JSON.parse(sessionStorage.getItem("chatHistory"));
  for (const entry of chatHistory) {
    appendMessage(entry.sender, entry.message);
  }

  let isChatbotOpen = false;

  // Toggle chatbot window
  chatbotHeader.addEventListener("click", function () {
    if (isChatbotOpen) {
      minimizeChatbot();
    } else {
      maximizeChatbot();
    }
  });

  // Close chatbot window
  toggleicon.addEventListener("click", function () {
    console.log("toggleicon : " + isChatbotOpen);
    if (isChatbotOpen) {
      minimizeChatbot();
    } else {
      maximizeChatbot();
      showChatOptions();
    }
  });

  const toggleIcon = document.getElementById("toggleicon");
  // Close chatbot window
  toggleIcon.addEventListener("click", function () {
    if (isChatbotOpen) {
      minimizeChatbot();
    } else {
      maximizeChatbot();
    }
  });

  function maximizeChatbot() {
    chatbotWindow.style.display = "block";
    chatbotToggle.innerHTML =
      '<i id="toggleicon" class="fas fa-chevron-down toggleicon"></i>';
    isChatbotOpen = true;
    // Call showChatOptions here if it's the first time opening the chatbot
    if (!document.querySelector(".chat-options")) {
      showChatOptions();
    }
  }
  function minimizeChatbot() {
    chatbotWindow.style.display = "none";
    chatbotToggle.innerHTML =
      '<i id="toggleicon" class="fas fa-chevron-up toggleicon"></i>';
    isChatbotOpen = false;
  }

  document
    .getElementById("chatbot-send")
    .addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  function appendTypingAnimation() {
    const typingElement = document.createElement("div");
    typingElement.classList.add("typing-animation");

    const dotContainer = document.createElement("div");
    dotContainer.classList.add("dot-container");

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.style.animationDelay = `${i * 0.2}s`; // Delay each dot by 0.2 seconds
      dotContainer.appendChild(dot);
    }

    typingElement.appendChild(dotContainer);
    chatbotContent.appendChild(typingElement);
    chatbotContent.scrollTop = chatbotContent.scrollHeight;
  }

  function removeTypingAnimation() {
    const typingElements = document.querySelectorAll(".typing-animation");
    typingElements.forEach((element) => element.remove());
  }

  function appendMessage(sender, message, options) {
    const chatbotContent = document.getElementById("chatbot-content");

    const messageElement = document.createElement("div");
    messageElement.classList.add(`${sender}-message`);

    const iconElement = document.createElement("i");
    iconElement.classList.add("fas");
    if (sender === "user") {
      iconElement.classList.add("fa-user");
    } else if (sender === "bot") {
      iconElement.classList.add("fa-robot");
    }
    iconElement.style.marginLeft = "5px"; // Add some space between the icon and the message bubble

    const messageBubble = document.createElement("div");
    messageBubble.style.wordWrap = "break-word";
    messageBubble.style.padding = "12px";
    messageBubble.style.borderRadius = "10px";
    messageBubble.style.maxWidth = "80%";
    messageBubble.innerHTML = message;

    if (sender === "user") {
      messageElement.appendChild(messageBubble);
      messageElement.appendChild(iconElement);
    } else {
      // For bot messages, append the icon first, then the message bubble
      messageElement.appendChild(iconElement);
      messageElement.appendChild(messageBubble);
    }

    if (options) {
      const buttonsContainer = document.createElement("div");
      buttonsContainer.classList.add("buttons-container");

      options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("chatbot-option-button");
        button.onclick = () => handleInitialQuestions(option.value);
        buttonsContainer.appendChild(button);
      });

      messageElement.appendChild(buttonsContainer);
    }

    chatbotContent.appendChild(messageElement);
    chatbotContent.scrollTop = chatbotContent.scrollHeight;
  }

  function showChatOptions() {
    // Check if chat options already exist
    if (!document.querySelector(".chat-options")) {
      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("chat-options");

      const careerChatButton = document.createElement("button");
      careerChatButton.textContent = "Start Career Chat";
      careerChatButton.onclick = () => startCareerChat();
      optionsContainer.appendChild(careerChatButton);

      const openChatButton = document.createElement("button");
      openChatButton.textContent = "Open Chat";
      openChatButton.onclick = () => openGeneralChat();
      optionsContainer.appendChild(openChatButton);

      chatbotContent.appendChild(optionsContainer);
    }
  }

  function startCareerChat() {
    // Remove chat options
    document.querySelector(".chat-options").remove();
    // Set formFilled to false to indicate the start of the career chat
    formFilled = false;
    // Start the career chat by asking the first question
    appendMessage("bot", questions[currentQuestion].prompt);
  }

  function openGeneralChat() {
    // Remove chat options
    document.querySelector(".chat-options").remove();
    // Set formFilled to true to indicate that the chatbot should not ask any questions
    formFilled = true;
    // Inform the user that they are in the general chat
    appendMessage(
      "bot",
      "You are now in the general chat. How can I assist you?"
    );
    // Handle general chat by sending a request to the backend
    chatbotContent.addEventListener("keyup", async function (event) {
      if (event.key === "Enter") {
        const userInput = chatbotInput.value.trim();
        if (userInput !== "") {
          try {
            appendTypingAnimation();
            const response = await fetch("http://localhost:3000/open-chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userInput }),
            });

            const data = await response.json();
            removeTypingAnimation();
            appendMessage("bot", data.response);
          } catch (error) {
            console.error(error);
            removeTypingAnimation();
            appendMessage(
              "bot",
              "Sorry, there was an error processing your request."
            );
          }
          chatbotInput.value = "";
        }
      }
    });
  }

  async function sendMessage() {
    const query = chatbotInput.value.trim();
    if (query !== "") {
      appendMessage("user", query);
      chatbotInput.value = "";

      if (!formFilled) {
        handleInitialQuestions(query);
      } else {
        await sendOpenChatInputToBackend(query);
      }
    }
  }

  function handleInitialQuestions(userResponse) {
    if (currentQuestion === 0) {
      if (userResponse.toLowerCase() === "yes") {
        currentQuestion++;
        appendMessage("bot", questions[currentQuestion].prompt);
      } else {
        appendMessage("bot", "Please type 'Yes' to start the conversation.");
      }
    } else if (currentQuestion > 0 && currentQuestion < questions.length) {
      userData[`question${currentQuestion}`] = userResponse;
      currentQuestion++;
      if (currentQuestion < questions.length) {
        appendMessage("bot", questions[currentQuestion].prompt);
      } else {
        // All questions answered, send data to backend
        sendCareerDataToBackend();
      }
    }
  }

  // Function to send career chat data to backend
  async function sendCareerDataToBackend() {
    try {
      appendTypingAnimation();
      const response = await fetch(`${ServerAdd}/career-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData: userData }),
      });
      const data = await response.json();
      appendMessage("bot", data.response);
      removeTypingAnimation();
      formFilled = true; // Set formFilled to true after sending data to backend
      currentQuestion = 0; // Reset currentQuestion for the next conversation
    } catch (error) {
      console.error(error);
      removeTypingAnimation();
      appendMessage(
        "bot",
        "Sorry, there was an error processing your request."
      );
    }
  }

  // Function to send open chat input to backend
  async function sendOpenChatInputToBackend(userInput) {
    try {
      appendTypingAnimation();
      // Get the current chat history
      const chatHistory = JSON.parse(
        sessionStorage.getItem("chatHistory") || "[]"
      );
      // Add the user's input to the chat history
      chatHistory.push({ sender: "user", message: userInput });
      // Send the updated chat history to the backend
      const response = await fetch(`${ServerAdd}/open-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      // Add the bot's response to the chat history
      chatHistory.push({ sender: "bot", message: data.response });
      // Update the chat history in session storage
      sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
      appendMessage("bot", data.response);
      removeTypingAnimation();
    } catch (error) {
      console.error(error);
      removeTypingAnimation();
      appendMessage(
        "bot",
        "Sorry, there was an error processing your request."
      );
    }
  }
});
