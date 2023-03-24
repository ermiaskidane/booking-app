import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { userColumns, userRows } from '../../datatablesource'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import useFetch from '../../hooks/useFetch'

const Datatable = ({ columns }) => {
  // const [data, setData] = useState(userRows)
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const [list, setList] = useState([])
  // this is working only because I remove verifyAdmin middleawre on this endPoint
  // I need to work with the cookies-parser
  const { data, loading, error } = useFetch(`http://localhost:8800/api/${path}`)
  // console.log(data)
  useEffect(() => {
    console.log(data)
    setList(data)
  }, [data])

  const handleDelete = async (id) => {
    // setData(data.filter((item) => item.id !== id))
    console.log(id)
    try {
      // similar to above endpoint cookies couldnot pass me
      // had to remove the verifyUser from my endpoint of this route
      await axios.delete(`http://localhost:8800/api/${path}/${id}`)
      setList(list.filter((item) => item._id !== id))
    } catch (err) {}
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link to='/users/test' style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]
  return (
    <>
      {console.log('hellow')}
      <div className='datatable'>
        <div className='datatableTitle'>
          {path}
          <Link to={`/${path}/new`} className='link'>
            Add New
          </Link>
        </div>
        <DataGrid
          className='datagrid'
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </>
  )
}

export default Datatable
