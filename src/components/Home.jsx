/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";

import randomWord from "../utils/random-word";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState(randomWord());
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getResults() {
      setStatus("loading");
      try {
        const response = await fetch(`${API_URL}${searchQuery}`);
        const wordData = await response.json();

        if (wordData.title) {
          setStatus("noresults");
        } else {
          setSearchResults(wordData);
          setStatus("success");
        }
      } catch (error) {
        setStatus("error");
      }
    }
    getResults();
  }, [searchQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    setSearchQuery(event.target.searchTerm.value);
  }

  function playAudio(url) {
    const audio = new Audio(url);
    audio.currentTime = 0;
    audio.play();
    console.log("play audio");
  }

  return (
    <>
      <header>
        <h1 className="text-center text-3xl font-bold underline">WordSmith</h1>
      </header>
      <main className="mx-auto mt-5 w-10/12 md:w-2/3 lg:w-1/2">
        <h1>Search for a word</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="searchTerm"
            className="rounded border border-gray-500 px-2"
            required
          />
          <button
            type="submit"
            className="mx-2 rounded border bg-blue-500 px-2 text-white"
          >
            Search
          </button>
        </form>

        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>There was an error</p>}

        {status === "noresults" && (
          <div>
            <h2 className="text-2xl font-bold">No Definitions Found</h2>
            <p>
              Sorry pal, we couldn&apos;t find definitions for the word you were
              looking for.
            </p>
            <p>
              You can try the search again at later time or head to the web
              instead.
            </p>
          </div>
        )}
        {status === "success" && (
          <div>
            {searchResults.map((wordData, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{wordData.word}</h2>
                    <p>{wordData.phonetic }</p>
                  </div>

                  <FontAwesomeIcon
                    icon={faPlay}
                    onClick={() => playAudio(wordData.phonetics.audio)}
                    className="cursor-pointer rounded-full border border-gray-500 p-4 text-sm"
                  />
                </div>

                {wordData.meanings.map((meaning, index) => (
                  <div
                    key={index}
                    className="my-5 rounded border border-red-300 p-3"
                  >
                    <h3>{meaning.partOfSpeech}</h3>
                    {meaning.definitions.map((definition, index) => (
                      <div key={index} className="my-5 rounded border p-3">
                        <p>{definition.definition}</p>

                        {definition.synonyms.length > 0 && (
                          <p>
                            Synonyms:{" "}
                            {definition.synonyms.map((synonym, index) => (
                              <span key={index}>
                               
                                <a href="#" onClick={() => setSearchQuery(synonym)}>
                                    {synonym}
                                </a>
                               

                                {index < definition.synonyms.length - 1
                                  ? ", "
                                  : "."}
                              </span>
                            ))}
                          </p>
                        )}
                        {definition.antonyms.length > 0 && (
                          <p>
                            Antonyms:{" "}
                            {definition.antonyms.map((antonym, index) => (
                              <span key={index}>
                              <a href="#" onClick={() => setSearchQuery(antonym)}>
                                    {antonym}
                                </a>


                                {index < definition.antonyms.length - 1
                                  ? ", "
                                  : "."}
                              </span>
                            ))}
                          </p>
                        )}
                        {definition.example && (
                          <p>Example: {definition.example}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                <p>Source: {wordData.sourceUrls[0]}</p>

                <p>License: {wordData.license.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
