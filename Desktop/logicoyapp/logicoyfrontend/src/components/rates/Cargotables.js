import React,{useState} from 'react'
import DateFormats from '../DateFormats'
import useCargo from './logic/useCargo'
import {FaTrashAlt, FaRegEdit} from 'react-icons/fa'
import CargoEditForm from './CargoEditForm'
import {Link} from 'react-router-dom'


export default function Cargotables({data}){
    const {formatDate} = DateFormats()
    const {deletecargorate} = useCargo()
    //States
    const [modalshow, setModalShow] = React.useState(false);
    const [cargodetails,setcargodetails] = useState()

  
    /*-----------------------------
      START JOBS FORM MODAL
    -----------------------------*/
  
    //Modal show
    function setmodalShow(id){
      if(data){ 
      const dd = Object.values(data).filter(v => {
          if(v._id === id){
              return v
          }
          else{
              return ''
          }
      })
       setcargodetails({...dd[0]})
      }
  
      setModalShow(true)
    }
  
    //Modal Hide
    function setmodalhide(){
        setModalShow(false)
    }
    /*-----------------------------
    END JOBS FORM MODAL
    -----------------------------*/
  
    //Delete record
    function deltcargo(id){
        deletecargorate(id)
    }
  

    let i=0
    return (
        <>
        { 
        Object.values(data).map(v =>{ 
            i++
            return (  
                <tr>
                <td>{i}</td>
                <td>{formatDate(v.createdAt)}</td>
                <td>{v.owner}</td>
                <td>{v.destination}</td>
                <td>{v.rate}</td>
                <td>
                {/* DELETE */}
                <Link to="/#"  
                onClick={(e)=>{
                e.preventDefault()
                deltcargo(v._id)
                }} 
                className="cursor">
                <FaTrashAlt className="text-danger mr-3 smbtn" />
                </Link>

                {/* EDIT */}
                <Link to="/#" 
                onClick={(e)=>{
                e.preventDefault()
                setmodalShow(v._id)
                }}>
                <FaRegEdit className="text-primary smbtn" />
                </Link>

                </td>
                </tr>
            )
        })
        }
        <CargoEditForm
        output={cargodetails}
        onHide={setmodalhide} 
        show ={modalshow} />
        </>
    )
}