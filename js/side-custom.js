jQuery(window).load(function(){

	var parag = jQuery('#commentable-container p');
  parag.each(function(ele){
  jQuery(this).attr('data-section-id', ele+1).addClass('commentable-section');
  });

  setTimeout(() => {
	GetComments();
  },500)
  
  
  })

function AddSideComment(existingComments){
	setTimeout(() => {
	var SideComments = require('side-comments');
      window.sideComments = new SideComments('#commentable-container', currentUser, existingComments);
      window.sideComments.on('commentPosted', function( comment ) {
        comment.id = parseInt(Math.random() * (100000 - 1) + 1);
        sideComments.insertComment(comment);
		var post_id = jQuery('#post_id').val();
		//console.log(post_id);
		comment['post_id']=post_id;
		PostComment(comment);
      });
      window.sideComments.on('commentDeleted', function( comment ) {
        sideComments.removeComment(comment.sectionId, comment.id);
      });
  }, 500);

}

  function PostComment(comment){
    var plugins_url = jQuery('#plugins_url').val();
    //var post_id = jQuery('#post_id').val();
   // console.log(plugins_url);
    jQuery.ajax({
    url: plugins_url+'/side-comments/wp-comments-custom-post.php',
        type: 'POST',
        data: comment,
        success: function( savedComment ) {
			//processCommentsData(JSON.parse(savedComment));
      if(savedComment){
        console.log(savedComment);
      }
     
            // Once the comment is saved, you can insert the comment into the comment stream with "insertComment(comment)".
          
        }
    });
}

function GetComments(){
	var post_id = jQuery('#post_id').val();
	var plugins_url = jQuery('#plugins_url').val();
	jQuery.ajax({
        url: plugins_url+'/side-comments/wp-comments-get-cpt.php',
        type: 'POST',
        data: {'post_id':post_id},
        success: function( savedComment ) {
          console.log((JSON.parse(savedComment)));
			processCommentsData(JSON.parse(savedComment));
            // Once the comment is saved, you can insert the comment into the comment stream with "insertComment(comment)".
          
        }
    });
}


function processCommentsData(comments) {
		var formattedArray = [];
		comments.forEach(function(element, index) {
		var formatObj = {
		sectionId:element.comment_parent,
		comments : [],
		};
		
		if(formattedArray.length) {
		formattedArray.find(function(existComment) {
		if(existComment.sectionId == element.comment_parent){
		existComment.comments.push({
		"authorAvatarUrl": "support/images/clay_davis.png",
		"authorName": element.comment_author,
		"comment": element.comment_content,
		"commentPostID": element.comment_post_ID,
		"deleted" : false,
		"replies": []
		});
		} else {
		formatObj.comments.push({
		"authorAvatarUrl": "support/images/clay_davis.png",
		"authorName": element.comment_author,
		"comment": element.comment_content,
		"commentPostID": element.comment_post_ID,
		"deleted" : false,
		"replies": []
		});
		formattedArray.push(formatObj);
		}

		});
		} else {
		formatObj.comments.push({
		"authorAvatarUrl": "support/images/clay_davis.png",
		"authorName": element.comment_author,
		"comment": element.comment_content,
		"commentPostID": element.comment_post_ID,
		"deleted" : false,
		"replies": []
		});
		formattedArray.push(formatObj);
		}
		
		});
		AddSideComment(formattedArray);
		//sideComments.insertComment(formattedArray);
}



