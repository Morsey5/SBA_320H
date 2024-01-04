import React, { useEffect, useState } from "react";
import { UserProvider } from "./Auth/UserContext";
import CreateAccount from "./Auth/CreateAccount";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Profile from "./Auth/Profile";
import definition from "./components/definition"
import "./App.css";
import axios from "axios";
// import WOD from "./WOD/words";

const App = () => {
  const [definitionText, setDefinition] = useState("");
  const [inputWord, setInputWord] = useState("");
  const [savedWords, setSavedWords] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // const [WOD, setWordOfTheDay] = useState("");

  // const handleInputChange = (e) => {
  //   setInputWord(e.target.value);
  // };

  // const handleLookup = () => {
  //   // Fetch definition from WordsAPI using the user-input word
  //   const wordToFetch = inputWord.trim();
  //   if (wordToFetch) {
  //     const definitionOptions = {
  //       method: "GET",
  //       url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFetch}`,
  //     };

  useEffect(() => {
    // Fetch initial data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.dictionaryapi.dev/api/v2/entries/en/example"
        );
        if (response.data && response.data.length > 0) {
          const firstEntry = response.data[0];
          const firstMeaning = firstEntry.meanings[0];
          const firstDefinition =
            firstMeaning.definitions[0]?.definition || "No definition found";
          setDefinition(firstDefinition);
        } else {
          setDefinition("No definition found");
        }
      } catch (error) {
        console.error("Error fetching definition:", error);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []); 
  const handleInputChange = (e) => {
    setInputWord(e.target.value);
  };

  const handleLookup = () => {
    // Fetch definition from WordsAPI using the user-input word
    const wordToFetch = inputWord.trim();
    if (wordToFetch) {
      const definitionOptions = {
        method: "GET",
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToFetch}`,
      };

      axios
        .request(definitionOptions)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            const firstEntry = response.data[0];
            const firstMeaning = firstEntry.meanings[0];
            const firstDefinition =
              firstMeaning.definitions[0]?.definition || "No definition found";
            setDefinition(firstDefinition);
          } else {
            setDefinition("No definition found");
          }
        })
        .catch((error) => {
          console.error("Error fetching definition:", error);
        });
    }
  };

  const handleSave = () => {
    const wordToSave = inputWord.trim();
    if (wordToSave && !savedWords.includes(wordToSave)) {
      setSavedWords((prevWords) => [...prevWords, wordToSave]);
      setInputWord("");
    }
  };

  const handleToggleFavorite = () => {
    const wordToFavorite = inputWord.trim();
    if (wordToFavorite) {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(wordToFavorite)) {
          // Remove from favorites if already present
          return prevFavorites.filter((word) => word !== wordToFavorite);
        } else {
          // Add to favorites if not present
          return [...prevFavorites, wordToFavorite];
        }
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    const aboutSection = (
      <div style={{ marginTop: "20px" }}>
        <h2>About</h2>
        <p>
          This is just a tab to pretend that this is legit, but it is really
          just for aesthetics and HA, made you look!
        </p>
      </div>
    );

    const footer = (
      <div style={{ marginTop: "20px", fontStyle: "italic", color: "#888" }}>
        <p>
          This is just a footer to pretend that this is legit, but it is really
          just for aesthetics and HA, made you look!
        </p>
      </div>
    );

    switch (activeTab) {
      case "home":
        return (
          <>
            <h1>Word Definitions</h1>
            <div>
              <label htmlFor="wordInput">Enter a word: </label>
              <input
                type="text"
                id="wordInput"
                value={inputWord}
                onChange={handleInputChange}
              />
              <button onClick={handleLookup}>Lookup</button>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleToggleFavorite}>
                {favorites.includes(inputWord.trim())
                  ? "Unfavorite"
                  : "Favorite"}
              </button>
            </div>
            {/* Definition box */}
            <div
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginTop: "10px",
              }}
            >
              <h2>Definition:</h2>
              <definition definitionText={definitionText} />
            </div>
            {footer}
          </>
        );
        case "saved":
          return (
            <div style={{ marginTop: "20px" }}>
              <h2>Saved Words</h2>
              <ul>
                {savedWords.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </div>
          );
        case "favorites":
          return (
            <div style={{ marginTop: "20px" }}>
              <h2>Favorites</h2>
              <ul>
                {favorites.map((word) => (
                  <li key={word}>{word}</li>
                ))}
              </ul>
            </div>
          );
      case "about":
        return (
          <>
            {aboutSection}
            {footer}
          </>

        );
      default:
        return null;
    }
  };

  return (
    <UserProvider>
      <div>
        {/* Navigation bar */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => handleTabChange("home")}>Home</button>
          <button onClick={() => handleTabChange("saved")}>Saved Words</button>
          <button onClick={() => handleTabChange("favorites")}>Favorites</button>
          <button onClick={() => handleTabChange("about")}>About</button>
        </div>

        {/* Render authentication components */}
        <CreateAccount />
        <Login />
        <Logout />
        <Profile />

        {/* Render main content based on activeTab */}
        {renderTabContent()}
      </div>
    </UserProvider>
  );
};

export default App;

// // Fetch definition from WordsAPI
// axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/break')
//   .then(response => {
//     console.log(response)
//     const firstDefinition = response.data.definitions[0]?.definition || 'No definition found';
//     setDefinition(firstDefinition);
//   })
//   .catch(error => {
//     console.error('Error fetching definition:', error);
//   });

// // Fetch word of the day from Word of the Day API
// axios.get('https://word-of-the-day2.p.rapidapi.com/word/today', {
//   headers: {

//   },
// })
//   .then(response => {
//     const word = response.data.word || 'No word found';
//     setWordOfTheDay(word);
//   })
//   .catch(error => {
//     console.error('Error fetching word of the day:', error);
//   });
// }, []);

//   return (
//     <div>
//       <h1>Word Definitions</h1>
//       <WordDefinition definitionText={definitionText} />
//     </div>
//   );
// };

// export default App;

//unable to see my work need help
