    function displayerrormessage(){
        let t1=document.getElementById("valid-data");
        t1.style.display="flex";
        let tb=document.getElementById("tb");
        tb.style.display="none";
    }

    // modifycontent
    function gettingformdetails(){
        let form=document.getElementById('Form');
        form.addEventListener('submit',function(event){
            event.preventDefault(); //prevents auto reloading
            try{
            let obj=JSON.parse(document.getElementById('str1').value);
            // console.log(obj);
            let t1=document.getElementById("valid-data");
            t1.style.display="none";
            tb.style.display="flex";
            gettingdata(obj);
            }
            catch(err){
                displayerrormessage();
            }
            document.getElementById('str1').value="";
        })

    }

    function dateWithMeridian(content){
        let d1=content.substring(0,10);
        let dt=0;
        let firstChar=content.substring(11,12);
        let secondChar=content.substring(12,13);
        dt+=(firstChar.charCodeAt(0)-48);
        dt*=10;
        dt+=(secondChar.charCodeAt(0)-48);
        let PM=false;
        let AM=false;
        if(dt>=12 && dt<=24){
            if(dt-4<12){
                AM=true;
            }
            else{
                PM=true;
            }
        }
        else{
            if(dt-4<0){
                PM=true;
            }
            else{
                AM=true;
            }
        }
        dt-=4;
        
        if(dt<0){
            dt+=24;
        }
        let fstr="";
        if(AM==true){
            if(dt>=10)
            fstr=d1+" "+dt.toString()+content.substring(13,content.length)+" AM";
            else
            fstr=d1+" 0"+dt.toString()+content.substring(13,content.length)+" AM";
        }
        if(PM==true){
            dt-=12;
            if(dt>=10)
            fstr=d1+" "+dt.toString()+content.substring(13,content.length)+" PM";
            else
            fstr=d1+" 0"+dt.toString()+content.substring(13,content.length)+" PM";
        }
        return fstr;
    }
    function slidingWindow(arr, windowSize,ans) {
    // console.log("Expected string is"+ans);
    arr=arr.toLowerCase();
    arr=arr. replace(/(\r\n|\n|\r)/gm,""); //regular expression to replace all line breaks with empty space
    // console.log(arr);
    for(let i=0;i<arr.length;i++){
        let s1='';
        for(let j=i;j<i+windowSize;j++){
            if(s1[j]!='/')
            s1+=arr[j];
        }
        // console.log(s1);
        if(s1==ans) console.log("Found expected string");
        if(s1==ans) return true;
    }
    return false;
    
}


