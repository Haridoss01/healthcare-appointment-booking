import { Component } from 'react'
import './App.css'

const doctorsList = [
  {
    id: 1,
    name: 'Dr. Asha Menon',
    specialization: 'Cardiologist',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    availability: 'Available Today',
    schedule: [
      {date: '2025-08-05', time: '10:00 AM'},
      {date: '2025-08-05', time: '2:00 PM'},
    ],
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialization: 'Dermatologist',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    availability: 'Fully Booked',
    schedule: [],
  },
  {
    id: 3,
    name: 'Dr. Priya Sharma',
    specialization: 'Pediatrician',
    image: 'https://randomuser.me/api/portraits/women/46.jpg',
    availability: 'Available Today',
    schedule: [
      {date: '2025-08-06', time: '11:00 AM'},
      {date: '2025-08-06', time: '4:00 PM'},
    ],
  },
  {
    id: 4,
    name: 'Dr. Anil Verma',
    specialization: 'Orthopedic',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    availability: 'On Leave',
    schedule: [],
  },
  {
    id: 5,
    name: 'Dr. Kavita Iyer',
    specialization: 'Gynecologist',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
    availability: 'Available Today',
    schedule: [
      {date: '2025-08-07', time: '9:00 AM'},
      {date: '2025-08-07', time: '1:00 PM'},
    ],
  },
  {
    id: 6,
    name: 'Dr. Mohan Das',
    specialization: 'Neurologist',
    image: 'https://randomuser.me/api/portraits/men/49.jpg',
    availability: 'Available Today',
    schedule: [
      {date: '2025-08-08', time: '10:30 AM'},
      {date: '2025-08-08', time: '3:30 PM'},
    ],
  },
  {
    id: 7,
    name: 'Dr. Sneha Kapoor',
    specialization: 'Psychiatrist',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    availability: 'Fully Booked',
    schedule: [],
  },
  {
    id: 8,
    name: 'Dr. Vikram Rao',
    specialization: 'General Physician',
    image: 'https://randomuser.me/api/portraits/men/51.jpg',
    availability: 'Available Today',
    schedule: [
      {date: '2025-08-09', time: '12:00 PM'},
      {date: '2025-08-09', time: '5:00 PM'},
    ],
  },
  {
    id: 9,
    name: 'Dr. Neha Gupta',
    specialization: 'ENT Specialist',
    image: 'https://randomuser.me/api/portraits/women/52.jpg',
    availability: 'Available Today',
    schedule: [
      {date: '2025-08-10', time: '10:00 AM'},
      {date: '2025-08-10', time: '3:00 PM'},
    ],
  },
  {
    id: 10,
    name: 'Dr. Arvind Singh',
    specialization: 'Ophthalmologist',
    image: 'https://randomuser.me/api/portraits/men/53.jpg',
    availability: 'On Leave',
    schedule: [],
  },
]

class App extends Component{
  state={doctors:doctorsList,searchInput:'',selectedDoctor:null,showForm:false,appointment:false,
    userDetails:{},name:'',email:'',dateTime:''}

  onFilterSearch=event=>{
    this.setState({searchInput:event.target.value})
  }

  onSelectedDoctor=doctor=>{
    this.setState({selectedDoctor:doctor})
  }

  getDoctors=()=>{
    const {doctors,searchInput} = this.state
    const filtteredData = doctors.filter(each=>each.name.toLowerCase().includes(searchInput) || each.specialization.toLowerCase().includes(searchInput))
    
    return (
      <>
      <input type="search" placeholder='Search' value={searchInput} onChange={this.onFilterSearch} className='search-input'/>
      <div className='doctors-container'>
        {filtteredData.map(eachDoctors=>{
              let classNameAvailablity = ''
              if (eachDoctors.availability === 'Available Today'){
                classNameAvailablity = 'available'
              }else if (eachDoctors.availability === 'Fully Booked'){
                classNameAvailablity = 'full'
              }else{
                classNameAvailablity = 'leave'
              }
       return (<div onClick={()=>this.onSelectedDoctor(eachDoctors)} className='doctor-card'>
          <img src={eachDoctors.image} alt={eachDoctors.name} className='doctor-thumbnail'/>
          <h1 className='doctor-name'>{eachDoctors.name}</h1>
          <p className='doctor-specialization'>{eachDoctors.specialization}</p>
          <p className={`doctor-availability ${classNameAvailablity}`}>{eachDoctors.availability}</p>
        </div>)})}
      </div></>
    )
  }

  ongetName=event=>{
    this.setState({name:event.target.value})
  }

  ongetEmail=event=>{
    this.setState({email:event.target.value})
  }

  ongetDt=event=>{
    this.setState({dateTime:event.target.value})
  }

  submitForm=event=>{
    event.preventDefault()
    const {name,email,dateTime} = this.state
    this.setState({userDetails:{name,email,dateTime}})
  }

  renderedDoctorDetails=()=>{
    const {selectedDoctor,showForm,appointment} = this.state
    return (
      <div className='doctor-details-container'>
        <div>
        <div className='imag-personal-dat'>
          <img src={selectedDoctor.image} alt={selectedDoctor.name}/>
          <div className='key-data'>
            <h1>{selectedDoctor.name}</h1>
            <p>{selectedDoctor.specialization}</p>
            <p>{selectedDoctor.availability}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1>Available Slots:</h1>
          {selectedDoctor.schedule.length===0 ? (<p>No Slots Available</p>):(<ul>
            {
              selectedDoctor.schedule.map(each=>(
                <p>{each.date} : {each.time}</p>
              ))
            }
          </ul>)}
          {selectedDoctor.schedule.length===0 ? null : <button type="button" onClick={()=>this.setState({showForm:true})}>Secure Slots</button>}
        </div>
        <button type="button" onClick={()=>this.setState({selectedDoctor:null})}>Go Back</button>
        </div>
        {showForm && <div>{appointment ? (<p className='appointment-text'>Appointment Confirmed</p>) :
              (<form onSubmit={this.submitForm} className='form-container'>
                <div className='form-card'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={this.ongetName}/>
                </div>
                <div className='form-card'> <label htmlFor="email">Email</label>
                      <input type="text" id="email" onChange={this.ongetEmail}/>
                </div>
                <div className='form-card'>   <label htmlFor="dt">Date-Time</label>
                        <input type="datetime-local" id="dt" onChange={this.ongetDt}/>
                </div>
                <button type="submit" onClick={()=>this.setState({appointment:true})}>Confirm</button>
              </form>)}
        </div>}
      </div>
    )
  }

  render(){
    const {selectedDoctor}= this.state
    return (
      <div className='bg-container'>
      <h1 className='heading'>Healthcare Appointment Booking</h1>
      <hr />
      {selectedDoctor ? this.renderedDoctorDetails() : this.getDoctors()}
      </div>
    )
  }

}

export default App