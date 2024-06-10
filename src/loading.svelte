<!-- LoadingLayout.svelte -->

<script>
    export let message = "Loading..."; // Default loading message
  </script>
  
  <style>
    /* Styles for the loading layout */
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    .loading-text {
      font-size: 1.5rem;
      font-weight: bold;
    }
  
    /* Add additional styles as needed */
  </style>
  
  <div class="loading-container">
    <p class="loading-text">{message}</p>
  </div>
  