import React from 'react'

function EditModal() {
    return (
        <>
            <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-danger">Edit Profile</h6>
                            </div>
                            <div class="col-md-12 mt-2">
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <form>
                                            <div class="row">
                                                <div class="align-items-center text-center col-md-4 col-sm-12 mb-4">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="User Photo" class="rounded-circle" width="100"/>
                                                    <i class="fas fa-user-edit"></i>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <label class="font-weight-bolder" for="inputNAme">Name</label>
                                                </div>
                                                <div class="col-sm-10 col-md-8 text-secondary">
                                                    <input type="name" class="form-control" id="inputName" placeholder="Name"/>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <label class="font-weight-bolder" for="inputEmail4">Business Name</label>
                                                </div>
                                                <div class="col-sm-10 col-md-8 text-secondary">
                                                    <input type="name" class="form-control" id="inputEmail4" placeholder="Loyana Solution Pvt Ltd"/>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <label class="font-weight-bolder" for="inputEmail4">Email</label>
                                                </div>
                                                <div class="col-sm-10 col-md-8 text-secondary">
                                                    <input type="name" class="form-control" id="inputEmail4" placeholder="abc@gmail.com"/>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <label class="font-weight-bolder" for="inputNumber">Mobile No.</label>
                                                </div>
                                                <div class="col-sm-10 col-md-8 text-secondary">
                                                    <input type="number" class="form-control" id="inputNumber" placeholder="Valid 10 Digit Number"/>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-sm-2">
                                                    <label class="font-weight-bolder" for="inputText">Address</label>
                                                </div>
                                                <div class="col-sm-10 col-md-8 text-secondary">
                                                    <input type="name" class="form-control" id="inputText" placeholder="Loyana Solution, Pimpri, Pune"/>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-danger my-4 d-block mx-auto">Edit Profile</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}

export default EditModal
