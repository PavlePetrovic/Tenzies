import React from "react";
import Die from "./components/Die.jsx";
import {nanoid} from "nanoid";
import Confetti from 'react-confetti'

function App() {

  const [dices, setDices] = React.useState(allNewDices());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);

  React.useEffect( () => {

    // let allTrue = true;
    // for (let i = 0; i < dices.length; i++){
    //   if(dices[i].isHeld === false){
    //     allTrue = false;
    //   }
    //   let winNumber = dices[0].value
    //   if(winNumber != dices[i].value){
    //     allTrue = false
    //   }
    // }
    // if(allTrue){
    //   setTenzies(true);
    // }

    const allHeld = dices.every(die => die.isHeld)
    const firstValue = dices[0].value
    const allSameValue = dices.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }

  }, [dices])

  function allNewDices(){
    let dicesArray = [];
    for( let i = 0; i < 10; i++){
      // dicesArray.push(Math.ceil(Math.random() * 6)) - Smart one
      let diceNumber = Math.floor(Math.random() * (7 - 1) + 1)
      let obj = {
        value: diceNumber,
        isHeld: false,
        id: nanoid()
      }
      dicesArray.push(obj)
    }
    return dicesArray
  }

  const showDices = dices.map( num => {
    return <Die key={num.id} value={num.value} held={num.isHeld} holdDice={() => holdDice(num.id)} />
  })

  function roll(){
    setDices(prevDices => {
      return prevDices.map( die => {
        if(die.isHeld){
          return die
        } else{
          let diceNumber = Math.floor(Math.random() * (7 - 1) + 1)
          return {
            value: diceNumber,
            isHeld: false,
            id: nanoid()
          }
        }
      })
    })

    setRollCount(prevCount => prevCount + 1)
  }

  function holdDice(id){
    setDices(prevDices => {
      return prevDices.map( die => {
          if(id === die.id){
            return {...die, isHeld: !die.isHeld}
          } else{
            return die
          }
        })
    })
  }
 
  function newGame(){
    setDices(allNewDices());
    setTenzies(false)
    setRollCount(0)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="diesArea">
        {showDices}
      </div>
      {tenzies ? 
        <button className="rollBtn" onClick={newGame}>New Game</button> 
        :
        <button className="rollBtn" onClick={roll}>Roll</button> 
      }
      <p>Hand: {rollCount}</p>
    </main>
  );
}

export default App;
