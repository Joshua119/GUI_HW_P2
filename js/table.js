/*    HW Assignment 4 part 2
        File: table.js
        Joshua Sullivan, Joshua_Sullivan1@student.uml.edu
        11/15/2021   
        This javascript file builds sliders for the input fields and once the submit button is pressed it 
        builds the multiplication table in a separate tab for the file index.html and validates the users input.
        It also deletes specified tabs.
*/

let tabcount = 0;

$(function() {

    //setting for the four sliders
    $("#f_hnum_slider").slider({
        min: -100,
        max: 100,
        value: 0,
        change: (function(e) {
            document.getElementById("f_hnum").value = $('#f_hnum_slider').slider("value");
        })
    });
    $("#f_vnum_slider").slider({
        min: -100,
        max: 100,
        value: 0,
        change: (function(e) {
            document.getElementById("f_vnum").value = $('#f_vnum_slider').slider("value");
        })
    });
    $("#l_hnum_slider").slider({
        min: -100,
        max: 100,
        value: 0,
        change: (function(e) {
            document.getElementById("l_hnum").value = $('#l_hnum_slider').slider("value");
        })
    });
    $("#l_vnum_slider").slider({
        min: -100,
        max: 100,
        value: 0,
        change: (function(e) {
            document.getElementById("l_vnum").value = $('#l_vnum_slider').slider("value");
        })
    });

    //changes sliders when input changes
    $("#f_hnum").on("input", function() {
        $('#f_hnum_slider').slider("value", (document.getElementById("f_hnum").value));
    });
    $("#l_hnum").on("input", function() {
        $('#l_hnum_slider').slider("value", (document.getElementById("l_hnum").value));
    });
    $("#f_vnum").on("input", function() {
        $('#f_vnum_slider').slider("value", (document.getElementById("f_vnum").value));
    });
    $("#f_hnum").on("input", function() {
        $('#l_vnum_slider').slider("value", (document.getElementById("l_vnum").value));
    });

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

    //Checks that the form input is valid
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

    //checks that the ending tab to be deleted is greater or equal to the starting tab to be deleted
    $.validator.addMethod('del_greater', function(value) {
        var first = parseInt($('#del_start').val())
        var last = parseInt($('#del_start').val())

        if(!last)               //If second value has not been entered yet
            return true;

        return last >= first;
    });

    //Checks that the starting tab exists
    $.validator.addMethod('Stab_exists', function(value) {
        var first = parseInt($('#del_start').val())
        //var real_tab =
        return first <= tabcount;
    });

    //Checks that the ending tab exists
    $.validator.addMethod('Etab_exists', function(value) {
        var last = parseInt($('#del_start').val())
        return last <= tabcount;
    });

    //checks that the deletion input is valid
    $('#del').validate({
        rules: {
            del_start: {
                required: true,
                digits: true,
                del_greater: true,
                min: 1,
                Stab_exists: true,
            },
            del_end: {
                required: true,
                digits: true,
                del_greater: true,
                min: 1,
                Etab_exists: true,
            },
        },
        messages: {
            del_start: {
                required: "Please enter a starting tab to delete",
                digits: "Please enter a digit",
                del_greater: "Please enter an starting integer that is less than the ending integer",
                min: "Please enter an integer greater than 0",
                Stab_exists: "please enter a digit that corresponds to a current tab",
            },
            del_end: {
                required: "Please enter an ending tab to delete",
                digits: "Please enter a digit",
                del_greater: "Please enter an ending integer that is greater than the starting integer",
                min: "Please enter an integer greater than 0",
                Etab_exists: "please enter a digit that corresponds to a current tab",
            },
        }
    });
});

//Verifies form validity before building the table
function check() {
    if( $('#full_form').valid() ) {
          table();
    }
}

//Builds the table in a new tab
function table() {
    tabcount = tabcount + 1;

    //gets the input values
    var f_hnum = parseInt(document.getElementById("f_hnum").value)
    var l_hnum = parseInt(document.getElementById("l_hnum").value)
    var f_vnum = parseInt(document.getElementById("f_vnum").value)
    var l_vnum = parseInt(document.getElementById("l_vnum").value)

    //Builds the new tab and table
    $('<div>', {
        id: '#table' + tabcount,
    }).appendTo('#content');

    $("#myTabs").tabs();
    $("#tabs").tabs("add", "#table" + tabcount, "Table" + tabcount + ":" + f_hnum + "," + l_hnum + "," + f_vnum + "," + l_vnum);

    $('<table>', {
        id: '#mult_table' + tabcount,
    }).appendTo('#table' + tabcount);

    table_id = '#mult_table' + tabcount;

    //Fills in the new table
    for(let i = f_vnum; i <= l_vnum; i++) {
        let row = document.getElementById(table_id).insertRow(i-f_vnum); // create row
        for(let j = f_hnum; j <= l_hnum; j++) {
            let k = i * j
            var col = row.insertCell(j-f_hnum); //add cell to row
            col.innerHTML = k //put k in cell
        }
        var col = row.insertCell(0); 
        col.innerHTML = i            // Multiplicand 
    }
    let row = document.getElementById(table_id).insertRow(0);
    for (let j = l_hnum; j >= f_hnum; j--) {
        var col = row.insertCell(0); //add cell to row
        col.innerHTML = j   //multiplier
    }
    var col = row.insertCell(0);
}

//Verifies deletion form validity before building the table
function del() {
    if( $('#del').valid() ) {
        deleteTable();
  }
}

//deletes specified table tabs
function deleteTable() {
    start = document.getElementById("del_start").value
    end = document.getElementById("del_end").value

    for(let i = start; i <= end; i++) {
        if ($('#table' + i).length !== 0) {
            $("#tabs").tabs("remove", "#table" + i);
        }

    }
}