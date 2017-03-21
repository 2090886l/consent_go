/*
Author - Ivaylo Lafchiev (2090886)
JS code for user panel
*/

// set location of CC
var URL = "https://8e18edcadb514940add0f29a2115b4d1-vp0.us.blockchain.ibm.com:5001/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "5545d8dc7011990856f4c5f907f406c425d53e8f647ac889eccf143d2d8f1fcc590367860817cd2230f71c9624f984d4343a69b74c2d03bd3c56d129b6542514"
            },
            "ctorMsg": {
            "function": "setConsent",
            "args": [
                "test"
            ]
            },
            "secureContext": "user_type1_0"
        },
        "id": 2
    };
var user = "test";

// set user's consent status
function consent(flag) {
    $('#output').empty();
    var input = document.getElementById("example-text-input").value;
    if (input === "") {
        $('#output').append('<h1 class="text-warning">Enter a username</h1>');
        return
    }
    myKeyVals.params.ctorMsg.args = [input, flag.toString()];
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(myKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
            
            if (resultData.error == null || resultData.error == undefined) {
                if (flag) {
                    $('#output').append('<h1 class="text-success">Consent granted for user "' + input + '"</h1>');
                }
                else {
                    $('#output').append('<h1 class="text-danger">Consent paused for user "' + input + '"</h1>');
                }
                
                console.log(resultData.result.message);
            }
            else {
                $('#output').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}

// withdraw user from study
function withdraw() {
     $('#output').empty();
    var input = document.getElementById("example-text-input").value;
    if (input === "") {
        $('#output').append('<h1 class="text-warning">Enter a username</h1>');
        return
    }
    var newKeyVals = jQuery.extend(true, {}, myKeyVals);
    newKeyVals.params.ctorMsg.args = [input, "true"];
    newKeyVals.params.ctorMsg.function = "setWithdrawl"
    $.ajax({
        type: "POST",
        url: URL,
        data: JSON.stringify(newKeyVals),
        dataType: "text",
        success: function(resultData) { 
            resultData = JSON.parse(resultData);
            console.log(resultData)
            
            if (resultData.error == null || resultData.error == undefined) {
                $('#output').append('<h1 class="text-success"> User "' + input + '" withdrawn from study' + '</h1>');
                

                
                console.log(resultData.result.message);
            }
            else {
                $('#output').append('<h1 class="text-danger">Error</h1><p class="lead">' + resultData.error.data + '</p>');
                console.log(resultData.error.data) 
            }
             
        }

    })
}