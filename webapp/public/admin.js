/*
Author - Ivaylo Lafchiev (2090886)
JS Code for the admin panel
*/

// setting the location of the CC
var URL = "https://8e18edcadb514940add0f29a2115b4d1-vp0.us.blockchain.ibm.com:5001/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "query",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "cd2696a855af534ab8187c8577b16da839d5e4d1fd457631daf0c4e5086ac45d9e0680644dd64163a8b8096482df44a867c6bb5573f9ca3cd52ac1edf4e92128"
            },
            "ctorMsg": {
            "function": "getKey",
            "args": [
                "test"
            ]
            },
            "secureContext": "user_type1_0"
        },
        "id": 2
    }

var user = "test";

// get key for user and update DOM
function getKey() {
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
                
                $('#output').append('<h1 class="text-success">Success</h1><p class="lead">' + 'Key for user "' + input + '" : ' + resultData.result.message.replace(/\"/g, "") + '</p>');
                console.log(resultData.result.message);
            }
            else {
                $('#output').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}

// initialise new user and update DOM
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