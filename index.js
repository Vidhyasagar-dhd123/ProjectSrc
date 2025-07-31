const table = document.getElementById("table")
const from = document.getElementById('from')
const to = document.getElementById('to')
const incfrom = document.getElementById('incfrom')
const decfrom = document.getElementById('decfrom')
const incto = document.getElementById('incto')
const decto = document.getElementById('decto')
const size = parseInt(Object.keys(data[Object.keys(data)[0]]).length)
const query = document.getElementById('query')

const loadData = (query="",start=0,end=25)=>{
    let label = false
    let count = 0;
    table.innerHTML = ""
    const head = document.createElement('thead')
    const id = document.createElement('th')
    head.appendChild(id)
    id.innerHTML = "id"
    for(let d in data){
        if(d==="Project description") continue;
        const heading = document.createElement('th')
        heading.innerHTML = d
        head.appendChild(heading)
    }
    
    table.appendChild(head)
        for(let i =parseInt(start); i<=parseInt(end); i++){
            const tr = document.createElement('tr')
            const index = document.createElement('td')
            index.innerHTML = i
            tr.appendChild(index)
            for(let d in data){
                if(d==="Project description") continue;
                const td = document.createElement('td')
                let value = data[d][i]
                if(value?.toLowerCase().includes(query.toLowerCase())&&query!==""&&(d==="Project name"||d==="Project admin"||d==="Tech stack"||d==="mentor 1"||d=="mentor 2"))
                    {
                        label = true
                        count++ 
                        td.innerHTML = value.toLowerCase().replace(query.toLowerCase(),`<span style='background-color:#ff05;'>${query.toLowerCase()}</span>`)
                    }
                else if(value?.startsWith("http")){
                    const link = document.createElement('a')
                    link.href = value
                    link.innerHTML = d+" of "+data[Object.keys(data)[0]][i]
                    td.appendChild(link)
                }
                else if(value?.toLowerCase().includes("no data")){
                    td.innerHTML = "<span style='color:#0005;'>Will be updated soon</span>"
                }
                else
                td.innerHTML = data[d][i]
                tr.appendChild(td)
            }
            if(label||query===""){
            table.appendChild(tr)
            label = false
        }
        }
        return count
    }


loadData()

function increase(num){
    if(num.value<size){
    num.value = parseInt(num.value)+1
}
}

function decrease(num){
    if(num.value>0){
    num.value = parseInt(num.value)-1
    loadData()}
}

incfrom.onclick=()=>{
    increase(from)
    loadData("",from.value,to.value)
}


decfrom.onclick=()=>{
    decrease(from)
    loadData("",from.value,to.value)
}


incto.onclick=()=>{
    increase(to)
    loadData("",from.value,to.value)
}

decto.onclick=()=>{
    decrease(to)
    loadData("",from.value,to.value)
}

query.oninput=()=>{
    if(query.value.length>3)
    loadData(query.value,0,size)
}