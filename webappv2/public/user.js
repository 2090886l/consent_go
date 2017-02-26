var URL = "https://8e18edcadb514940add0f29a2115b4d1-vp0.us.blockchain.ibm.com:5001/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "invoke",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "1e118ce799633f4c821263784f8df37676527595194803ba87de840d740f12ce7f071ef35d8caf132738e86d5aefc2403a27c9790e16496f7ff5a04fdfa92acc"
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