import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
// import EditModal from "./EditModal";
import ViewModal from "./ViewModal";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const options = [
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "active", label: "Active" },
];
const fields = [
  { key: "serialnum", label: "Sr.No.", _style: { width: "10%" } },
  { key: "name", label: "Name", _style: { width: "40%" } },
  { key: "subject", label: "Subject", _style: { width: "20%" } },
  {
    key: "actions",
    label: "Actions",
    _style: { width: "2rem" },
    sorter: false,
    filter: false,
  },
  { key: "status", label: "Status", _style: { width: "20%" } },
];

function Users() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const [modalData, setModalData] = useState({});
  const [itemId, setItemId] = useState();

  const [selectedOption, setSelectedOption] = useState({});

  function openViewModal(item) {
    setModalData(item);
    setViewModal(true);
  }
  function openDeleteModal(id) {
    setItemId(id);
    setDeleteModal(true);
  }
  const onSelectOption = (selectedValue) => {
    console.log(selectedValue)
  };
  const onDelete = (id) => {
    axios
      .delete(`/users/${id}`)
      .then((res) => {console.log(res)
        toast.success("User deleted successfully !!");
        setTimeout(() => {
          window.location.reload()
          }, 2000);})
      .catch((err) => console.log(err));
  

    setDeleteModal(!deleteModal);
  };

  function openEditModal() {
    setEditModal(true);
  }

  function closeEditModal() {
    setEditModal(false);
  }
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        console.log(res.data);
        setAllUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container-fluid  bg-white shadow-lg pb-3">
        <div className="row mx-auto d-flex justify-content-start align-items-center p-3 ">
          <div
            className="col-12  "
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            युजर्स
          </div>
          <div className=' container-fluid col-10 my-4'>
          <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">नाव</th>
              <th scope="col">क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((item, idx) => {
              return (
                <tr>
                  <th scope="row">{idx + 1}</th>
                  <td>{item.name}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEye}
                      className=" hoverr-icon-view mx-2"
                      onClick={() => openViewModal(item)}
                    />

                    <FontAwesomeIcon
                      icon={faTrash}
                      className=" hoverr-icon-delete mx-2"
                      onClick={() => openDeleteModal(item._id)}
                    />
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>

          </div>
         
        </div>

      

        
        <CModal
          show={viewModal}
          onClose={() => setViewModal(!viewModal)}
          size="lg"
        >
          <CModalHeader className="p-0">
            <CModalTitle
              className=" font-weight-bold font-2xl w-100 "
              style={{ backgroundColor: "#cd5c5c", color: "white" }}
            >
              <div className="p-3">संदेश</div>
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <ViewModal
              name={modalData.name}
              email={modalData.email}
              dob={modalData.dob}
              ward={modalData.ward}
              address={modalData.address}
              mobile={modalData.mobile}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="success" onClick={() => setViewModal(!viewModal)}>
            बंद करा
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal
          show={deleteModal}
          onClose={() => setDeleteModal(!deleteModal)}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>काढून टाका</CModalTitle>
          </CModalHeader>
          <CModalBody>तुम्हाला खात्री आहे काढून टाकायचे आहे ?</CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => onDelete(itemId)}>
            काढून टाका
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => setDeleteModal(!deleteModal)}
            >
              रद्द करा 
            </CButton>
          </CModalFooter>
        </CModal>
      </div>
    </>
  );
}

export default Users;
