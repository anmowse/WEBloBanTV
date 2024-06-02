
const brandElements = document.querySelectorAll('.brand .box a');
const colElements = document.querySelectorAll('.sectionOne .col ');
const clear = document.querySelector('#clear');
brandElements.forEach(item=>{
  const type =  item.getAttribute('type')
  item.addEventListener('click',function(){
    colElements.forEach(col =>{
      const img = col.querySelector('img')
      const typeImg = img.getAttribute('type')
      if(type !== typeImg){
          col.classList.add('hide')
      }
      else
      col.classList.remove('hide')
      clear.addEventListener('click',function(){
        col.classList.remove('hide')
      })

    })


  })


})


// Lấy tất cả các thẻ a chứa sản phẩm
const productLinks = document.querySelectorAll('.product-link');
productLinks.forEach(link => {  
    link.addEventListener('click', function(event) {
        const boxID = link.getAttribute('data-id');
        const priceProduct = link.querySelector('.price .new').textContent;
        const imgProduct = link.querySelector('.image img').src;
        const titleProduct = link.querySelector('.title').textContent;
        const thongtinSP = {
            id: boxID,
            price: priceProduct,
            image: imgProduct,
            title: titleProduct
        };
        

        let products = JSON.parse(localStorage.getItem('thongtinsanpham')) || []; // Lấy danh sách sản phẩm từ localStorage
        // Kiểm tra xem sản phẩm đã tồn tại trong danh sách chưa
        const kiemtraTonTai = products.find(product => product.id === boxID);
        if (!kiemtraTonTai) {
            products.push(thongtinSP); // Nếu chưa tồn tại, thêm sản phẩm mới vào danh sách
            localStorage.setItem('thongtinsanpham', JSON.stringify(products)); // Lưu danh sách sản phẩm vào localStorage
        } else {
            console.log('Sản phẩm đã tồn tại trong giỏ hàng.');
        }
    });
});

