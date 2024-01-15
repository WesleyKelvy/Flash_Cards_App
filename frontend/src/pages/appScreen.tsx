import React, { useState } from 'react';

interface word {
  text: string;
}

export default function AppScreen() {
  const [word, setWord] = useState('');
  const [requestStatus, setRequestStatus] =
    useState<string | null>(null);

  async function handleAddWord(data: word) {
    const word = data.text;
    console.log(word);

    try {
      const response = await fetch(
        'http://localhost:3333/word/addWord',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ word }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to add word');
      }

      console.log('Sucessful!');
      setRequestStatus('Word added successfully');
    } catch (error) {
      console.log('Error adding word: ', error);
    }
  }

  const handleSublitAddWord = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await handleAddWord({ text: word });
  };

  return (
    <div
      className="h-screen w-screen bg-slate-900 flex
     justify-center items-center text-white "
    >
      <div className="flex gap-4">
        <div className="flex flex-col gap-5 ">
          <h1 className="text-7xl">Let's Play</h1>
          <h1 className="text-right">
            Add some Words!
          </h1>
        </div>

        <form
          onSubmit={handleSublitAddWord}
          className="text-white border self-center flex 
        justify-center w-[300px] h-[220px] items-center rounded-lg"
        >
          <div className=" flex flex-col space-y-2 w-5/6">
            <label htmlFor="text">
              Write a word:
            </label>

            <input
              className="rounded-lg text-black pl-2"
              placeholder="chocolate"
              type="text"
              name="word"
              value={word}
              onChange={(e) =>
                setWord(e.target.value)
              }
            />

            <button
              className="bg-lime-600 border rounded-lg m-auto px-3 w-1/2
              click"
              type="submit"
            >
              Add Word
            </button>
          </div>
        </form>
        {requestStatus && <p>{requestStatus}</p>}

        <div
          className="text-white border rounded-lg self-center flex 
        justify-center items-center w-[300px] h-[220px]"
        >
          <div className=" flex flex-col justify-center space-y-2">
            <div
              className="flex justify-between w-full
            hover:cursor-pointer"
            >
              <button className="bg-lime-600 border rounded-lg px-3">
                Get Words!
              </button>
              <label htmlFor="text">
                Your Words!
              </label>
            </div>

            <div
              className="border w-[280px] rounded-lg
            h-[160px]"
            >
              <p className="px-2">
                
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
