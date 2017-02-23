var URL = "https://1d995023ee264149bd2d6517bb4296bf-vp1.us.blockchain.ibm.com:5002/chaincode"
var myKeyVals =       {
        "jsonrpc": "2.0",
        "method": "query",
        "params": {
            "type": 1,
            "chaincodeID": {
            "name": "97cbb9595ef50a3c96de441fbc4a65686485148565a1d0a1b674161062e9d03634394c14c251ae3bf703bb05505e919c0080a502314d27f5b5902bd60fb77a55"
            },
            "ctorMsg": {
            "function": "getKey",
            "args": [
                "test"
            ]
            },
            "secureContext": "user_type1_2"
        },
        "id": 2
    }

var user = "test";

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