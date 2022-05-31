import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './leaderboard.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Reorder} from 'framer-motion'
const LeaderBoard = () => {
    const [List, setList] = useState([]);
    const list = useRef([]);
    const baseURL = "http://localhost:3001/teams";
    const baseURL2 = "http://localhost:3001/questions"
    const [Counter, setCounter] = useState(0);
    var hashMap = new Map();
    const [isLoading, setIsLoading] = useState(false);
    const initalizeMap = (key) => {
        hashMap[key] = [];
    }
    const addValueToKey = (key, value) => {
        hashMap[key].push(value);
    }

    useEffect(() => {
     const interval = setInterval(()=>{
         
        axios.get(baseURL).then((response) => {

            // tempList = response.data;
            list.current = response.data;
            response.data.forEach(element => {
                // console.log(element.TeamName);
                initalizeMap(element.TeamName);


            });
            console.log(hashMap);
            // console.log(response.data);

        });
        axios.get(baseURL2).then((response) => {
            // setSoldQuestions(response.data);

            response.data.forEach(element => {


                const { TeamName, QuestionName, SoldPrice ,type} = element

                const object = {
                    QuestionName,
                    SoldPrice,
                    type,

                }
                addValueToKey(TeamName, object);


            });
            list.current.forEach(element => {
                // console.log(hashMap[element.TeamName]);
                element.Questions = hashMap[element.TeamName]
               

            });
            list.current = list.current.sort((a,b)=> a.Coins - b.Coins);
            console.log(list.current);
            setList(list.current)



        });
     },2000)

     return ()=> clearInterval(interval);









    }, [List])



    const [TeamName, setTeamName] = useState('');
    const [Questions, setQuestions] = useState('');
    const [Coins, setCoins] = useState(0);

    const [Qtype, setQtype] = useState('Easy');

    function handleCoins(event) {
        setCoins(event.target.value);
    }
    function handleTeamName(event) {
        setTeamName(event.target.value);
    }
    function handleQuestions(event) {
        setQuestions(event.target.value);
    }
    function handleType(event) {
        console.log(event.target.value);
        setQtype(event.target.value);


    }
    function handleUpdate() {
        console.log("update called");
        console.log(Qtype);
        const bid = {
            "body": {
                "TeamName": TeamName,
                "QuestionName": Questions,
                "price": Coins,
                "type": Qtype
            }
        }
        const config = { headers: { 'Content-Type': 'application/json' } };
        axios.put('http://localhost:3001/update', bid, config)
            .then(response => {
                // setNotice("Updated Sucessfully")
                toast.success("Updated Sucesfully");
            })
            .catch(error => {
                toast.error("Some thing went wrong")
            });

        // set({ ...user });
        setCounter(Counter => Counter + 1);
        setCoins('');
        setQuestions('');
        setTeamName('');
    }

    return (
        <> 
            
            <div className="App">
              <Reorder.Group values={List} onReorder={setList}>
              <table className="table table-dark table-striped table-hover table-borderless">
                    <tbody>
                        <tr key={uuidv4()}>
                            <th key="TeamName">TeamName</th>
                            <th key="Questions">Questions  
                             <button type="button"  key="EASY" className="btn btn-primary btn-success ml-1">Easy</button>
                             <button type="button"  key="MEDIUM"className="btn btn-primary btn-warning ml-1">Medium</button>
                             <button type="button" key ="HARD"className="btn btn-primary btn-danger ml-1" >Hard</button>
                            </th>
                            <th key="COins">Coins</th>
                        </tr>
                        {List.map((item) => {
                            return ( 
                                <Reorder.Item as='tr'key ={item.TeamName} value={item.Coins}>
                                    <td key={item.TeamName}>{item.TeamName}</td>
                                    <td key={uuidv4()}>
                                        {
                                            item.Questions.map((ele) => {
                                                return(<>
                                                    
                                                    <button   key={ele.QuestionName} type="button" className={ ((ele.type=="Easy")?'btn-success':ele.type=="Hard"?'btn-danger':'btn-warning' ).concat(' btn btn-primary ml-1') }>
                                                    Q{ele.QuestionName}
                                                    <span  key={ele.SoldPrice} className ="badge text-bg-secondary">₿ {ele.SoldPrice}</span>
                                                    </button>
                                                </>
                                                )
                                            })

                                        }
                                    </td>

                                    <td key="Coins" >{item.Coins}</td>

                                </Reorder.Item>)

                        })}


                    </tbody>

                </table>
              </Reorder.Group>
            </div>





            <div className="Update">
            <select   value={TeamName} className="form-select" aria-label="Default select example" onChange={handleTeamName}>
                {List.map((item) => {
                    return (
                        <option key={item.TeamName} value={item.TeamName}>{item.TeamName}</option>
                    )

                })}
            </select>
            {/* <input type="text" value={TeamName} name="TeamName" onChange={handleTeamName} placeholder="TeamName" /> */}
            
            <input type="text" min="0" max="9" maxLength="2" value={Questions} name="Questions" onChange={handleQuestions} placeholder="Questions" className="form-control"/>
            <input type="number" value={Coins} name="Coins" onChange={handleCoins} placeholder="Coins" className="form-control" />

            <select className="form-select" value={Qtype} name="type" id="lang" onChange={handleType} >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>

            </select>
            <button type="button" className="btn btn-outline-success" onClick={handleUpdate}>
                Update
            </button>

            </div>




         
            <ToastContainer />

        </>
    )
}
export default LeaderBoard;