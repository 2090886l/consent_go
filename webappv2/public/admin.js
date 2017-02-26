var URL = "https://8e18edcadb514940add0f29a2115b4d1-vp0.us.blockchain.ibm.com:5001/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "query",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "1e118ce799633f4c821263784f8df37676527595194803ba87de840d740f12ce7f071ef35d8caf132738e86d5aefc2403a27c9790e16496f7ff5a04fdfa92acc"
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