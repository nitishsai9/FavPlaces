
import './App.css';
import { useEffect, useState } from 'react';
import Loading from './loading';
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setLoading]=useState(true);
  const [places,setPlaces]=useState([]);
  const [showMore,setshowMore]=useState(false);
  const fetchData = async ()=>{
    setLoading(true);
    try{
    const response = await fetch(url);
    const data = await response.json();
    setPlaces(data);
    console.log(data)
    setLoading(false);
    return;
    }
    catch(err){
      setLoading(false);
      console.log(err);
    }

  };

 
  useEffect(()=>{
 
    fetchData();
  },[]);

  const OnHandler=(id)=>{
   let newP= places.filter((mp)=> mp.id !== id);
   setPlaces(newP);

  }
  if(loading){
return (<div>
  <Loading />
</div>
);
  }
  if(places.length===0){
    return (
      <div>
        <button onClick={(e)=>{fetchData()}}>Refresh</button>
      </div>
    );
  }

  return (
    <>
    {
     places.map((mp)=>{
       const {id,name,info,image,price}= mp;
       return <div key={id} style={{padding: "10px"}}>
         <img src={image} height="100" width="100" />
         <h1>{name}  ${price} </h1>
         <p>
           
          {showMore ? info :`${info.substring(0,100)}` }

           <button onClick={(e)=>{setshowMore(!showMore)}}
   
          >
            {showMore ? "ShowMore" : "ShowLess"}

          </button>
         </p>
         <button onClick={()=>OnHandler(id)} >Not Intrested</button>
       </div>;
     })
    }
    </>
  );
}

export default App;
