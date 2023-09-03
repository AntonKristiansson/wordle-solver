import React, { useEffect, useState } from 'react';
import './App.css';
import { data } from "./valid_solutions.js";

function App() {

  const [possibleSolutions, setPossibleSolutions] = useState<string[]>([]);
  
  const [correctCharacters, setcorrectCharacters] = useState<string[]>(["", "", "", "", ""]);
  
  // måste kunna ange 2+ bokstäver på samma index
  // skapa 1 array för varje index?
  // const misplacedCharacters: string [][] = [ ["d", "e"], ["d"], ["d"], ["s"], [] ];
  const [misplacedCharacters, setmisplacedCharacters] = useState<string[][]>([[],[],[],[],[]]);
  
  
  // const misplacedCharacters: string[] = ["o", "n", "e", "", ""];

  // om man gissar 2st "a" och det rätta order endast innehåller 1 så 
  // visar Wordle att 1 "a" är missplaced/korrekt och 1 faulty

  // *om användarn lägger en bokstav i faulty* 
  // 1. Gör en check om bokstaven finns i korrekt eller missplaced
  //    1.1  om inte: Sålla ut ord som har mer än 1 av den bokstaven. 
  //    1.2  om ja: sålla ut alla ord med den bokstaven.
  // funkar detta om användarn anger den som korrekt samtidigt som faulty?
  const [faultyCharacters, setfaultyCharacters]  = useState<string[]>([]);
  
  

  const findSolutions = () => {


    const newPossibleSolutions: string[] = [];
    // Check if the index of the correct characters also appear in the word at the same index.
    // And if so, push the word to newPossibleSolutions
    data.forEach((word: string) => {      
      const isMatch: boolean = correctCharacters.every((char: string, index: number) => {
        const x: string = char.toString();
        return x === "" || word[index] === x;
      });

      if (isMatch) {
        newPossibleSolutions.push(word);
      }

    });


    const filteredSolutions: string[] = newPossibleSolutions.filter((word) => {


      // Check if the faulty character is found in correct or missplaced characters
      // and if so, remove words with 2 or more of the faulty character
      if (faultyCharacters.some((char) => (correctCharacters.includes(char) || misplacedCharacters.flat().includes(char)) && word.split(char).length - 1 > 1)) {
        return false;
      }
      
      // Check that the faulty characters do not appear in correctCharacters and misplacedCharacters.
      // And that the word contains the characters
      // and if so, remove the word.
      if (faultyCharacters.some((char) => (!correctCharacters.includes(char) && !misplacedCharacters.flat().includes(char)) && word.includes(char))) {
        return false;
      }
    
      // Check if the word contains all misplaced characters
      // And if not, filter out the word.
      if (!misplacedCharacters.flat().every((char, index) => char === "" || word.includes(char))) {
      
        return false;
      }

      // Check if index of char in word is the same as index of char in misplacedCharacters
      // ta bort char === "" ????
      // misplacedCharacters.flat().every
      // example.findIndex((subArray) => subArray.includes(char)) instead of misplacedCharacters.indexOf(char)
      //if(misplacedCharacters.every((char, index) => char === "" || word.indexOf(char) === misplacedCharacters.indexOf(char))) {
                
      //  return false;
      //}
      // Check if the characters from misplacedcharacters has the same
      // indexes in misplacedcharacters as they do in the word
      // And if so, filter out the word. 
     if(!misplacedCharacters.every((arr) => {
         return arr.every((char, index) => {
            return misplacedCharacters.indexOf(arr) !== word.indexOf(char, index)          
        });
      })) {
        return false;
      }


      return true;
    });


    setPossibleSolutions(filteredSolutions);
  };

// If any of the arrays are updated, run findSolutions, which also re-renders the page
useEffect(() => {
   findSolutions();
 }, [correctCharacters, misplacedCharacters, faultyCharacters])

 

// Update the misplaced character array
const updatemisplacedCharacters = (e: any, index: number) => {
 const newmisplacedCharacters = [...misplacedCharacters]; 
 newmisplacedCharacters[index] = e.target.value.replace(" ", "").toUpperCase().split("");
 setmisplacedCharacters(newmisplacedCharacters)
 
}

// Update the faulty characters array
const updatefaultyCharacters = (e: any) => {
  //displayedfaultyCharacters = e.target.value;
  //setfaultyCharacters(displayedfaultyCharacters.split(""));
  setfaultyCharacters(e.target.value.replace(" ", "").toUpperCase().split(""));
}

// Update the correct characters array
const updatecorrectCharacters = (e:any, index: number) => {
  const newcorrectCharacters = [...correctCharacters];
  newcorrectCharacters[index] = e.target.value.replace(" ", "").toUpperCase();
  setcorrectCharacters(newcorrectCharacters);
}

// Reset the entire board
const Reset = () => {
  setcorrectCharacters(["", "", "", "", ""])
  setfaultyCharacters([])
  setmisplacedCharacters([[], [], [], [], []])
}




console.log(faultyCharacters)
console.log(misplacedCharacters)
console.log(correctCharacters)
  return (
    <div className="App">
      <div className="input_container">
      <p>Grey (faulty characters)</p>
      <input className='faulty' onChange={updatefaultyCharacters} value={faultyCharacters.join("")}></input>
      
      
      <p>Yellow (missplaced characters)</p>
      {misplacedCharacters.map((char, index) => (        
        <input className='misplaced' onChange={(e) => updatemisplacedCharacters(e, index)} value={char.join("")} key={index}></input>
      ))}

      
      <p>Green (correct characters)</p>      
      {correctCharacters.map((char, index) => (
        <input className='correct' onChange={(e) => updatecorrectCharacters(e, index)} value={char} key={index} maxLength={1}></input>
      ))}
      
      </div>
      
      <br></br>
      <button className='findSolutions' onClick={findSolutions}>Find Solutions</button>
      <button className='reset' onClick={Reset}>Reset</button>
      <p className='solutions_title'>Possible correct answers</p>
      <div className='possibleSolutions_container'>
        {possibleSolutions.map((printed: string, index: number) => (
          <p className='possibleSolutions' key={index}>{printed}</p>
        ))}
      </div>
      

      
    </div>
  );
}

export default App;
