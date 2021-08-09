
jQuery(document).ready(function(){
      
    $('#btnsave').click(function(){
        var hiddenid = $('#hiddenid').val()
        var nm = $('#nameid').val()
        var em = $('#emailid').val()

        let csrf_value = $("input[name=csrfmiddlewaretoken]").val()
        
        
        if(nm == ""){
            $('#nameid').addClass('error')
            $('#nameid').attr('placeholder','enter the name.');
        }
        else if(em == ""){
            $('#emailid').addClass('error')
            $('#emailid').attr('placeholder','enter your email.');
            
        }

        else{
            mydata = {id:hiddenid, name:nm, email:em, csrfmiddlewaretoken:csrf_value};
            $.ajax({      
                url: "/save/",
                method:"POST",
                data:mydata,
                success:function(data) {
                    if(data.status == 1){
                        output = ""
                        let a = $('#hiddenid').val('')
                        $('#myform')[0].reset()
                        let arr = [];
                        x = data.user_data
                        console.log(data.length)
                        for(i=0; i<x.length; i++){
                            
                            output+="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"+x[i].createdatetime+"</td><td> <input type='button' id='btnedit' value='Edit' data-id="+x[i].id+" style='margin: 5px;'><input type='button' id='btndelete' value='Delete' data-id="+x[i].id+"> </td></tr>"
                            
                            $('#table-body').html(output)
                        
                        }
                     
                        if(data.msg==1){
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Add Record',
                                showConfirmButton: false,
                                timer: 1500
                              })
                        }
                        if(data.msg==0){
                            Swal.fire({
                                icon: 'success',
                                title: 'Successfully Updated Record',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        
                    }
                    if(data.status == 0){
                        $('#msg-delete').text('Unable form not submit !')
                        $('#msg-delete').show()
                        $('#hiddenid').val('')
                        $('#myform')[0].reset()
                    }


                },
            })
            
        }
    })

     // Clear button functionality
    $('#btnclear').click(function(){
       $('#hiddenid').val('')
       $('#myform')[0].reset()
       $('#nameid').addClass('error_clear')
       $('#nameid').attr('placeholder','')
       $('#emailid').addClass('error_clear')
       $('#emailid').attr('placeholder','')
       
    })

     //Edit button functionality
     $('#table-body').on('click', '#btnedit', function(){
        let id = $(this).attr('data-id')
        let csrf_value = $("input[name=csrfmiddlewaretoken]").val()
        
        $.ajax({
            url:"/edit/",
            method:"POST",
            data:{"id":id, "csrfmiddlewaretoken":csrf_value},
            success:function(params){
                if(params.status==1){
                    console.log(params.fields)
                    $('#hiddenid').val(params.fields.id)
                    $('#nameid').val(params.fields.name)
                    $('#emailid').val(params.fields.email)
                }
                if(params.status==0){
                    console.log('Error')
                }
            }            
        })
        
     })//End Edit button functionality

     // Delete Button Functionality
    $('#table-body').on('click', '#btndelete', function() {
        let id = $(this).attr('data-id')
        let csrf_value = $("input[name=csrfmiddlewaretoken]").val()
        let mythis = this
        
        Swal.fire({

            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes, I'am sure!"

        }).then((result) => {
           if (result.isConfirmed) {
                $.ajax({
                    url:"/delete/",
                    method:"POST",
                    data:{
                        'id':id,
                        'csrfmiddlewaretoken':csrf_value
                    },
                    success:function(params){
                        if(params.status==1){
                            $(mythis).closest('tr').fadeOut()                  
                        }
                        else{
                            $('#msg-delete').text('User not delete !')
                            $('#msg-delete').show()
                        }
                    }
                })
             Swal.fire(
               'Deleted!',
               'Your file has been deleted.',
               'success'
             )
           }
         })

     })//End delete functionality


})//jQuery(document).ready() end