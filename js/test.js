<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Images</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .fade-container {
            position: relative;
            width: 300px;
            height: 200px;
            overflow: hidden;
        }
        
        .fade-container img {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        
        .fade-container img.active {
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="fade-container" id="container1">
        <img src="" alt="Random Image 1">
    </div>
    <div class="fade-container" id="container2">
        <img src="" alt="Random Image 2">
    </div>
    <div class="fade-container" id="container3">
        <img src="" alt="Random Image 3">
    </div>
    <div class="fade-container" id="container4">
        <img src="" alt="Random Image 4">
    </div>

    <script>
        var images1 = [
            'image1_1.jpg',
            'image1_2.jpg',
            'image1_3.jpg',
            // Add more image URLs as needed
        ];

        var images2 = [
            'image2_1.jpg',
            'image2_2.jpg',
            'image2_3.jpg',
            // Add more image URLs as needed
        ];

        var images3 = [
            'image3_1.jpg',
            'image3_2.jpg',
            'image3_3.jpg',
            // Add more image URLs as needed
        ];

        var images4 = [
            'image4_1.jpg',
            'image4_2.jpg',
            'image4_3.jpg',
            // Add more image URLs as needed
        ];

        function changeImage(containerId, imagesArray) {
            var container = document.getElementById(containerId);
            var img = container.querySelector('img');
            var currentIndex = 0;

            function transitionImage() {
                img.classList.remove('active');
                setTimeout(function () {
                    currentIndex = (currentIndex + 1) % imagesArray.length;
                    img.src = imagesArray[currentIndex];
                    img.classList.add('active');
                    var randomTime = Math.floor(Math.random() * (30000 - 8000 + 1)) + 8000; // Random time between 8 and 30 seconds
                    setTimeout(transitionImage, randomTime); // Call transitionImage again after randomTime
                }, 500); // Fade duration
            }

            transitionImage(); // Call initially to start the transition
        }

        // Call changeImage for each container with respective parameters
        changeImage('container1', images1);
        changeImage('container2', images2);
        changeImage('container3', images3);
        changeImage('container4', images4);
    </script>
</body>
</html>