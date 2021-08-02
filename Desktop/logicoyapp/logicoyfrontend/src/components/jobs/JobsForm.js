import React,{useReducer,useState} from 'react'
import {Form,Col,Row,Modal,Button} from 'react-bootstrap'
import useJobslogic from './logic/useJobslogic'
import {useSelector} from 'react-redux'

function reducer(state,action){
  return {...state, [action.name] : action.value}
}


export default function JobsForm(props){
  const [trns,setrans] = useState("")
  const cc = useSelector((state)=> state.drivers.alldrivers)
  const dta = {...cc}

  
    const [state,dispatch] = useReducer(reducer, {})
    const {addjob,err} = useJobslogic()
      function onchange(e){
        const {name,value} = e.target

        if(name === 'trucknumber'){
          const rr = Object.values(dta).filter(v => {
            return v.trucknumber === value
          })
          setrans(rr[0])
        }

        dispatch({name,value})
      }
   
 

      function addJobs(){
        
          const st = {
              fullname:  state.fullname? state.fullname : '',
              transporter:  trns.transporter?  trns.transporter : '',
              tcontact:  trns.tcontact?  trns.tcontact : '',
              bags:  state.bags?  state.bags : '',
              destination:  state.destination?  state.destination : '',
              trucknumber:  state.trucknumber?  state.trucknumber : '',
              driver:  trns.driver? trns.driver : '',
              dcontact:  trns.dcontact?  trns.dcontact : '',
              license:  trns.license?  trns.license : '',
              fuel:  state.fuel?  state.fuel : '',
              fuelstation:  state.fuelstation?  state.fuelstation : '',
              date: state.date? state.date : ''
          }

        addjob(st)
      }


      return (
        <>
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
       >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3><strong>New Job</strong></h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body   className="modalpadding">
  
      <Row>
            <Col md={6} xs={12}>
  
            <Form.Group className="mb-3">
            <Form.Label className="flabl">Client's Name</Form.Label>
            <Form.Control name="fullname" onChange = {onchange}  className="finpt" type="text" placeholder="Client's Name" />
            </Form.Group>
  
            <Form.Group className="mb-3">
            <Form.Label className="flabl">Transporter</Form.Label>
            <Form.Control  defaultValue={trns? trns.transporter : ''} disabled name="transporter" onChange = {onchange}  className="finpt" type="text" placeholder="Transporter" />
            </Form.Group>
  
            <Form.Group className="mb-3">
            <Form.Label className="flabl">Transporter's Contact</Form.Label>
            <Form.Control  name="tcontact" defaultValue={trns? trns.tcontact : ''} disabled onChange = {onchange}    className="finpt" type="text" placeholder="Transporter's Contact" />
            </Form.Group>
  
            <Form.Group className="mb-3" >
            <Form.Label className="flabl">Bags/Tonnage Loaded</Form.Label>
            <Form.Control  name="bags" onChange = {onchange}  className="finpt" type="text" placeholder="Bags/Tonnage Loaded" />
            </Form.Group>




            <Form.Group className="mb-3">
            <Form.Label className="flabl">Destination</Form.Label>
            <Form.Control  name="destination" onChange = {onchange} as="select" className="mb-3">
            <option hidden>Destination</option>
            <option value="Accra">Accra</option>
            <option value="Kumasi">Kumasi</option>
            <option value="Takoradi">Takoradi</option>
            <option value="Sunyani">Sunyani</option>
            <option value="Cape Coast">Cape Coast</option>
            <option value="Tamale">Tamale</option>
            <option value="Bolga">Bolga</option>
            <option value="Wa">Wa</option>
            <option value="Ho">Ho</option>
            </Form.Control>
            </Form.Group>




            <Form.Group className="mb-3">
            <Form.Label className="flabl">Truck Number</Form.Label>
            <Form.Control  name="trucknumber" onChange = {onchange} as="select" className="mb-3">
            <option hidden>Select a truck</option>
              {   
              Object.values(dta).map(v =>{
                return <option key={v._id} value={v.trucknumber}>{v.trucknumber}</option>
              })
              }
            </Form.Control>
            </Form.Group>
  
  

  
            </Col>
            <Col md={6} xs={12}>
  
            <Form.Group className="mb-3" >
            <Form.Label className="flabl">Driver's Name</Form.Label>
            <Form.Control  name="driver" defaultValue={trns? trns.driver : ''} disabled onChange = {onchange}  className="finpt" type="text" placeholder="Driver's Name" />
            </Form.Group>
  
            <Form.Group className="mb-3" >
            <Form.Label className="flabl">Driver's Contact</Form.Label>
            <Form.Control   name="dcontact" defaultValue={trns? trns.dcontact : ''}  disabled onChange = {onchange}  className="finpt" type="text" placeholder="Driver's Contact" />
            </Form.Group>
  
            <Form.Group className="mb-3" >
            <Form.Label className="flabl">Driver License Number</Form.Label>
            <Form.Control  defaultValue={trns? trns.license : ''} disabled name="license" onChange = {onchange}  className="finpt" type="text" placeholder="Driver License Number" />
            </Form.Group>
  
            <Form.Group className="mb-3" >
            <Form.Label className="flabl">Fuel (Optional)</Form.Label>
            <Form.Control  name="fuel" onChange = {onchange}  className="finpt" type="text" placeholder="Fuel" />
            </Form.Group>
  
            <Form.Group className="mb-3">
            <Form.Label className="flabl">Fuel Station (Optional)</Form.Label>
            <Form.Control  name="fuelstation" onChange = {onchange} as="select" className="mb-3">
            <option value="" hidden>Select Filling Station</option>
            <option value="Shell">Shell</option>
            <option value="Engene">Engene</option>
            </Form.Control>
            </Form.Group>
  
            <Form.Group className="mb-3">
            <Form.Label className="flabl">Date</Form.Label>
            <Form.Control name="date" onChange = {onchange}  
            type="date" className="finpt" placeholder="Date" 
             />
            </Form.Group>
  
            </Col>
        </Row>
  
        <h2>{err}</h2>
      
        </Modal.Body>
        <Modal.Footer>
       
          <Button onClick={props.onHide} className="btn btn-danger btn-md">Close</Button>
          <Button onClick={addJobs}  className="btn btn-success btn-md">Save </Button>
        </Modal.Footer>
  
      </Modal>
        </>
    )
}