import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { toast } from "react-toastify";
import check from "../../assets/icons/check.png";

function Images() {
  // const { handleSubmit, register } = useForm({
  //   defaultValues: preloadedValues,
  // });
  const { handleSubmit, register } = useForm({});
  const [profile, setProfile] = useState({});
  const [banner, setBanner] = useState({});
  const [loading, setLoading] = useState(true);

  const addProfileImage = (data) => {
    const profile = document.getElementById("profile");
    let formDataProfile = new FormData();
    formDataProfile.append("images", profile.files[0]);


    for (var value of formDataProfile.entries()) {
      console.log(value);
    }

   
    axios
      .post(
        `/profile/600a8c34167e7304ec16dc24`,
        formDataProfile
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    toast.success("Images changed  successfully !!");
    // setTimeout(() => {
    //   // window.location.reload();
    // }, 2000);
  };
  
  const addBannerImage = (data) => {
    const banner = document.getElementById("banner");
    let formDataBanner = new FormData();
    formDataBanner.append("images", banner.files[0]);

    // console.log(data.file);
    // console.log(banner.file);

    for (var value2 of formDataBanner.entries()) {
      console.log(value2);
    }
    axios
      .post(
        `/banner/600a8dc2167e7304ec16dc26`,
        formDataBanner
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
    toast.success("Images changed  successfully !!");
    // setTimeout(() => {
    //   // window.location.reload();
    // }, 2000);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/profile")
      .then((res) => {
        console.log(res.data[0]);
        setProfile(res.data[0]);
      })
      .catch((err) => console.log(err));
    axios
      .get("/banner")
      .then((res) => {
        console.log(res.data[0]);
        setBanner(res.data[0]);
      })
      .catch((err) => console.log(err));

    setLoading(false);
  }, []);
  return (
    <>
      {loading ? null : (
        <>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection:'column',
              alignItems: "flex-start",
              justifyContent: "center",
            }}
            className="mx-auto my-auto"
            onSubmit={handleSubmit(addProfileImage)}
          >
            <div className="form-group m-sm-4 " style={{ margin: "10px" }}>
              <label
                for="title"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  paddingVertical: "15px",
                  marginRight: "2rem",
                }}
              >
                परिचय चित्र निवडा(400px x 400px )
              </label>
              <label></label>
              <img
                style={{ width: "30%", height: "20%"}}
                src={`data:${profile.contentType};base64,${profile.imageBase64}`}
                alt="imagg"
              />

              <input
                type="file"
                id="profile"
                name="profile"
                placeholder="Choose Image"
                ref={register}
              />
                <button
                type="submit"
                className="btn btn-behance font-weight-bold "
                style={{ fontSize: "1rem" }}
              >
                चित्र जतन करा
                <img
                  src={check}
                  width="15px"
                  height="15px"
                  className="ml-2"
                  alt="alt"
                />
              </button>
            </div>
            </form>

        {/* Banner image */}

            <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection:'column',
              alignItems: "flex-start",
              justifyContent: "center",
            }}
            className="mx-auto my-auto"
            onSubmit={handleSubmit(addBannerImage)}
          >
            <div className=" m-sm-4 col-sm-10 " style={{ margin: "10px" }}>
              <label
                for="title"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  paddingVertical: "15px",
                  marginRight: "2rem",
                }}
              >
                बॅनर निवडा (700px x 1200px)
              </label>
              <img
                style={{ width: "50%", height: '20%',}}
                src={`data:${banner.contentType};base64,${banner.imageBase64}`}
                alt="imagg"
                className='col-sm-8'
              />

              <input
                type="file"
                id="banner"
                name="banner"
                placeholder="Choose Image"
                ref={register}
              />
                <button
                type="submit"
                className="btn btn-behance font-weight-bold "
                style={{ fontSize: "1rem" }}
              >
                चित्र जतन करा
                <img
                  src={check}
                  width="15px"
                  height="15px"
                  className="ml-2"
                  alt="alt"
                />
              </button>
            </div>
            </form>
            {/* <div className="col-12  d-flex justify-content-end my-4"> */}
              {/* <button
                type="submit"
                className="btn btn-behance font-weight-bold "
                style={{ fontSize: "1rem" }}
              >
                चित्र जतन करा
                <img
                  src={check}
                  width="15px"
                  height="15px"
                  className="ml-2"
                  alt="alt"
                />
              </button> */}
            {/* </div> */}
         
        </>
      )}
    </>
  );
}

export default Images;
