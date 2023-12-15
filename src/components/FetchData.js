import React, {useEffect, useState} from 'react'
import axios from '../api/axios';
const USERS_URL = '/booking-api/v1/records/user';

function FetchData({accessToken}) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(USERS_URL,
        {
                headers: {
                   Authorization: 'Bearer' + accessToken,
                  "content-type": "application/json",
                  'Accept': 'application/json',
                }
        }
        ).then(res => {
      setData(res.data.info)
      console.log(res.data)
  }).catch(err => console.log(err));
  }, []);

  return (
      <div className='container'>
        <div className='mt-3'>
          <h3>Users Data</h3>
          <table className='table' id='user-info'>
            <thead>
              <tr>
                <th className='center'>ID</th>
                <th className='center'>Name</th>
                <th className='center'>Address</th>
                <th className='center'>Birthday</th>
              </tr>
            </thead>
            <tbody>
            {
              data.map((user, index) => {
                return <tr key={index}>
                  <td className='center'>{user.id}</td>
                  <td className='center'>{user.firstName + " " + user["lastName"]}</td>
                  <td className='center'>{user.address}</td>
                  <td className='center'>{user["birthday"]}</td>
                </tr>
              })
            }
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default FetchData