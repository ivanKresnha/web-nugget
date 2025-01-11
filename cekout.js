function updateQuantity(action) {
    const input = document.querySelector('.quantity-input');
    let value = parseInt(input.value);
    
    if (action === 'increase') {
        value++;
    } else if (action === 'decrease' && value > 1) {
        value--;
    }
    
    input.value = value;
    updateTotal();
}

function updateTotal() {
    const quantity = parseInt(document.querySelector('.quantity-input').value);
    const pricePerItem = 50000;
    const shipping = 10000;
    
    const subtotal = quantity * pricePerItem;
    const total = subtotal + shipping;
    
    document.querySelector('.cost-summary .cost-item:nth-child(1) span:last-child').textContent = 
        `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.querySelector('.cost-summary .total span:last-child').textContent = 
        `Rp ${total.toLocaleString('id-ID')}`;
}

function submitPayment() {
    const nama = document.getElementById('nama').value;
    const telepon = document.getElementById('telepon').value;
    const alamat = document.getElementById('alamat').value;
    const kota = document.getElementById('kota').value;
    const kodepos = document.getElementById('kodepos').value;
    const payment = document.querySelector('input[name="payment"]:checked');

    if (!nama || !telepon || !alamat || !kota || !kodepos) {
        alert('Silakan lengkapi semua informasi pengiriman');
        return;
    }

    if (!payment) {
        alert('Silakan pilih metode pembayaran');
        return;
    }

    // Show upload section
    document.getElementById('uploadSection').style.display = 'block';
    // Hide the submit button
    document.querySelector('.submit-btn').style.display = 'none';
}

function validateFileSize(input) {
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (input.files[0]) {
        if (input.files[0].size > maxSize) {
            alert('Ukuran file melebihi 50MB. Silakan pilih file yang lebih kecil.');
            input.value = '';
            return;
        }
        
        // Show success message and handle the file
        handleFileUpload(input.files[0]);
    }
}

function handleFileUpload(file) {
    // Here you would typically handle the file upload to your server
    // For now, we'll just show a success message
    alert('Bukti pembayaran berhasil diupload!');
    
    // You can add additional logic here, such as:
    // - Showing a preview of the uploaded image
    // - Sending the file to your server
    // - Showing a loading indicator during upload
    // - Handling upload errors
}