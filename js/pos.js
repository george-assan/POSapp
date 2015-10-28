        
        
        var cartArrayForQuantity = [];
        var cartArrayForBarcode = [];
        var cartArrayForStock =[];
        var totalAmount = 0;

         function sendRequest ( u )
           {
               var obj = $.ajax({url:u,async:false});
                var result=$.parseJSON(obj.responseText);
                return result;
           }//end of sendrequest


      
         function addProduct(){

            var name = encodeURI(document.getElementById("product_name").value);
            var price = encodeURI(document.getElementById("product_price").value);
            var quantity = encodeURI(document.getElementById("product_quantity").value);
            var barcode = encodeURI(document.getElementById("product_barcode").value);
             var url = "http://cs.ashesi.edu.gh/~csashesi/class2016/george-assan/POS/user_controller.php?cmd=2&nme="+name+"&price="+price+"&qua="+quantity+"&barcode="+barcode;
               var obj = sendRequest ( url );

         }
               $(document).ready(function(){
   $(".button-collapse").sideNav();
});
        function addToCart(){
          
            var barcode = encodeURI(document .getElementById("barcodet").value);
            var quantity = encodeURI(document.getElementById("quantityt").value);
            cartArrayForBarcode.push(barcode);
              var url = "http://cs.ashesi.edu.gh/~csashesi/class2016/george-assan/POS/user_controller.php?cmd=4&barcode="+barcode;
               var obj = sendRequest ( url );

                if ( obj.result === 1 )
                {
             
          var i = 0;
          var panels ="<li class='collection-item'><b>Item: </b>"+obj.productobj[i].productname+"<b>Quantity: </b>"+quantity+"</li>";
          var newQuantity = obj.productobj[i].quantity - quantity;
          cartArrayForQuantity.push(newQuantity);
          
           $ ( ".collection" ).append (panels);
           var amount = obj.productobj[i].unitprice * quantity
           totalAmount = totalAmount + amount;
           $ ( ".totalLabel" ).html("<h2 style='font-family:arial'>Total: "+totalAmount+" "+cartArrayForBarcode.length +"</h2>");
         }
         else{
        
         
         }

        }

        function recordSales(){
          var phoneNumber = encodeURI(document .getElementById("phonenum").value);
           var url = "http://cs.ashesi.edu.gh/~csashesi/class2016/george-assan/POS/user_controller.php?cmd=5&phonenum="+phoneNumber+"&amount="+totalAmount;
            var obj = sendRequest ( url );
            updateStock();
            location.reload(); 

        }


        function updateStock(){
          var i = 0;
          for(;i<cartArrayForBarcode.length;i++){

          var url = "http://cs.ashesi.edu.gh/~csashesi/class2016/george-assan/POS/user_controller.php?cmd=6&barcode="+cartArrayForBarcode[i] +"&quantity="+cartArrayForQuantity[i];
            var obj = sendRequest ( url );

          }
        }


        function login(){
          var username = document .getElementById("username").value;
          var password = document .getElementById("password").value;
          if(username=="owner" && password=="owner"){
            window.open("inventory.html");

          }else if(username=="teller" && password=="teller"){
          window.open("tellerview.html");
          }
        }

        function updatePrice(){
          var barcode = encodeURI(document .getElementById("barcodemodal").value);
          var price = encodeURI(document .getElementById("newprice").value);
          var url = "http://cs.ashesi.edu.gh/~csashesi/class2016/george-assan/POS/user_controller.php?cmd=7&barcode="+barcode+"&price="+price;
            var obj = sendRequest ( url );
        }