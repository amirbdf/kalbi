<script>
    import { login } from '../../signin'; // Correct import path
    import { auth } from '../../firebase'; // Assuming you have a firebase.js file where auth is initialized
    import { getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";
    import { goto } from '$app/navigation';
    
    let email = '';
    let password = '';
    let isLogin = true; // Toggle between login and signup
    
    async function handleLogin() {
      try {
        const user = await login(email, password);
        console.log('Logged in user:', user);
        goto("/home");
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
    
    async function handleSignUp() {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Registered user:', user);
        toggleForm(); // Switch to login form after successful signup
      } catch (error) {
        console.error('Sign up failed:', error);
      }
    }
    
    function toggleForm() {
      isLogin = !isLogin;
    }
    
    function handleLogout() {
      signOut(auth).then(() => {
        console.log('Sign-out successful.');
        goto("/");
      }).catch((error) => {
        console.error('An error happened during sign-out:', error);
      });
    }
</script>

<style>
    /* Your global styles can go here */
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: rgb(8, 30, 41); /* Background color */
        color: white; /* Text color */
    }

    input[type="email"],
    input[type="password"],
    button {
        display: block;
        margin: 10px 0;
        padding: 8px;
        border: none;
        border-radius: 4px;
        background-color: rgb(246, 140, 58); /* Button and input background color */
        color: white; /* Button and input text color */
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    input[type="email"],
    input[type="password"] {
        width: 100%;
    }

    button {
        width: 100%;
    }

    input[type="email"]:focus,
    input[type="password"]:focus,
    button:focus {
        outline: none;
    }

    button:hover {
        background-color: rgba(246, 140, 58, 0.8); /* Button hover background color */
    }

    p {
        margin-top: 20px;
        text-align: center;
    }

    a {
        color: rgb(246, 140, 58); /* Link color */
        text-decoration: none;
        cursor: pointer;
    }

    a:hover {
        text-decoration: underline;
    }
</style>

<div class="container">
    {#if isLogin}
        <input type="email" bind:value={email} placeholder="Email" />
        <input type="password" bind:value={password} placeholder="Password" />
        <button on:click={handleLogin}>Login</button>
        <p>Don't have an account? <a href="#" on:click={toggleForm}>Register</a></p>
    {:else}
        <input type="email" bind:value={email} placeholder="Email" />
        <input type="password" bind:value={password} placeholder="Password" />
        <button on:click={handleSignUp}>Register</button>
        <p>Already have an account? <a href="/login" on:click={toggleForm}>Login</a></p>
    {/if}

    <button on:click={handleLogout}>Logout</button>
</div>
