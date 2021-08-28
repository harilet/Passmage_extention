var ser=''
$.get("https://passmage-backend.herokuapp.com/",
{
  async:false

},function(data,status){

  data=data.split(",");
  data.forEach(function (a) {   
    if(a!='')
      add_ser_to_view(a);
    });
});

function add_ser_to_view(a) {

  var list_of_rows=document.getElementById('mylist')
  list_of_rows.innerHTML+=`
    <li>
        <button id='butt' name='${a}'> ${a} </button>
    </li>
  `
  event_setup()
}

function event_setup(){
  document.getElementById('butt').addEventListener('click',(e)=>{
    ser=e.target.name
    document.getElementById('primary').style.display='none';
    document.getElementById('secondary').style.display='block';
  })

  document.getElementById('get_butt').addEventListener('click',(e)=>{
    console.log(ser)
    $.post("https://passmage-backend.herokuapp.com/get_encr",
    {
      name: ser
    },
    function(data,status){
      var decrypted = CryptoJS.AES.decrypt(data, document.getElementById("Master_key").value).toString(CryptoJS.enc.Utf8);
      document.getElementById("pass_display").value = decrypted;
      navigator.clipboard.writeText(decrypted);
    });
  })
}