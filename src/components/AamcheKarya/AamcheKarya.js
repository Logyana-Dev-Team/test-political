import React, { useState, useEffect, lazy } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import {
  CCardBody,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
  CCol,
} from "@coreui/react";
import KaryaListCard from "./KaryaListCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import ViewModal from "./ViewModal";
// import EditModal from "./EditModal";
import axios from "axios";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

// const fields = ["name", "registered", "role", "status"];

const Karya = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allKaryas, setAllKaryas] = useState([]);

  const onSubmit = (data, event) => {
    event.preventDefault();
    const inpFile = document.getElementById("inpFile");
    let formData = new FormData();

    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("link", data.link);

    for (const file of inpFile.files) {
      formData.append("images", file);
    }
    // e.preventDefault();
    console.log(data); // sent object
    axios
      .post("/karya", formData)
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        reset({});
        closeModal();
        toast.success("Karya added successfully !!");
        setTimeout(() => {
          window.location.reload()
          }, 2000);
      })
      .catch((error) => {
        console.log(error);
        // reset({});
        closeModal();
        toast.danger("Failed !!");
        // setTimeout(() => {
        //   window.location.reload()
        //   }, 2000);
      });
    // setTimeout(() => {
    //   window.location.reload()
    //   }, 2000);
  };

  useEffect(() => {
    axios
      .get("/karya")
      .then((res) => {
        console.log(res.data);
        setAllKaryas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [state, setState] = useState(false);

  function openModal() {
    setState(true);
  }

  function closeModal() {
    setState(false);
  }

  return (
    <>
      <div className="container-fluid  bg-white shadow-lg pb-3">
        <div className="row mx-auto d-flex justify-content-center align-items-center p-3">
          <div
            className="col-lg-9 col-md-8 col-sm-8"
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            आमचे कार्य
          </div>
          <div className="col-lg-3 col-md-4  col-sm-4 d-flex justify-content-end">
            <button
              className="btn btn-behance font-weight-bold"
              onClick={openModal}
              style={{ fontSize: "1rem" }}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
              नवीन कार्य
            </button>
          </div>
        </div>
        {/* Modal start */}
        <CModal show={state} onClose={() => setState(!state)} size="lg">
          <CModalHeader closeButton>
            <CModalTitle className=" font-weight-bold">नवीन कार्य</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <form
              style={{ width: "90%", display: "block", alignItems: "center" }}
              className="mx-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group" style={{ margin: "10px" }}>
                <label
                  for="title"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingVertical: "10px",
                  }}
                >
                  कार्य शीर्षक
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  ref={register}
                  placeholder="Write here"
                />
              </div>

              <div className="form-group" style={{ margin: "10px" }}>
                <label
                  for="desc"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingVertical: "10px",
                  }}
                >
                  कार्यची माहिती
                </label>
                <textarea
                  className="form-control"
                  id="desc"
                  name="desc"
                  ref={register}
                  placeholder="Write here..."
                  rows="5"
                ></textarea>
              </div>
              <div className="form-group" style={{ margin: "10px" }}>
                <label
                  for="link"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingVertical: "10px",
                  }}
                >
                  लिंक
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  name="link"
                  ref={register}
                  placeholder="Write here"
                />
              </div>
              <div className="form-group my-4" style={{ margin: "10px" }}>
                <label
                  for="impFile"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    paddingVertical: "15px",
                    marginRight: "2rem",
                  }}
                >
                  चित्र निवडा
                </label>
                <input
                  type="file"
                  id="inpFile"
                  name="inpFile"
                  placeholder="Choose Image"
                  multiple
                  ref={register}
                />
                <p>
                  (Total file size should be less than 400KB and in .jpg,.jpeg
                  format)
                </p>
              </div>
              <div className="d-flex justify-content-end  my-4 ">
                <button
                  className="btn btn-success mx-2"
                  type="submit"
                  onClick={() => {
                    setLoading(true);
                  }}
                >
                 { loading ? (
                  <div className="spinner-border fast" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                  ) : <>कार्य टाका</>}
                </button>
                <button
                  className="btn btn-danger mx-2"
                  type="button"
                  onClick={() => setState(!state)}
                >
                  {" "}
                  रद्द करा{" "}
                </button>
              </div>
            </form>
          </CModalBody>
        </CModal>

        <CRow>
          <CCol xs="12" lg="12">
            <div style={{ width: "100%", height: "100%" }}>
              {/* <CCardHeader>
                Simple Table
                <DocsLink name="CModal"/>  To add any related link
              </CCardHeader> */}
              <CCardBody style={{ width: "100%", height: "100%" }}>
                {allKaryas.map((item) => {
                  return (
                    <div key={item._id}>
                      <KaryaListCard
                        id={item._id}
                        title={item.title}
                        desc={item.desc}
                        link={item.link}
                        preloaded={item}
                        images={item.images}
                      />
                    </div>
                  );
                })}

                {/* <CDataTable
                items={KaryaData}
                fields={fields}
                itemsPerPage={5}
                pagination
                //   scopedSlots = {{
                //     'status':
                //       (item)=>(
                //         <td>
                //           <CBadge color={getBadge(item.status)}>
                //             {item.status}
                //           </CBadge>
                //         </td>
                //       )

                //   }}
              /> */}
              </CCardBody>
            </div>
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default Karya;
