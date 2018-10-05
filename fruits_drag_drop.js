
//Image size configurations is calculated...
$('#back_img').css('width',window.innerWidth).css('height',window.innerHeight);
$(window).resize(function(){
    $('#back_img').css('width',window.innerWidth).css('height',window.innerHeight);
    
});
$(init);

var sepetler=["elmaxSepeti","armutxSepeti","seftalixSepeti"];
var rastgeleArr=[];
var adetArr=[];
var idBol='';
var toplamFruit=0;

function reset(){
    rastgeleArr=[];
    adetArr=[];
    idBol='';
    toplamFruit=0;
    appleFruitAdet=0;
    pearFruitAdet=0;
    peachFruitAdet=0;
    for(var i=0;i<3;i++){
        $("#"+sepetler[i]).remove();        
    }    
    $(init)
}
function rastgeleFunc(){
    //Rastele Meyve sepetleri üretiliyor
    while(rastgeleArr.length < 3){
        var number = Math.floor(Math.random()*3);
        if(rastgeleArr.indexOf(number) > -1) continue;
        rastgeleArr[rastgeleArr.length] = number;        
    }
    //Meyve Adetleri üretiliyor...
    while(adetArr.length < 3){
        var number = Math.floor(Math.random()*5)+1;
        if(adetArr.indexOf(number) > -1) continue;
        adetArr[adetArr.length] = number;        
    }  
    
    //sepetler oluşturuluyor
    for(var i=0;i<3;i++){
        var sayi=rastgeleArr[i];
        sayi=sayi+1;
        idBol=sepetler[rastgeleArr[i]].split('x');
        $('#targetObjects').append("<div id="+sepetler[rastgeleArr[i]]+"></div>");
        $('#'+sepetler[rastgeleArr[i]]).append("<div id='sepet"+sayi+"'></div>");
        var leftSpace=0;
        for(var k=1;k<adetArr[i]+1;k++){
            leftSpace+=22;
        $('#sepet'+sayi).append("<div id='"+idBol[0]+k+"'></div>");
        $('#sepet'+sayi).css('position','relative');
        //her bir meyveye resimleri ekleniyor
        $('#'+idBol[0]+k).css('background-image',' url("./images/'+idBol[0]+'.png")').css({
            'width':'50px',
            'height': '52px',
            'z-index': '15',
            'position': 'absolute',
            'left':leftSpace+15+'px',
            'repeat':'none',
            'opacity':'0'
        });
        }
        
        $('#'+sepetler[rastgeleArr[i]]).append("<div id='"+idBol[0]+"Adet'>"+adetArr[i]+' '+idBol[0]+"</div>");

        //Create Droppable Objects
         $('#'+sepetler[rastgeleArr[i]]).appendTo('#targetObjects').droppable({
             
            drop: handleObjectDrop
        });
        
    }
     //Toplam Adet Hesaplanıyor...
     for(var i=0;i<adetArr.length;i++){
        toplamFruit+=adetArr[i];
    }
    
      //Make objects draggable
      $('#elma').appendTo('#objects').draggable({
        containment:'#container',
        stack:'#objects div',
        cursor:'pointer',
        revert:true        
        
    });
    $('#armut').appendTo('#objects').draggable({
        containment:'#container',
        stack:'#objects div',
        cursor:'pointer',
        revert:true
    });
    $('#seftali').appendTo('#objects').draggable({
        containment:'#container',
        stack:'#objects div',
        cursor:'pointer',
        revert:true
    });
}

function init(){
    $(rastgeleFunc);      
}

var appleFruitAdet=0;
var pearFruitAdet=0;
var peachFruitAdet=0;

//When drop operation is happened run handleOnjectDrop
function handleObjectDrop(event,ui){
    var targetObject=$(this).attr('id');
    var fruitObject=ui.draggable.attr('id');
    idBol=targetObject.split('x');
    idBolAdet=$('#'+idBol[0]+'Adet').html().split(' ');
    $('#'+fruitObject).draggable('option', 'revert', true );
    //Meyveler geri dönüşü hızlandırılıyor...
    $('#'+fruitObject).draggable('option', 'revertDuration', 0.1);    
    
    if(fruitObject=='elma' && idBol[0]=='elma'){
        if(appleFruitAdet<idBolAdet[0]){
            appleFruitAdet+=1;
            $('#'+idBol[0]+appleFruitAdet).css('opacity','1');
        }else{
            alert("Elma Sepetine daha fazla elma koyamazsın!");
        }        
    }else if(fruitObject=='armut' && idBol[0]=='armut'){
        if(pearFruitAdet<idBolAdet[0]){
            pearFruitAdet+=1;
            $('#'+idBol[0]+pearFruitAdet).css('opacity','1');  
        }else{
            alert("Armut Sepetine daha fazla armut koyamazsın!");
        }              
    }else if(fruitObject=='seftali' && idBol[0]=='seftali'){
        if(peachFruitAdet<idBolAdet[0]){
            peachFruitAdet+=1;
            $('#'+idBol[0]+peachFruitAdet).css('opacity','1');  
        }else{
            alert("Şeftali Sepetine daha fazla şeftali koyamazsın!");
        }              
    }else{
        alert("Lütfen meyveleri doğru sepete koyunuz!");
    }
    //Bütün meyveler başarılı bir şekilde yerleştirildi
    if((appleFruitAdet+pearFruitAdet+peachFruitAdet)==toplamFruit){
        setTimeout(function(){
            if(confirm("Tebrikler meyveleri istenilen sepetlere yerleştirdiniz. Tekrar oynamak ister misin?")){
                $(reset);
            }
        },500);   
           
    }
    
}

