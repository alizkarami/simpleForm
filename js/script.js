// show / hide function
function toggleShowByClass(className, displayState){
    const elements = document.getElementsByClassName(className);

    for (var i = 0; i < elements.length; i++){
        elements[i].style.display = displayState;
    }
}

function displaySection(id){
    const element = document.getElementById(id);
    element.style.display = 'block';
}

// click handler
document.addEventListener('click', function(e) {
    e = e || window.event;
    //target that has been clicked
    const target = e.target || e.srcElement;

    //get class name
    let this_class = target.className;


    // toggle show and hide each section
    if (this_class === 'form degree-program') {
    	const clicke_id = target.id;
    	toggleShowByClass('program-desc', 'none');
    	if (clicke_id === 'g') {
    		displaySection('grad');
    	} else if (clicke_id === 'ug') {
			displaySection('u-grad');
    	} else {
			displaySection('non-degree');
    	}
    }
    
}, false);

/**
 * all fields and save to to an array
 */

const fields = document.querySelectorAll('.form');

/**
 * Main part for check fields are here
 * @param fields
 * @returns {Array}
 */

function checkFields (fields) {
    // empty array to collect errors
    let error_array = [];

    // added boolean to make sure only one is pushed for radio
    let added = true;

    //loop through fields
    fields.forEach(function(el){
        // in case of el.type text or textarea
        if (el.type === 'text' || el.type === 'textarea') {
            if (el.value === '') {
                error_array.push(
                    {
                    message: '<span class="error" field-error="'+el.name+'"><b>'+el.placeholder+'</b> field is required.</span>',
                    field: el
                    }
                );
            }
            // checks email
            if (el.name === 'email') {
                //validateEmail regex is a function to check email format
                if (!validateEmail(el.value)) {
                    error_array.push(
                        {
                            message: '<span class="error" field-error="'+el.name+'"><b>'+el.placeholder+'</b> is not valid format.</span>',
                            field: el
                        }
                    );

                }
            }
            if (el.name === 'stn') {
                //validateStudentNumber function regex is a function to check student number 6-8 digit validation format
                if (!validateStudentNumber(el.value)) {
                    error_array.push(
                        {
                            message: '<span class="error" field-error="'+el.name+'"><b>'+el.placeholder+'</b> is not valid format, it should be numbers and <b>6 to 8</b> digits.</span>',
                            field: el
                        }
                    );

                }
            }
        }
        // select status in Canada
        if (el.type === 'select-one') {
            const checked = document.getElementById('status_in_canada').selectedIndex;
            if (!checked) {
                 error_array.push(
                    {
                        message: '<span class="error" field-error="'+el.name+'"><b>Status in Canada</b> is not selected.</span>',
                        field: el
                    }
                 );
            }
        }
        // radio button check
        if (el.type === 'radio') {
            let checked = false;
            if(document.getElementById('ug').checked) {
                checked = true;
            }else if (document.getElementById('g').checked) {
                checked = true;
            } else if (document.getElementById('nd').checked) {
                checked = true;
            }

            if (!checked && added === true) {
                added = false;
                error_array.push(
                    {
                        message: '<span class="error" field-error="degree"><b>Major</b> is required.</span>',
                        field: el
                    }
                );
            }

        }
    });

    return error_array;
}

/**
 * Display errors
 */

function displayError() {
    document.getElementById('errors').innerHTML = htmlError();
}

/**
 * Generate html errors
 * @returns {string}
 */

function htmlError() {
    let html = '';
    let error_array = checkFields(fields);
    if (error_array.length > 0) {
        error_array.map(function (item) {
            html += item.message;
            displayErrorStyle(item.field.name)
        });
    }
    return html;
}

/**
 *  display error by style, border red if validation is false
 * @param name
 * @returns {string}
 */
function displayErrorStyle(name) {
    return document.getElementsByName(name)[0].style.borderColor = 'red';

}

/**
 * Email validation format by regex
 * @param email
 * @returns {boolean}
 */

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email));
}

/**
 * Validate student number format
 * @param student_number
 * @returns {boolean}
 */
function validateStudentNumber(student_number) {
    const re = /^\d{6,8}$/;
    return re.test(student_number);
}

/**
 * Hide if error has been resolved
 * @param item
 */
function hideErrorStyle(item) {
    document.getElementsByName(item.name)[0].style.borderColor = '#ccc';
    checkFields(fields);
    displayError();
}


/**
 * Validation variable to check all fields
 */

let validateForm = (function(){
    function fieldsCheck () {
        event.preventDefault();
        checkFields(fields);
        displayError();
    }


    return {
        initForm: function(profile){
            profile.addEventListener("submit", fieldsCheck);
        }    
    }


})();
