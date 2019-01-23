(function(){
'use strict';


// ID appを取得
const app = document.getElementById('app');
//スタートボタンを取得
const start = document.getElementById('start');
// selectboxの値取得
const course  = document.getElementById('courseName');
// const option = document.querySelector('option');    





// 席番号の配列準備
let personAry = []; //後ろ配列
// もしselectboxがLABだったら・・・配列にプッシュ
function arrPush(){
    personAry = [];

if(course.value ==='LAB'){
    for(let i =1; i<=50; i++){
       personAry.push(i);
    }
}else if(course.value === 'DEV'){ //もしDEVだったら配列にプッシュ
    for(let k=1; k<=30; k++){
        personAry.push(k);
    }
  };
};




// とりあえずモーダル用 ※LABかDEVで表示を分けている
 const mdl = document.getElementById('modalwrapper');
 const fname = document.getElementById('fname');
 const fname2 = document.getElementById('fname2');
 let div2 = '';
 function yselect(){
     console.log(course.value);
    //  fname1用
     if(course.value === 'LAB'){
    for(let i=1;i<51;i++){
        div2 +='<div class="numparts">';
        div2 +='<p>'+i+'</p>';
        div2 +='<label><input type="checkbox" id="numchecka'+i+'" name="yname" value="'+i+'"></label>';
        div2 +='</div>';

        };
    }else{
    for(let i=1;i<31;i++){
        div2 +='<div class="numparts">';
        div2 +='<p>'+i+'</p>';
        div2 +='<label><input type="checkbox" id="numchecka'+i+'" name="yname" value="'+i+'"></label>';
        div2 +='</div>';
        };
    }
    fname.innerHTML = div2;
}


// セレクトボックス表示用
let div3 = '';
function yselect2(){
    // fname2用
    if(course.value === 'LAB'){
        for(let i=1;i<51;i++){
            div3 +='<div class="numparts">';
            div3 +='<p>'+i+'</p>';
            div3 +='<label><input type="checkbox" id="numcheckb'+i+'" name="kname" value='+i+'></label>';
            div3 +='</div>';
            };
        }else{
        for(let i=1;i<31;i++){
            div3 +='<div class="numparts">';
            div3 +='<p>'+i+'</p>';
            div3 +='<label><input type="checkbox" id="numcheckb'+i+'" name="kname" value='+i+'></label>';
            div3 +='</div>';
            };
        }
    fname2.innerHTML = div3
}

// シャッフル席位置表示用の関数
    let div;
function upDate(){    
    div = '';

    personAry.forEach(function(data,i){
        // data personAryの中身、iは配列の順番0,1,2,3,4,5,6~
        if(course.value === 'LAB'){
            if((i+1) % 6 == 0 ){
                div += '<div class="seat">'+data+'</div></div>';
            }else if((i+1) % 6 == 1){
                div += '<div class="table-item table-center"><div class="seat">'+data+'</div>';
            }else{
                div +='<div class="seat">'+data+'</div>';
            }
        }else{
            if((i+1) % 5 == 0 ){
                div += '<div class="seat">'+data+'</div></div>';
            }else if((i+1) % 5 == 1){
                div += '<div class="table-item table-center"><div class="seat">'+data+'</div>';
            }else{
                div +='<div class="seat">'+data+'</div>';
            }
        }
    });
    app.innerHTML = div;
}

// 欠席者チェックをした人の値を取得
const yname = document.getElementsByName('yname');
function ychecked(){
    for(let i=yname.length-1; i >=0; i-- ){
        if(yname[i].checked){
            personAry.splice(i,1);
        }
    }
}


// 前席希望にチェックをした人の値を取得
// const kname = document.getElementsByName('kname');
// function kchecked(){
//     //  for(let i =0; i<kname.length; i++){
//         for(let i=kname.length-1; i>=0; i--){
//         if(kname[i].checked === true){ 
//             kesekiAry.push(i+1);
//         }
//     }
//     console.log(kesekiAry);
//     console.log(personAry);

// }




// 配列内数字をシャッフルする関数
function shuffleArray(){
    let interVal;
    let counter= 0 ;
    interVal = setInterval(function(){  
        counter++;
        console.log(counter);
        if(counter >= 5){
            clearTimeout(interVal);
            start.className ='btn waves-effect waves-light btn-large block-choose__btn';
            start.innerHTML = 'リトライ';
        }
        for(let i = personAry.length - 1; i> 0 ; i--){
            // personAryの中を１個ずつみていく  
            const r = Math.floor(Math.random()*(i+1));
            // rはi+１をランダムで取ってきた一つの値

            const tmp = personAry[i];
            personAry[i] = personAry[r];
            personAry[r] = tmp;    
        }
        upDate();
        console.log(personAry);
    },100);
}


// シャッフル開始ボタン
// 配列からチェックした番号を抜いて、表示させる
sstart.addEventListener('click',function(){
    ychecked();
    shuffleArray();
    mdl.className='hidden';
    start.className = "btn waves-effect waves-light btn-large block-choose__btn startevent";
});


// 選択/リトライボタン
start.addEventListener('click',function(){
  if(start.innerHTML === 'リトライ'){
      div2 = '';   
      div3 = '';   
  }
 arrPush2();
 yselect();
 yselect2();
 mdl.className = '';
getCheckbox();
});


// チェックボックスの挙動用関数 片方が消えたり着いたりする
function getCheckbox(){
    if(course.value === 'LAB'){
         for(let i=1;i<51;i++){
            let obja = document.getElementById('numchecka'+i);
            let objb = document.getElementById('numcheckb'+i);
            obja.addEventListener('change',function(){
             if(obja.checked){
                 objb.className='hidden';
             }else{
                 objb.className='';
             }
            });
            objb.addEventListener('change',function(){
                if(objb.checked){
                    obja.className='hidden';
                }else{
                    obja.className='';
                }
            });
        }
    }else if(course.value === 'DEV'){
        for(let i=1;i<51;i++){
            let obja = document.getElementById('numchecka'+i);
            let objb = document.getElementById('numcheckb'+i);
            obja.addEventListener('change',function(){
             if(obja.checked){
                 objb.className='hidden';
             }else{
                 objb.className='';
             }
            });
            objb.addEventListener('change',function(){
                if(objb.checked){
                    obja.className='hidden';
                }else{
                    obja.className='';
                }
            });
            }
        } 
    }
})(); 

// 1.スタートボタンプッシュ
// 2.モーダル表示
// 3.欠席者にチェック
// 4.表示する配列を再構築


//前列者希望社の配列を取っておく
// ランダムにするが、配列の前側に入れるように組み込む
