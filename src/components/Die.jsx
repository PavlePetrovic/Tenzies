
function Die(props){
    return(
        <div onClick={props.holdDice} className="dieFace" style={props.held ? {backgroundColor:'#59E391'} : {backgroundColor: '#ffffff'}}>
            <h2 className="die">{props.value}</h2>
        </div>
    )
}

export default Die