gettingformdetails();
function gettingdata(data){
    let unix={
        very_high:0,
        high:0,
        moderate:0,
        low:0,
        low_impact:0,
        sum:0
    };
    let winserv={
        very_high:0,
        high:0,
        moderate:0,
        low:0,
        low_impact:0,
        sum:0
    };
   
    for(let i=0;i<data.records.length;i++){
        
        // console.log(data.records[i].assignment_group);
        if(data.records[i].assignment_group==="36e37ae36fe755008e4c4f654b3ee421"){
            
            if(data.records[i].priority==1){
                winserv.very_high+=1;
                winserv.sum+=1;
            }
            else if(data.records[i].priority==2){
                winserv.high+=1;
                winserv.sum+=1;
            }
            else if(data.records[i].priority==3){
                winserv.moderate+=1;
                winserv.sum+=1;
            }
            else if(data.records[i].priority==4){
                winserv.low+=1;
                winserv.sum+=1;
            }
            else if(data.records[i].priority==5){
                winserv.low_impact+=1;
                winserv.sum+=1;
            }
        }
        else
        {
            if(data.records[i].priority==1){
                unix.very_high+=1;
                unix.sum+=1;
            }
            else if(data.records[i].priority==2){
                unix.high+=1;
                unix.sum+=1;
            }
            else if(data.records[i].priority==3){
                unix.moderate+=1;
                unix.sum+=1;
            }
            else if(data.records[i].priority==4){
                unix.low+=1;
                unix.sum+=1;
            }
            else if(data.records[i].priority==5){
                unix.low_impact+=1;
                unix.sum+=1;
            }
        }
       
    }
    modify_content(unix,winserv,data);
}
function findassignmentgroup(val){
    
    if(val==="a4bfefc01b3d09103cd57661cd4bcba2")
    return "Winserv";
    else if(val==="a7ad828e1b9b1c50629e41d5ec4bcbcb")
    return "Unix";
}
function findassigneduser(group,user,data,i){
    let name={
        "9506949" : "AbdulMalik Pasha (9506949)",
        "9504226" : "Nitheesh M (9504226)",
        "9504410" : "Aishwarya Nambiar (9504410)",
        "9506080" : "Lalitha Varshini (9506080)",
        "9502664" : "Prabhu S (9502664)",
        "9503251" : "Raagul Vasudevan (9503251)",
        "9505624" : "Janani Murugesan (9503251)",

    };
    if(data.records[i].assignment_group==="36e37ae36fe755008e4c4f654b3ee421"){
        group="Winserv";
        if(user==="98d8de48930dc6904047b91c5cba10d4") return [group,"AbdulMalik Pasha (9506949)"];
        else if(user==="3afb30c01b9bb418039d7599cc4bcb8b") return [group,"Nitheesh M (9504226)"];
        else if( user==="65ecf84b1bc9a5106e79311d1e4bcbb2") return [group,"Lalitha Varshini (9506080)"];
        else if(user==="f2eb82372f6c55502d209bacf699b6ba")  return [group,"Janani Murugesan (9503251)"];
        else if(user==="a4bfefc01b3d09103cd57661cd4bcba2") return [group,"Prasanna M (9504625)"];
        else if(user==="29e513d31b3e35546e79311d1e4bcb6e") return [group,"Jennifer Alexander (9506801)"];
        else if(user==="8689afc647250a5886a023c4116d432b") return [group,"Blessing V (9506990)"];
        else if(user==="c8f4522bdb9c4110a9adf2823996196c") return [group,"Aishwarya Nambiar (9504410)"];
        else if(user==="a04c5f0e936d42984047b91c5cba1063") return [group,"Manivel S (9506989)"];
        else if(user==="83882b13475742d08150539c416d4368") return [group,"Rahul E(9507126)"];
        else if(user==="0f88e713475742d08150539c416d43d4") return [group,"Reshma R(9507127)"];
        else if(user==="a0ca14ae2bfce25006bff4e3ce91bf4e") return [group,"Gautham S(9507570)"];   
        else if(user==="a7ad828e1b9b1c50629e41d5ec4bcbcb" || user==="81c89eb21bfd6594328564e6ec4bcb3e") return [group,"Fayaz Shaik(9506211)"];
    }
    else{
        group="Unix";
        if(user==="4944a66b47f90ed086a023c4116d438a"){
            //UNIX
            return [group,"Vijayan Thangavelu (95070160)"];
        }
        else if(user==="a7ad828e1b9b1c50629e41d5ec4bcbcb"){
            //UNIX
            return [group,"Raagul Vasudevan (9503251)"];
        }
    }
     
    return [group,"Nothing Matched"];
}
function create_newtable_data(tableRow,content,key){
    if(key==0){
        //paragraph element should be added
        let tableDF1=document.createElement("td");
        tableDF1.innerHTML="<p>"+content+"</p>";
        tableRow.appendChild(tableDF1);

    }
    if(key==1){
        //h2 element should be added
        let tableDF1=document.createElement("td");
        tableDF1.innerHTML="<h2>"+content+"</h2>";
        tableRow.appendChild(tableDF1);
    }
}
function modify_content(unix,winserv,data){
    let t1=document.getElementById("tt");
        while (t1.firstChild) {  
            t1.removeChild(t1.firstChild);  
        }  
    let t2=document.getElementById("tt1");
        while (t2.firstChild) {  
            t2.removeChild(t2.firstChild);  
        }      
    /* New added code */
        let t3=document.getElementById("tt2");
        while (t3.firstChild) {  
            t3.removeChild(t3.firstChild);  
        }   
    
        let tableNode=document.getElementById("tt");
        let tableRow=document.createElement("tr");
        let tableHead1=document.createElement("th");
        
        let content1=document.getElementById('m1'); //changed from top to m1
        tableNode.appendChild(tableRow);
        tableRow.appendChild(tableHead1);
        tableHead1.innerHTML="<h2>Group/Priority</h2>";
        if(unix.very_high>0 || winserv.very_high>0){

            let tableHead2=document.createElement("th");
            tableHead2.innerHTML="<h2>1-Very High</h2>";
            tableRow.appendChild(tableHead2);
        }
        if(unix.high>0 || winserv.high>0){
            let tableHead2=document.createElement("th");
            tableHead2.innerHTML="<h2>2-High</h2>";
            tableRow.appendChild(tableHead2);
        }
        if(unix.moderate>0 || winserv.moderate>0){
            let tableHead2=document.createElement("th");
            tableHead2.innerHTML="<h2>3-Moderate</h2>";
            tableRow.appendChild(tableHead2);
        }
        if(unix.low>0 || winserv.low>0){
            let tableHead2=document.createElement("th");
            tableHead2.innerHTML="<h2>4-Low</h2>";
            tableRow.appendChild(tableHead2);
        }
        if(unix.low_impact>0 || winserv.low_impact>0){
            // console.log("Hurrah")
            let tableHead2=document.createElement("th");
            tableHead2.innerHTML="<h2>5-Low Impact</h2>";
            tableRow.appendChild(tableHead2);
        }
        //Grand total column
        let tableHead2=document.createElement("th");
        tableHead2.innerHTML="<h2>Grand Total</h2>";

        //background color
        tableRow.style.backgroundColor="#95d0f5";
        
        tableRow.appendChild(tableHead2);

        let tR1=document.createElement('tr');
        create_newtable_data(tR1,"Unix",0);
        
        if(unix.very_high>0 ){
            create_newtable_data(tR1,unix.very_high,0);
        }
        else{
            if(winserv.very_high>0 ){
                create_newtable_data(tR1,"",0);
            }
        }
        if(unix.high>0){
            create_newtable_data(tR1,unix.high,0);
        }
        else{
            if(winserv.high>0 ){
                create_newtable_data(tR1,"",0); 
            }
        }
        if(unix.moderate>0 ){
            create_newtable_data(tR1,unix.moderate,0);
        }
        else{
            if(winserv.moderate>0 ){
                create_newtable_data(tR1,"",0);
            }
        }
        if(unix.low>0 ){
            create_newtable_data(tR1,unix.low,0);
        }
        else{
            if(winserv.low>0 ){
                create_newtable_data(tR1,"",0);

            }
        }
        if(unix.low_impact>0 ){
            create_newtable_data(tR1,unix.low_impact,0);

        }
        else{
        if(winserv.low_impact>0 ){
            create_newtable_data(tR1,"",0);
            
        }
        }
        create_newtable_data(tR1,unix.sum,0);
        tableNode.appendChild(tR1);


        let tR2=document.createElement('tr');
        let tD2=document.createElement("td");
        tD2.innerHTML="<p>"+"Winserv"+"</p>";
        tR2.appendChild(tD2);
        if(winserv.very_high>0 ){
            create_newtable_data(tR2,winserv.very_high,0);
        }
        else{
            if(unix.very_high>0 ){
                create_newtable_data(tR2,"",0);
            }
        }
        if(winserv.high>0){
            create_newtable_data(tR2,winserv.high,0);
        }
        else{
            if(unix.high>0 ){
                create_newtable_data(tR2,"",0);
            }
        }
        if(winserv.moderate>0 ){
            create_newtable_data(tR2,winserv.moderate,0);
        }
        else{
            if(unix.moderate>0 ){
                create_newtable_data(tR2,"",0);
            }
        }
        if(winserv.low>0 ){
            create_newtable_data(tR2,winserv.low,0);
        }
        else{
            if(unix.low>0 ){
                create_newtable_data(tR2,"",0);
            }
        }
        if(winserv.low_impact>0 ){
            create_newtable_data(tR2,winserv.low_impact,0);
        }
        else{
            if(unix.low_impact>0 ){
                create_newtable_data(tR2,"",0);
            }
        }
        create_newtable_data(tR2,winserv.sum,0);

        tableNode.appendChild(tR2);
        
        //final row for global sum
        let tR3=document.createElement('tr');
        let tD3=document.createElement("td");
        tD3.innerHTML="<h2>"+"Global Sum"+"</h2>";
        tR3.appendChild(tD3);
        let tR4=document.createElement('tr');
        let tD4=document.createElement("td");
        tD4.innerHTML="<p>"+"Grand Total"+"</p>";
        //background color
        tR4.style.backgroundColor="#95d0f5";
        tR4.appendChild(tD4);

        if(winserv.very_high>0 || unix.very_high>0 ){
            tD4=document.createElement("td");
            let ans=winserv.very_high+unix.very_high;
            tD4.innerHTML="<p>"+ans+"</p>";
            tR4.appendChild(tD4);
        }
        if(winserv.high>0 || unix.high>0 ){
            tD4=document.createElement("td");
            let ans=winserv.high+unix.high;
            tD4.innerHTML="<p>"+ans+"</p>";
            tR4.appendChild(tD4);
        }
        if(winserv.moderate+unix.moderate>0 ){
            tD4=document.createElement("td");
            let ans=winserv.moderate+unix.moderate;
            tD4.innerHTML="<p>"+ans+"</p>";
            tR4.appendChild(tD4);
        }
        if(winserv.low>0 || unix.low>0 ){
            tD4=document.createElement("td");
            let ans=winserv.low+unix.low;
            tD4.innerHTML="<p>"+ans+"</p>";
            tR4.appendChild(tD4);
        }
        if(winserv.low_impact>0 || unix.low_impact>0 ){
            tD4=document.createElement("td");
            let ans=winserv.low_impact+unix.low_impact;
            tD4.innerHTML="<p>"+ans+"</p>";
            tR4.appendChild(tD4);
        }
        tD4=document.createElement("td");
        let ans=winserv.sum+unix.sum;
        tD4.innerHTML="<p>"+ans+"</p>";
        tR4.appendChild(tD4);
        tableNode.appendChild(tR4);
        
        
        
        //second table
        
        let tableNode1=document.getElementById("tt1");
        let tableRow1=document.createElement("tr");
        let tableHead3=document.createElement("th");

        //1st row
        let tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Number</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>State</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Priority</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Assignment group</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Assignment to</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Short Description(Customer visible)</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Created</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Updated</h2>";
        tableRow1.appendChild(tableHead4);

        tableHead4=document.createElement("th");
        tableHead4.innerHTML="<h2>Comments</h2>";
        tableRow1.appendChild(tableHead4);
        
        //background color
        tableRow1.style.backgroundColor="#95d0f5";

        tableNode1.appendChild(tableRow1);

        //2nd row

        let count=1;
        for(let i=data.records.length-1;i>=0;i--){
            
            // console.log(data.records[i].number);

            let tableRF=document.createElement('tr');
            let tableDF=document.createElement("td");
            

            //"state": "4" Awaiting User Info
            //"state": "6" Resolved
            //"state": "21" Awaiting Vendor
            //"state": "22" Work in Progress
            //"state": "7" Closed

            let state1="No Data found";
            // console.log(data.records[i]);
            if(data.records[i].state==="4") {
                //Awating User Info
                state1="Awaiting User Info";
            }
            else if(data.records[i].state==="6"){
                state1="Resolved";
            }
            else if(data.records[i].state==="21"){
                state1="Awaiting Vendor";
            }
            else if(data.records[i].state==="22"){
                state1="Work in Progress";
            }
            else if(data.records[i].state==="7"){
                state1="Closed";
            }
            
            if(!(state1==="No Data found")){

               
                //Incident Number
                create_newtable_data(tableRF,data.records[i].number,0);

                //Incident State
                create_newtable_data(tableRF,state1,0);

                //Incident Priority
                create_newtable_data(tableRF,data.records[i].priority,0);

                //Assignment Group
                let arr=findassigneduser(data.records[i].assigned_group,data.records[i].assigned_to,data,i);
                create_newtable_data(tableRF,arr[0],0);


                //Assigned user
                create_newtable_data(tableRF,arr[1],0);
                create_newtable_data(tableRF,data.records[i].short_description,0);

                //Created Date
                let ans=dateWithMeridian(data.records[i].sys_created_on);

                create_newtable_data(tableRF,ans,0);
                // tableRF.firstchild.style.display="inline";
                //Closed date

                let ans1=dateWithMeridian(data.records[i].sys_updated_on);
                create_newtable_data(tableRF,ans1,0);


                //Comments
                if(state1==="Resolved" || state1==="Closed"){
                    create_newtable_data(tableRF,"Team worked and resolved the incident",0);
                }
                else if(state1==="Awaiting User Info"){
                    create_newtable_data(tableRF,"Team is working on the incident",0);
                }
                else if(state1==="Work in Progress"){
                    create_newtable_data(tableRF,"Team is working on the incident",0);
                }
                else if(state1==="Awaiting Vendor"){
                    create_newtable_data(tableRF,"Team is working on the incident",0);
                }
        
                tableNode1.appendChild(tableRF);
            }
            else{
                console.log(data.records[i].number);
            }

        }

        //3rd table
        let tableNode2=document.getElementById("tt2");
        let ta1=document.createElement("tr");
        let ta2=document.createElement("th");

        //1st row
        let ta3=document.createElement("th");
        ta3.innerHTML="<h2>Work in Progress</h2>";
        ta1.appendChild(ta3);
        
        ta3=document.createElement("th");
        ta3.innerHTML="<h2>Awaiting User Info </h2>";
        ta1.appendChild(ta3);

        ta3=document.createElement("th");
        ta3.innerHTML="<h2>Awaiting Vendor</h2>";
        ta1.appendChild(ta3);

        ta3=document.createElement("th");
        ta3.innerHTML="<h2>Total</h2>";
        ta1.appendChild(ta3);

        tableNode2.appendChild(ta1);
        //2nd row

        let finalCount=[0,0,0]

        for(let i=data.records.length-1;i>=0;i--){
            
            let t3Data=document.createElement('td');
            //"state": "4" Awaiting User Info
            //"state": "6" Resolved
            //"state": "21" Awaiting Vendor
            //"state": "22" Work in Progress
            //"state": "7" Closed
            let totalSum=0
            // console.log(data.records[i].state)
            if(data.records[i].state==="22"){
                // state1="Work in Progress";
                finalCount[0]++
                totalSum++
            }
            else if(data.records[i].state==="4") {
                //Awating User Info
                // state1="Awaiting User Info";
                finalCount[1]++
                totalSum++
            }
            else if(data.records[i].state==="21"){
                state1="Awaiting Vendor";
                finalCount[2]++
                totalSum++
            }
            else{
                // console.log("Nothing")
            }
            
        }
        let t3Row=document.createElement('tr');
        for(let i=0;i<3;i++){
            console.log(finalCount[i]+"\n----\n")
            create_newtable_data(t3Row,String (finalCount[i]),0);
            tableNode2.append(t3Row)
            
        }
        create_newtable_data(t3Row,String (finalCount[0]+finalCount[1]+finalCount[2]),0);
        tableNode2.append(t3Row)      


}
let removeBackground=()=>{
    document.getElementById("Form").style.display="none";
    document.getElementById("b1").style.display="none";
    document.getElementById("bg").style.backgroundColor="white";
    document.getElementById("htm").style.backgroundImage="none";
    document.getElementById("bg").style.backgroundImage="none";
}
