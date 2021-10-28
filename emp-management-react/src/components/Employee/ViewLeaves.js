import React, { useEffect, useState } from 'react'
import { HTTP } from '../../config/axios'
import moment from 'moment';
function ViewLeaves(props) {
  const [leaveDetails, setLeaveDetails] = useState()
  useEffect(() => {
    HTTP.get(`/users/view-leave/${props.location.props._id}`).then((data) => {
      console.log(data.data);
      setLeaveDetails(data.data)
      console.log(leaveDetails);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Sl.no</th>
            <th scope="col">Applied Date</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Reason</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveDetails && leaveDetails.map((data, key) => {
            return (
              <tr>
                <th scope="row">{key + 1}</th>
                <td>{moment(data.applied_date).format("YYYY-MM-DD HH:mm")}</td>
                <td>{moment(data.from_leave_date).format("YYYY-MM-DD")}</td>
                <td>{moment(data.to_leave_date).format("YYYY-MM-DD")}</td>
                <td>{data.reason}</td>
                <td>{data.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ViewLeaves
