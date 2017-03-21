/*
Author - Ivaylo Lafchiev (2090886)
JS code for admin panel
*/

// set location of CC
var URL = "https://8e18edcadb514940add0f29a2115b4d1-vp0.us.blockchain.ibm.com:5001/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "query",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "5545d8dc7011990856f4c5f907f406c425d53e8f647ac889eccf143d2d8f1fcc590367860817cd2230f71c9624f984d4343a69b74c2d03bd3c56d129b6542514"
            },
            "ctorMsg": {
            "function": "getWithdrawl",
            "args": [
                "test"
            ]
            },
            "secureContext": "user_type1_0"
        },
        "id": 2
    }

var user = "test";

// get the withdrawl status of user and update DOM
function getWithdrawl() {
     $('#output').empty();
    var input = document.getElementById("get").value;
    myKeyVals.params.ctorMsg.args = [input];
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
           
            if (resultData.error == null || resultData.error == undefined) { 
                if (resultData.result.message == null || resultData.result.message == undefined) {
                     $('#output').append('<h1 class="text-warning">User does not exist</h1>');
                }
                else {
                    var message = resultData.result.message.replace(/\"/g, "");
                    console.log (message);
                    if (message == "true") {
                        $('#output').append('<h1 class="text-danger">User has withdrawn from the study</h1>');
                    }
                    else if (message == "false") {
                        $('#output').append('<h1 class="text-success">User has not withdrawn from the study</h1>');
                    }
                }

  
            }
            else {
                $('#output').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}

// initalise a new user and update DOM
function initUser() {
    $('#output').empty();
    var newKeyVals = jQuery.extend(true, {}, myKeyVals);
    var input = document.getElementById("create").value;
    newKeyVals.params.ctorMsg.args = [input];
    newKeyVals.params.ctorMsg.function = "initUser";
    newKeyVals.method = "invoke";
     $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(newKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
            
            if (resultData.error == null || resultData.error == undefined) {
                
                $('#output2').append('<h1 class="text-success">Successfully created user "' + input +'"</h1>');
                console.log(resultData.result.message);
            }
            else {
                $('#output2').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}