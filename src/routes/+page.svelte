<script>
  // You can import necessary libraries here if needed
</script>

<style>
  /* Your global styles can go here */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f0f0f0; /* Adjust background color as needed */
  }

  .image-link {
    display: block;
    text-decoration: none;
  }

  .image {
    width: 200px; /* Adjust size as needed */
    height: 200px; /* Adjust size as needed */
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Normal shadow */
    transition: box-shadow 0.3s ease; /* Smooth transition for hover effect */
  }

  .image:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Larger shadow on hover */
  }
</style>

<div class="container">
  <a href="/login" class="image-link">
    <img src="/kalbi.jpeg" alt="Kalbi" class="image">
  </a>
</div>
