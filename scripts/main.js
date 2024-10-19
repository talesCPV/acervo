/*  DATABASE  */
    function queryDB(params,cod){

        const data = new URLSearchParams()
            data.append("cod", cod)
            data.append("params", JSON.stringify(params))

        const myRequest = new Request("backend/query_db.php",{
            method : "POST",
            body : data
        });

        return new Promise((resolve,reject) =>{
            fetch(myRequest)
            .then(function (response){
                if (response.status === 200) { 
                    resolve(response.text())        
                } else { 
                    reject(new Error("Houve algum erro na comunicação com o servidor"));
                } 
            });
        });      
    }

    function real(){
        const url = (window.location).toString().split('/')
        const data = new URLSearchParams()
            data.append("acervo", url[url.length-1])

        const myRequest = new Request("backend/access.php",{
            method : "POST",
            body : data
        })

        const myPromise = new Promise((resolve,reject) =>{
            fetch(myRequest)
            .then(function (response){
                if (response.status === 200) { 
                    resolve(response.text())        
                } else { 
                    reject(new Error("Houve algum erro na comunicação com o servidor"));
                } 
            })
        })
        return myPromise
    }