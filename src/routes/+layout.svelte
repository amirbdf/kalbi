<script lang="ts">
    import { onAuthStateChanged, signOut, getAuth, type User } from "firebase/auth";
    import { writable } from "svelte/store";
    import { goto } from '$app/navigation';
  
    const auth = getAuth();
    let user = writable<User | null>(null);
  
    onAuthStateChanged(auth, (currentUser) => {
      user.set(currentUser);
    });
  
    async function handleSignOut() {
      await signOut(auth);
      user.set(null);
      goto('/');
    }
</script>

<div class="container">
  <header>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a href="/"> <img src="/kalbi.jpeg"></a>
    <nav>
      <ul>
        <li><a href="/postdog">Post A dog</a></li>
        <li><a href="/dog-listings">Dog Listings</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        {#if $user}
          <!-- svelte-ignore a11y-invalid-attribute -->
          <li><a href="javascript:void(0)" on:click={handleSignOut}>Sign Out</a></li>
        {:else}
          <li><a href="/login">Sign In</a></li>
        {/if}
      </ul>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>Kalbi - The website for selling dogs</p>
    <p>Contact: 123-456-7890</p>
  </footer>
</div>

<style>
    main {
        background-color: rgb(255, 255, 255);
    }
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: rgb(8, 30, 41); /* Background color for all pages */
    }
  
    header {
      background-color: rgb(246, 140, 58); /* Navbar background color */
      color: white; /* Navbar text color */
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    img {
      font-weight: bold;
      height: 150px;
    }
  
    nav ul {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 1rem;
    }
  
    nav ul li {
      display: inline;
    }
  
    nav ul li a {
      text-decoration: none; /* Remove underline on links */
      transition: font-size 0.3s ease; /* Font size transition */
      color: white; /* Default link color */
    }
  
    nav ul li a:hover {
      font-size: 1.2rem; /* Increase font size on hover */
      color: rgb(26, 84, 106); /* Change link color on hover */
    }
  
    main {
      flex: 1;
      padding: 1rem;
    }
  
    footer {
      background: rgb(246, 140, 58); /* Footer background color */
      padding: 1rem;
      text-align: center;
      color: white; /* Footer text color */
    }
</style>
