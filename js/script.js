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



let validateForm = (function(){
    const fields = document.querySelectorAll('.form');
    
    function feildsCheck () {
        event.preventDefault();

        console.log(fields);
        fields.forEach(function(el){
            //if (this.) {}
            console.log(el.type);
        });
    } 

    return {
        initForm: function(userForm){
            userForm.addEventListener("submit", feildsCheck);
        }    
    }


})();
