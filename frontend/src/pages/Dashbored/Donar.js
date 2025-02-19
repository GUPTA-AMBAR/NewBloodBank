import React, { useState, useEffect } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API'
import moment from "moment";

const Donar = () => {
    const [data, setData] = useState([]);
    const getDonars = async () => {
        try {
            const { data } = await API.get("/inventory/get-donars");
            // console.log(data);
            if (data?.success) {
                setData(data?.donars);
            }

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getDonars()
    }, [])

    return (
        <Layout>
            <div className="container mx-auto p-4 w-full max-height max-width overflow: scroll" style={{ overflowX: "auto" }}>
                <div className="w-full rounded-lg shadow-lg">
                    <div className="overflow-x-auto max-w-full md:overflow-visible">  {/* Enable horizontal scrolling only on small screens */}
                        <table className="w-full border-collapse border border-gray-300 min-w-[600px]" style={{ width: "100%" }}>
                            <thead className='bg-info px-7'>
                                <tr className="bg-gray-900 w-full">
                                    <th className="border border-gray-300 px-4 py-2">Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Phone</th>
                                    <th className="border border-gray-300 px-4 py-2">Time & Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((record) => (
                                    <tr key={record._id} className="border border-gray-800">
                                        <td className="border border-gray-300 px-4 py-2">{record?.name || record?.organisationName +"(ORG)"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{record?.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{record?.phone}</td>
                                        <td className="border border-gray-300 px-4 py-2">{moment(record?.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Donar;