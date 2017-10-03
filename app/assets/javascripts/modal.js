$(document).ready(function() {
    

    var select = function(start, end, allDay) {
        modalPopup();
        $("#start-date").attr("value", start.format('YYYY-MM-DD'));
        $("#start-time").attr("value", "09:00");
        $("#end-date").attr("value", start.format('YYYY-MM-DD'));
        $("#end-time").attr("value", "18:00");
        
    };
    
    var updateEvent = function(event, revertFunc) {
        modalPopup();
        $("#title").attr("value", event.title);
        $("#start-date").attr("value", event.start.format('YYYY-MM-DD'));
        $("#start-time").attr("value", event.start.format('HH:MM:SS'));
        $("#end-date").attr("value", event.end.format('YYYY-MM-DD'));
        $("#end-time").attr("value", event.end.format('HH:MM:SS'));
        $(".modal-footer").append( 
            '<a href = "/events/' + event.id + '/show")>詳細</a>' ) ;
            
    };
    
    
    

    $("#modal-save").on("click", function () {
        
        var title = $("#title").val();
        var discription;
        var name = $("#name").val();
        var start = $("#start-date").val();
        var end = $("#end-date").val();
        //var start = Date.parse(date.replace(/-/g, '/'));
        
        
        

        if(title[0] == undefined){
           alert("用件を入力してください");
           return false;
        }

        var data = {
            title: title,
            start: start,
            end: end,
            allDay: false,
            name: name
        };
        
        
        
        //登録の処理
        $.ajax({
            type: "POST",
            url: "/events/create",
            data: data
        })
        .then(
            $('#calendar').fullCalendar('renderEvent', {
                title: title,
                start: start
            }),
            function(){
                alert("読み込み失敗: " + errorThrown.message)
            }
        );
        
        //更新の処理
        $.ajax({
            type: "POST",
            url: "/events/" + event.id,
            _method: 'PUT',
            data: data
        })
        .then(
            $('#calendar').fullCalendar('renderEvent', {
                title: title,
                start: start
            }),
            function(){
                alert("読み込み失敗: " + errorThrown.message)
            }
        );
        
        
        

        $( "#modal-content,#modal-overlay" ).fadeOut( "slow" , function(){
			$('#modal-overlay').remove() ;
		});
    });
    
    function modalPopup(){
        $( this ).blur() ;
    	if( $( "#modal-overlay" )[0] ) return false ;
    	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
    	$( "#modal-overlay" ).fadeIn( "slow" ) ;
    	centeringModalSyncer() ;
    	$( "#modal-content" ).fadeIn( "slow" ) ;
    	$( "#modal-overlay, #modal-close" ).unbind().click( function(){
    		$( "#modal-content,#modal-overlay" ).fadeOut( "slow" , function(){
    			$('#modal-overlay').remove() ;
    		} ) ;
    	} ) ; 
    }
    
    
    function centeringModalSyncer(){
		var w = $( window ).width() ;
		var h = $( window ).height() ;
    	var cw = $( "#modal-content" ).outerWidth();
		var ch = $( "#modal-content" ).outerHeight();
		$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;
	}
	

	var calendar = $('#calendar').fullCalendar({
        editable: true,
        selectable: true,
        ignoreTimezone: false,
        select: select,
        events: '/events/events.json',
        eventClick: updateEvent
    });

});
