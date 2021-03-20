import React, { useState, useEffect, lazy } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
// import {
//   CCardBody,
//   CModal,
//   CModalBody,
//   CModalHeader,
//   CModalTitle,
//   CRow,
//   CCol,
// } from "@coreui/react";
// import SuchanaListCard from "./SuchanaListCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import ViewModal from "./ViewModal";
// import EditModal from "./EditModal";
import axios from "axios";
import { toast } from "react-toastify";
import { icons } from "src/assets/icons";
import { authAxiosAdmin } from "src/App";

Modal.setAppElement("#root");
const Suchana = () => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [allVideos, setAllVideos] = useState([]);

  //   const onSubmit = (data) => {
  //     // e.preventDefault();
  //     console.log(data); // sent object
  //     axios
  //       .post("/suchana", {
  //         title: data.title,
  //         desc: data.desc,
  //         link: data.link,
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         reset({});
  //         closeModal();
  //         toast.success("Suchana added successfully !!");
  //         setTimeout(() => {
  //           window.location.reload();
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  const deleteImage = (imageId) => {
    // console.log(imageId);
    axios
      .delete(`/images/${imageId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    toast.error("Image Deleted !!");

    // setDeleteModal(!deleteModal);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };
  const deleteNews = (newsId) => {
    // console.log(newsId);
    axios
      .delete(`/news/${newsId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    toast.error("news Deleted !!");

    // setDeleteModal(!deleteModal);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };
  const deleteVideo = (vidId) => {
    // console.log(imageId);
    axios
      .delete(`/videos/${vidId}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    toast.error("Video Deleted !!");

    // setDeleteModal(!deleteModal);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
  };

  const addImage = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "logyanasolutions");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/logyana/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const file = await res.json();
    // console.log(file);
    let obj = {
      fileURL: file.secure_url,
    };
    // for (var value of formdata.entries()) {
    //   console.log(value);
    // }
    // console.log(id);
    axios
      .post(`/images`, obj)
      .then((res) => {
        // console.log(res);
        setLoading(false);
        toast.success("Image added !!");
      })
      .catch((err) => console.log(err));
    setDeleteModal(!deleteModal);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const addNews = async (e) => {
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "logyanasolutions");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/logyana/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const file = await res.json();
    // console.log(file);
    let obj = {
      fileURL: file.secure_url,
    };
    // for (var value of formdata.entries()) {
    //   console.log(value);
    // }
    // console.log(id);
    axios
      .post(`/news`, obj)
      .then((res) => {
        // console.log(res);
        setLoading1(false);
        toast.success("News added !!");
      })
      .catch((err) => console.log(err));

    setDeleteModal(!deleteModal);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  const addVideo = () => {
    const inputFile = document.getElementById("videos");
    // let formData = new FormData();
    // formData.append("link", inputFile.value);
    // for (var value of formData.entries()) {
    //   console.log(value);
    // }
    // console.log(id);
    axios
      .post(`/videos`, {
        link: inputFile.value,
      })
      .then((res) => {
        setLoading2(false);
        console.log(res);
        toast.success("Video added !!");
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  useEffect(() => {
    axios
      .get("/images")
      .then((res) => {
        console.log(res.data);
        setAllImages(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("/news")
      .then((res) => {
        console.log(res.data);
        setAllNews(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("/videos")
      .then((res) => {
        console.log(res.data);
        setAllVideos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <>
      <div className="container-fluid  bg-white shadow-lg pb-3">
        <div className="row mx-auto d-flex justify-content-center align-items-center p-3">
          <div
            className="col-lg-12 col-md-10 col-sm-10"
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            गॅलरी
          </div>
        </div>

        {/* Photos section */}
        <div className="row m-4">
          <div className="col-sm-4 my-3 ">
            <h3 className="font-weight-bolder">चित्रे</h3>
          </div>
          <div className="col-sm-8 text-black ">
            <input
              type="file"
              className="mt-3"
              id="image"
              name="image"
              onChange={(e) => addImage(e)}
            />
            {/* <button
              className="btn btn-success mx-2"
              type="submit"
              onClick={() => {}}
            ></button> */}
            {/* <button
              className="btn btn-behance m-2"
              type="button"
              onClick={() => {
                setLoading(true);
                addImage();
              }}
            >
              {loading ? (
                <div className="spinner-border fast" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  {" "}
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
                  नवीन चित्र
                </>
              )}
            </button> */}
          </div>

          {allImages.map((item) => {
            let id = item._id;
            return (
              <>
                <div className=" d-inline-flex mx-4">
                  <div>
                    <div className="row justify-content-between my-2 mx-1 border px-4">
                      <div
                        style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}
                      >
                        {item.createdAt.split("T")[0]}
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-danger m-2"
                          type="button"
                          onClick={() => {
                            //   delete image route
                            deleteImage(id);
                          }}
                        >
                          <img
                            src={icons.close}
                            alt="sourceImage"
                            style={{ width: "15px", height: "15px" }}
                          />
                        </button>
                      </div>
                    </div>
                    <div>
                      <img
                        src={item.filename}
                        alt={item.filename}
                        style={{
                          width: "250px",
                          height: "150px",
                          marginRight: "2px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* News section */}

        <div className="row m-4">
          <div className="col-sm-4 my-3 ">
            <h3 className="font-weight-bolder">बातम्या</h3>
          </div>
          <div className="col-sm-8 text-black ">
            <input type="file" className="mt-3" id="news" name="news"  onChange={(e) => addNews(e)}/>

            {/* <button
              className="btn btn-behance m-2"
              type="button"
              onClick={() => {
                setLoading1(true);
                addNews();
              }}
            >
              {loading1 ? (
                <div className="spinner-border fast" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  {" "}
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
                  नवीन बातमी
                </>
              )}
            </button> */}
            {/* <button
              className="btn btn-behance m-2"
              type="button"
              onClick={() => {
                addNews();
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
              नवीन बातमी
            </button> */}
          </div>

          {allNews.map((item) => {
            let id = item._id;
            return (
              <>
                <div className=" d-inline-flex mx-4">
                  <div>
                    <div className="row justify-content-between my-2 mx-1 border px-4">
                      <div
                        style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}
                      >
                        {item.createdAt.split("T")[0]}
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-danger m-2"
                          type="button"
                          onClick={() => {
                            //   delete image route
                            deleteNews(id);
                          }}
                        >
                          <img
                            src={icons.close}
                            alt="sourceImage"
                            style={{ width: "15px", height: "15px" }}
                          />
                        </button>
                      </div>
                    </div>
                    <div>
                      <img
                        src={item.filename}
                        alt={item.filename}
                        style={{
                          width: "250px",
                          height: "150px",
                          marginRight: "2px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        {/* Video section */}
        <div className="col m-3 ">
          <div className="col-sm-4 my-3 ">
            <h3 className="font-weight-bolder">व्हिडिओ</h3>
          </div>
          <div className="col-sm-8 text-black ">
            <input
              type="text"
              className="form-control"
              id="videos"
              name="videos"
            />
            <button
              className="btn btn-behance m-2"
              type="button"
              onClick={() => {
                setLoading2(true);
                addVideo();
              }}
            >
              {loading2 ? (
                <div className="spinner-border fast" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  {" "}
                  <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
                  नवीन व्हिडिओ
                </>
              )}
            </button>
            {/* <button
              className="btn btn-behance m-2"
              type="button"
              onClick={() => {
                addVideo();
              }}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
              नवीन Video
            </button> */}
          </div>
        </div>
        <div className=" justify-content-between align-items-center m-5 ">
          {allVideos.map((item) => {
            let id = item._id;
            return (
              <>
                <div className="border my-2">
                  <div className="">
                    <div
                      style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}
                    >
                      {item.link}
                    </div>
                    <div className=" container-fluid row">
                      <div
                        style={{ margin: 10, fontSize: 18, fontWeight: "bold" }}
                      >
                        Uploaded : {item.createdAt.split("T")[0]}
                      </div>
                      <div className="m-2">
                        <button
                          className="btn btn-sm btn-danger"
                          type="button"
                          onClick={() => {
                            //   delete image route
                            deleteVideo(id);
                          }}
                        >
                          <img
                            src={icons.close}
                            alt="sourceImage"
                            style={{ width: "10px", height: "10px" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Suchana;
