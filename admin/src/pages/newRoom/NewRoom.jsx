import './newRoom.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { useState } from 'react'
import { roomInputs } from '../../formSource'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])

  const { data, loading, error } = useFetch('http://localhost:8800/api/hotels')

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    // const roomNumbers = rooms
    // by default rooms are string output: "1,2,3,4,5"
    // const roomNumbers = rooms.split(',')
    // need to be an array output: (5) ['1', '2', '3', '4', '5']
    // const roomNumbers = rooms.split(',').map((room) => ({ number: room }))
    // but as the backend is object nested in array thus further need to
    // convert to array with object output: (5) [{…}, {…}, {…}, {…}, {…}] which is {number: '1'}

    const roomNumbers = rooms.split(',').map((room) => ({ number: room }))
    // console.log(roomNumbers)
    try {
      // due to the similar to previous endpoint I remove the verifyAdmin middleware
      // I couldnot pass cookies parts
      await axios.post(`http://localhost:8800/api/rooms/${hotelId}`, {
        ...info,
        roomNumbers,
      })
    } catch (err) {
      console.log(err)
    }
  }

  console.log(info)
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>Add New Room</h1>
        </div>
        <div className='bottom'>
          <div className='right'>
            <form>
              {roomInputs.map((input) => (
                <div className='formInput' key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className='formInput'>
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder='give comma between room numbers.'
                />
              </div>
              <div className='formInput'>
                <label>Choose a hotel</label>
                <select
                  id='hotelId'
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? 'loading'
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom
