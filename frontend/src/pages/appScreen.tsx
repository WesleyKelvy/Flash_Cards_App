import React, { useState } from "react";

interface word {
  text: string;
}

export default function AppScreen() {
  const [word, setWord] = useState("");
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [wordsList, setWordsList] = useState<string[]>([]);

  async function handleAddWord(data: word) {
    const word = data.text;
    console.log(word);
    const wordToAdd = data.text;

  if (!wordToAdd.trim()) {
    setRequestStatus('Word is empty. Not adding to the database.')
    console.log('Word is empty. Not adding to the database.');
    return;
  }


    try {
      const response = await fetch("http://localhost:3333/word/addWord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ word: wordToAdd }),
      });

      if (!response.ok) {
        throw new Error("Failed to add word");
      }

      console.log("Sucessful to Add a Word!");
      setRequestStatus("Word added successfully!");
    } catch (error) {
      console.log("Error adding word: ", error);
    }
  }

  const handleSublitAddWord = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await handleAddWord({ text: word });
  };

  async function handleGetAllWords() {
    try {
      const response = await fetch("http://localhost:3333/word", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get all words...");
      }

      const data = await response.json();
      setWordsList(data);
      console.log(data)
      console.log("Sucessful to Get All Words!");
    } catch (error) {
      console.log("Error to get all words: ", error);
    }
  }

  const handleSublitGetAllWords = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    await handleGetAllWords();
  };

  return (
    <div
      className="h-screen w-screen bg-slate-900 flex
     justify-center items-center text-white "
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 ">
          <h1 className="text-7xl">Let's Play</h1>
          <h1 className="text-right">Add some Words!</h1>
        </div>

        <form
          onSubmit={handleSublitAddWord}
          className="text-white border self-center flex 
        justify-center w-[300px] h-[220px] items-center rounded-lg"
        >
          <div className=" flex flex-col space-y-2 w-5/6">
            <label htmlFor="text">Write a word:</label>

            <input
              className="rounded-lg text-black pl-2"
              placeholder="chocolate"
              type="text"
              name="word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />

            <button
              className="bg-lime-600 border rounded-lg m-auto px-3 w-1/2
              click"
              type="submit"
            >
              Add Word
            </button>
            <div className="self-center ease-in-out">
              {requestStatus && <p>{requestStatus}</p>}
            </div>
          </div>
        </form>

        <div
          className="text-white border rounded-lg self-center flex 
        justify-center items-center w-[300px] h-[220px]"
        >
          <div className=" flex flex-col justify-center space-y-2">
            <div
              className="flex justify-between w-full
            hover:cursor-pointer"
            >
              <button
                className="bg-lime-600 border rounded-lg px-3"
                onClick={handleSublitGetAllWords}
              >
                Get Words!
              </button>
              <label htmlFor="text">Your Words!</label>
            </div>

            <div
              className="border w-[280px] rounded-lg
            h-[160px]"
            >
              <p className="px-2">
              {wordsList && wordsList.join(', ')}

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
