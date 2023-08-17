(function(window) {
  // web speech api
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";
  
  // dom elements
  const start = document.querySelector("#start");
  const stop = document.querySelector("#stop");
  const status = document.querySelector("#status");
  const command = document.querySelector("#command");
  const preview = document.querySelector("#preview");
  const styleTag = document.createElement("style");

  // variables
  let htmlString = "";
  const accuracy = 0.7;

  // handle start button
  const handleStart = (e) => {
    status.innerHTML = "Talking";
    command.innerHTML = "";
    status.classList.add("blink");
    recognition.start();
  }

  // handle stop button
  const handleStop = (e) => {
    status.innerHTML = "Not Talking";
    command.innerHTML = "";
    status.classList.remove("blink");
    recognition.stop();
  }

  // handle unknown command
  const handleUnrecognized = () => {
    status.innerHTML = "Not Talking";
    command.innerHTML = "Could not understand your command";
    status.classList.remove("blink");
    recognition.stop();
  }

  // handle html
  const handleHTML = (transcript) => {
    if (transcript.includes("content")) {
      const content = transcript.split("html content ")[1];
      htmlString += content;
    }
    else if (transcript.includes("open")) {
      const tag = transcript.split("html open ")[1];
      htmlString += `<${tag}>`;
    }
    else if (transcript.includes("close")) {
      const tag = transcript.split("html close ")[1];
      htmlString += `</${tag}>`;
      preview.innerHTML += htmlString;
      htmlString = "";
    }
  }

  // handle css
  const handleCSS = (transcript) => {
    if (transcript.includes("open")) {
      const tag = transcript.split("css open ")[1];
      styleTag.innerHTML += `${tag} {`;
    }
    else if (transcript.includes("close")) {
      styleTag.innerHTML += '}';
    }
    else if (transcript.includes("style")) {
      const payload = transcript.split("css style ")[1];
      console.log({payload});
      if (payload) {
        const [prop, value] = payload.replaceAll('colour', 'color').replaceAll(' pixels', 'px').replaceAll(' ', '-').split('-is-');
        console.log({prop, value});
        if (prop && value) {
          styleTag.innerHTML += `${prop}: ${value};`;
        }
      }
    }
  }

  // process the transcript
  const precessResult = (transcript) => {
    const removeSpaceTranscript = transcript.trim().toLowerCase();
    const commandKey = removeSpaceTranscript.split(' ')[0];

    switch (commandKey) {
      case 'html':
        handleHTML(removeSpaceTranscript);
        break;
      case 'css':
        handleCSS(removeSpaceTranscript);
        break;
      default:
        handleUnrecognized();
    }
  }

  // handle the result from speech recognition
  const handleResult = (e) => {
    const { results, resultIndex } = e;
    const { transcript, confidence } = results[resultIndex][0];
    if (accuracy <= confidence) {
      command.innerHTML = `Command: ${transcript}`;
      precessResult(transcript);
    }
  }

  // add style tag in the html head
  document.head.appendChild(styleTag);

  start.addEventListener("click", handleStart);
  stop.addEventListener("click", handleStop);
  recognition.addEventListener("result", handleResult);
})(window);
