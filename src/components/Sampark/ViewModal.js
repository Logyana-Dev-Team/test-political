import React, { useState, useEffect } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

function Row({ number, message, id }) {
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  function openViewModal() {
    setViewModal(true);
  }
  function openDeleteModal() {
    setDeleteModal(true);
  }
  return (
    <>
      {/* <td>
        <tr key={props._id}>
          <th scope="row">1</th>
          <td>{props.number}</td>
          <td>{props.message}</td>
          <td>
            <FontAwesomeIcon
              icon={faEye}
              className=" hoverr-icon-view mx-1"
              onClick={() => openViewModal()}
            />

            <FontAwesomeIcon
              icon={faTrash}
              className=" hoverr-icon-delete mx-1"
              onClick={() => openDeleteModal()}
            />
          </td>
        </tr>
      </td> */}
      <div className="  mb-3">
        <div className="col-md-12 mt-2">
          <div className=" mb-3">
            <div className="card-body">
              <div className="row my-3 ">
                <div className="col-sm-4">
                  <h5 className="font-weight-bolder">नंबर</h5>
                </div>
                <div className="col-sm-8 text-black  text-value-lg">
                  {number}
                </div>
              </div>

              <div className="row my-3">
                <div className="col-sm-4">
                  <h5 className="font-weight-bolder">संदेश</h5>
                </div>
                <div className="col-sm-8 text-black  text-value-lg ">
                  {message}
                </div>
              </div>
            </div>
          </div>
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
        <CModalBody>{/* <ViewModal  /> */}</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setViewModal(!viewModal)}>
            Confirm
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setViewModal(!viewModal)}>
            रद्द करा
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default Row;
