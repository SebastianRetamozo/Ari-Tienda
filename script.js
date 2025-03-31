$(document).ready(function() {
    // Initialize AOS
    AOS.init({
        once: true
    });
    
    // Custom order form submission using PersonalizationAPI
    $('#customOrderForm').submit(async function(e) {
        e.preventDefault();
        showLoading();
        
        // Build request payload for PersonalizationAPI
        const payload = {
            color: $('#colors').val() || "#f4a261", // default if empty
            personaje: $('#character').val()
        };
        
        try {
            const response = await fetch('https://magicloops.dev/api/loop/3234607f-0a3e-414c-9160-b2718d1fab71/run?color=%23f4a261&personaje=Naruto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            hideLoading();
            showAlert('Your custom order has been submitted successfully! We\'ll contact you shortly with a design concept.', 'success');
            $('#customOrderForm')[0].reset();
        } catch (error) {
            hideLoading();
            showAlert('There was an error submitting your order. Please try again later.', 'error');
        }
    });
    
    // Contact form submission using ContactFormAPI
    $('#contactForm').submit(async function(e) {
        e.preventDefault();
        showLoading();
        
        // Build request payload for ContactFormAPI
        const payload = {
            nombre: $('#contactName').val(),
            email: $('#contactEmail').val(),
            mensaje: $('#contactSubject').val() + ": " + $('#contactMessage').val()
        };
        
        try {
            const response = await fetch('https://magicloops.dev/api/loop/8aa2ed4c-6461-48ec-bc1e-d03d0bbef2de/run?nombre=Jane+Doe&email=jane%40example.com&mensaje=I+would+like+more+information+about+custom+orders.', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            hideLoading();
            showAlert('Thank you for your message! We\'ll get back to you as soon as possible.', 'success');
            $('#contactForm')[0].reset();
        } catch (error) {
            hideLoading();
            showAlert('There was an error sending your message. Please try again later.', 'error');
        }
    });
    
    // Newsletter subscription simulation
    $('#newsletterForm').submit(function(e) {
        e.preventDefault();
        showLoading();
        
        setTimeout(function() {
            hideLoading();
            showAlert('You\'ve been successfully subscribed to our newsletter!', 'success');
            $('#newsletterForm')[0].reset();
        }, 1500);
    });
    
    // Alert close button
    $('.custom-alert .btn-close').click(function() {
        $('.custom-alert').removeClass('show');
    });
    
    // Add to cart functionality
    $('.btn-primary').click(function() {
        if ($(this).text() === 'Add to Cart') {
            showAlert('Item added to your cart!', 'success');
        }
    });
    
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });
});

// Functions to show/hide loading spinner and show alerts
function showLoading() {
    $('.loading-spinner').css('display', 'flex');
}

function hideLoading() {
    $('.loading-spinner').css('display', 'none');
}

function showAlert(message, type) {
    var alert = $('.custom-alert');
    alert.find('.alert-message').text(message);
    
    if (type === 'success') {
        alert.removeClass('alert-error').addClass('alert-success');
    } else {
        alert.removeClass('alert-success').addClass('alert-error');
    }
    
    alert.addClass('show');
    
    // Auto hide alert after 5 seconds
    setTimeout(function() {
        alert.removeClass('show');
    }, 5000);
}
