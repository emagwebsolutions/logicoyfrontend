import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import Error from '../../Error'
import curuser from '../../users/curuser'
import {useDispatch} from 'react-redux'
import  {fetchalltrucks} from '../../redux/actions/actions'
export default function useTrucklogic(){
  const [err,setErr] = useState("")
  const dispatch = useDispatch()




        /*-------------------------------
        *START GET ALL TruckS DATA
        -------------------------------*/
        const TrucksData = useRef("")
        TrucksData.current = async ()=>{
          try{
            const config = {header:{"Content-Type": "application/json"}}
            const {data} = await axios.get(`${process.env.REACT_APP_URL}/api/public/gettrucks/`,config)
            if(data.success === true){
              dispatch(fetchalltrucks(data.trucks))
            }
          }
          catch(err){
            console.log(err.message)
          }
          
        }
        useEffect(()=>{
          TrucksData.current()
        },[err])
      /*-------------------------------
      *END GET ALL TRUCKS DATA
      -------------------------------*/




  /*----------------------------------
  *Start REGISTER TruckS
  ----------------------------------*/
  const addtruck = async (Truck)=>{
    const {creator} = curuser()
        const config = {
          header:{
            "Content-Type": "application/json"
          }
        }
        try{
          const {data} = await axios.post(`${process.env.REACT_APP_URL}/api/public/addtrucks/`,{...Truck,...creator},config)
          if(data.success){
            setErr(<Error message={data.mess} bgcolor="success" />) 
            TrucksData.current()  
          }
          else{
            setErr(<Error message={data.mess} bgcolor="danger" />)
          }
        }
        catch(err){
          console.log(err.message)
        }
        setTimeout(()=>{
        setErr(" ")
      },4000)
  }
  /*----------------------------------
  *End REGISTER TruckS
  ----------------------------------*/


  /*----------------------------------
  *Start EDIT TruckS
  ----------------------------------*/
 
  const edittruck = async (obj)=>{
 
        const config = {
          header:{
            "Content-Type": "application/json"
          }
        }
   
        try{
          const {data} = await axios.put(`${process.env.REACT_APP_URL}/api/public/edittrucks/`,obj,config)
          if(data.success === true){
            setErr(<Error message={data.mess} bgcolor="success" />)
            
          }
          if(data.success === false){
            setErr(<Error message={data.mess} bgcolor="danger" />)
            TrucksData.current()
          }
          setTimeout(()=> setErr(""),4000)
        }
        catch(err){
          console.log(err.message)
        }
  }
  /*----------------------------------
  *End EDIT TRUCK
  ----------------------------------*/


  /*----------------------------------
  *Begin DELETE TRUCK
  ----------------------------------*/

  function deletetrucks(id){    
    if(window.confirm('Are you sure you want to delete!')){
      const deleteTruck = async ()=>{
        try{
         await axios.delete(`${process.env.REACT_APP_URL}/api/public/deletetrucks/`+id)
         TrucksData.current()
        }
        catch(err){
          console.log(err.message)
        }
      }
      deleteTruck()

    }
    else{

    }
  
}

/*----------------------------------
*End DELETE TRUCK
----------------------------------*/

  return {addtruck,edittruck,deletetrucks,err}
}