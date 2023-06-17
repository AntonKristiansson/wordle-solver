import React, { useState } from 'react';
import './App.css';
import { data } from "./valid_solutions.js";

function App() {

  const [possibleSolutions, setPossibleSolutions] = useState<string[]>([]);
  
  const correctCharacters: string[] = ["h", "", "", "", ""];
  // måste kunna ange 2+ bokstäver på samma index
  // skapa 1 array för varje index?
  const misplacedCharacters: string [][] = [ [], ["v"], ["a"], [], [] ];
  // const misplacedCharacters: string[] = ["o", "n", "e", "", ""];

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
      // and if so, remove words with 2 or more of faulty character
      //gör en och "&&" word includes 2 char
      if (faultyCharacters.some((char) => (correctCharacters.includes(char) || misplacedCharacters.flat().includes(char)) && word.split(char).length - 1 > 1)) {
        
        console.log(word);
        return false;
      }

      // Check if correct and misplaced characters does not contain the faulty character
      // and if so, remove word that contains the faulty character
      if (faultyCharacters.some((char) => (!correctCharacters.includes(char) && !misplacedCharacters.flat().includes(char)) && word.includes(char))) {
        return false;
      }
    
      // Check if the word contains all misplaced characters
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
