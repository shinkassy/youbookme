// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require moment
//= require fullcalendar
//= require_tree .


$(document).ready(function() {
    

    var added_event = function(date, allDay, jsEvent, view) {
     	

     	
     	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
    	$( this ).blur() ;	//ボタンからフォーカスを外す
    	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない

    	//オーバーレイを出現させる
    	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
    	$( "#modal-overlay" ).fadeIn( "slow" ) ;
    
    	//コンテンツをセンタリングする
    	centeringModalSyncer() ;
    
    	//コンテンツをフェードインする
    	$( "#modal-content" ).fadeIn( "slow" ) ;
    
    	
        //[#modal-overlay]、または[#modal-close]をクリックしたら…
    	$( "#modal-overlay, #modal-close" ).unbind().click( function(){
    
    		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
    		$( "#modal-content,#modal-overlay" ).fadeOut( "slow" , function(){
    
    			//[#modal-overlay]を削除する
    			$('#modal-overlay').remove() ;
    		} ) ;
    	} ) ; 
        
        
        $('#calendar').fullCalendar('unselect');           
        
        alert("2- "+ i);
        
        
        //センタリングをする関数
		function centeringModalSyncer(){
		
			//画面(ウィンドウ)の幅、高さを取得
			var w = $( window ).width() ;
			var h = $( window ).height() ;
	
			// コンテンツ(#modal-content)の幅、高さを取得
			var cw = $( "#modal-content" ).outerWidth();
			var ch = $( "#modal-content" ).outerHeight();
	
			//センタリングを実行する
			$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
		}
    }
    
    var i = 0;
        
        //ここが複数回繰り返されている
        $("#modal-save").click(function () {
            
            i = i + 1;
            
            alert("1- "+ i);

            var title = $("#title").val();
            var discription;
            var name = $("#name").val();
            
            if(title[0] == undefined){
               alert("用件を入力してください");
               return false;
            }

            // "test"のイベントを登録する
            $('#calendar').fullCalendar('addEventSource', [{
            	
                title: title,
                start: date,
                end: date,
                allDay: true
                
            	
            }]);
            alert("2"+title);
            $(this).css('background-color', '#cccccc');
            
            
        });




    

    $('#calendar').fullCalendar({
        events: '/events.json',
        dayClick: added_event
    })

});



