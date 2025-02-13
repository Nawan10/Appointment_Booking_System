function Validation(values){
    let error = {}
    const phone_pattern = /^0?7(0|1|2|3|4|5|6|7|8|9)\d{7}$/;

    // phone number validation
    if(!values.phone){
        error.phone = 'Mobile Number Should Not Be Empty';
    }
    else if(!phone_pattern.test(values.phone)){
        error.phone = 'Mobile Number Did Not Match';
    }

    return error;  //Return the error object
}

export default Validation;
