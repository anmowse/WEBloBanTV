document.addEventListener('DOMContentLoaded', function() {
    const thongtinsanpham = JSON.parse(localStorage.getItem('thongtinsanpham')) || [];
    // Lấy id sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const dataId = urlParams.get('id');
    console.log('Thông tin từ URL của sản phẩm: ' + dataId);
    // Tìm sản phẩm có id tương ứng trong danh sách sản phẩm từ localStorage
    const selectedProduct = thongtinsanpham.find(product => product.id === dataId);
    if (selectedProduct) {
        // Nếu sản phẩm được tìm thấy, hiển thị thông tin chi tiết của sản phẩm
        displayProductDetails(selectedProduct);
    } else {
        console.error('Không tìm thấy sản phẩm.');
    }
    const buyButton = document.querySelector('.buy_now');
    buyButton.addEventListener('click', function() {
        let count = 0
        const cart_number = document.querySelector(".cart-number");
        console.log(cart_number);
        // Lấy thông tin sản phẩm chi tiết từ localStorage hoặc khởi tạo nếu chưa có
        let thongtinchitiet = JSON.parse(localStorage.getItem('thongtinchitiet')) || [];
       // Tìm sản phẩm có id tương ứng trong danh sách sản phẩm từ localStorage
        const productExists = thongtinchitiet.find(item => item.id === selectedProduct.id);
        if (!productExists) {
            thongtinchitiet.push(selectedProduct); // Thêm sản phẩm vào thongtinchitiet
            localStorage.setItem('thongtinchitiet', JSON.stringify(thongtinchitiet));
            alert('Sản phẩm đã được thêm vào gio hang.');
            count++;
            cart_number.innerHTML += count;
        } else {
         alert('Sản phẩm đã tồn tại trong gio hang.')
        }
    });
});

// Hàm hiển thị thông tin chi tiết của sản phẩm
function displayProductDetails(selectedProduct) {
    document.querySelector('.title h2').textContent = selectedProduct.title;
    document.querySelector('.price .price_new').textContent = selectedProduct.price;
    const mainImage = document.querySelector('.boxImg img');
    const sliderImages = document.querySelectorAll('.image .slider-nav .boxImg img');

    // Gán src cho hình ảnh chính
    mainImage.src = selectedProduct.image;

    // Gán src cho hình ảnh trong slider
    sliderImages.forEach(img => {
        img.src = selectedProduct.image;
    });
}
