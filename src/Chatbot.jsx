
import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [voices, setVoices] = useState([]);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  const welcomeText =
    "Hello! Welcome to Charan's Portfolio. I'm his virtual assistant. I'd love to help you explore his skills, projects and experience. What would you like to know?";

  const [messages, setMessages] = useState([
    { sender: "assistant", text: welcomeText }
  ]);

  const welcomeSpoken = useRef(false);

  useEffect(() => {
    function loadVoices() {
      setVoices(window.speechSynthesis.getVoices());
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  function speakText(text, force = false) {
    if (!voiceEnabled && !force) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    const femaleVoice = voices.find(
      (voice) =>
        voice.lang.startsWith("en") &&
        /zira|samantha|jenny|aria|ava|susan|karen|female/i.test(
          voice.name
        )
    );

    const naturalVoice = voices.find(
      (voice) =>
        voice.lang.startsWith("en") &&
        /natural/i.test(voice.name)
    );

    const englishVoice = voices.find(
      (voice) => voice.lang === "en-US"
    );

    speech.voice =
      femaleVoice || naturalVoice || englishVoice || null;

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1.1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  }

  useEffect(() => {
    function welcomeVisitor() {
      if (welcomeSpoken.current || !voiceEnabled) return;

      welcomeSpoken.current = true;
      setHasWelcomed(true);
      speakText(welcomeText, true);

      document.removeEventListener("click", welcomeVisitor);
    }

    document.addEventListener("click", welcomeVisitor);

    return () => {
      document.removeEventListener("click", welcomeVisitor);
    };
  }, [voiceEnabled, voices]);

  function toggleVoice() {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
      setVoiceEnabled(false);
    } else {
      setVoiceEnabled(true);

      if (!welcomeSpoken.current) {
        welcomeSpoken.current = true;
        setHasWelcomed(true);
        speakText(welcomeText, true);
      } else {
        speakText(messages[messages.length - 1].text, true);
      }
    }
  }

  function getResponse(question) {
    const q = question.toLowerCase();

    if (q.includes("skill")) {
      return "Charan is interested in software development and AI-powered applications. His technical areas include Java, C, JavaScript, React, MySQL and Spring Boot.";
    }

    if (q.includes("project")) {
      return "Charan has worked on a Handloom Fashion Platform and a Multi-Restaurant Food Ordering System.";
    }

    if (q.includes("education") || q.includes("study")) {
      return "Charan is a third-year B.Tech student in Computer Science and Information Technology at KL University.";
    }

    if (q.includes("about") || q.includes("who")) {
      return "Charan Teja is a Computer Science student who enjoys software development, learning new technologies and building practical applications.";
    }

    if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
      return "Hello there! Nice to meet you. What would you like to know about Charan?";
    }

    return "That's an interesting question! I don't have that information yet, but I can tell you about Charan's education, skills and projects.";
  }

  function sendMessage() {
    if (!message.trim()) return;

    const userMessage = message.trim();
    const response = getResponse(userMessage);

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: userMessage },
      { sender: "assistant", text: response }
    ]);

    speakText(response);
    setMessage("");
  }

  function handleSuggestion(item) {
    const response = getResponse(item);

    setMessages((previous) => [
      ...previous,
      { sender: "user", text: item },
      { sender: "assistant", text: response }
    ]);

    speakText(response);
  }

  return (
    <div className="chatbot-container">
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            <div>
              <h3>Charan's Assistant</h3>
              <span>● Online</span>
            </div>

            <div className="chat-actions">
              <button
                onClick={toggleVoice}
                title={voiceEnabled ? "Mute voice" : "Enable voice"}
              >
                {voiceEnabled ? "🔊" : "🔇"}
              </button>

              <button onClick={() => setOpen(false)}>×</button>
            </div>
          </div>

          <div className="assistant-profile">
            <div className="avatar">🤖</div>
            <h3>Hello, Welcome!</h3>
            <p>Explore Charan's portfolio with me.</p>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="suggestions">
            {["About Charan", "Technical Skills", "Projects", "Education"].map(
              (item) => (
                <button key={item} onClick={() => handleSuggestion(item)}>
                  {item}
                </button>
              )
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me about Charan..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        {open ? "×" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;
