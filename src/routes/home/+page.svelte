<script lang="ts">
    import { auth, db } from '../../firebase';
    import type { onAuthStateChanged, User } from "firebase/auth";
    import { collection, getDocs } from "firebase/firestore";
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let user: User | null = null;
    let breedSearch: string = '';
    let priceMin: string = '';
    let priceMax: string = '';
    let allDogs = writable<any[]>([]);
    let dogs = writable<any[]>([]);
    let message = writable<string>('');

    // Add an event listener to fetch dogs when the component is mounted
    onMount(fetchAllDogs);

    // Function to fetch all dogs
    async function fetchAllDogs() {
        try {
            const querySnapshot = await getDocs(collection(db, "dogs"));
            const allDogsList = querySnapshot.docs.map(doc => doc.data());
            allDogs.set(allDogsList);
            dogs.set(allDogsList);
        } catch (error) {
            console.error('Error fetching dogs:', error);
            message.set('Failed to fetch dogs.');
        }
    }

    // Function to search dogs based on criteria
    async function searchDogs() {
        try {
            let filteredDogs = [...$allDogs];

            // Filter by breed if search term is provided
            if (breedSearch.trim()) {
                filteredDogs = filteredDogs.filter(dog => dog.breed.toLowerCase().includes(breedSearch.trim().toLowerCase()));
            }

            // Filter by minimum price if provided
            if (priceMin.trim()) {
                filteredDogs = filteredDogs.filter(dog => dog.price >= parseInt(priceMin));
            }

            // Filter by maximum price if provided
            if (priceMax.trim()) {
                filteredDogs = filteredDogs.filter(dog => dog.price <= parseInt(priceMax));
            }

            // Update the dogs store with filtered dogs
            dogs.set(filteredDogs);

            // Set message based on search results
            if (filteredDogs.length === 0) {
                message.set('No dogs found matching the criteria.');
            } else {
                message.set('');
            }
        } catch (error) {
            console.error('Error searching dogs:', error);
            message.set('Failed to search dogs.');
        }
    }
</script>

<div>
    <h2>Search for Dogs</h2>
    <input type="text" bind:value={breedSearch} placeholder="Search by Breed" on:input={searchDogs} />
    <input type="number" bind:value={priceMin} placeholder="Min Price" on:input={searchDogs} />
    <input type="number" bind:value={priceMax} placeholder="Max Price" on:input={searchDogs} />
    <p>{$message}</p>

    {#if $dogs.length > 0}
    <div class="dog-cards">
        {#each $dogs as dog}
        <div class="card">
            <h3>{dog.name} - {dog.breed}</h3>
            <p>Age: {dog.age}</p>
            <p>Price: {dog.price}</p>
            <p>Contact: {dog.contact}</p>
            <!-- Display dog image if available -->
            {#if dog.imageUrl}
            <img src={dog.imageUrl} alt={dog.name} />
            {/if}
        </div>
        {/each}
    </div>
    {:else}
    <!-- Show message if no dogs are found -->
    <p>No dogs found.</p>
    {/if}
</div>

<style>
    /* Styles for input, ul, li, and img */
    input {
        display: block;
        margin: 0.5rem 0;
        padding: 0.5rem;
    }

    .dog-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
    }

    .card {
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    }

    img {
        display: block;
        margin-top: 0.5rem;
        max-width: 100%;
        height: auto;
        border-radius: 4px;
    }
</style>
