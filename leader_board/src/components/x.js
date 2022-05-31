import { useState } from "react";


const LeaderBoard = ()=>{
    const [Attributes,setAttributes] = useState([]);
   
    const add = (newElement)=>{
        setAttributes(oldArray => [...oldArray, newElement]);
    }
    

    const handleSubmit =(event)=>{
        let object ={}
        event.preventDefautl()
        object = {
            "TeamName":event.target.elements.TeamName.value,
            "Questions":event.target.elements.QuestionNumber.value,
            "Coins" : event.target.elements.Coins.value
        }
        
    Attributes.sort((a,b)=>{
        return b.Coins-a.Coins;
    })
    add(object);
       
    }
    
    return (
        <>
          <table>
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Question Picked </th>
                    <th>Coins Left</th>
                </tr>
            </thead>
           <tbody>
            {
                Attributes.map(({TeamName ,Coins , Questions})=>{
                    return( <tr>
                        <td>{TeamName}</td>
                        <td>{Questions}</td>
                        <td>{Coins}</td>
                    </tr>)
                })
                   
                
            }
           </tbody>

        </table>
        <div>
              
              <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="TeamName"
              placeholder="TeamName"
              
            />
             <input
              type="text"
              name="QuestionNumber"
              placeholder="QuestionNumber"
              
            />
             <input
              type="number"
              name="Coins"
              placeholder="Coins"
              
            />
          </label>
          <button type="submit" onSubmit={handleSubmit}>Submit</button>
        </form>
         </div>

        </>
      
      

    )

}
export default LeaderBoard;