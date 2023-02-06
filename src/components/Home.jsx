/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";

import randomWord from "../utils/random-word";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

import autocorrect from "../utils/autocorrect";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(randomWord());
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("");
  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  // const [font, setFont] = useState("font-mono");


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

  function playAudio(audioFile) {
    try {
      const audio = new Audio(audioFile);
      audio.currentTime = 0;
      audio.play();
    }
    catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <header>
        <h1 className="pt-6 text-center font-serif text-3xl">WordSmith</h1>



      </header>
      <main className="mx-auto mt-5 w-11/12 font-mono md:w-2/3 lg:w-1/2">

        <form onSubmit={handleSubmit} className="my-8 flex w-full flex-1 flex-wrap justify-between gap-4">
          <input
            type="text"
            name="searchTerm"
            className="flex-1 rounded border border-gray-500 p-3"
            required
            placeholder="Search for any word ..."
          />
          <button
            type="submit"
            className="rounded border bg-green-800 p-3 text-white outline-none
            hover:bg-green-600 focus:bg-green-600
            "
          >
            <span>
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <span className="pl-2">
              Search
            </span>
          </button>
        </form>

        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>There was an error</p>}

        {status === "noresults" && (
          <div>
            <h2 className="py-4 text-2xl font-bold">No Definitions Found</h2>
            <p className="py-2">
              Sorry pal, we couldn&apos;t find definitions for the word you were
              looking for.
            </p>
            <p className="py-2">
              You can try the search again at later time or head to the web
              instead.
            </p>

            <p
              className="py-2"
            >
              Did you mean:{" "}
              <a
                href="#"
                onClick={() => setSearchQuery(autocorrect()(searchQuery))}
                className="text-green-900"
              >
                {autocorrect()(searchQuery)}
              </a> ?

            </p>


          </div>
        )}
        {status === "success" && (
          <div>
            {searchResults.map((wordData, index) => (
              <div key={index}>
                {/* first wordData t only have audio, phonetics, etc */}

                {index === 0 && (
                  <div className="flex justify-between">
                    <h2 className="py-4 text-2xl font-bold">
                      {wordData.word}
                    </h2>
                    <div className="flex gap-4">

                      <div key={index}>
                        <button
                          onClick={() =>
                            (wordData.phonetics[0].audio) ? playAudio(wordData.phonetics[0].audio) : playAudio(wordData.phonetics[1].audio)
                          }
                          className="rounded border bg-green-800 p-3 text-white outline-none
                            hover:bg-green-600 focus:bg-green-600
                            "
                        >
                          <span>
                            <FontAwesomeIcon icon={faPlayCircle} />
                          </span>
                          <span className="pl-2">
                            {wordData.phonetics[0].text ? wordData.phonetics[0].text : wordData.phonetics[1].text}
                          </span>
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              

                {wordData.meanings.map((meaning, index) => (
                  <div
                    key={index}
                    className="my-5 rounded-none border-b border-gray-400 py-3"
                  >
                    <h3
                      className="mb-5 flex text-xl italic underline"
                    >{meaning.partOfSpeech}</h3>
                    <p>
                      Meaning
                    </p>
                    {meaning.definitions.map((definition, index) => (
                      <div key={index} className={`py-3 ${index === meaning.definitions.length - 1 ? '' : 'border-b'}`}>
                        <p
                          className="py-2 text-sm"
                        >
                          <span
                            className="text-sm font-bold text-green-900"
                          >
                            *
                          </span>{" "}
                          {definition.definition}</p>

                        {definition.synonyms.length > 0 && (
                          <p
                            className="ml-4 py-2 text-sm"
                          >
                            Synonyms:{" "}
                            {definition.synonyms.map((synonym, index) => (
                              <span key={index}>

                                <a href="#" onClick={() => setSearchQuery(synonym)}
                                  className="text-green-900"
                                >
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
                          <p className="ml-4 text-sm text-gray-500">
                            Antonyms:{" "}
                            {definition.antonyms.map((antonym, index) => (
                              <span key={index}>
                                <a href="#" onClick={() => setSearchQuery(antonym)}
                                  className="text-green-900"
                                >
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
                          <p className="ml-4 text-sm text-gray-500">

                            {definition.example}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}


              </div>
            ))}
          </div>
        )}
      </main>
      
    </>
  );
}
