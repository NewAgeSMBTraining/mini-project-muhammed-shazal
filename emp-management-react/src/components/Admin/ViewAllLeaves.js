import React, { useEffect, useState } from 'react'
import { HTTP } from '../../config/axios'
import { MDBDataTable } from 'mdbreact';
import { useHistory } from 'react-router';
import moment from 'moment';
function ViewAllLeaves() {
    const history = useHistory()
    const [leaveDetails, setLeaveDetails] = useState()
    const [reload, setReload] = useState(false)
    useEffect(() => {
        HTTP.get('/view-all-leaves').then((data) => {
            setLeaveDetails(data.data)
        })
    }, [reload])
    const approveLeave = (id) => {
        HTTP.post(`/approve-leave/${id}`).then((data) => {
            setReload(!reload)
        })
    }
    const rejectLeave = (id) => {
        HTTP.post(`/reject-leave/${id}`).then((data) => {
            setReload(!reload)
        })
    }
    const setDatas = () => {
        const data = {
            columns: [
                {
                    label: 'Applied_date',
                    field: 'applied_date',
                    sort: 'asc'
                }, {
                    label: 'By',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'From_leave_date',
                    field: 'from_leave_date',
                    sort: 'asc'
                },
                {
                    label: 'To_leave_date',
                    field: 'to_leave_date',
                    sort: 'asc'
                },
                {
                    label: 'Reason',
                    field: 'reason',
                }, {
                    label: 'Status',
                    field: 'status',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }
        leaveDetails && leaveDetails.forEach((leaves, index) => {
            data.rows.push({
                applied_date: moment(leaves.applied_date).format("YYYY-MM-DD HH:mm"),
                email: leaves.email,
                from_leave_date: moment(leaves.from_leave_date).format("YYYY-MM-DD"),
                to_leave_date: moment(leaves.to_leave_date).format("YYYY-MM-DD"),
                reason: leaves.reason,
                status: leaves.status,
                actions:
                    <>
                        {leaves.status == 'Pending' &&
                            <>
                                <button className="btn btn-primary" onClick={() => { approveLeave(leaves._id) }}>Approve</button>
                                <button className="btn btn-danger" onClick={() => { rejectLeave(leaves._id) }}>Reject</button>
                            </>
                        }
                    </>
            })
        })
        return data;
    }

    return (
        <div>
            <h1 className="text-center mt-1">All Leaves</h1>
            <MDBDataTable
                data={setDatas()}
                className="px-3 "
                bordered
                striped
                hover
                info={false}
                paging={false}
            />
        </div>
    )
}
export default ViewAllLeaves
