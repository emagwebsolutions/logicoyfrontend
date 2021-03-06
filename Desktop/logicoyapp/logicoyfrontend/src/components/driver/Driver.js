import React,{useState} from 'react'
import Navbars from '../Navbars'
import Footer from '../Footer'
import {Container,Row,Col} from 'react-bootstrap'
import List from '../shared/List'
import Details from '../shared/Details'
import Transactionx from '../shared/Transactionx'
import Tabs from '../shared/Tabs'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {FaTrashAlt, FaRegEdit} from 'react-icons/fa'
import DriverForm from './DriverForm'
import DriverEditForm from './DriverEditForm'
import useDriverlogic from './logic/useDriverlogic'
import useSearchHook from '../useSearchHook'

export default function Driver(){
    const [modalshow, setModalShow] = React.useState(false);
    const [emodalshow, esetModalShow] = React.useState(false);
    const [singledriver,setsingledriver] = useState()
    const datasource = useSelector((state)=> state.drivers.alldrivers)
    const jobs = useSelector((state)=> state.jobs.alljobs)
    const {output,searchdatalist} = useSearchHook(datasource)

    const [drvdetails, setdrvdetails] = useState()
    const [mobilephone, setmobilephone] = useState()
   
    const {deletedrivers} = useDriverlogic()
    /*-----------------------------
    START DRIVER FORM MODAL
    -----------------------------*/
    function setmodalShow(){
        setModalShow(true)
    }
    function setmodalhide(){
        setModalShow(false)
    }
    /*-----------------------------
    END DRIVER FORM MODAL
    -----------------------------*/

    /*-----------------------------
    START EDIT DRIVER FORM MODAL
    -----------------------------*/


  
    function esetmodalShow(id){
        const obj = {...datasource}
        const dd = Object.values(obj).filter(v => {
            if(v._id === id){
                return v
            }
            else{
                return ''
            }
        })
         setsingledriver({...dd[0]})
        esetModalShow(true)
    }
    
    function esetmodalhide(){
        esetModalShow(false)
    }
    /*-----------------------------
    END EDIT DRIVER FORM MODAL
    -----------------------------*/
    const dat = {...datasource}
    const trp = {...jobs}

    function driverdetails(phone){
        setmobilephone(phone)

        //Total Trips
        const trips = Object.values(trp).filter(v => {
            if(v.dcontact === phone){  
                return v.dcontact
            }
            else{
                return ''
            }
        })

        const rs = Object.values(dat).map(v => {

            if(v.dcontact === phone){  
            return (
                <React.Fragment key={v._id}>

                <tr>
                <td style={{width:"30%"}}>Driver:</td>
                <td>{v.driver}</td>
                </tr>

                <tr>
                <td>Contact:</td>
                <td>{v.dcontact}</td>
                </tr>

                <tr>
                <td>License Number:</td>
                <td>{v.license}</td>
                </tr>

                <tr>
                <td>Total Trips:</td>
                <td>{trips.length}</td>
                </tr>

                </React.Fragment>
            )
        }
        else{
            return ''
        }
 
        })
        
        
        setdrvdetails(rs)
    }



    //Delete record
    function deleterec(id){
        deletedrivers(id)
    }

 

    let outputresult 
    let obs
    if(output){
        obs = output
    }
    else{
        obs = Object.values(dat)
    }
 
    let i=0
    outputresult = Object.values(obs).map((v) => {
        i++
        return (
            <Row key={v._id}   className="border p-2">
            <Col md={9} xs={12}>
            <Link to="/#" style={{color: "#000000",fontSize: "11px"}} 
            onClick={(e)=>{
                e.preventDefault()
                driverdetails(v.dcontact)
            }}>
            {i}. {v.driver}
            </Link>
            </Col>

            <Col md={3} xs={12}>
            <Link to="/#"  onClick={(e)=>{
                e.preventDefault()
                deleterec(v._id)
            }} className="cursor">
            <FaTrashAlt className="text-danger mr-3 smbtn" />
            </Link>

            <Link to="/#" onClick={(e)=>{
                e.preventDefault()
                esetmodalShow(v._id)
            }}>
            <FaRegEdit className="text-primary smbtn" />
            </Link>
            </Col>

        </Row>

        )
    })



    return (
        <>
        <Navbars />
        <br />
        <Container className="bg-white ">
            <Row>
                <Col xs={12} md={4}>
                    <div className="p-4">
                    <List DATA={outputresult} searchbx={searchdatalist} />
                    </div>
                </Col>
                <Col xs={12} md={8}>
                    <div className="pt-4 pb-4">
                    <Tabs Heading="Add Driver"   setModalShow={setmodalShow} />
                    <Details DLIST = {drvdetails} />
                    <Transactionx PHONENUM={mobilephone} />
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer />
        
        <DriverForm   onHide={setmodalhide} show ={modalshow} />

        <DriverEditForm  output={singledriver}  onHide={esetmodalhide} show ={emodalshow} />

        </>
    )
}