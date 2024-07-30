import React, { useEffect, useState } from 'react'
import { Container, Table, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import { addNewCat, deleteCats, fetchCats, reCheck } from '../redux/catsSlice';
import AddCat from './AddCat';
import ReactPaginate from 'react-paginate';

export default function Cats() {

    const dispatch = useDispatch()
    const { cats } = useSelector((state) => state.cats)
    const [isEdit, setIsEdit] = useState({ id: "", flag: false })
    const [textEdit, setTextEdit] = useState("")

    useEffect(() => {
        dispatch(fetchCats())
    }, [])

    const handle_delte = (id) => {
        dispatch(deleteCats(id))
    }
    const handle_recheck = (cat) => {
        dispatch(reCheck(cat))
    }
    const handle_add = (cat) => {
        dispatch(addNewCat(cat))
    }

    return (
        <div>
            <Container>
                {/* <Input /> */}
                <AddCat handle_add={handle_add} />
                <Table hover>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Username
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cats.map((item, index) =>
                                <tr key={index}>
                                    <th scope="row">
                                        {item.id}
                                    </th>
                                    <td >
                                        {item.status ? <Input type="checkbox" checked /> : <Input type="checkbox" />}

                                        {
                                            isEdit.id === item.id && isEdit.flag === true ? <Input type='text' value={textEdit}
                                                onChange={(e) => setTextEdit(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key == "Enter") {
                                                        // updateStudent(item.id, textEdit)
                                                        setIsEdit({ id: "", flag: false })
                                                    }
                                                }}
                                            /> : <p onDoubleClick={() => {
                                                setIsEdit({ id: item.id, flag: true })
                                                setTextEdit(item.name)
                                            }}>
                                                {item.name}
                                            </p>
                                        }
                                    </td>
                                    <td onClick={() => handle_recheck(item)}>
                                        {item.status ? "true" : "false"}
                                    </td>
                                    <td>
                                        <Button onClick={() => handle_delte(item.id)} >X</Button>
                                    </td>
                                </tr>
                            )
                        }


                    </tbody>
                </Table>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    // onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    // pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </Container>
        </div>
    )
}
