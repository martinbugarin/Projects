fetch('http://localhost:3000/fetchTest')
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
    })