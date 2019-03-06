$(document).ready(function(){
    var _url='https://my-json-server.typicode.com/besibersih13/belajar-api/mahasiswa/';

    var result = '';
    var gender_result ='';
    var gender = [];

    $.get(_url,function (data){
        $.each(data,function(key,items){
            _gend = items.gender;

            result += '<div><h3>'+items.name+'</h3><p>'+_gend+'</p></div>';

            if ($.inArray(_gend,gender)===-1){
                gender.push(_gend);
                gender_result += "<option value='"+_gend+"'>"+_gend+"</option>";
            }
        })

        $('#mhs-list').html(result);
        $('#mhs-gender').html("<option value='semua'>semua</option>"+gender_result);
    });
    
    $("#mhs-select").on('change',function(){
        updateListMahasiswa($(this).val());
    });
    function updateListMahasiswa(opt){
        var result='';
        var _url2=_url;

        if (opt !=='semua'){
            _url2=_url+'?gender='+opt;
        }
        $.get(_url2,function (data){
            $.each(data,function(key,items){
                _gend = items.gender;
    
                result += '<div><h3>'+items.name+'</h3><p>'+_gend+'</p></div>';
    
            })
    
            $('#mhs-list').html(result);
        });
    }
    
});

if('serviceWorker'in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('/serviceworker.js').then(
            function(reg){
                console.log('SW registration success, scope :',reg.scope);
            }, function (err){
                console.log('SW registration error, scope :',err)
            }
        )
    })
}