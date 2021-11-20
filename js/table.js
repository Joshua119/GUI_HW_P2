/*    HW Assignment 4
        File: table.js
        Joshua Sullivan, Joshua_Sullivan1@student.uml.edu
        11/15/2021   
        This javascript file builds the multiplication table for the file index.html and validates the users input
*/

$().ready(function() {

    //Checks that the ending column value is larger than the starting column value
    $.validator.addMethod('h_larger', function(value) {
        var first = parseInt($('#f_hnum').val())
        var last = parseInt($('#l_hnum').val())

        if(!last)               //If second value has not been entered yet
            return true;

            return last > first;
    });

    //Checks that the ending row value is larger than the starting row value
    $.validator.addMethod('v_larger', function(value) {
        var first = parseInt($('#f_vnum').val())
        var last = parseInt($('#l_vnum').val())

        if(!last)               //If second value has not been entered yet
            return true;

        return last > first;
    });

    //Checks that the input is valid
    $('#full_form').validate({
        rules: {
            f_hnum: {
                required: true,
                range: [-100, 100],
                h_larger: true,
            },
            l_hnum: {
                required: true,
                range: [-100, 100],
                h_larger: true,
            },
            f_vnum: {
                required: true,
                range: [-100, 100],
                v_larger: true,
            },
            l_vnum: {
                required: true,
                range: [-100, 100],
                v_larger: true,
            },
        },
        messages: {
            f_hnum: {
                required: "Please enter a starting multiplier",
                range: "Please enter an integer between -100 and 100",
                h_larger: "Please enter an starting integer that is less than the ending integer"
            },
            l_hnum: {
                required: "Please enter a starting multiplicand",
                range: "Please enter an integer between -100 and 100",
                h_larger: "Please enter an ending integer that is greater than the starting integer"
            },
            f_vnum: {
                required: "Please enter a starting multiplier",
                range: "Please enter an integer between -100 and 100",
                v_larger: "Please enter an starting integer that is less than the ending integer"
            },
            l_vnum: {
                required: "Please enter a starting multiplicand",
                range: "Please enter an integer between -100 and 100",
                v_larger: "Please enter an ending integer that is greater than the starting integer"
            },
        }
    });
});

//Verifies form validity before building the table
function check() {
    if( $('#full_form').valid() ) {
        table('mult_table');
    }
}

function table(id) {

    //Gets the entered numbers from the forms
    var f_hnum = parseInt(document.getElementById("f_hnum").value)
    var l_hnum = parseInt(document.getElementById("l_hnum").value)
    var f_vnum = parseInt(document.getElementById("f_vnum").value)
    var l_vnum = parseInt(document.getElementById("l_vnum").value)

    //Erases previous Table
    if (document.getElementById(id)) { 
        var m_table = document.getElementById(id);
        var rows = m_table.rows.length;
        for (var i = 0; i < rows; i++) {
            m_table.deleteRow(0);
        }
    }

    //Erases any previous error messages
    document.getElementById('notif').innerHTML = '' 

    //Creates the new table
    for(let i = f_vnum; i <= l_vnum; i++) {
        let row = document.getElementById(id).insertRow(i-f_vnum); // create row
        for(let j = f_hnum; j <= l_hnum; j++) {
            let k = i * j
            var col = row.insertCell(j-f_hnum); //add cell to row
            col.innerHTML = k //put k in cell
        }
        var col = row.insertCell(0); 
        col.innerHTML = i            // Multiplicand 
    }
    let row = document.getElementById(id).insertRow(0);
    for (let j = l_hnum; j >= f_hnum; j--) {
        var col = row.insertCell(0); //add cell to row
        col.innerHTML = j   //multiplier
    }
    var col = row.insertCell(0);
}