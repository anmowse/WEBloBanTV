document.addEventListener('DOMContentLoaded', function() {
  const cartBody = document.querySelector('.cart__body');
  const thongtinchitiet = JSON.parse(localStorage.getItem('thongtinchitiet')) || [];
  let tong = 0;

  // Hàm tính tổng giá
  function calculateTotal() {
      tong = 0;
      const allPriceElements = document.querySelectorAll('.thongtin');
      allPriceElements.forEach(row => {
          const price = parseFloat(row.querySelector('.price sup').textContent.replace(/\./g, '').replace('₫', ''));
          const count = parseInt(row.querySelector('.count').textContent);
          tong += price * count;
      });
      const sumElement = document.querySelector('.cart__TongTien .sum');
      sumElement.textContent = tong.toLocaleString('vi-VN');
  }

  // Thêm sản phẩm vào giỏ hàng
  thongtinchitiet.forEach((element, index) => {
      const html = `
      <tr class="thongtin" data-index="${index}">
          <td>
              <img src="${element.image}" alt="" style="width: 130px;">
              <sup class="title">${element.title}</sup>
          </td>
          <td class="price">
              <sup class="price__inner">${element.price}</sup>
          </td>
          <td id="soluong" style="font-size: 23px;">
              <span class="down">
                  <i class="fa-solid fa-arrow-down"></i>
              </span>
              <span class="count" style="width: 20px;">1</span>
              <span class="up">
                  <i class="fa-solid fa-arrow-up"></i>
              </span>
          </td>
          <td class="xoa">
              <i class="fa-solid fa-trash" style="color: #f00024;"></i>
          </td>
      </tr>
      `;
      cartBody.innerHTML += html
  });

  // Thiết lập sự kiện cho các nút tăng/giảm số lượng
  document.querySelectorAll('.thongtin').forEach(row => {
      const down = row.querySelector('.down');
      const up = row.querySelector('.up');
      const countElement = row.querySelector('.count');
      const deleteButton = row.querySelector('.xoa');
      const index = row.getAttribute('data-index');
      let count = 1;

      countElement.textContent = count;

      down.addEventListener('click', function() {
          if (count > 1) {
              count--;
              countElement.textContent = count;
              calculateTotal();
          }
      });

      up.addEventListener('click', function() {
          if (count < 10) {
              count++;
              countElement.textContent = count;
              calculateTotal();
          }
      });

      deleteButton.addEventListener('click', function() {
        if (window.confirm('Bạn Có Chắc Muốn Xóa Sản Phẩm Không?')) {
          thongtinchitiet.splice(index, 1);
          localStorage.setItem('thongtinchitiet', JSON.stringify(thongtinchitiet));
          row.remove();
          calculateTotal();
      }
  });
  });

  // Cập nhật tổng giá ban đầu
  calculateTotal();
  // Xóa toàn bộ giỏ hàng
  const clearCartButton = document.querySelector('.clear-cart');
  clearCartButton.addEventListener('click', function() {
    if (window.confirm('Bạn Có Chắc Muốn Xóa Toàn Bộ Giỏ Hàng Không?')) {
      localStorage.removeItem('thongtinchitiet');
      while (cartBody.firstChild) {
          cartBody.removeChild(cartBody.firstChild);
      }
      calculateTotal();
  }
});
});