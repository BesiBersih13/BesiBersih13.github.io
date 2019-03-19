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

// notification
Notification.requestPermission(function (status) {
    console.log('Notif permision status', status);
});

function displayNotification(title, msg, url, img) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration()
            .then(function (reg) {
                var options = {
                    body: msg,
                    icon: img,
                    vibrate: [100, 50, 100],
                    data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1,
                        url : url
                    },

                    actions: [
                        {
                            action: 'explore', title: 'Kunjungi Situs',
                            icon: 'images/centang.png'
                        },
                        {
                            action: 'close', title: 'Close Notification',
                            icon: 'images/times.png'
                        }
                    ]
                };
                reg.showNotification(title, options)
            })
    }
}

$("#show-notification").on('click', function () {
    console.log('click button');
    displayNotification("Lorem Ipsum","Sit Dolor Amet",'https://google.com/','images/ugm.png');
});

function isOnline(){
    var connectionStatus = $
}

if('serviceWorker'in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('/serviceworker.js').then(
            function(reg){
                document.getElementById('load-in-bg')
                    .addEventListener(('click',()=>{
                        reg.sync.register('image-fetch')
                            .then(()=>{
                                console.log('sync-registered');
                            }).catch((err)=>{
                                console.log('unable to fetch image. err: ',err);
                            })
                    }))
            }, function (err){
                console.log('SW registration failed :',err);
            }
        )
    })
}

/**
 * IndexedDB
 */
createDataBase();

function createDataBase(){
    if(!('indexedDB' in window)){
        console.log('Web Browser tidak mendukung Indexed DB');
        return;
    }
    var request = window.indexedDB.open('belajar-pwa',1);
    request.onerror = errorHandle;
    request.onupgradeneeded = (e)=>{
        var db = e.target.result;
        db.onerror = errorHandle;
        var objectStore = db.createObjectStore('mahasiswa',{keyPath : 'nim'});
        console.log('Object Sore mahasiswa berhasil dibuat');
    }
    request.onsuccess = (e)=>{
        db = e.target.result;
    }
}

function errorHandle(e){
    console.log('Error DB : '+e.target.errorCode);
}