import React, { useState } from 'react';
import './App.css';
import { data } from "./valid_solutions.js";

function App() {

  const [possibleSolutions, setPossibleSolutions] = useState<string[]>([]);
  
  const correctCharacters: string[] = ["h", "e", "r", "o", ""];
  // måste kunna ange 2+ bokstäver på samma index
  // skapa 1 array för varje index?
  // const example = [ ["a", "b"], ["b"], ["c", "s"], ["d", "l", "t"], ["e"] ];
  const misplacedCharacters: string[] = ["o", "n", "e", "", ""];

  // om man gissar 2st "a" och det rätta order endast innehåller 1 så 
  // visar Wordle att 1 "a" är missplaced/korrekt och 1 faulty

  // *om användarn lägger en bokstav i faulty* 
  // 1. Gör en check om bokstaven finns i korrekt eller missplaced
  //    1.1  om inte: Sålla ut ord som har mer än 1 av den bokstaven. 
  //    1.2  om ja: sålla ut alla ord med den bokstaven.
  // funkar detta om användarn anger den som korrekt samtidigt som faulty?
  const faultyCharacters: string[] = ["t", "r"];

  

  const findSolutions = () => {
    const newPossibleSolutions: string[] = [];

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


      // Check if char is found in correct or missplaced characters
      //gör en och "&&" word includes 2 char
      if (faultyCharacters.some((char) => (correctCharacters.includes(char) || misplacedCharacters.includes(char)) && word.split(char).length - 1 > 1)) {
        
        console.log(word);
        return false;
      }

      // Check if the word contains any faulty character
      if (faultyCharacters.some((char) => (!correctCharacters.includes(char) && !misplacedCharacters.includes(char)) && word.includes(char))) {
        return false;
      }
    
      // Check if the word contains all misplaced characters
      if (!misplacedCharacters.every((char, index) => char === "" || word.includes(char))) {
      
        return false;
      }

      // Check if index of char in word is the same as index of char in misplacedCharacters
      // ta bort char === "" ????
      if(misplacedCharacters.every((char, index) => char === "" || word.indexOf(char) === misplacedCharacters.indexOf(char))) {
                
        return false;
      }



      //misplacedCharacters.forEach((char, index) => {

        //const test = word.indexOf(char) === index;


       // const hej = word.indexOf(char);

       // if(index === hej) {
       //   console.log(word)
       // }

        
     // })



      //const allMatch = misplacedCharacters.every((char, index) => {
        
      //  return char === word[index];
    //  });
      


    
      // Check if the word contains all correct characters at their correct positions
     // if (misplacedCharacters.every((char, index) => char === "" || misplacedCharacters.indexOf(char) === word.indexOf(char))) 
     // {
      
     //   return false;

   // }
        
        
      
    
      return true;
    });


    setPossibleSolutions(filteredSolutions);
  };


  return (
    <div className="App">
      <button onClick={findSolutions}>Find Solutions</button>
      {possibleSolutions.map((printed: string, index: number) => (
        <p key={index}>{printed}</p>
      ))}
      
    </div>
  );
}

export default App;
